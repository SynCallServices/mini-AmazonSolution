import { useRef, useState } from 'react'


const VideoUploader = (props) => {

    const inputRef = useRef();
    const { source,  setSource } = useState();

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        const url = URL.createObjectURL(file);
        setSource(url);
    };

    const handleChoose = (event) => {
        inputRef.current.click();
    };

    return (
        <div className="VideoInput">
        <input
            ref={inputRef}
            className="VideoInput_input"
            type="file"
            onChange={handleFileChange}
            accept=".mov,.mp4"
        />
      {!source && <button onClick={handleChoose}>Choose</button>}
      {source && (
        <video
          className="VideoInput_video"
          width="100%"
          controls
        />
      )}
      <div className="VideoInput_footer">{source || "Nothing selectd"}</div>
    </div>
    )
}

export default VideoUploader;