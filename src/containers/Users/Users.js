import React, { Component, Fragment } from 'react';
import axios from 'axios';

class Users extends Component {
  state = {
    resp: '',
    users: []
  }

  componentDidMount() {
    axios
      .get('http://localhost:8080/secure-chat-java/users')
      .then(res => {
        this.setState({ users: res.data });
      }).catch(err => {
        console.log(err);
        this.setState({ resp: 'Something went wrong.' });
      });
  }

  render() {
    let users = null;
    if (this.state.users !== []) {
      users = 
        <div>
          <br />
          <p>{this.state.users.length} users found:</p>
          {this.state.users.map(user => <p key={user.id}>{user.firstName + '-' + user.lastName + ' ' + user.id}</p>)}
        </div>;
    }

    return(
      <Fragment>
        <p>Fetching users...</p>
        {users}
        {this.state.resp}
      </Fragment>
    );
  }
}

export default Users;
