import React from 'react';
import {ReactMediaRecorder} from 'react-media-recorder';


const Recorder = (props) => {

    return(
        <div>
            <ReactMediaRecorder
                video
                render={({ status, startRecording, stopRecording, mediaBlobUrl }) => (
                    <div>
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