import { Amplify, API, graphqlOperation } from "aws-amplify";
import awsconfig from './aws-exports';

import { listVideos } from './graphql/queries';

Amplify.configure(awsconfig);

export async function logVideos() {
    try {
        const rawData = await API.graphql(graphqlOperation(listVideos));
        const listOfVideos = rawData.data.listVideos.items;
        console.log('videos from external file', listOfVideos);
    } catch (error) {
        console.log('Error in outside function 🙃🥴', error);
    }
}

// module.exports.logVideos = logVideos;