/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getVoiceRecordings = /* GraphQL */ `
  query GetVoiceRecordings($id: ID!) {
    getVoiceRecordings(id: $id) {
      video_id
      agent_id
      video_path
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
        video_id
        agent_id
        video_path
        description
        id
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
