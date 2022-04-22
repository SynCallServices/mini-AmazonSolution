// AWS
import { Amplify, API, graphqlOperation } from 'aws-amplify';
import { withAuthenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import awsconfig from './aws-exports';

// GraphQl
// import { createVideo, updateVideo, deleteVideo } from './graphql/mutations';
import { listVideos } from './graphql/queries';

// React 
import { useEffect, useState } from 'react';

// Necessary amplify configuration
Amplify.configure(awsconfig);

function App({ signOut, user }) {
    // Empty video 
    const video = { agentId: user.username, videoId: "-", videoPath: "/" };
    // Use the empty video for the states
    // Idk what states are tho 🥴
    const [state, setState] = useState(video);
    const [videoRecordings, setVideoRecordings] = useState([]);

    useEffect(() => { fetchVideos() }, []);
    // Figure wtf is this -> but later pa, con calmish
    // const setInput = (key, value) => {
    //     setState({...state, [key]:value})
    //   }

    async function fetchVideos() {
        try {
            // Make read request from graphql -> DynamoDb
            const videoData = await API.graphql(graphqlOperation(listVideos));
            const videoList = videoData.data.listVideos.items;
            console.log('videos', videoList);
            setVideoRecordings(videoList);
        } catch (error) { console.log('Error fetching Video recordings.', error.errors[0]); }
    }
    // We'll use it later... I hope 
    // CRUD without the R -> CUD
    //     /* create a todo */
    //     await API.graphql(graphqlOperation(createVideo, { input: video }));
    //     /* update a todo */
    //     await API.graphql(graphqlOperation(updateVideo, { input: { id: user.username, videoPath: "Updated todo info" } }));
    //     /* delete a todo */
    //     await API.graphql(graphqlOperation(deleteVideo, { input: { id: user.username } }));


    return (
        <>
            <h1>Hello {user.username}</h1>
            <button onClick={signOut}>Sign out</button>
        </>

    );
}

export default withAuthenticator(App);