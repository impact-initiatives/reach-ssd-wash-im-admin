import React, { useState } from 'react';
import { navigate } from 'gatsby';

import getFormType from '../utils/get-form-type';
import schema from '../config/schema/schema';
import handleSubmit from '../utils/upload-functions';

interface Props {
  loading: boolean;
  data: Data;
}

const AdminEditForm = ({ loading, data }: Props) => {
  const [state, setState] = useState({ loading: false });
  const loadingClass = state.loading ? ' is-loading' : '';
  return (
    <form onSubmit={e => handleSubmit(e, setState, data)}>
      {Object.keys(schema).map(groupKey =>
        Object.keys(schema[groupKey]).map(key =>
          getFormType(groupKey, key, data),
        ),
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
