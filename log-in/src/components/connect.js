import { AWS } from "./modules.js";

const params = {
    InstanceId: process.env.REACT_APP_INSTANCE_ID,
    Origin: process.env.REACT_APP_ORIGIN
};

console.log(params);

const connect = new AWS.Connect();
connect.associateApprovedOrigin(params, function(err, data) {
    if (err) {
    console.log(err);
    } else {
    console.log("entered", data);
    }
})

connect.listUsers({
    InstanceId: process.env.REACT_APP_INSTANCE_ID,
    MaxResults: 30
}, function(err, data) {
    if (err) {
    console.log(err);
    } else {
    console.log(data);
    }
})

connect.describeSecurityProfile({
    InstanceId: process.env.REACT_APP_INSTANCE_ID,
    SecurityProfileId: process.env.REACT_APP_AGENT_ID
}, function(err, data) {
    console.log(data);
})

connect.describeSecurityProfile({
    InstanceId: process.env.REACT_APP_INSTANCE_ID,
    SecurityProfileId: process.env.REACT_APP_SUPERVISOR_ID
}, function(err, data) {
    console.log(data);
})