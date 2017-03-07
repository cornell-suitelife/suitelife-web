import React from 'react';
import { Router, Route, Link, browserHistory } from 'react-router';
import { Layout, Menu, Icon, Badge, Alert, Row, Col, Button, Popover } from 'antd';
const { Header, Footer, Sider, Content } = Layout;
import { titles } from '../routes';
import io from 'socket.io-client';
let socket = io('/');

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

    this.setState({
      status: 'connecting'
    });

    socket.on('connect', () => {
      console.log('Connected to socket with id: ', socket.id);
      this.setState({
        status: 'connected'
      })
    });

    socket.on('disconnect', () => {
      console.log('Disconnected from socket.');
      this.setState({
        status: 'reconnecting'
      });
    });
  }

  render() {
    var statusAlert = null;
    if (this.state.status === 'connecting') {
      statusAlert = (
        <Alert message='Connecting to server...' type='warning' showIcon/>
      );
    } else if (this.state.status === 'reconnecting') {
      statusAlert = (
        <Alert message='Disconnected. Attempting to reconnect...' type='error' showIcon/>
      );
    }

    const body = this.state.path === '/'
      ? React.cloneElement(this.props.children, { alert: statusAlert })
      : (
          <Layout style={{minHeight: '100vh'}}>
            <Content>
              <div className='app-content'>
                {statusAlert}
                {React.cloneElement(this.props.children, { status: this.state.status, socket: socket })}
              </div>
            </Content>
            <Footer style={{ textAlign: 'center' }}>
              Cornell Suite Life © 2017
            </Footer>
          </Layout>
        );

    return (
      <Layout style={{ backgroundColor: this.state.path === '/' ? 'transparent' : '#ececec'}}>
        <Sider>
          <Menu mode='inline' selectedKeys={[this.state.path]}>
            <Menu.ItemGroup title='Suite Life at Cornell'>
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
              <Menu.Item key='/quotes'>
                <Link to='/quotes'>
                  <Icon type='message' />
                  <span className='nav-text'>Quotes</span>
                </Link>
              </Menu.Item>
              <Menu.Item key='/calendar'>
                <Link to='/calendar'>
                  <Icon type='calendar' />
                  <span className='nav-text'>Calendar</span>
                </Link>
              </Menu.Item>
              <Menu.Item key='/music'>
                <Link to='/music'>
                  <Icon type='caret-right' />
                  <span className='nav-text'>Music</span>
                </Link>
              </Menu.Item>
            </Menu.ItemGroup>
          </Menu>
        </Sider>
        {body}
      </Layout>
    );
  }
}

PageLayout.contextTypes = {
  router: React.PropTypes.object
};

export default PageLayout;
