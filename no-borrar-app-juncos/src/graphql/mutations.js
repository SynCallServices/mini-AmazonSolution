/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createVideos = /* GraphQL */ `
  mutation CreateVideos(
    $input: CreateVideosInput!
    $condition: ModelVideosConditionInput
  ) {
    createVideos(input: $input, condition: $condition) {
      id
      topic
      description
      agentId
      createdAt
      updatedAt
    }
  }
`;
export const updateVideos = /* GraphQL */ `
  mutation UpdateVideos(
    $input: UpdateVideosInput!
    $condition: ModelVideosConditionInput
  ) {
    updateVideos(input: $input, condition: $condition) {
      id
      topic
      description
      agentId
      createdAt
      updatedAt
    }
  }
`;
export const deleteVideos = /* GraphQL */ `
  mutation DeleteVideos(
    $input: DeleteVideosInput!
    $condition: ModelVideosConditionInput
  ) {
    deleteVideos(input: $input, condition: $condition) {
      id
      topic
      description
      agentId
      createdAt
      updatedAt
    }
  }
`;
