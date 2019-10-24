import React, { useState } from 'react';
import { navigate } from 'gatsby';
import { useMutation } from '@apollo/react-hooks';

import {
  UploadField,
  TitleField,
  EndDateField,
  AdminField,
} from '../utils/get-form-defaults';
import { SelectOne, SelectMultiple } from '../utils/get-form-type';
import { schemaTags } from '../config/schema';
import { CREATE_DOCUMENT } from '../config/graphql';
import handleSubmit from '../utils/upload-functions';

const UploadForm = () => {
  const [state, setState] = useState({ loading: false, admin: false });
  const loadingClass = state.loading ? ' is-loading' : '';
  const [createDocument] = useMutation(CREATE_DOCUMENT);
  return (
    <form onSubmit={e => handleSubmit(e, setState, createDocument)}>
      <UploadField />
      <TitleField />
      <EndDateField />
      {schemaTags.map(({ value, label, multiple, options }) =>
        multiple ? (
          <SelectMultiple
            key={value}
            value={value}
            label={label}
            options={options}
          />
        ) : (
          <SelectOne
            key={value}
            value={value}
            label={label}
            options={options}
          />
        ),
      )}
      <AdminField />
      <br />
      <div className="field is-grouped is-grouped-right">
        <div className="control">
          <button className={`button is-primary is-rounded ${loadingClass}`}>
            Submit
          </button>
        </div>
        <p className="control">
          <button
            className="button is-light is-rounded"
            type="button"
            onClick={() => navigate('/')}
          >
            Cancel
          </button>
        </p>
      </div>
    </form>
  );
};

export default UploadForm;
