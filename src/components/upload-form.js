import React from 'react';
import { Auth, API, graphqlOperation, Storage } from 'aws-amplify';

import { createDocument } from '../config/graphql/mutations';
import getFormType from '../utils/get-form-type';
import schema from '../config/schema/schema';

const uploadDocument = (values, date) =>
  Auth.currentAuthenticatedUser().then(user => {
    const timestamp = Math.floor(date / 1000);
    const variables = {
      ...values,
      createdAt: timestamp,
      createdBy: user.attributes.email,
      updatedAt: timestamp,
      updatedBy: user.attributes.email,
      status: 'DRAFT',
    };
    API.graphql(graphqlOperation(createDocument, variables))
      .then(() => window.location.reload())
      .catch(() => {});
  });

const uploadFile = (values, file) =>
  Storage.put(`${values.file}`, file, {
    contentType: file.type,
    customPrefix: { public: 'files/' },
    progressCallback({ loaded, total }) {},
  });

const handleSubmit = e => {
  e.preventDefault();
  const values = {};
  let file = {};
  const date = new Date();
  for (const { name, value, multiple, files, selectedOptions } of e.target
    .elements) {
    if (name && !multiple && !files) values[name] = value;
    if (name && !multiple && files) {
      const year = date.toISOString().slice(0, 4);
      const month = date.toISOString().slice(5, 7);
      file = files[0];
      values[name] = `${year}/${month}/${file.name}`;
    }
    if (name && multiple && selectedOptions) {
      const options = [];
      for (const option of selectedOptions) {
        options.push(option.value);
        if (schema[name].submit) {
          const parents = schema[name].submit[option.value];
          for (const [parentKey, parentValue] of Object.entries(parents)) {
            const parentValues = new Set([...values[parentKey], parentValue]);
            values[parentKey] = Array.from(parentValues)
              .filter(Boolean)
              .sort();
          }
        }
      }
      const mergedValues = new Set([...values[name], ...options]);
      values[name] = Array.from(mergedValues)
        .filter(Boolean)
        .sort();
    }
  }
  uploadFile(values, file).then(() => uploadDocument(values, date));
};

const UploadForm = () => (
  <form onSubmit={handleSubmit}>
    {Object.entries(schema).map(([key, value]) => getFormType(key, value))}
    <div className="field is-grouped">
      <div className="control">
        <button className="button is-link" type="submit">
          Submit
        </button>
      </div>
      <p className="control">
        <button className="button is-light" type="button">
          Cancel
        </button>
      </p>
    </div>
  </form>
);

export default UploadForm;
