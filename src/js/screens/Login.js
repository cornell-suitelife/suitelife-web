import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import Animate from 'grommet/components/Animate';
import Split from 'grommet/components/Split';
import Sidebar from 'grommet/components/Sidebar';
import LoginForm from 'grommet/components/LoginForm';
import Article from 'grommet/components/Article';
import Section from 'grommet/components/Section';
import List from 'grommet/components/List';
import ListItem from 'grommet/components/ListItem';
import Hero from 'grommet/components/Hero';
import Card from 'grommet/components/Card';
import Anchor from 'grommet/components/Anchor';
import Image from 'grommet/components/Image';
import Box from 'grommet/components/Box';
import Heading from 'grommet/components/Heading';
import Paragraph from 'grommet/components/Paragraph';
import Footer from 'grommet/components/Footer';
import SocialGithubIcon from 'grommet/components/icons/base/SocialGithub';

import { login } from '../actions/session';
import { navEnable } from '../actions/nav';
import { pageLoaded } from './utils';

class Login extends Component {

  constructor() {
    super();
    this._onSubmit = this._onSubmit.bind(this);
  }

  componentDidMount() {
    pageLoaded('Login');
    this.props.dispatch(navEnable(false));
  }

  componentWillUnmount() {
    this.props.dispatch(navEnable(true));
  }

  _onSubmit(fields) {
    const { dispatch } = this.props;
    dispatch(login(fields.username, fields.password, '/dashboard'));
  }

  render() {
    const { session: { error } } = this.props;

    return (
      <Split flex='left' showOnResponsive='both'>
        <Article colorIndex='dark'>
          <Animate enter={{'animation': 'fade', 'duration': 700, 'delay': 500}}>
            <Section colorIndex='dark' full={true} texture='/img/campus-dark.jpg' pad='large' justify='center'>
              <Animate enter={{'animation': 'slide-down', 'duration': 700, 'delay': 500}}>
                <Card
                heading='Cornell Suite Life'
                description='An Internet of Things Hub.'
                link={<Anchor href='https://github.com/cornell-suitelife'
                              label='Github'
                              icon={<SocialGithubIcon />}/>}/>
              </Animate>
            </Section>
          </Animate>
          <Section colorIndex='light-2'>
            <Animate enter={{'animation': 'fade', 'duration': 700, 'delay': 500}}>
              <Box pad='large' align='center' textAlign='left'>
                <Heading tag='h1' strong={true} margin='none'>
                  Members
                </Heading>
                <List>
                  <ListItem separator='none'>
                    <span><strong>Chase Thomas '19</strong> Information Science</span>
                  </ListItem>
                  <ListItem separator='none'>
                    <span><strong>Daniel Li '19</strong> Computer Science</span>
                  </ListItem>
                  <ListItem separator='none'>
                    <span><strong>Nicholas Sarkis '19</strong> Electrical and Computer Engineering</span>
                  </ListItem>
                  <ListItem separator='none'>
                    <span><strong>Ning Ning Sun '19</strong> Computer Science</span>
                  </ListItem>
                  <ListItem separator='none'>
                    <span><strong>Sebastian Bauco '19</strong> Mechanical Engineering</span>
                  </ListItem>
                </List>
              </Box>
            </Animate>
          </Section>
          <Section colorIndex='dark' full={true} texture='/img/gates.jpg' pad='large' justify='center'/>
          <Footer direction='column' align='start'
            pad='medium' colorIndex='light-2'>
            <Paragraph>&copy; 2017 Cornell Suite Life</Paragraph>
          </Footer>
        </Article>
        <Animate enter={{'animation': 'slide-left', 'duration': 700, 'delay': 0}}>
          <Sidebar justify='between' align='left' pad='medium' size='medium' colorIndex='light-1'>
            <span />
            <Image src='/img/rose-crest.png' size='small' pad={{ horizontal: 'large', vertical: 'none' }}/>
            <LoginForm align='start'
              title='Login'
              onSubmit={this._onSubmit}
              errors={[error]}
              usernameType='text'
              rememberMe={true}/>
            <Footer direction='row' size='small' pad={{ horizontal: 'medium', vertical: 'small' }}>
              <span className='secondary'>&copy; 2017 Cornell Suite Life</span>
            </Footer>
          </Sidebar>
        </Animate>
      </Split>
    );
  }
}

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
  session: PropTypes.shape({
    error: PropTypes.string
  })
};

const select = state => ({
  session: state.session
});

export default connect(select)(Login);
