import logo from './fotish.jpg';
import './App.css';

import {withAuthenticator} from '@aws-amplify/ui-react'

const withAuthenticatorConfig = {
  usernameAttributes: 'email',
  signUpConfig: {hiddenDefaults: ['phone number'], },
};

function App({signOut, user}) {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Hello {user.username}</h1>
        <button onClick={signOut}>Sign out</button>
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          <br />Hello World ✌️🥴
        </p>
      </header>
    </div>
  );
}

export default withAuthenticator(App, withAuthenticatorConfig);
