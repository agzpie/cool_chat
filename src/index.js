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
/*
const InputMessage = props => {
  //state = { text: '' }
  const [state, setState] = useState({
    value: '',
  });

  const onChange = event => {
    const {
      target: { value },
    } = event;
  }

  const escapedText = value.replace(/[-\\^$*+?.()|[\]{}]/g, '\\$&');
  const exp = new RegExp(escapedText, 'i');    

    return (
      <Form 
        onSubmit={({ value: nextValue }) => {
        console.log(nextValue);
        setState({ value: ''})
        }}
      >
      
      
      
       
        <TextInput
          id="text-input"
          background='white'
          value={this.state.value}
          onChange={onChange}
          //value={text}
          //onChange={event => this.setState({ text: event.target.value })}
          resize={false}
          icon={<Next />} reverse 
          placeholder="write message..."
        />

      </Form>
      
    );
  } 
}; */

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

  render() {
    const {writeMessage} = this.state
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
        <button>send</button>
      </form>
    )
  }


}

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
      showSidebar: true,
      //setShowSidebar: true,
    }
  }


  render() {
    //const [showSidebar, setShowSidebar] = useState(false);
    
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
              <Box border={{ color:  '#8abaa0', side: 'horizontal' }}>
                <Nav gap="small">
                  <Button icon={<StatusInfoSmall />} />
                    <Button icon={<Chat />} />
                    <Button icon={<Help />} />
                </Nav>
              </Box>
            </Sidebar>
            
            
            <Box direction='column' flex align='center' fill='vertical' justify='start' background='light-2'>
              <Box height='large'> yo </Box>
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
