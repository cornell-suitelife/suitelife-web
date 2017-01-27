import React from 'react';
import { Router, Route, Link, browserHistory } from 'react-router';
import { Layout, Menu, Icon, Badge } from 'antd';
const { Header, Footer, Sider, Content } = Layout;
import io from 'socket.io-client';
let socket = io('http://10.147.136.126:5000');

const titles = {
	'/': 'Cornell Suite Life',
	'/suite-door': 'Suite Door',
	'/messages': 'Messages'
};

class PageLayout extends React.Component {
	constructor(props) {
		super(props);

		const path = this.props.location.pathname;

		this.state = {
			path: path,
			title: titles[path],
			messages: []
		};
	}

	componentWillMount() {
		browserHistory.listen((event) => {
			if(event.pathname != null) {
				this.setState({
					path: event.pathname,
					title: titles[event.pathname]
				});
			}
		});
	}

	componentDidMount() {
		socket.open();

		socket.on('connect', () => {
		  console.log('Connected to socket with id: ', socket.id);
		  this.setState({
				connected: true
			});
		});

		socket.on('disconnect', () => {
			console.log('Disconnected from socket.');
			this.setState({
				connected: false
			});
		});
	}

	render() {
		return (
			<Layout>
				<Sider>
					<Menu theme='dark' mode='inline' selectedKeys={[this.state.path]}>
						<Menu.ItemGroup title="Suite Life at Cornell">
							<Menu.Item key='/'>
								<Link to='/'>
									<Icon type='home'/>
									<span className='nav-text'>Home</span>
								</Link>
							</Menu.Item>
							<Menu.Item key='/suite-door'>
								<Link to='/suite-door'>
									<Icon type='video-camera' />
									<span className='nav-text'>Suite Door</span>
								</Link>
							</Menu.Item>
							<Menu.Item key='/messages'>
								<Link to='/messages'>
									<Badge count={this.state.messages.length}>
										<Icon type='mail' />
										<span className='nav-text'>Messages</span>
									</Badge>
								</Link>
							</Menu.Item>
						</Menu.ItemGroup>
					</Menu>
				</Sider>
				<Layout style={{minHeight: '100vh'}}>
					<Header style={{ background: '#fff', padding: 0 }}>
						<h1 style={{ textAlign: 'center' }}>{this.state.title}</h1>
					</Header>
					<Content style={{ margin: '0 16px' }}>
						<div style={{ padding: 24, minHeight: 360 }}>
							{React.cloneElement(this.props.children, { connected: this.state.connected, socket: socket })}
						</div>
					</Content>
					<Footer style={{ textAlign: 'center' }}>
						Cornell Suite Life © 2017
					</Footer>
				</Layout>
			</Layout>
		);
	}
}

PageLayout.contextTypes = {
	router: React.PropTypes.object
};

export default PageLayout;