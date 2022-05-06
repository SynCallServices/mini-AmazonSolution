import { useRef, useState } from 'react'
import Button from './Button';
import { Storage } from 'aws-amplify'

function VideoUploader() {

  const inputRef = useRef(null);
  const [state, setState] = useState("")
  const [photo, setPhoto] = useState("")

  const setInput = (value) => {
    if (!(value instanceof Blob)) {
      console.log("The value passed must be a blob")
      return
    }
    let url = URL.createObjectURL(value);
    console.log(url)
    setState(value)
    setPhoto(url)
  }

  async function getS3File() {

    try {
      const result = await Storage.get("images/team.jpg")
      console.log(result)
      fetch(result)
      .then((res) => {
        return res.blob(); 
      })
      .then((blob) => {console.log(blob); setInput(blob)})

    } catch (err) {
      console.log("Error getting a file", err)
    }
  }

  async function uploadFile(file) {
    try {
      const result = await Storage.put(`images/${file.name}`, file, {
        level: "public"
      })
      console.log(result)
    } catch (err) {
      console.log("Error uploading a file", err)
    }
  }

  function getFiles() {
    try {
      Storage.list('images/').then((result) => {console.log(result); console.log(result[0] instanceof Blob)})
    } catch (err) {
      console.log("Error getting a list of all the files", err)
    }
  }

  return (
  <div className='container'>
    <input ref={inputRef} type="file" onChange={(event) => {setInput(event.target.files[0]);}}/>
    <Button onClick={(event) => uploadFile(state)} text="Upload"/>
    <Button onClick={getS3File} text="Get"/>
    <Button onClick={getFiles} text="List"/>
    {photo && (
      <img src={photo} alt=""/>
    )}
  </div>
  )
}

export default VideoUploader;