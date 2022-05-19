import { useState, useRef, useEffect } from "react";
import RecordRTC, { invokeSaveAsDialog } from "recordrtc"; // for this app to work, must have installed recordrtc.
import './App.css';

function App() {

  // hooks
  const [stream, setStream] = useState(null);
  const [blob, setBlob] = useState(null);
  const refVideo = useRef(null);
  const recorderRef = useRef(null);

  // variables for audio and video streams. 
  let audioMediaConstraints = {
    audio: {
      echoCancellation: true,
      noiseSuppression: true,
      sampleRate: 44100
    },
    video: false
  };

  let videoMediaConstraints = {
    video: {
      cursor: 'always',
      resizeMode: 'crop-and-scale',
      mediaSource: 'screen'
    }
  }

  // function to stop the recording and obtain the Blob. 
  const handleStop = () => {
    recorderRef.current.stopRecording(() => {
      setBlob(recorderRef.current.getBlob());
    });
    stream.getTracks().forEach( track => track.stop() ); // stop all tracks.
  };

  // function to save the Blob and download it as a txt file.
  const saveLocally = async function() {
    var blobURL = URL.createObjectURL(blob);
    let file = await fetch(blobURL).then(r => r.blob()).then(blobFile => new File([blobFile], "myBlobFileHere.txt", { type: "text/txt"}));
    invokeSaveAsDialog(file);
  };

  // asynchronous function to start the recording and get the screen and audio streams. 
  async function handleRecording() {
    const screenStream = await navigator.mediaDevices.getDisplayMedia(videoMediaConstraints);
    const audioStream = await navigator.mediaDevices.getUserMedia(audioMediaConstraints);
    const mergedStream = new MediaStream([...screenStream.getTracks(), ...audioStream.getTracks()]);

    setStream(mergedStream);

    recorderRef.current = new RecordRTC(mergedStream, {
      type: "video",
    });
    recorderRef.current.startRecording();
  };

  // everytime the component re-renders do...
  useEffect(() => {
    if (!refVideo.current) {
      return;
    }

    refVideo.current.srcObject = stream;
  }, [stream, refVideo]);


  return (
    <div className="App">
      <header className="App-header">
        {blob && (
          <video
            src={URL.createObjectURL(blob)}
            controls
            autoPlay={false}
            ref={refVideo}
            style={{ width: "700px", margin: "1em" }}
          />
        )}
        <br></br>
        <button onClick={handleRecording}>start</button>
        <button onClick={handleStop}>stop</button>
        <button onClick={saveLocally}>save</button>
      </header>
    </div>
  );
}

export default App;
