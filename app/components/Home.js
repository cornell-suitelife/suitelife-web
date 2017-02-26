import React from 'react';
import { Router, Route, Link } from 'react-router';
import { Row, Col } from 'antd';
import Animate from 'rc-animate';

import validate from '../helpers/validate';

class Home extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			quoteText: '',
			quoteAuthor: ''
		};
	}

	componentDidMount() {

    fetch('http://quotes.rest/qod.json?category=funny')
      .then(response => validate(response))
      .then(json => {
        const quote = json.contents.quotes[0];
        this.setState({
          quoteText: quote.quote,
          quoteAuthor: quote.author
        });
      });
  }

	render() {
		return(
			<div className='home-container-page'>
				{this.props.alert}
				<Animate transitionName='fade'>
					<Row className='home-table' type="flex" justify="space-between" align="middle" key='1'>
				    <Col className='home-cell' span='10'>
							<h1>Cornell Suite Life</h1>
							<hr/>
							<p>201 Space Oddywhey</p>
						</Col>
						<Col className='home-cell' span='10' offset='4'>
							<ul id='members-list'>
								<li><p><b>Chase Thomas</b> Information Science</p></li>
								<li><p><b>Daniel Li</b> Computer Science</p></li>
								<li><p><b>Nicholas Sarkis</b> Electrical and Computer Engineering</p></li>
								<li><p><b>Ning Ning Sun</b> Computer Science</p></li>
								<li><p><b>Sebastian Bauco</b> Mechanical Engineering</p></li>
							</ul>
						</Col>
					</Row>
					<blockquote className='quote' key='2'>
	          <p id='quote-text'><b>{this.state.quoteText}</b></p>
	          <p id='quote-author'>- {this.state.quoteAuthor}</p>
	        </blockquote>
				</Animate>
			</div>
		);
	}
};

export default Home;