import React, { useState, useEffect } from 'react';

import EditForm from './edit-form';

interface State {
  id: string;
}

const componentDidMount = (setState: Function) => {
  const id = window.location.hash.slice(1);
  setState((state: State) => ({ ...state, id }));
};

const AdminEditForm = () => {
  const [state, setState] = useState({
    values: {},
    defaultFieList: [],
    id: '',
  });
  useEffect(() => componentDidMount(setState), []);
  return (
    <EditForm values={state.values} defaultFileList={state.defaultFieList} />
  );
};

export default AdminEditForm;
