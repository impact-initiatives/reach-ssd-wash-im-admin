import Auth from '@aws-amplify/auth';
import Storage from '@aws-amplify/storage';
import AWSAppSyncClient, { buildSync, AUTH_TYPE } from 'aws-appsync';

import awsExports from '../config/aws/aws-exports';
import { listDocuments, listDocumentsDelta } from '../config/graphql/queries';

if (typeof window === 'undefined') global.fetch = import('node-fetch');

Auth.configure(awsExports.Auth);
Storage.configure(awsExports.AWSS3);

const client = new AWSAppSyncClient({
  url: awsExports.aws_appsync_graphqlEndpoint,
  region: awsExports.aws_appsync_region,
  auth: {
    type: AUTH_TYPE.AMAZON_COGNITO_USER_POOLS,
    jwtToken: async () =>
      (await Auth.currentSession()).getIdToken().getJwtToken(),
  },
});

client.hydrated().then(() => {
  client.sync(
    buildSync('Document', {
      baseQuery: { query: listDocuments },
      deltaQuery: { query: listDocumentsDelta },
    }),
  );
});

export default client;
