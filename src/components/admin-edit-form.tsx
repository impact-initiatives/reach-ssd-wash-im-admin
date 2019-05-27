import React from 'react';

import getFormType from '../utils/get-form-type';
import schema from '../config/schema/schema';
import handleSubmit from '../utils/upload-functions';

interface Props {
  loading: boolean;
  data: Data;
}

const AdminEditForm = ({ loading, data }: Props) => (
  <form onSubmit={e => handleSubmit(e, data)}>
    {Object.keys(schema).map(groupKey =>
      Object.keys(schema[groupKey]).map(key =>
        getFormType(groupKey, key, data),
      ),
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

export default AdminEditForm;
