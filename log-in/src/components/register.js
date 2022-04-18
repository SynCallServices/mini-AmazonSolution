import { React, AWS, connect } from "./modules.js";
const { AmazonCognitoIdentity, cognito, poolData, userPool } = require("./modules.js");

async function RegisterUser (userName, firstName, lastName, email, password){
    connect.createUser({
        InstanceId: process.env.REACT_APP_INSTANCE_ID,
        PhoneConfig: {
            PhoneType: "SOFT_PHONE"
        },
        RoutingProfileId: process.env.REACT_APP_GENERAL_ROUTING_PROFILE_ID,
        SecurityProfileIds: [
            process.env.REACT_APP_AGENT_ID
        ],
        Username: userName,
        IdentityInfo: {
            Email: email,
            FirstName: firstName,
            LastName: lastName
        },
        Password: password
    }, function(err, data) {
        if (err) {
            console.log(err);
        } else {
            alert("User created");
            let attributeList = [
                new AmazonCognitoIdentity.CognitoUserAttribute({Name:"name",Value:userName}),
                new AmazonCognitoIdentity.CognitoUserAttribute({Name:"email",Value:email}),
                new AmazonCognitoIdentity.CognitoUserAttribute({Name:"custom:ConnectId",Value:data.UserId}),
            ];

            userPool.signUp(userName, password, attributeList, null, function(err, result){
                if (err) {
                    console.log(err);
                    return;
                }

                cognito.adminSetUserPassword({
                    UserPoolId: process.env.REACT_APP_USER_POOL_ID,
                    Username: userName,
                    Password: password,
                    Permanent: true
                }, function(err) {
                    if (err) {
                        console.log(err);
                    } else {
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
        const docForm = document.getElementById("registerForm");
        let { userName, firstName, lastName, email, password } = docForm;
        userName = userName.value;
        firstName = firstName.value;
        lastName= lastName.value;
        email = email.value;
        password = password.value;
        event.preventDefault();
        RegisterUser(userName, firstName, lastName, email, password);
        docForm.reset();
    }

    return (
        <form onSubmit={handleSubmit} id="registerForm" className="formClass">
            <label>
                Username:<br/>
            </label>
            <input name="userName" type="text" required />
            <br/>
            <label>
                First Name:<br/>
            </label>
            <input name="firstName" type="text" required />
            <br/>
            <label>
                Last Name:<br/>
            </label>
            <input name="lastName" type="text" required />
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