import React from 'react';
import { Table, Button, Icon, Input, Select } from 'antd';
const InputGroup = Input.Group;
const Option = Select.Option;

import 'whatwg-fetch';

import validate from './helpers/validate';
import { suitemates } from '../data/suitemates';

class Quotes extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      posting: false,
      loading: true,
      quotes: []
    };

  }

  componentWillMount() {
    fetch('http://cornellsuite.life:8080/api/v1/quotes')
      .then(response => validate(response))
      .then(json => {
        this.setState({
          quotes: json,
          loading: false
        });
      });
  }

  quoteChanged(e) {
    this.setState({
      quote: e.target.value
    })
  }

  authorChanged(author) {
    this.setState({
      author: author
    });
  }

  handleAdd() {
    if (this.state.posting) return;
    this.setState({
      posting: true
    });

    const body = {
      content: this.state.quote,
      author: this.state.author,
      timestamp: Date.now() / 1000
    };

    const quotes = this.state.quotes;
    const newQuote = Object.assign({}, body);
    newQuote.id = -2;
    quotes.unshift(newQuote);

    this.setState({
      quotes: quotes,
      quote: undefined,
      author: undefined
    });

    fetch('http://cornellsuite.life:8080/api/v1/quotes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    }).then(response => validate(response))
      .then(json => {
        const quotes = this.state.quotes.slice();
        quotes.shift();
        quotes.unshift(json);
        this.setState({
          quotes: quotes,
          posting: false
        });
      });
  }

  handleDelete(q) {
    fetch(`http://cornellsuite.life:8080/api/v1/quotes/${q.id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(q)
    }).then(response => validate(response))
      .then(json => {
        const quotes = this.state.quotes.slice();
        quotes.splice(quotes.indexOf(q), 1);
        this.setState({
          quotes: quotes,
          posting: false
        });
      });
    console.log('deleting quote ', q);
  }

  render() {
    var dataSource = this.state.quotes;

    const columns = [
      {
        title: 'Quote',
        dataIndex: 'content',
        key: 'content',
        width: '50%'
      },
      {
        title: 'Author',
        dataIndex: 'author',
        key: 'author'
      },
      {
        dataIndex: '',
        key: 'x',
        width: 25,
        render: (text, record, index) =>
          <Button
            type='danger'
            className='quotes-delete-button'
            onClick={() => this.handleDelete(record)}
            style={{ width: 32, padding: '4px 8px' }}>
            <Icon type='delete' />
          </Button>
      }
    ];

    const authorOptions = suitemates.map((mate) => (
      <Option value={mate.name} key={mate.netid}>{mate.name}</Option>
    ));

    const inputValid = this.state.author && this.state.quote

    return (
      <div>
        <Input 
          value={this.state.quote}
          placeholder='Enter a quote...'
          style={{ width: '100%' }}
          onChange={(e) => this.quoteChanged(e)} />
        <InputGroup style={{ paddingTop: 5, paddingBottom: 15, textAlign: 'right'}}>
          <Select
            value={this.state.author}
            placeholder='Who said it?'
            style={{ width: 150, textAlign: 'left' }}
            onChange={(e) => this.authorChanged(e)}>
            {authorOptions}
          </Select>
          <Button type='primary' disabled={!inputValid} onClick={() => this.handleAdd()}>Add</Button>
        </InputGroup>
        <br />
        <Table
          dataSource={dataSource}
          columns={columns}
          pagination={{ pageSize: 5 }} 
          rowKey='id'
          showHeader={false}
          locale={{ emptyText: this.state.loading ? '' : 'No Quotes Yet!' }}
          className='quotes-table'
          loading={this.state.loading} />
      </div>
    );
  }
}

export default Quotes;