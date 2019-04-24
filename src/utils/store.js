import { createStore } from 'redux';

const preloadedState = { edges: [] };

const store = createStore(
  (state, action) =>
    typeof action.type === 'function' ? action.type(state) : state,
  preloadedState,
);

export default store;
