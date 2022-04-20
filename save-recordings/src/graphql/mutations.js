/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createVideoRecordings = /* GraphQL */ `
  mutation CreateVideoRecordings(
    $input: CreateVideoRecordingsInput!
    $condition: ModelVideoRecordingsConditionInput
  ) {
    createVideoRecordings(input: $input, condition: $condition) {
      id
      agentId
      videoId
      videoPath
      createdAt
      updatedAt
    }
  }
`;
export const updateVideoRecordings = /* GraphQL */ `
  mutation UpdateVideoRecordings(
    $input: UpdateVideoRecordingsInput!
    $condition: ModelVideoRecordingsConditionInput
  ) {
    updateVideoRecordings(input: $input, condition: $condition) {
      id
      agentId
      videoId
      videoPath
      createdAt
      updatedAt
    }
  }
`;
export const deleteVideoRecordings = /* GraphQL */ `
  mutation DeleteVideoRecordings(
    $input: DeleteVideoRecordingsInput!
    $condition: ModelVideoRecordingsConditionInput
  ) {
    deleteVideoRecordings(input: $input, condition: $condition) {
      id
      agentId
      videoId
      videoPath
      createdAt
      updatedAt
    }
  }
`;