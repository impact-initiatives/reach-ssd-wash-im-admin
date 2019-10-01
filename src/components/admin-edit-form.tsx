import React, { useState, useEffect } from 'react';
import { navigate } from 'gatsby';
import { useMutation } from '@apollo/react-hooks';
import jwtDecode from 'jwt-decode';

import getFormType, { selectOne } from '../utils/get-form-type';
import schema, { schemaStatus } from '../config/schema';
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
      {Object.keys(schema).map(groupKey =>
        Object.keys(schema[groupKey]).map(key =>
          getFormType(groupKey, key, data),
        ),
      )}
      {state.admin ? (
        <div>
          <hr />
          <div className="box has-background-warning">
            <h5 className="title is-5">Admin Controls</h5>
            {selectOne('status', schemaStatus, data.status)}
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
