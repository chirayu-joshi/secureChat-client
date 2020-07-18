import React from 'react';

import Login from '../../containers/Login/Login';
import SignUp from '../../containers/SignUp/SignUp';
import Users from '../../containers/Users/Users';
import Chat from '../../containers/Chat/Chat';

const result = props => {
  switch(props.command.split(' ')[0]) {
    case 'login':
      return <Login {...props} />;
    case 'signup':
      return <SignUp {...props} />;
    case 'users':
      return <Users />;
    case 'chat':
      return <Chat {...props} />;
    default:
      return <p>Invalid command</p>;
  }
}

export default result;
