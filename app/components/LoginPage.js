// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import routes from '../constants/routes';
import './loginPage.css';

type Props = {
  users: array,
  loggingIn: () => void,
};

export default class LoginPage extends Component<Props> {
  props: Props;
  state = {
    username: '',
    password: ''
  }

  onUsernameChange = (e) => {
    this.setState({
      username: e.target.value
    })
  }

  onPasswordChange = (e) => {
    this.setState({
      password: e.target.value
    })
  }

  onLoginSubmit = () => {
    const { username, password } = this.state;
    const { users, loggingIn } = this.props;
    let findUser = users.find(u => u.username === username);
    if(findUser) {
      let rightPassword
      if(findUser && findUser[0]) {
        rightPassword = findUser.find(f => f.password === password);
        if(!rightPassword) {
          document.getElementById("login-error").innerHTML = "Password Salah";
        } else {
          loggingIn(rightPassword[0])
        }
      } else {
        if(findUser.password !== password) {
          document.getElementById("login-error").innerHTML = "Password Salah";
        } else {
          loggingIn(findUser)
        }
      }
      if(!rightPassword || !rightPassword[0]) {
        document.getElementById("login-error").innerHTML = "Password Salah";
      }
    } else {
      document.getElementById("login-error").innerHTML = "Username/ Password Salah";
    }
  }

  render() {
    const { username, password } = this.state;

    return (
      <div className="login-container" data-tid="container">
        <div className="bodywrapper">
          <table>
              <tbody>
                  <tr>
                      <td>Username</td><td>:</td><td><input type="text" value={username} onChange={this.onUsernameChange} /></td>
                  </tr>
                  <tr>
                      <td>Password</td><td>:</td><td><input type="password" value={password} onChange={this.onPasswordChange} /></td>
                  </tr>
                  <tr>
                      <td colSpan="2"></td>
                      <td>
                        <div className="login-button" onClick={this.onLoginSubmit}>Login</div>
                        <div><span id="login-error"></span></div>
                      </td>
                  </tr>
              </tbody>
          </table>
        </div>
      </div>
    );
  }
}
