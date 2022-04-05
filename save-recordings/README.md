# Amazon mini Proyectos

## Development Environment

Node (v16.14 or above)
For using Amazon stuff install npm install -g @aws-amplify/cli (-g will install it globaly, so remember to uninstall when you're done with the project)

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