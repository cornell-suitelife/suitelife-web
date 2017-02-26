import React from 'react';
import { Table } from 'antd';

import validate from '../helpers/validate';

class Quotes extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			quotes: []
		};
	}

	componentWillMount() {
		fetch(':8080/api/v1/quotes')
			.then(response => validate(response))
      .then(json => {
        const quotes = json.contents;
        this.setState({
          quotes: quotes
        });
      });
	}

	render() {
		var dataSource = [];

		for (var i = this.state.quotes.length - 1; i >= 0; i--) {
			var quote = this.state.quotes[i];
			quote.key = quote.id;
			dataSource.push(quote);
		}

		console.log(dataSource);

		const columns = [{
			title: 'Quote',
			dataIndex: 'text',
			key: 'text'
		}, {
			title: 'Author',
			dataIndex: 'author',
			key: 'author'
		}];

		return (
			<Table dataSource={dataSource} columns={columns}></Table>
		);
	}
}

export default Quotes;