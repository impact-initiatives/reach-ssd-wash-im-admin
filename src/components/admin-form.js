import React, { useEffect, useState } from 'react';
// import { API, graphqlOperation } ';

import store from '../utils/store';
import getLabels from '../utils/get-labels';
import { listDocuments } from '../config/graphql/queries';

// const onChange = (e, state, setState) => {
//   e.preventDefault();
//   setState({ ...state, selected: e.target.value });
// };

const componentDidMount = (state, setState) => {
  if (!store.getState().edges.length) {
    // API.graphql(graphqlOperation(listDocuments)).then(({ data }) => {
    //   const labeledEdges = getLabels(data.listDocuments);
    //   const edges = labeledEdges.sort((a, b) => b.updatedAt - a.updatedAt);
    //   setState({ ...state, loading: false, edges });
    //   store.dispatch({ type: state => ({ ...state, edges }) });
    // });
  }
};

const AdminForm = () => {
  const [state, setState] = useState({
    selected: 'Draft',
    loading: true,
    edges: store.getState().edges,
  });
  useEffect(() => componentDidMount(state, setState), [state]);
  return (
    <div>
      {state.edges.some(edge => edge.status === 'Published') ? <div /> : null}
    </div>
  );
};

export default AdminForm;
