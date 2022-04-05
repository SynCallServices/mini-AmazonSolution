import '../assets/styles/Home.css'
import Button from './Button'

import { useEffect, useState } from 'react';

import { API, graphqlOperation } from 'aws-amplify';
import { createVoiceRecordings } from '../graphql/mutations';
import { listVoiceRecordings } from '../graphql/queries';

const initialState = { voice_id: '', agent_id: ''}

function Home() {
  const [formState, setFormState] = useState(initialState);
  const [voiceRecordings, setVoiceRecordings] = useState([]);

  useEffect(() => {
    fetchVoiceRecordings()
  }, [])

  function setInput(key, value) {
    setFormState({...formState, [key]:value})
  }

  async function fetchVoiceRecordings() {
    try {
      const voiceRecordingsData = await API.graphql(graphqlOperation(listVoiceRecordings))
      const voiceRecordings = voiceRecordingsData.data.listVoiceRecordings.items
      setVoiceRecordings(voiceRecordings)
    } catch (err) {console.log('Error fetching Voice recordings.')}
  }

  async function addVoiceRecordings()
  {
    try{
      if (!formState.voice_id) return
      const voiceRecording = { ...formState }
      setVoiceRecordings([...voiceRecordings, voiceRecording])
      setFormState(initialState)
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
        value={formState.voice_id}
        placeholder="Voice Recording Id"
      />
      <button onClick={addVoiceRecordings}>Create Voice Recording entry</button>
      {
        voiceRecordings.map((voiceRecording, index) => (
          <div key={voiceRecording.id ? voiceRecording.id : index} className='voiceRecording'>
            <p className='voiceRecordingVoiceId'>{voiceRecording.voice_id}</p>
            <p className='voiceRecordingVoiceId'>-{voiceRecording.agent_id}-</p> 
          </div>
        ))
      }
      <Button />
    </div>
  )
}

export default Home;