import React, { Component, useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Avatar, Box, Button, Form, Formfield, Grid, grommet, Grommet, Heading, Nav, Sidebar, TextArea, TextInput } from 'grommet';
import { Chat, Help, Next, Notification, StatusInfoSmall } from 'grommet-icons';
import { render } from '@testing-library/react';

/*
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
*/

// MESSAGE 
class InputField extends Component {
  constructor(props) {
    super(props)
    this.state = {
      writeMessage: "",
      responseMessage: "",
      isLoading: true,
      error: ""
    }
  }

  handleSubmit = (event) => {
    event.preventDefault()
    const data = this.state
    console.log(data)
    this.postData()
  }

  handleInputChange = (event) => {
    event.preventDefault()
    console.log(event.target.name)
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  postData() {
    var payload = JSON.stringify({
      user: 'MyUser', // ToDo: should be set by server, not in frontend
      text: this.state.writeMessage  // ToDo
    });
    fetch('https://608947d48c8043001757e674.mockapi.io/message', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: payload
    })
      .then(response => response.json())
      .then(result => {
        this.setState({
          isLoading: false,
          responseMessage: result.ok
        });
      },
        (error) => {
          this.setState({
            isLoading: true,
            error: error
          });
        })
      .catch(err => {
        console.log('err', err);
        this.setState({
          isLoading: true,
          error: err
        })
      });
  }

  render() {
    return (

      <form onSubmit={this.handleSubmit}>
        <Grid columns={['3/4', '1/4']} pad='small' border='top' fill='horizontal' flex-direction='row' style={{ zIndex: '1' }}>
        <TextInput
          id="text-input"
          name='writeMessage'
          background='white'
          value={this.state.value}
          onChange={this.handleInputChange}
          resize={false}
          placeholder="write message..."
        />
        <Button icon={<Next />} hoverIndicator type='submit' onClick={this.handleSubmit} />
        </Grid>
      </form>
    )
  }
}

class UsersSidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      areUsersLoaded: false,
    }
  }

  // API
  componentDidMount() {
    fetch('https://608947d48c8043001757e674.mockapi.io/users')
      .then(res => res.json())
      .then(json => {
        this.setState({
          users: json.users,
          areUsersLoaded: true,
        })
      }).catch((err) => {
        console.log(err);
      });
  }

  render() {
    return( 
      <Box>      
      <ul>
      {this.state.users.map(user => (
        <li>
          USER: {user}
        </li>
      ))}
    </ul>
    </Box> 
      
    )
  }
}

class MessagesField extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      isLoaded: false,
    }
  }

  // API
  componentDidMount() {
    fetch('https://608947d48c8043001757e674.mockapi.io/messages')
      .then(res => res.json())
      .then(json => {
        this.setState({
          items: json.messages,
          isLoaded: true,
        })
      }).catch((err) => {
        console.log(err);
      });
  }

  render() {
    return(        
      <ul>
      {this.state.items.map(item => (
        <li key={item.timestamp}>
          USER: {item.user} | MESSAGE: {item.text}
        </li>
      ))}
    </ul>
      
    )
  }
}


const AppBar = (props) => (
  <Box
    tag='header'
    direction='row'
    align='center'
    justify='between'
    background='#8abaa0'
    pad={{ left: 'medium', right: 'small', vertical: 'small' }}
    elevation='small'
    style={{ zIndex: '1' }}
    {...props}
  />
);

class App extends React.Component {
/*
  Messages = (isLoaded) => {
    if (!isLoaded) {
      return <div> Loading... </div>
    } else {
      return (
        <div> Data has been loaded </div>
      );
    }
  }*/

  render() {
   // var { isLoaded, items, users } = this.state;

    return (
      <Grommet theme={grommet} full>
        <Box fill>
          <AppBar>
            <Heading level='2' size='medium' margin='none'>a cool chat</Heading>
            <Button
              icon={<Notification />}
              onClick={() =>
                this.setState({
                  showSidebar: !this.showSidebar,
                })}
            />
          </AppBar>
          <Box direction='row' border='all' flex overflow={{ horizontal: 'auto' }}>
            <Sidebar level='1' border='right' background="white" round="none"
              header={
                <Avatar src="//s.gravatar.com/avatar/b7fb138d53ba0f573212ccce38a7c43b?s=80" />
              }
              footer={
                <Button icon={<Help />} hoverIndicator />
              }
            >
              <Box border={{ color: '#8abaa0', side: 'horizontal' }}>
                <Nav gap="small">
                  <Button icon={<StatusInfoSmall />} hoverIndicator />
                  <Button icon={<Chat />} hoverIndicator />
                  <Button icon={<Help />} hoverIndicator />
                </Nav>
              </Box>
            </Sidebar>

            <Box direction='column' flex align='center' fill='vertical' justify='start' background='light-3'>
              <Box height='large'><h3> recent messages </h3></Box>

                <MessagesField/>
            
              App Body
              <Box height='15%' fill='horizontal' direction='row' align='stretch' justify='between' background='light-1'>
                  <InputField/>
              </Box>

            </Box>

            <Box
              border='left'
              width='small'
              align='center'
              justify='start'
            >
              <UsersSidebar /> 
            </Box>
          </Box>
        </Box>
      </Grommet>
    );
  }
};

// ========================================

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
