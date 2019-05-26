import React from 'react';
import Auth from '@aws-amplify/auth';
import Storage from '@aws-amplify/storage';

import { createDocument } from '../config/graphql/mutations';
import client from '../utils/aws-appsync-client';
import getFormType from '../utils/get-form-type';
import schema from '../config/schema/schema';

interface Values {
  [key: string]: string | string[];
}

const uploadDocument = (values: Values, date: Date) =>
  Auth.currentAuthenticatedUser().then(user => {
    const timestamp = Math.floor(date.getTime() / 1000);
    const variables = {
      ...values,
      createdAt: timestamp,
      createdBy: user.attributes.email,
      updatedAt: timestamp,
      updatedBy: user.attributes.email,
      status: 'DRAFT',
    };
    client
      .mutate({ mutation: createDocument, variables })
      .then(() => window.location.reload())
      .catch(() => {});
  });

const uploadFile = (values: Values, file: File) =>
  Storage.put(`${values.file}`, file, {
    contentType: file.type,
    customPrefix: { public: 'files/' },
  });

const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  let file: File = {
    lastModified: 0,
    name: '',
    size: 0,
    type: '',
    slice: new Blob().slice,
  };
  const values: Values = {};
  const date = new Date();
  for (const input of Array.from(e.currentTarget.elements)) {
    const {
      name,
      value,
      multiple,
      files,
      selectedOptions,
    } = input as HTMLFormElement;
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
        if (
          schema.selectMultipleGrouped[name] &&
          schema.selectMultipleGrouped[name].submit
        ) {
          const parents =
            schema.selectMultipleGrouped[name].submit[option.value];
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
    {Object.keys(schema).map(groupKey =>
      Object.keys(schema[groupKey]).map(key => getFormType(groupKey, key)),
    )}
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
