import React, { useState, useEffect } from 'react';
import { API, graphqlOperation } from 'aws-amplify';

import awsExports from '../config/aws/aws-exports';
import { getDocument } from '../config/graphql/queries';
import EditForm from './edit-form';
import UploadForm from './upload-form';

const componentDidMount = (state, setState) => {
  const id = window.location.hash.slice(1);
  API.graphql(graphqlOperation(getDocument, { id })).then(({ data }) => {
    const document = data.getDocument;
    const name = document.file.slice(8);
    const file = {
      file: {
        name,
        status: 'done',
        response: { key: document.file },
      },
    };
    const defaultFieList = [
      {
        uid: '1',
        name,
        status: 'done',
        url: awsExports.AWSS3.url + document.file,
      },
    ];
    setState({
      ...state,
      values: { ...document, file },
      defaultFieList,
      loading: false,
    });
  });
};

const AdminEditForm = () => {
  const [state, setState] = useState({
    values: {},
    defaultFieList: [],
    loading: true,
  });
  useEffect(() => componentDidMount(state, setState), []);
  return state.loading ? (
    <UploadForm />
  ) : (
    <EditForm values={state.values} defaultFileList={state.defaultFieList} />
  );
};

export default AdminEditForm;
