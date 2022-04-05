# Save Recordings Mini-project

## Development Environment

- Node -> v16.14.0+
- npm -> v8.0.0+
- react -> v18.0.0+ 

## Useful commands

**Amazon Amplify CLI**

```powershell
npm install @aws-amplify/cli
```

**Push Amplify configuration to the cloud**

```powershell
amplify push
```

**Create a REST or GraphQL API and add it to the Amplify configuration**
```powershell
amplify add api
```

**Show current status of the Amplify project**
```powershell
amplify status
```

## React Notes

Definitions

- JSX -> Javascript syntax extension
- DOM -> Document Object Model (*React uses a virtual DOM, which allows us to update the page without refreshing the page*)


### **Components**

Components can be formated as classes or functions.

**Functions**
```jsx
function Header(props) {
    return (
        <div>
            <h1>{props.title}</h1>
        </div>
    )
}
<Header title="My title" />
```
**Classes**
```javascript
class Header extends React.Component {
    render() {
        return (
            <div>
                <h1> {this.props.title} </h1>
            </div>
        )    
    }
}
```

### **React Hooks**

- **useState** -> Returns a stateful value and a function to update it.
- **useEffect** -> Perform side effects in function components. (*Make HTTP requests*)

## GraphQL Notes

**Store a voice recording in DynamoDB**

```graphql
mutation createVoiceRecordings {
  createVoiceRecordings(input: {
      video_id: "002", 
      agent_id: "002", 
      video_path: "videos/002.mp4"}
  ) {
    id
  }
}
```

**Get all voice recordings stored in DynamoDB**

```graphql
query listVoiceRecordings {
  listVoiceRecordings {
    items {
      id
      agent_id
      video_id
      video_path
    }
  }
}
```
**Update voice recordings**

```graphql
mutation updateVoiceRecordings {
  updateVoiceRecordings(
    input: {id: "", <fields you want to update>}
  ) {
    id
    video_id
    video_path
    updatedAt
    createdAt
  }
}
```