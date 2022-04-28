// AWS
import { Amplify, API, graphqlOperation, Storage } from 'aws-amplify';
import { withAuthenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import awsconfig from './aws-exports';

// GraphQl
import { createVideo, updateVideo, deleteVideo } from './graphql/mutations';
import { listVideos } from './graphql/queries';

// React 
import { useEffect, useState, useRef } from 'react';

// Necessary amplify configuration
Amplify.configure(awsconfig);

function App({ signOut, user }) {
    // Empty video 
    const video = { agentId: user.username, videoId: "", videoPath: "" };
    const [s3File, setS3File] = useState();
    const inputRef = useRef();
    // Use the empty video for the states
    // Idk what states are tho 🥴
    const [state, setState] = useState(video);
    const [videoRecordings, setVideoRecordings] = useState([]);
    // This status will be used for a video player later in development
    // const [videoPlaying, setVideoPlaying] = useState('');

    useEffect(() => { fetchVideos() }, []);

    // // Figure wtf is this -> but later pa, con calmish
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
            if (!state.videoId || !state.videoPath) return;
            const videoUpload = { ...state };
            setVideoRecordings([...videoRecordings, videoUpload]);
            setState(video);
            // Create a video 
            await API.graphql(graphqlOperation(createVideo, { input: videoUpload }));
        } catch (error) { console.log('Error creating video 🥴 ', error); }
        return window.location.reload();
    }

    // We'll use it later... I hope 
    // CRUD without the R -> CUD
    // Create a video 
    // await API.graphql(graphqlOperation(createVideo, { input: video }));
    // Update a todo
    // await API.graphql(graphqlOperation(updateVideo, { input: { id: user.username, videoPath: "Updated todo info" } }));
    // Delete a todo
    // await API.graphql(graphqlOperation(deleteVideo, { input: { id: user.username } }));

    async function uploadToS3(file) {
        console.log(file);
        try {
            await Storage.put(file.name, file);
            return true;
        } catch (error) { console.log("Error uploading file: ", error); }
        return false;
    }

    return (
        <div className='App'>
            <h1>Hello {user.username}</h1>

            <h2>Your Videos</h2>
            <input
                onChange={event => setInput('videoId', event.target.value)}
                value={state.videoId}
                placeholder="Video Recording Id"
            />
            <input
                onChange={event => setInput('videoPath', event.target.value)}
                value={state.videoPath}
                placeholder="Video Recording Path"
            />
            <br />
            <input id='fileButton' ref={inputRef} type="file"
                onChange={(event) => { setS3File(event.target.files[0]); }}
            />
            <br /><br />
            <button onClick={(event) => {
                let uploadStatus = uploadToS3(s3File);
                addVideo();
                let fileSection = document.getElementById('fileButton');
                fileSection.value = '';
                if (uploadStatus)
                    alert('Video has been uploaded successfully');
            }}>Create Video Recording entry</button>

            <ul>
                {
                    videoRecordings.map((video, index) => (
                        <li key={video.id ? video.id : index} className='videoRecording'>
                            <p className='videoRecordingVideoId'>Video Recording ID: {video.videoId}</p>
                            <p className='videoRecordingVideoId'>Agent ID: {video.agentId}</p>
                            <p className='videoRecordingVideoId'>Video Path: {video.videoPath}</p>
                        </li>
                    ))
                }
            </ul>

            <button onClick={signOut}>Sign out</button>
        </div>
    );
}

export default withAuthenticator(App);