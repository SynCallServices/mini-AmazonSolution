// AWS
import { Amplify, API, graphqlOperation } from 'aws-amplify';
import { withAuthenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import awsconfig from './aws-exports';

// GraphQl
import { createVideos, updateVideos, deleteVideos } from './graphql/mutations';
import { listVideos } from './graphql/queries';

// React 
import { useEffect, useState } from 'react';

// Necessary amplify configuration
Amplify.configure(awsconfig);

function App({ signOut, user }) {
    // Empty video 
    const video = { topic: "", description: "", agentId: user.username };
    // Use the empty video for the states
    // Idk what states are tho 🥴
    const [state, setState] = useState(video);
    const [videoRecordings, setVideoRecordings] = useState([]);

    useEffect(() => { fetchVideos() }, []);
    // Figure wtf is this -> but later pa, con calmish
    const setInput = (key, value) => { setState({ ...state, [key]: value }); }

    async function fetchVideos() {
        try {
            // Make read request from graphql -> DynamoDb
            const videoData = await API.graphql(graphqlOperation(listVideos));
            const videoList = videoData.data.listVideos.items;
            console.log('videos', videoList);
            setVideoRecordings(videoList);
        } catch (error) { console.log('Error fetching Videos 🥴', error.errors[0]); }
    }

    async function addVideo() {
        try {
            if (!state.topic || !state.description) return;
            const videoUpload = { ...state };
            setVideoRecordings([...videoRecordings, videoUpload]);
            setState(video);
            // Create a video 
            await API.graphql(graphqlOperation(createVideos, { input: videoUpload }));
        } catch (error) { console.log('Error creating video 🥴 ', error); }
    }

    // We'll use it later... I hope 
    // CRUD without the R -> CUD
    // Create a video 
    // await API.graphql(graphqlOperation(createVideo, { input: video }));
    // Update a todo
    // await API.graphql(graphqlOperation(updateVideo, { input: { id: user.username, videoPath: "Updated todo info" } }));
    // Delete a todo
    // await API.graphql(graphqlOperation(deleteVideo, { input: { id: user.username } }));

    return (
        <div className='App'>
            <h1>Hello {user.username}</h1>

            <h2>Your Videos</h2>
            <input
                onChange={event => setInput('topic', event.target.value)}
                value={state.videoId}
                placeholder="Video topic"
            />
            <input
                onChange={event => setInput('description', event.target.value)}
                value={state.videoPath}
                placeholder="Video description Path"
            />
            <button onClick={addVideo}>Create Video Recording entry</button>
            <button onClick={fetchVideos}>Get Video Recordings</button>

            {
                videoRecordings.map((video, index) => (
                    <div key={video.id ? video.id : index} className='videoRecording'>
                        <p className='videoRecordingVideoId'>Video Recording ID: {video.topic}</p>
                        <p className='videoRecordingVideoId'>Agent ID: {video.agentId}</p>
                        <p className='videoRecordingVideoId'>Video Path: {video.description}</p>
                    </div>
                ))
            }
            <button onClick={signOut}>Sign out</button>
        </div>
        // <>
        //     <h1>Hello {user.username}</h1>
        //     <button onClick={signOut}>Sign out</button>
        // </>

    );
}

export default withAuthenticator(App);