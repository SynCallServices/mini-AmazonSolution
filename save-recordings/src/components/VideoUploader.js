import { useRef, useState } from 'react'


function VideoUploader() {

  const inputRef = useRef(null);
  const [state, setState] = useState("../assets/images/team.jpg")

  const setInput = (value) => {
    setState(URL.createObjectURL(value))
  }

  return (
  <div className='container'>
    <input ref={inputRef} type="file" onChange={(event) => {setInput(event.target.files[0])}}/>
    {state && (
      <img src={state} alt=""/>
    )}
  </div>
  )
}

export default VideoUploader;