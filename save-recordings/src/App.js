import logo from './fotish.jpg';
import './App.css';
import Amplify from 'aws-amplify';
import awsconfig from './aws-exports'
import {AmplifySignOut, withAuthenticator} from '@aws-amplify/ui-react'

Amplify.configure(awsconfig)

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <AmplifySignOut />
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          <br />Hello World ✌️🥴
        </p>
      </header>
    </div>
  );
}

export default withAuthenticator(App);
