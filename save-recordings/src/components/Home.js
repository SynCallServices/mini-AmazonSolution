import '../assets/styles/Home.css'
import VideoUploader from './VideoUploader';

import { withAuthenticator, Authenticator } from '@aws-amplify/ui-react';
import { Auth } from 'aws-amplify';

// import '@aws-amplify/ui-react/styles.css';

function Home({ signOut, user }) {

  console.log(user)

  return (
    <div className='container'>
      <h1>Hello {user.username}</h1>
      <VideoUploader user={user.attributes.sub}/>
      <button onClick={signOut}>Sign out</button>
    </div>
  )
}

export default withAuthenticator(Home); 