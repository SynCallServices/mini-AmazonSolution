import logo from './fotish.jpg';
import './App.css';

import { useEffect, useState } from 'react';

import { API, graphqlOperation } from 'aws-amplify';
import { createVoiceRecordings } from './graphql/mutations';
import { listVoiceRecordings } from './graphql/queries';


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          <br />Hello World ✌️🥴
        </p>
      </header>
    </div>
  );
}

const initialState = { cideo_id: '000'}

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
      if (!formState.Voice_id) return
      const voiceRecording = { ...formState }
      setVoiceRecordings([...voiceRecordings, voiceRecording])
      setFormState(initialState)
      await API.graphql(graphqlOperation(createVoiceRecordings, {input: voiceRecording}))
    } catch (err) {
      console.log("Error creating Voice recording: ", err)
    }
  }

  return (
    <div style={styles.container}>
      <h2>Voice Recordings</h2>
      <input
        onChange={event => setInput('voice_id', event.target.value)}
        style={styles.input}
        value={formState.voice_id}
        placeholder="Voice Recording Id"
      />
      <button style={styles.button} onClick={addVoiceRecordings}>Create Voice Recording entry</button>
      {
        voiceRecordings.map((voiceRecording, index) => (
          <div key={voiceRecording.id ? voiceRecording.id : index} style={styles.voiceRecording}>
            <p style={styles.voiceRecordingVoiceId}>{voiceRecording.voice_id}</p>
          </div>
        ))
      }
    </div>
  )
}

const styles = {
  container: { width: 400, margin: '0 auto', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: 20 },
  voiceRecording: {  marginBottom: 15 },
  input: { border: 'none', backgroundColor: '#ddd', marginBottom: 10, padding: 8, fontSize: 18 },
  voiceRecordingVoiceId: { fontSize: 20, fontWeight: 'bold' },
  button: { backgroundColor: 'black', color: 'white', outline: 'none', fontSize: 18, padding: '12px 0px' }
}

export default Home;
