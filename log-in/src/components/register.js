import { React, AWS } from "./modules.js";
const { AmazonCognitoIdentity, cognito, poolData, userPool } = require("./modules.js");

function RegisterUser (name, email, password){
    let attributeList = [
        new AmazonCognitoIdentity.CognitoUserAttribute({Name:"name",Value:name}),
        new AmazonCognitoIdentity.CognitoUserAttribute({Name:"email",Value:email})
    ];

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

function RegisterForm () {
    function handleSubmit (event) {
        alert("Credentials entered");
        console.log(document.forms[0]);
        const docForm = document.getElementById("registerForm");
        let { name, email, password } = docForm;
        name = name.value;
        email = email.value;
        password = password.value;
        console.log(name, email, password);
        event.preventDefault();
        RegisterUser(name, email, password);
        docForm.reset();
    }

    return (
        <form onSubmit={handleSubmit} id="registerForm">
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
            <input type="submit"></input>
        </form>
    );
}

export {
    RegisterForm
};