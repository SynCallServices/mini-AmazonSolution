/* eslint-disable */
// this is an auto generated file. This will be overwritten

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