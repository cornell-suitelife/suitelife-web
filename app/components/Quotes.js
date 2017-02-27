import React from 'react';
import { Table, Button, Icon, Input, Select } from 'antd';
const InputGroup = Input.Group;
const Option = Select.Option;

import validate from './helpers/validate';

import { suitemates } from '../data/suitemates';

class Quotes extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      quotes: []
    };

  }

  componentWillMount() {
    fetch('http://server.cornellsuite.life/api/v1/quotes')
      .then(response => validate(response))
      .then(json => {
        this.setState({
          quotes: json
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
    const newQuote = {
      id: 1234,
      text: this.state.quote,
      author: this.state.author
    };

    const quotes = this.state.quotes;
    quotes.unshift(newQuote);

    this.setState({
      quotes: quotes,
      quote: undefined,
      author: undefined
    });

    fetch('http://server.cornellsuite.life/api/v1/quotes/new', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newQuote)
    }).then(response => validate(response))
      .then(json => {
        console.log(json);
      });
  }

  render() {
    var dataSource = this.state.quotes;

    const columns = [
      {
        title: 'Quote',
        dataIndex: 'text',
        key: 'text',
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
        width: 50,
        render: () => <Button type='danger' className='quotes-delete-button'><Icon onClick={this.deleteQuote} type='delete' /></Button>
      }
    ];

    const authorOptions = suitemates.map((mate) => (
      <Option value={mate.name} key={mate.netid}>{mate.name}</Option>
    ));

    const inputValid = this.state.author && this.state.quote

    return (
      <div>
        <InputGroup compact>
          <Input value={this.state.quote} placeholder='Enter a quote...' style={{ width: '50%' }} onChange={(e) => this.quoteChanged(e)} />
          <Select value={this.state.author} placeholder='Who said it?' style={{ width: 150 }} onChange={(e) => this.authorChanged(e)}>
            {authorOptions}
          </Select>
          <Button type='primary' disabled={!inputValid} onClick={() => this.handleAdd()}>Add</Button>
        </InputGroup>
        <br />
        <Table
          dataSource={dataSource}
          columns={columns}
          pagination={{ pageSize: 10 }} 
          rowKey='id'
          locale={{ emptyText: 'No Quotes Yet!' }}
          className='quotes-table' />
      </div>
    );
  }
}

export default Quotes;