import logo from './logo.svg';
import './App.css';
import React from "react";
import AWS from "aws-sdk";

const AmazonCognitoIdentity = require("amazon-cognito-identity-js");

AWS.config.update({
    apiVersion: "latest",
    region: process.env.REACT_APP_REGION,
    accessKeyId: process.env.REACT_APP_ACCESS_KEY_ID,
    secretAccessKey: process.env.REACT_APP_SECRET_ACCESS_KEY
});

const cognito = new AWS.CognitoIdentityServiceProvider({
  region: process.env.REACT_APP_REGION
});

const CognitoUserPool = AmazonCognitoIdentity.CognitoUserPool;

const poolData = {
  UserPoolId: process.env.REACT_APP_USER_POOL_ID,
  ClientId: process.env.REACT_APP_CLIENT_ID
}

const poolRegion = process.env.REACT_APP_REGION;

const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

function RegisterUser(name, email, password){
  let attributeList = [];
  attributeList.push(new AmazonCognitoIdentity.CognitoUserAttribute({Name:"name",Value:name}));
  attributeList.push(new AmazonCognitoIdentity.CognitoUserAttribute({Name:"email",Value:email}));

  userPool.signUp(name, password, attributeList, null, function(err, result){
      if (err) {
          console.log(err);
          return;
      }
      cognito.adminSetUserPassword({
        UserPoolId: process.env.REACT_APP_USER_POOL_ID,
        Username: name,
        Password: password,
        Permanent: true
       }, function(err) {
        if (err) {
          console.log(err);
        } else {
          console.log("success!!");
        }
      })
  });
}

// RegisterUser()

function LoginUser(user, password) {
  var authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails({
      Username : user,
      Password : password,
  });

  console.log(authenticationDetails)

  var userData = {
      Username : user,
      Pool : userPool
  };
  var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
  cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess: function (result) {
          console.log("entered success");
      },
      onFailure: function(err) {
          console.log(err);
      },
      mfaRequired: function() {
        console.log("code required");
      },
      newPasswordRequired: function() {
        console.log("password required");
        cognito.adminSetUserPassword({
          UserPoolId: process.env.REACT_APP_USER_POOL_ID,
          Username: user,
          Password: password,
          Permanent: true
         }, function(err) {
          if (err) {
            console.log(err);
          } else {
            console.log("success!!");
          }
        })
      }
  });
}

// Login();

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: ""};
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
    LoginUser(name, password);
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

class RegisterForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: ""};
  }

  handleChange(event) {
    console.log(event);
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    alert("Credentials entered");
    console.log(document.forms[0]);
    let { name, email, password } = document.forms[1];
    name = name.value;
    email = email.value;
    password = password.value;
    console.log(name, email, password);
    event.preventDefault();
    RegisterUser(name, email, password);
    document.getElementById("registerForm").reset();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit} id="registerForm">
        <label>
          Name:<br/>
          <input name="name" type="text" required />
        </label>
        <br/>
        <label>
          Email:<br/>
          <input name="email" type="text" required />
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
      <LoginForm />
      <RegisterForm />
    </div>
  );
}

export default App;
