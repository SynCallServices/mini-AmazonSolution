/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getVoiceRecordings = /* GraphQL */ `
    query GetVoiceRecordings($id: ID!) {
        getVoiceRecordings(id: $id) {
            id
            agentId
            voiceId
            voicePath
            createdAt
            updatedAt
        }
    }
`;

export const listVoiceRecordings = /* GraphQL */ `
    query ListVoiceRecordings(
        $filter: ModelVoiceRecordingsFilterInput
        $limit: Int
        $nextToken: String
    ) {
        listVoiceRecordings(filter: $filter, limit: $limit, nextToken: $nextToken) {
            items {
                id
                agentId
                voiceId
                voicePath
                createdAt
                updatedAt  
            }
            nextToken
        }
    }
`;

export const getVideoRecordings = /* GraphQL */ `
  query GetVideoRecordings($id: ID!) {
    getVideoRecordings(id: $id) {
      id
      agentId
      videoId
      videoPath
      createdAt
      updatedAt
    }
  }
`;
export const listVideoRecordings = /* GraphQL */ `
  query ListVideoRecordings(
    $filter: ModelVideoRecordingsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listVideoRecordings(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        agentId
        videoId
        videoPath
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;