import '../assets/styles/Home.css'
import VideoConnections from './VideoConnections'
import VoiceConnections from './VoiceConnections'

function Home() {
  return (
    <div className='container'>
      <VideoConnections />
      <VoiceConnections />
    </div>
  )
}

export default Home;