// Shit's not working as it should 🥴, but login's not our problem 🤷‍♀️
// This website might help you https://ui.docs.amplify.aws/components/authenticator
// But this one's even better https://docs.amplify.aws/lib/auth/getting-started/q/platform/js/#create-authentication-service 🙂

import './App.css';
import { Amplify } from 'aws-amplify';
import awsconfig from './aws-exports';
// Install npm install --save aws-amplify @aws-amplify/ui-react
// Imports needed only for login (probs, idk ¯\_ಠ_ಠ_/¯)
import { withAuthenticator } from '@aws-amplify/ui-react';

// import '../node_modules/@aws-amplify/ui-react/dist/styles.css';

Amplify.configure(awsconfig);

function App({ signOut, user }) {
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

// export async function getStaticProps() {
//   return {
//     props: {
//       isPassedToWithAuthenticator: true,
//     },
//   };
// }