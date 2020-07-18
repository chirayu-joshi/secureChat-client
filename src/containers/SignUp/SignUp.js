import React, { Component, Fragment } from 'react';
import axios from 'axios';

class SignUp extends Component {
  state = {
    resp: ''
  }

  componentDidMount() {
    axios
      .post('http://localhost:8080/secure-chat-java/signup', {
        firstname: this.props.command.split(' ')[1],
        lastname: this.props.command.split(' ')[2],
        email: this.props.command.split(' ')[3],
        password: this.props.command.split(' ')[4]
      })
      .then(res => {
        if (res.data.userCreated) {
          this.setState({ resp: 'User Created' });
        } else {
          this.setState({ resp: 'Invalid Inputs' });
        }
      }).catch(err => {
        console.log(err);
        this.setState({ resp: 'Something went wrong' });
      });
  }

  render() {
    return (
      <Fragment>
        <p>Creating your account...</p>
        <p>{this.state.resp}</p>
      </Fragment>
    );
  }
}

export default SignUp;
