import { withAuthenticator } from '@aws-amplify/ui-react';
import '../assets/styles/Home.css'
import VideoUploader from './VideoUploader';

function Home() {
  return (
    <div className='container'>
      <VideoUploader />
    </div>
  )
}

export default withAuthenticator(Home);