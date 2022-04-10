import '../assets/styles/App.css';
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

const poolData = {
    UserPoolId: process.env.REACT_APP_USER_POOL_ID,
    ClientId: process.env.REACT_APP_CLIENT_ID
}

const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

export {
    React,
    AWS,
    AmazonCognitoIdentity,
    cognito,
    poolData,
    userPool
};