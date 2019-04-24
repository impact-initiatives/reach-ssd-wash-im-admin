export const getDocument = `
  query getDocument($id: ID!) {
    getDocument(id: $id) {
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

export const listDocuments = `
  query listDocuments {
    listDocuments {
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
