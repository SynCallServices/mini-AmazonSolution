// Shit's not working as it should 🥴, but login's not our problem 🤷‍♀️
// This website might help you https://ui.docs.amplify.aws/components/authenticator
// But this one's even better https://docs.amplify.aws/lib/auth/getting-started/q/platform/js/#create-authentication-service 🙂

import './App.css';
import { Amplify, API, graphqlOperation } from 'aws-amplify';
import awsconfig from './aws-exports';
// Install npm install --save aws-amplify @aws-amplify/ui-react
// Imports needed only for login (probs, idk ¯\_ಠ_ಠ_/¯)
import { withAuthenticator } from '@aws-amplify/ui-react';
// for retrieving video stuff 
import * as queries from './graphql/queries';
import { useEffect, useState } from 'react';

Amplify.configure(awsconfig);

function App({ signOut, user }) {
    // React thingy 👇
    // const [videos, setVideos] = useState([]);

    // Every time the app renders, it will call the fetchVideos constant
    useEffect(() => {
        fetchVideos();
        // Adding the empty array makes it call fetchVideos once, isntead of looping
    }, []);

    const fetchVideos = async () => {
        try {
            // The operation of listVideos comes from the graphql queries.js
            // mutations.js is also helpful, it has all the CRUD stuff 👍
            // This gets all videos
            // API.graphql(graphqlOperation(query: listVideos))
            // const videoData = await API.graphql(graphqlOperation(listVideos));
            let videoData = await API.graphql({ query: queries.listVideos, authMode: 'AMAZON_COGNITO_USER_POOLS' });
            console.log('video data', videoData);
            // Puts the important info in a list
            // const videoList = videoData.data.listVideos.items;
            // console.log('video list', videoList);
            // Sets a react thingy (I think?) and loads it with the songs
            // The react thingy is above 👆
            // setVideos(videoList);
        } catch (error) {
            console.log('Something happend fetching alv', error);
        }
    };
    return (
        <div className="App">
            <header className="App-header">
                <h1>Hello {user.username}</h1>
                <button onClick={signOut}>Sign out</button>
            </header>
        </div>
    );
}

// Exporting the app within the withAuthenticator will enable Amazon cognito user auth
export default withAuthenticator(App);

// export async function getStaticProps() {
//   return {
//     props: {
//       isPassedToWithAuthenticator: true,
//     },
//   };
// }