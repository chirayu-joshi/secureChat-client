import React, { Component, Fragment } from 'react';
import axios from 'axios';

class Login extends Component {
  state = {
    resp: ''
  }

  componentDidMount() {
    axios
      .post('http://localhost:8080/secure-chat-java/login', {
        email: this.props.command.split(' ')[1],
        password: this.props.command.split(' ')[2]
      })
      .then(res => {
        if (res.data.userExist) {
          this.props.onLogin(res.data.firstname, res.data.lastname, res.data.uid);
          this.setState({ resp: 'Login successful' });
        } else {
          this.setState({ resp: 'Invalid username or password' });
        }
      }).catch(err => {
        console.log(err);
        this.setState({ resp: 'Something went wrong.' });
      });
  }

  render () {
    return (
      <Fragment>
        <p>Authenticating...</p>
        <p>{this.state.resp}</p>
      </Fragment>
    );
  }
}

export default Login;
