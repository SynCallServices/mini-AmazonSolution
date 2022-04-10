import { useState } from "react";
import { React, AWS } from "./modules.js";
const { AmazonCognitoIdentity, cognito, poolData, userPool } = require("./modules.js");

function LoginUser(user, password) {
    var authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails({
        Username : user,
        Password : password,
    });

    console.log(authenticationDetails);

    var userData = {
        Username : user,
        Pool : userPool
    };
    var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
    cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: function (result) {
            console.log("entered success");
            alert("Successful login");
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

function LoginForm () {
    function handleSubmit (event) {
    alert("Credentials entered");
    console.log(document.forms[0]);
    let { name, password } = document.forms[0];
    name = name.value;
    password = password.value;
    event.preventDefault();
    LoginUser(name, password);
    document.getElementById("loginForm").reset();
    }

    return (
        <form onSubmit={handleSubmit} id="loginForm" className="formClass">
            <label>
                Name:<br/>
            </label>
            <input name="name" type="text" required />
            <br/>
            <label>
                Password:<br/>
            </label>
            <input name="password" type="password" required />
            <br/>
            <input type="submit" value="login"></input>
        </form>
    )
}

export {
    LoginForm
};