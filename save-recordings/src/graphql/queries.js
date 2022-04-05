/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getVoiceRecordings = /* GraphQL */ `
  query GetVoiceRecordings($id: ID!) {
    getVoiceRecordings(id: $id) {
      voice_id
      agent_id
      voice_path
      description
      id
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
        voice_id
        agent_id
        voice_path
        description
        id
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
