/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createVoiceRecordings = /* GraphQL */ `
  mutation CreateVoiceRecordings(
    $input: CreateVoiceRecordingsInput!
    $condition: ModelVoiceRecordingsConditionInput
  ) {
    createVoiceRecordings(input: $input, condition: $condition) {
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
export const updateVoiceRecordings = /* GraphQL */ `
  mutation UpdateVoiceRecordings(
    $input: UpdateVoiceRecordingsInput!
    $condition: ModelVoiceRecordingsConditionInput
  ) {
    updateVoiceRecordings(input: $input, condition: $condition) {
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
export const deleteVoiceRecordings = /* GraphQL */ `
  mutation DeleteVoiceRecordings(
    $input: DeleteVoiceRecordingsInput!
    $condition: ModelVoiceRecordingsConditionInput
  ) {
    deleteVoiceRecordings(input: $input, condition: $condition) {
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
