import React from 'react';
import { Router, Route, Link } from 'react-router';

class Home extends React.Component {
	render() {
		return(
			<div className='home-container-page'>
				{this.props.alert}
		    <div className='home-title'>
					<h1>Cornell Suite Life</h1>
				</div>
			</div>
		);
	}
}

export default Home;