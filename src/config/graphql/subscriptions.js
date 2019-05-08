import gql from 'graphql-tag';

export const onDeltaDocument = gql`
  subscription onDeltaDocument {
    onDeltaDocument {
      id
      file
      title
      documentType
      fileType
      clusters
      organizations
      donors
      washTypes
      admin0
      admin1
      admin2
      createdAt
      createdBy
      updatedAt
      updatedBy
      status
    }
  }
`;
