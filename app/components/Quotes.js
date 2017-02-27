import React from 'react';
import { Table } from 'antd';

import validate from './helpers/validate';

class Quotes extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			quotes: []
		};
	}

	componentWillMount() {
		fetch('http://server.cornellsuite.life:8080/api/v1/quotes')
			.then(response => validate(response))
      .then(json => {
        this.setState({
          quotes: json
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