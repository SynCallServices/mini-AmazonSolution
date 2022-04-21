import { Amplify, API, graphqlOperation } from 'aws-amplify';
import { withAuthenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import { createVideos, updateVideos, deleteVideos } from './graphql/mutations';
import { listVideos } from './graphql/queries';
import awsExports from './aws-exports';
import { async } from 'q';
import { onCreateVideos } from './graphql/subscriptions';
Amplify.configure(awsExports);

function App({ signOut, user }) {
  async function AsyncCall(user) {
    const video = { topic: "video topic", description: "video description", agentId: user.username };
    //   await API.graphql(graphqlOperation(createVideos, { input: video }));
    //   await API.graphql(graphqlOperation(updateVideos, { input: { id: user.username, name: "Updated video" } }));
    //   await API.graphql(graphqlOperation(deleteVideos, { input: { id: user.username } }));
    const todos = await API.graphql(graphqlOperation(listVideos));
  }
  const subscription = API.graphql(
    graphqlOperation(onCreateVideos)
  ).subscribe({
    next: (todoData) => {
      console.log(todoData);
      // Do something with the data
    }
  });
  return (
    <>
      <h1>Hello {user.username}</h1>  
      <button onClick={signOut}>Sign out</button>
    </>
  );
}

export default withAuthenticator(App);