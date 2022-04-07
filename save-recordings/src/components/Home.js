import '../assets/styles/Home.css'
import Button from './Button'

import { useEffect, useState } from 'react';

import { API, graphqlOperation } from 'aws-amplify';
import { createVoiceRecordings } from '../graphql/mutations';
import { listVoiceRecordings } from '../graphql/queries';

const initialState = { voice_id: '', agent_id: '', voice_path: ''}

function Home() {
  const [state, setState] = useState(initialState);
  const [voiceRecordings, setVoiceRecordings] = useState([]);

  useEffect(() => {
    fetchVoiceRecordings()
  }, [
    /*This empty array represents the variables that useEffect hook is tracking. 
    Everytime that one of the variables is updated fetchVoiceRecordings() will be called.*/
    ]
  )

  const setInput = (key, value) => {
    setState({...state, [key]:value})
  }

  async function fetchVoiceRecordings() {
    try {
      const voiceRecordingsData = await API.graphql(graphqlOperation(listVoiceRecordings))
      const voiceRecordings = voiceRecordingsData.data.listVoiceRecordings.items
      setVoiceRecordings(voiceRecordings)
    } catch (err) {console.log('Error fetching Voice recordings.', err)}
  }

  async function addVoiceRecordings()
  {
    try{
      if (!state.voice_id || !state.agent_id || !state.voice_path) return
      const voiceRecording = { ...state }
      setVoiceRecordings([...voiceRecordings, voiceRecording])
      setState(initialState)
      await API.graphql(graphqlOperation(createVoiceRecordings, {input: voiceRecording}))
    } catch (err) {
      console.log("Error creating Voice recording: ", err)
    }
  }

  return (
    <div className='container'>
      <h2>Voice Recordings</h2>
      <input
        onChange={event => setInput('voice_id', event.target.value)}
        value={state.voice_id}
        placeholder="Voice Recording Id"
      />
      <input
        onChange={event => setInput('agent_id', event.target.value)}
        value={state.agent_id}
        placeholder="Agent Id"
      />
      <input
        onChange={event => setInput('voice_path', event.target.value)}
        value={state.voice_path}
        placeholder="Voice Recording Path"
      />
      <Button onClick={addVoiceRecordings} text="Create Voice Recording entry" color="#6B9080"/>
      <Button onClick={fetchVoiceRecordings} text="Get Voice Recordings" color="#6B9080"/>
      {
        voiceRecordings.map((voiceRecording, index) => (
          <div key={voiceRecording.id ? voiceRecording.id : index} className='voiceRecording'>
            <p className='voiceRecordingVoiceId'>Voice Recording ID: {voiceRecording.voice_id}</p>
            <p className='voiceRecordingVoiceId'>Agent ID: {voiceRecording.agent_id}</p> 
            <p className='voiceRecordingVoiceId'>Voice Path: {voiceRecording.voice_path}</p> 
          </div>
        ))
      }
    </div>
  )
}

export default Home;