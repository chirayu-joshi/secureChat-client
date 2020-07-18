import React, { Component, Fragment } from 'react';
import axios from 'axios';

import PromptInput from '../../components/PromptInput/PromptInput';

class Chat extends Component {
  state = {
    resp: '',
    chats: [],
    message: '',
    isChatting: true
  }

  chatInputChangeHandler = e => {
    const message = e.target.value;
    this.setState({ message: message });
  }

  enterKeyPressedHandler = () => {
    if (this.state.message === 'exit') {
      clearInterval(this.syncChat);
      this.setState({ isChatting: false });
      return;
    }
    // First post the message to store into database.
    axios
      .post('http://localhost:8080/secure-chat-java/chat', {
        senderId: this.props.uid,
        receiverId: this.props.command.split(' ')[1],
        message: this.state.message
      })
      .then(res => {
        // Then get all to messages from chats table.
        // We could also get only last message, but it won't include message id.
        axios
          .get('http://localhost:8080/secure-chat-java/chat', {
            params: {
              senderId: this.props.uid,
              receiverId: this.props.command.split(' ')[1]
            }
          })
          .then(resp => {
            const receiverMessages = this.state.chats.filter(chat => chat.senderId !== this.props.uid);
            const chats = [...resp.data, ...receiverMessages];
            chats.sort((chat1, chat2) => chat1.id > chat2.id ? 1 : -1);
            this.setState({ chats: chats, message: '' });
          })
          .catch(error => {
            console.log(error);
          });
      })
      .catch(err => {
        console.log(err);
      });
  }

  componentDidMount() {
    // First fetch messages of sender.
    axios
      .get('http://localhost:8080/secure-chat-java/chat', {
        params: {
          senderId: this.props.uid,
          receiverId: this.props.command.split(' ')[1]
        }
      })
      .then(senderRes => {
        // Then fetch messages of receiver.
        axios
          .get('http://localhost:8080/secure-chat-java/chat', {
            params: {
              senderId: this.props.command.split(' ')[1],
              receiverId: this.props.uid
            }
          })
          .then(receiverRes => {
            const chats = [...senderRes.data, ...receiverRes.data];
            chats.sort((chat1, chat2) => chat1.id > chat2.id ? 1 : -1);
            this.setState({ chats: chats });
          })
          .catch(err => {
            this.setState({ resp: 'Something went wrong' });
          });
      })
      .catch(err => {
        this.setState({ resp: 'Something went wrong' });
      });

    // Check if new chat arrives from receiver
    this.syncChat = setInterval(() => {
      axios
        .get('http://localhost:8080/secure-chat-java/chat', {
          params: {
            senderId: this.props.command.split(' ')[1],
            receiverId: this.props.uid
          }
        })
        .then(res => {
          console.log(res.data);
          const receiverMessages = this.state.chats.filter(chat => chat.senderId !== this.props.uid);
          if (res.data.length !== receiverMessages.length) {
            // New message has arrived
            const senderMessages = this.state.chats.filter(chat => chat.senderId === this.props.uid);
            const chats = [...senderMessages, ...res.data];
            chats.sort((chat1, chat2) => chat1.id > chat2.id ? 1 : -1);
            this.setState({ chats: chats });
          }
        })
        .catch(err => {
          console.log(err);
        });
    }, 3000);
  }

  render() {
    if (this.props.uid === -1) {
      return <p>Please Login</p>
    }
    let chats = null;
    if (this.state.chats !== []) {
      chats = this.state.chats.map(chat => {
        if (chat.senderId === this.props.uid) {
          return (
            <div className="chatMessageLeft" key={chat.id}>
              <div>{'>>>'}</div>
              <p>{chat.message}</p>
            </div>
          );
        } else {
          return (
            <div className="chatMessageRight" key={chat.id}>
              <p>{chat.message}</p>
              <div>{'<<<'}</div>
            </div>
          );
        }
      });
    }

    return (
      <Fragment>
        <p>Fetching chats...</p>
        <p>{this.state.resp}</p>
        <div className="chatbox">
          {chats}
          <div className="chatMessageLeft">
            {this.state.isChatting 
            ? <Fragment>
                <div>{'>>>'}</div>
                <PromptInput 
                  className="chatPrompt" 
                  onUserPromptInputChange={this.chatInputChangeHandler}
                  onEnterPressed={this.enterKeyPressedHandler}
                  command={this.state.message}
                />
              </Fragment>
            : null}
          </div>
        </div>
      </Fragment>
    );
  }
}

export default Chat;
