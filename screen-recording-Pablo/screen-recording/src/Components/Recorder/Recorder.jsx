import React from 'react';
import {ReactMediaRecorder} from 'react-media-recorder';


const Recorder = (props) => {

    return(
        <div>
            <ReactMediaRecorder
                // Here we can change if we want to record the screen or cam and mic
                screen
                render={({ status, startRecording, stopRecording, mediaBlobUrl }) => (
                    <div>
                        <p>{status}</p>
                        <button onClick={startRecording}>Start Recording</button>
                        <button onClick={stopRecording}>Stop Recording</button>
                        <video src={mediaBlobUrl} controls autoPlay loop />
                    </div>
                )}
            />
        </div>
    );

}

export default Recorder; 