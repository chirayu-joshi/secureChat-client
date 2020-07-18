import React, { Component, Fragment } from 'react';

import UserPrompt from '../components/UserPrompt/UserPrompt';
import Result from '../components/Result/Result';

class App extends Component {

  state = {
    firstname: 'guest',
    lastname: '',
    uid: -1,
    email: '',
    command: '',
    promptHierarchy: [],
    result: '',
    logs: [],
    isAuthenticated: false
  }

  inputChangeHandler = e => {
    const value = e.target.value;
    this.setState({ [e.target.name]: value });
  }

  loginHandler = (firstname, lastname, uid) => {
    if (!this.state.isAuthenticated) {
      this.setState({ 
        isAuthenticated: true, 
        firstname: firstname, 
        lastname: lastname,
        uid: uid
      });
    }
  }

  enterPressedHandler = () => {
    const firstname = this.state.firstname;
    const lastname = this.state.lastname;
    const command = this.state.command;
    const uid = this.state.uid;

    let newLog = () => (
      <Fragment>
        <UserPrompt 
          firstname={firstname}
          lastname={lastname} 
          command={command}
          type="log"
        />
        {command !== '' 
          ? <Result 
              command={command} 
              onLogin={this.loginHandler}
              uid={uid}
            /> 
          : null
        }
      </Fragment>
    );
    this.setState(prevState => ({
      logs: [...prevState.logs, newLog],
      command: ''
    }));
  }

  componentDidUpdate() {
    this.logsEnd.scrollIntoView({ behavior: 'smooth' });
  }

  render () {
    let logs = null;
    if (this.state.logs !== []) {
      logs = this.state.logs.map((Log, index) => (
        <Log key={index} />
      ));
    }

    return (
      <div className="App">
        {logs}
        {this.state.waitingForInput ? null : 
          <UserPrompt 
            firstname={this.state.firstname} 
            lastname={this.state.lastname} 
            command={this.state.command}
            onUserPromptInputChange={this.inputChangeHandler}
            onEnterPressed={this.enterPressedHandler}
          />
        }
        <div ref={e1 => this.logsEnd = e1}></div>
      </div>
    );
  }
}

export default App;
