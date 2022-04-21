import Amplify, { Auth } from 'aws-amplify';
import { withAuthenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import awsconfig from './aws-exports';
import './App.css';

Amplify.configure(awsconfig);

function App({ signOut, user }) {
    return (
        <>
            <h1>Hello {user.email}</h1>
            <button onClick={signOut}>Sign out</button>
        </>

    );
}

export default withAuthenticator(App);