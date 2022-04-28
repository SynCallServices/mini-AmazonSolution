import Button from './Button'
import '../assets/styles/connections.css'

import { useEffect, useState } from 'react';

import { API, graphqlOperation } from 'aws-amplify';
import { createVoiceRecordings } from '../graphql/mutations';
import { listVoiceRecordings } from '../graphql/queries';

const initialState = { voiceId : '', agentId: '', voicePath: '' }

function VoiceConnections() {

    const [state, setState] = useState(initialState)
    const [voiceRecordings, setVoiceRecordings] = useState([])
    
    useEffect(() => {
        fetchVoiceRecordings()
    }, [])

    const setInput = (key, value) => {
        setState({...state, [key]:value})
    }

    async function fetchVoiceRecordings() {
        try {
            const voiceRecordingsData = await API.graphql(graphqlOperation(listVoiceRecordings))
            const voiceRecordings = voiceRecordingsData.data.listVoiceRecordings.items
            setVoiceRecordings(voiceRecordings)
        } catch (err) {
            console.log('Error fetching Voice recordings,' , err.errors[0])
        }
    }

    async function addVoiceRecordings()
    {
        try{
            if (!state.voiceId || !state.agentId || !state.voicePath) return
            const voiceRecording = { ...state }
            setVoiceRecordings([...voiceRecordings, voiceRecording])
            setState(initialState)
            await API.graphql(graphqlOperation(createVoiceRecordings, {input: voiceRecording}))
        } catch (err) {
            console.log("Error creating Voice recordings", err)
        }
    }


    return (
        <div className='container'>
      <h2>Voice Recordings</h2>
      <input
        onChange={event => setInput('voiceId', event.target.value)}
        value={state.voiceId}
        placeholder="Voice Recording Id"
      />
      <input
        onChange={event => setInput('agentId', event.target.value)}
        value={state.agentId}
        placeholder="Agent Id"
      />
      <input
        onChange={event => setInput('voicePath', event.target.value)}
        value={state.voicePath}
        placeholder="Voice Recording Path"
      />
      <Button onClick={addVoiceRecordings} text="Create Voice Recording entry" color="#6B9080"/>
      <Button onClick={fetchVoiceRecordings} text="Get Voice Recordings" color="#6B9080"/>
      {
        voiceRecordings.map((voiceRecording, index) => (
          <div key={voiceRecording.id ? voiceRecording.id : index} className='voiceRecording'>
            <p className='voiceRecordingVoiceId'>Voice Recording ID: {voiceRecording.voiceId}</p>
            <p className='voiceRecordingVoiceId'>Agent ID: {voiceRecording.agentId}</p> 
            <p className='voiceRecordingVoiceId'>Voice Path: {voiceRecording.voicePath}</p> 
          </div>
        ))
      }
    </div>
    )
}

export default VoiceConnections;