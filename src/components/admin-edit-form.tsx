import React, { useState, useEffect } from 'react';
import { navigate } from 'gatsby';
import { useMutation } from '@apollo/react-hooks';
import jwtDecode from 'jwt-decode';

import {
  UploadField,
  TitleField,
  EndDateField,
  AdminField,
} from '../utils/get-form-defaults';
import { SelectOne, SelectMultiple } from '../utils/get-form-type';
import { schemaTags } from '../config/schema';
import { UPDATE_DOCUMENT } from '../config/graphql';
import handleSubmit from '../utils/upload-functions';
import { getToken } from '../utils/wrap-root-element';

interface Props {
  loading: boolean;
  data: Data;
}

interface State {
  loading: boolean;
  admin: boolean;
}

const statusOptions = [
  { value: 'DRAFT', label: 'Draft' },
  { value: 'PUBLISHED', label: 'Published' },
  { value: 'DELETE', label: 'Delete' },
];

const componentDidMount = (setState: Function) => {
  getToken
    .then(accessToken => {
      const token = jwtDecode(accessToken);
      const admin = Boolean(token && token.permissions.includes('admin'));
      setState((state: State) => ({ ...state, admin }));
    })
    .catch(() => {});
};

const AdminEditForm = ({ data }: Props) => {
  const [state, setState] = useState({ loading: false, admin: false });
  const [updateDocument] = useMutation(UPDATE_DOCUMENT);
  useEffect(() => componentDidMount(setState), []);
  const loadingClass = state.loading ? ' is-loading' : '';
  return (
    <form onSubmit={e => handleSubmit(e, setState, updateDocument, data)}>
      <UploadField defaultValue={data.file} />
      <TitleField defaultValue={data.title} />
      <EndDateField defaultValue={data.endDate} />
      {schemaTags.map(({ value, label, multiple, options }) =>
        multiple ? (
          <SelectMultiple
            key={value}
            value={value}
            label={label}
            options={options}
            defaultValue={data[value]}
          />
        ) : (
          <SelectOne
            key={value}
            value={value}
            label={label}
            options={options}
            defaultValue={data[value]}
          />
        ),
      )}
      <AdminField defaultAdmin1={data.admin1} defaultAdmin2={data.admin2} />
      {state.admin ? (
        <div>
          <hr />
          <div className="box has-background-warning">
            <h5 className="title is-5">Admin Controls</h5>
            <SelectOne
              value="status"
              label="Status"
              options={statusOptions}
              defaultValue={data.status}
            />
          </div>
        </div>
      ) : (
        <input type="hidden" name="status" value={data.status} />
      )}
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
            onClick={() => navigate('/admin')}
          >
            Cancel
          </button>
        </p>
      </div>
    </form>
  );
};

export default AdminEditForm;
