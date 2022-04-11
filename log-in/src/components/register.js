import { React, AWS, connect } from "./modules.js";
const { AmazonCognitoIdentity, cognito, poolData, userPool } = require("./modules.js");

async function RegisterUser (name, email, password){
    connect.createUser({
        InstanceId: process.env.REACT_APP_INSTANCE_ID,
        PhoneConfig: {
            PhoneType: "SOFT_PHONE"
        },
        RoutingProfileId: process.env.REACT_APP_GENERAL_ROUTING_PROFILE_ID,
        SecurityProfileIds: [
            process.env.REACT_APP_AGENT_ID
        ],
        Username: name,
        IdentityInfo: {
            Email: email,
            FirstName: "Test",
            LastName: "User"
        },
        Password: password
    }, function(err, data) {
        if (err) {
            console.log(err);
        } else {
            console.log("user created", data.UserId);
            let attributeList = [
                new AmazonCognitoIdentity.CognitoUserAttribute({Name:"name",Value:name}),
                new AmazonCognitoIdentity.CognitoUserAttribute({Name:"email",Value:email}),
                new AmazonCognitoIdentity.CognitoUserAttribute({Name:"custom:ConnectId",Value:data.UserId}),
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
                        alert("Successful register");
                    }
                })
            });
        }
    })
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
        event.preventDefault();
        RegisterUser(name, email, password);
        docForm.reset();
    }

    return (
        <form onSubmit={handleSubmit} id="registerForm" className="formClass">
            <label>
                Name:<br/>
            </label>
            <input name="name" type="text" required />
            <br/>
            <label>
                Email:<br/>
            </label>
            <input name="email" type="text" required />
            <br/>
            <label>
                Password:<br/>
            </label>
            <input name="password" type="password" required />
            <br/>
            <input type="submit" value="register"></input>
        </form>
    );
}

export {
    RegisterForm
};