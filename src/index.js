import React, { Component, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { Avatar, Box, Button, grommet, Grommet, Heading, Image, List, Nav, TextInput } from 'grommet';
import { Chat, Github, Help, Menu, Next, Notification, Phone, Plan } from 'grommet-icons';
import Logo from "./logo.png"

/*
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
*/

// Message input field
class InputField extends Component {
  constructor(props) {
    super(props)
    this.state = {
      writeMessage: "",
      responseMessage: "",
      isLoading: true,
      error: "",
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
      [event.target.name]: event.target.value,
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
          responseMessage: result.ok,
        });
      },
        (error) => {
          this.setState({
            isLoading: true,
            error: error,
          });
        })
      .catch(err => {
        console.log('err', err);
        this.setState({
          isLoading: true,
          error: err,
        })
      });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <Box direction='row' pad='15' margin='small' gap='small'>
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
        </Box>
      </form>
    );
  }
}

const Input = () => (
  <Box border='top'>
    <InputField />
  </Box>
)

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
    return (
      <Box pad='small'>
        <List
          data={this.state.users.slice()}
        />
      </Box>
    )
  }
}

const RightSidebar = () => (
  <Box width='small' align='center' justify='start'>
    <Heading level='3' color='#8abaa0'>users</Heading>
    <UsersSidebar />
  </Box>
)


  // Fetching messages from the API periodically - every 5 seconds
function MessagesUpdater() {
  const [posts, setPosts] = useState([])
  const getPosts = async () => {
    fetch('https://608947d48c8043001757e674.mockapi.io/messages')
      .then(res => res.json())
      .then(json => {
        setPosts(json.messages)
      }).catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getPosts()
    const interval = setInterval(() => {
      getPosts()
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <Box pad='small' align='stretch' height='medium' alignContent='stretch'>
      <ul>
        {posts.map(post => (
          <li key={post.user}>
            USER: {post.user} | MESSAGE: {post.text}
          </li>
        ))}
      </ul>
    </Box>
  );
}

// Messages field
const RecentMessages = () => (
  <Box direction='column'  align='center' justify='start' background='light-3' border='vertical'>
    <Box>
      <Heading level='3' color='#8abaa0'> recent messages </Heading>
    </Box>
    <MessagesUpdater />
    <Box align='end' alignSelf='end' pad='small'>
        <Heading level='6'>messages update every 5s </Heading>
      </Box>
  </Box>
)

// AppBar is the header
const AppBar = (props) => (
  <Box
    tag='header'
    direction='row'
    align='center'
    justify='between'
    background="linear-gradient(102.77deg, #8aafba -9.18%, #8abaa0 209.09%)"
    pad={{ left: 'medium', right: 'small', vertical: 'small' }}
    {...props}
  >
    <Image src={Logo} alt='a cool chat logo' />
    <Button icon={<Menu color='white' />} hoverIndicator />
  </Box>
);

const LeftSidebar = () => (
  <Box direction='column' pad='small' gap='small'>
    <Box>
      <Avatar src="//s.gravatar.com/avatar/b7fb138d53ba0f573212ccce38a7c43b?s=80" />
    </Box>
    <Box border={{ color: '#8abaa0', side: 'horizontal' }}>
      <Nav gap="small">
        <Button icon={<Notification />} hoverIndicator />
        <Button icon={<Chat />} hoverIndicator />
        <Button icon={<Phone />} hoverIndicator />
        <Button icon={<Plan />} hoverIndicator />
        <a href='https://github.com/agzpie/cool_chat'>
          <Button icon={<Github />} hoverIndicator />
        </a>
        <Button icon={<Help />} hoverIndicator />
      </Nav>
    </Box>
  </Box>
)

class App extends React.Component {

  render() {
    return (
      <Grommet theme={grommet} full>
        <AppBar />
        <Box direction='row' basis='auto' fill='true' justify='stretch' >
          <LeftSidebar />
          <Box direction='column' fill='true'>
            <RecentMessages />
            <Input />
          </Box>
          <Box fill='vertical'>
            <RightSidebar />
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
