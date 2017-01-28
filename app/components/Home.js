import React from 'react';
import { Router, Route, Link } from 'react-router';
import { Row, Col } from 'antd';

class Home extends React.Component {
	render() {
		return(
			<div className='home-container-page'>
				{this.props.alert}
				<Row className='home-table' type="flex" justify="space-around" align="middle">
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
			</div>
		);
	}
}

export default Home;