import React, { Component, useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Avatar, Box, Button, Form, Formfield, Grid, grommet, Grommet, Heading, Nav, Sidebar, TextArea, TextInput } from 'grommet';
import { Chat, Help, Next, Notification, StatusInfoSmall } from 'grommet-icons';
import { render } from '@testing-library/react';
import axios from 'axios'

/*
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
*/

// API

/*
const url = 'https://608947d48c8043001757e674.mockapi.io/messages';
const options = {
  method: 'POST',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json;charset=UTF-8'
  },
  body: JSON.stringify({
    a: 10,
    b: 20
  })
};

fetch(url, options)
  .then(response => {
    console.log(response.status);
  });

*/

// FETCH MESSAGES

// class GetMessagesFromAPI extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       items: [],
//       isLoaded: false,
//     }
//   }

//   componentDidMount() {
//     fetch('https://608947d48c8043001757e674.mockapi.io/messages')
//       .then(res => res.json())
//       .then(json => {
//         this.setState({
//           isLoaded: true,
//           items: json["messages"], // json.messages
//         })
//       });
//   }
// }



// MESSAGE 

class InputField extends Component {
  constructor(props) {
    super(props)
    this.state = {
      writeMessage: ""
    }
  }

  handleSubmit = (event) => {
    event.preventDefault()
    const data = this.state
    console.log(data)
  }

  handleInputChange = (event) => {
    event.preventDefault()
    console.log(event.target.name)
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  postData() {
    try {
      let result = fetch('https://608947d48c8043001757e674.mockapi.io/message', {
        method: 'post',
        mode: 'no-cors',
        headers: {
          'Accept': 'application/json',
          'Content-type': 'application/json',
        },
        body: JSON.stringify({
          key1: 'user',
          value: 'text'
        })
      });

      console.log('Result: ' + result)

    } catch (e) {
      console.log(e)
    }
  }

  render() {
    const { writeMessage } = this.state
    return (
      <form onSubmit={this.handleSubmit}>
        <TextInput
          id="text-input"
          name='writeMessage'
          background='white'
          value={this.state.value}
          onChange={this.handleInputChange}
          resize={false}
          icon={<Next />} reverse
          placeholder="write message..."
        />

        <button type='submit' onClick={this.handleSubmit}>
          send
        </button>

        <button onClick={() => this.postData()}>
          PRESS ME
        </button>

      </form>
    )
  }
}


class PostForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      user: '',
      message: '',
      timestamp: ''
    }
  }

  changeHandler = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  submitHandler = e => {
    e.preventDefault()
    console.log(this.state)
    axios
      .post('https://608947d48c8043001757e674.mockapi.io/message', this.state)
      .then(response => {
        console.log(response)
      })
      .catch(error => {
        console.log(error)
      })
  }

  render() {
    const { user, message, timestamp } = this.state
    return (
      <div>
        <form onSubmit={this.submitHandler}>
          <input type='text' name='user' value={user} onChange={this.changeHandler} />
        </form>
      </div>
    );
  }

}


/*
const SidebarHeader = () => (
  <Avatar
    align="center"
    justify="evenly"
    border={{ size: 'small', color: '#8abaa0' }}
    background="white"
    flex={false}
  >
    SY
  </Avatar>
);

const SidebarFooter = () => (
  <Nav gap="small">
    <Button icon={<Chat />} />
    <Button icon={<Help />} />
  </Nav>
);

const MainNavigation = () => (
  <Nav gap="small">
    <Button icon={<StatusInfoSmall />} />
    <Box pad="small" border={{ color: '#8abaa0', side: 'top' }} />
    <Box gap="small" pad={{ vertical: 'medium' }}>
      <Button icon={<Chat />} />
      <Button icon={<Help />} />
    </Box>
  </Nav>
);

export const SidebarIcons = () => (
  <Grommet theme={grommet} full>
    <Box direction="row" height={{ min: '100%' }}>
      <Sidebar
        background="accent-1"
        header={<SidebarHeader />}
        footer={<SidebarFooter />}
      >
        <MainNavigation />
      </Sidebar>
    </Box>
  </Grommet>
);

*/

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
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      isLoaded: false,
      showSidebar: true,
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

  /*
  // SHOW MESSAGES
  method Messages(props) {
    if ( !isLoaded ) {
      return <div> Loading... </div>
    } else {
        return (
          <div> Data has been loaded </div>
        );
      }
  }
  */

  Messages = (isLoaded) => {
    if (!isLoaded) {
      return <div> Loading... </div>
    } else {
      return (
        <div> Data has been loaded </div>
      );
    }
  }

  render() {

    var { isLoaded, items } = this.state;

    if (!isLoaded) {
      <div> Loading... </div>
    }

//    if (items != null) {
      <ul>
        {items.map(item => (
          <li key={item.timestamp}>
            USER: {item.user} | MESSAGE: {item.text}
          </li>
        ))};
      </ul>
//    }
    // else {
    //   <ul>      
    //     <li>
    //       Loading...
    //     </li>
    // </ul>
    // }



    // ToDo: put this in a method
    //       parse data from response
    //       present data as user messages on the site
    // HTTP REQUEST USING fetch()

    let myHeaders = new Headers();
    myHeaders.append("Accept", "application/json");

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    fetch("https://608947d48c8043001757e674.mockapi.io/messages", requestOptions)
      .then(response => response.json())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
    // END


    return (
      <Grommet theme={grommet} full>
        <Box fill>
          <AppBar>
            <Heading level='3' size='medium' margin='none'>cool chat</Heading>
            <Button
              icon={<Notification />}
              onClick={() =>
                this.setState({
                  showSidebar: !this.showSidebar,

                  //this.setShowSidebar(!this.showSidebar);
                })}
            />
          </AppBar>
          <Box direction='row' flex overflow={{ horizontal: 'auto' }}>
            <Sidebar background="white" round="none"
              header={
                <Avatar src="//s.gravatar.com/avatar/b7fb138d53ba0f573212ccce38a7c43b?s=80" />
              }
              footer={
                <Button icon={<Help />} hoverIndicator />
              }
            >
              <Box border={{ color: '#8abaa0', side: 'horizontal' }}>
                <Nav gap="small">
                  <Button icon={<StatusInfoSmall />} />
                  <Button icon={<Chat />} />
                  <Button icon={<Help />} />
                </Nav>
              </Box>
            </Sidebar>


            <Box direction='column' flex align='center' fill='vertical' justify='start' background='light-2'>
              <Box height='large'> yo </Box>
              <PostForm />



               USER111: {items.user} | MESSAGE: {items.text}


              App Body
              <Box height='15%' fill='horizontal' direction='row' align='stretch' justify='between' background='light-1'>
                <Grid pad='small' border='top' fill='horizontal'>
                  <InputField></InputField>

                </Grid>
              </Box>

            </Box>

            <Box
              width='small'
              align='center'
              justify='center'
            >
              sidebar
              </Box>



          </Box>
        </Box>
      </Grommet>
    );
  }
};



//export default App;

// ---------------------------
/*
function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(9).fill(null),
      xIsNext: true,
    };
  }

  handleClick(i) {
    const squares = this.state.squares.slice();
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      squares: squares,
      xIsNext: !this.state.xIsNext,
    });
  }

  renderSquare(i) {
    return (
      <Square
        value={this.state.squares[i]}
        onClick={() => this.handleClick(i)}
      />
    );
  }

  render() {
    const status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');

    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
        </div>
      </div>
    );
  }
}


*/

// ========================================


ReactDOM.render(
  <App />,
  document.getElementById('root')
);
