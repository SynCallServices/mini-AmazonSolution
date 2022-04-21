import Button from './Button'
import '../assets/styles/connections.css'

import { useEffect, useState } from 'react';

import { API, graphqlOperation } from 'aws-amplify';
import { createVideoRecordings } from '../graphql/mutations';
import { listVideoRecordings } from '../graphql/queries';

const initialState = { videoId: '', agentId: '', videoPath: ''}

function VideoConnections() {
  const [state, setState] = useState(initialState);
  const [videoRecordings, setVideoRecordings] = useState([]);

  useEffect(() => {
    fetchVideoRecordings()
  }, [
    /*This empty array represents the variables that useEffect hook is tracking. 
    Everytime that one of the variables is updated fetchVideoRecordings() will be called.*/
    ]
  )

  const setInput = (key, value) => {
    setState({...state, [key]:value})
  }

  async function fetchVideoRecordings() {
    try {
      // API call's the "listVideoRecordings" query. This call will return an object that contains all of our videoRecordings.
      const videoRecordingsData = await API.graphql(graphqlOperation(listVideoRecordings))
      // Once api call is complete, extract all of video recordings into a list.  
      const videoRecordings = videoRecordingsData.data.listVideoRecordings.items
      // Set the state to this list
      setVideoRecordings(videoRecordings)
    } catch (err) {console.log('Error fetching Video recordings.', err.errors[0])}
  }

  async function addVideoRecordings() 
  {
    try{
      if (!state.videoId || !state.agentId || !state.videoPath) return
      const videoRecording = { ...state }
      setVideoRecordings([...videoRecordings, videoRecording])
      setState(initialState)
      await API.graphql(graphqlOperation(createVideoRecordings, {input: videoRecording}))
    } catch (err) {
      console.log("Error creating Video recording: ", err)
    }
  }

  return (
    <div className='container'>
      <h2>Video Recordings</h2>
      <input
        onChange={event => setInput('videoId', event.target.value)}
        value={state.videoId}
        placeholder="Video Recording Id"
      />
      <input
        onChange={event => setInput('agentId', event.target.value)}
        value={state.agentId}
        placeholder="Agent Id"
      />
      <input
        onChange={event => setInput('videoPath', event.target.value)}
        value={state.videoPath}
        placeholder="Video Recording Path"
      />
      <Button onClick={addVideoRecordings} text="Create Video Recording entry" color="#6B9080"/>
      <Button onClick={fetchVideoRecordings} text="Get Video Recordings" color="#6B9080"/>
      {
        videoRecordings.map((videoRecording, index) => (
          <div key={videoRecording.id ? videoRecording.id : index} className='videoRecording'>
            <p className='videoRecordingVideoId'>Video Recording ID: {videoRecording.videoId}</p>
            <p className='videoRecordingVideoId'>Agent ID: {videoRecording.agentId}</p> 
            <p className='videoRecordingVideoId'>Video Path: {videoRecording.videoPath}</p> 
          </div>
        ))
      }
    </div>
  )
}

export default VideoConnections;