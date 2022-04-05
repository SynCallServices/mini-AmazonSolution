import logo from './logo.svg';
import './App.css';
import React from "react";
import AWS from "aws-sdk";
import fs from "fs";

import 'cross-fetch/polyfill';
import AmazonCognitoIdentity from 'amazon-cognito-identity-js';

require("dotenv").config();

AWS.config.update({ region: "us-east-1"});
AWS.config.update("./config.json");

// AWS.config.credentials = new AWS.CognitoIdentityCredentials({
//   IdentityPoolId: "",
//   Logins: {
//     "www.amazon.com": "AMAZONTOKEN"
//   }
// })

var params = {
  InstanceId: "",
  Origin: ""
};

// AWS.config.getCredentials(function(err) {
//   console.log("Loading credentials...")
//   if (err) console.log(err.stack);
//   // credentials not loaded
//   else {
//     console.log("Access key:", AWS.config.credentials.accessKeyId);
//   }
// });

const connect = new AWS.Connect({apiVersion: '2017-08-08'});
connect.associateApprovedOrigin(params, function (err, data) {
  if (err) {
    console.log(err);
  } else {
    console.log(data);
  }
})

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: ""};

    // this.handleChange = this.handleChange.bind(this);
    // this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    console.log(event);
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    alert("Credentials entered");
    console.log(document.forms[0]);
    let { name, password } = document.forms[0];
    name = name.value;
    password = password.value;
    console.log(name, password);
    event.preventDefault();
    document.getElementById("loginForm").reset();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit} id="loginForm">
        <label>
          Name:<br/>
          <input name="name" type="text" required />
        </label>
        <br/>
        <label>
          Password:<br/>
          <input name="password" type="password" required />
        </label>
        <br/>
        <input type={"submit"}></input>
      </form>
    )
  }
}

function App() {
  return (
    <div className="App">
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Hello React World!
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
      <LoginForm />
    </div>
  );
}

export default App;
