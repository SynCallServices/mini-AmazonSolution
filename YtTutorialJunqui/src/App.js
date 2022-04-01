// Shit's not working as it should 🥴, but login's not our problem 🤷‍♀️
// This website might help you https://ui.docs.amplify.aws/components/authenticator

import './App.css';
import { Amplify } from 'aws-amplify';
import awsconfig from './aws-exports';
// Install npm install --save aws-amplify @aws-amplify/ui-react
// Imports needed only for login (probs, idk ¯\_ಠ_ಠ_/¯)
import { withAuthenticator } from '@aws-amplify/ui-react';
// import '@aws-amplify/ui-react/style.css';

Amplify.configure(awsconfig);

function App({ isPassedToWithAuthenticator, signOut, user }) {
  if (!isPassedToWithAuthenticator) {
    throw new Error(`isPassedToWithAuthenticator was not provided`);
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Hello {user.username}</h1>
        <button onClick={signOut}>Sign out</button>
      </header>
    </div>
  );
}

// Exporting the app within the withAuthenticator will enable Amazon cognito user auth
export default withAuthenticator(App);

export async function getStaticProps() {
  return {
    props: {
      isPassedToWithAuthenticator: true,
    },
  };
}