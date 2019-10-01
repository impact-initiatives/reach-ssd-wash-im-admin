import React, { useEffect } from 'react';
import { ApolloProvider, useQuery } from '@apollo/react-hooks';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { persistCache } from 'apollo-cache-persist';
import { setContext } from 'apollo-link-context';
import { createHttpLink } from 'apollo-link-http';
import { createPersistedQueryLink } from 'apollo-link-persisted-queries';

import { Auth0Provider, useAuth0 } from './react-auth0-wrapper';
import { LIST_DOCUMENTS, GET_HOME_PAGE } from '../config/graphql';
import exports from '../config/exports';

if (typeof window === 'undefined') global.fetch = import('node-fetch');

interface Props {
  element: Element;
}

let resolveToken = (_: string) => {};
let rejectToken = () => {};
const getToken = new Promise((resolve, reject) => {
  resolveToken = resolve;
  rejectToken = reject;
});

const cache = new InMemoryCache();
if (typeof window !== 'undefined')
  persistCache({ cache, storage: window.localStorage });
const httpOptions = { uri: exports.apollo.uri, useGETForQueries: true };
const httpLink = createHttpLink(httpOptions);
const queryLink = createPersistedQueryLink({ useGETForHashedQueries: true });
const authLink = setContext((_, { headers }) =>
  getToken
    .then(token => ({
      headers: { ...headers, Authorization: 'Bearer ' + token },
    }))
    .catch(() => ({ headers })),
);
const link = authLink.concat(queryLink).concat(httpLink);
const client = new ApolloClient({ cache, link });

const onRedirectCallback = appState => {
  window.history.replaceState(
    {},
    document.title,
    appState && appState.targetUrl
      ? appState.targetUrl
      : window.location.pathname,
  );
};

const auth0Loaded = (loading: Boolean, getTokenSilently: Function) => {
  if (!loading)
    getTokenSilently()
      .then((accessToken: string) => resolveToken(accessToken))
      .catch(rejectToken);
};

const Loading = ({ element }: Props) => {
  const { loading, getTokenSilently } = useAuth0();
  const fetchPolicy = 'cache-and-network';
  useQuery(GET_HOME_PAGE, { fetchPolicy });
  useQuery(LIST_DOCUMENTS, { fetchPolicy });
  useEffect(() => auth0Loaded(loading, getTokenSilently), [
    getTokenSilently,
    loading,
  ]);
  return element;
};

const wrapRootElement = ({ element }: Props) => (
  <Auth0Provider
    domain={exports.auth0.domain}
    client_id={exports.auth0.clientId}
    redirect_uri={exports.auth0.redirectUri}
    audience={exports.auth0.audience}
    onRedirectCallback={onRedirectCallback}
  >
    <ApolloProvider client={client}>
      <Loading element={element} />
    </ApolloProvider>
  </Auth0Provider>
);

export default wrapRootElement;
export { getToken };
