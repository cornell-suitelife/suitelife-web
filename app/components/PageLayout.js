import React from 'react';
import { Router, Route, Link, browserHistory } from 'react-router';
import { Layout, Menu, Icon } from 'antd';
const { Header, Footer, Sider, Content } = Layout;

const titles = {
	'/': 'Home',
	'/messages': 'Messages'
};

class PageLayout extends React.Component {
	constructor(props) {
		super(props);

		const path = this.props.location.pathname;

		this.state = {
			path: path,
			title: titles[path]
		};
	}

	componentWillMount() {
		browserHistory.listen((event) => {
			console.log(event.pathname);
			if(event.pathname != null) {
				this.setState({
					path: event.pathname,
					title: titles[event.pathname]
				});
			}
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
		              <Icon type='user'/>
		              <span className='nav-text'>Home</span>
	              </Link>
	            </Menu.Item>
	            <Menu.Item key='/messages'>
		            <Link to='/messages'>
		              <Icon type='video-camera' />
		              <span className='nav-text'>Messages</span>
		            </Link>
	            </Menu.Item>
            </Menu.ItemGroup>
          </Menu>
        </Sider>
        <Layout>
          <Header style={{ background: '#fff', padding: 0 }}>
          	<h1 style={{ paddingLeft: 38 }}>{this.state.title}</h1>
          </Header>
          <Content style={{ margin: '0 16px' }}>
            <div style={{ padding: 24, minHeight: 360 }}>
              {this.props.children}
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