import React from 'react';
import getFormType from '../utils/get-form-type';
import schema from '../config/schema/schema';
import handleSubmit from '../utils/upload-functions';
import { navigate } from 'gatsby';

const UploadForm = () => (
  <form onSubmit={handleSubmit}>
    {Object.keys(schema).map(groupKey =>
      Object.keys(schema[groupKey]).map(key => getFormType(groupKey, key)),
    )}
    <br />
    <div className="field is-grouped is-grouped-right">
      <div className="control">
        <button className="button is-primary is-rounded" type="submit">
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

export default UploadForm;
