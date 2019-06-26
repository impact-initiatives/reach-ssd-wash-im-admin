import React from 'react';
import { ApolloProvider } from 'react-apollo';
import { Rehydrated } from 'aws-appsync-react';

import client from './src/utils/aws-appsync-client';
import IsLoggedIn from './src/utils/is-logged-in';

export const wrapRootElement = ({ element }) => (
  <ApolloProvider client={client}>
    <Rehydrated>
      <IsLoggedIn element={element} />
    </Rehydrated>
  </ApolloProvider>
);
