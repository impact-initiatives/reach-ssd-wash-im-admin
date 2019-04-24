import React from 'react';
// import { Auth, API, graphqlOperation } from 'aws-amplify';

// import { updateDocument } from '../config/graphql/mutations';
// import getFormType from '../utils/get-form-type';
// import schema from '../config/schema/schema';

// const validFile = file => {
//   return file && file.file && file.file.status === 'done';
// };

// const handleSubmit = (e, initialValues) => {
//   e.preventDefault();
//   const values = {};
//   Auth.currentAuthenticatedUser().then(user => {
//     const variables = {
//       ...initialValues,
//       ...values,
//       file: values.file.file.response.key,
//       updatedAt: Math.floor(Date.now() / 1000),
//       updatedBy: user.attributes.email,
//     };
//     API.graphql(graphqlOperation(updateDocument, variables))
//       .then(() => window.location.assign('/admin'))
//       .catch(() => {});
//   });
// };
//
// const handleDelete = initialValues => {
//   const values = {};
//   Auth.currentAuthenticatedUser().then(user => {
//     const variables = {
//       ...initialValues,
//       ...values,
//       file: values.file.file.response.key,
//       updatedAt: Math.floor(Date.now() / 1000),
//       updatedBy: user.attributes.email,
//     };
//     API.graphql(graphqlOperation(updateDocument, variables))
//       .then(() => window.location.assign('/admin'))
//       .catch(() => {});
//   });
// };

const UploadForm = () => {
  return null;
};

export default UploadForm;
