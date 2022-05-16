// AWS
import { Amplify } from 'aws-amplify';
import { withAuthenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import awsconfig from './aws-exports';

// React 
import { useState } from 'react';

// Importing async functions 
import { fetchVideos, /*uploadToS3, uploadToDynamo,*/ uploadAll, s3Files, fetchVideo } from './videoFunctions';

// Necessary amplify configuration
Amplify.configure(awsconfig);

function App({ signOut, user }) {
    // Empty video 
    const video = { agentId: user.username, videoId: "", videoPath: "" };
    // Use the empty video for the states
    // Idk what states are tho 🥴
    const [state, setState] = useState(video);
    // const [videoRecordings, setVideoRecordings] = useState([]);
    let file;

    const setInput = (key, value) => { setState({ ...state, [key]: value }); }

    function loadFile(e) {
        file = e.target.files[0];
    }

    function sendToAsync() {
        uploadAll(state, file);
    }

    return (
        <div className='App'>
            <h1>Hello {user.username}</h1>
            <h2>Your Videos</h2>


            {/* videoId input area */}
            <input
                onChange={event => setInput('videoId', event.target.value)}
                value={state.videoId}
                placeholder="Video Recording Id"
            />
            {/* videoPath input area */}
            <input
                onChange={event => setInput('videoPath', event.target.value)}
                value={state.videoPath}
                placeholder="Video Recording Path"
            />
            <br />
            {/* file for S3 input area */}
            <input type="file" onChange={loadFile} />
            <br /><br />

            {/* Upload button */}
            <button onClick={sendToAsync}>Create Video Recording entry</button>
            <br />
            {/* Show videos in terminal button */}
            <button onClick={fetchVideos}>Try the new external async function!</button>
            <br />
            {/* List S3 files in console */}
            <button onClick={s3Files}>Show S3 files in console</button>

            <br /><br />

            <button onClick={signOut}>Sign out</button>
        </div >
    );
}

export default withAuthenticator(App);