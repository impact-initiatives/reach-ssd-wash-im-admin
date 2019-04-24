import React from 'react';
import Amplify from 'aws-amplify';

import UploadForm from '../components/upload-form';
import PageHeader from '../components/page-header';
import PageFooter from '../components/page-footer';
import awsExports from '../config/aws/aws-exports';

Amplify.configure(awsExports);

const UploadPage = () => (
  <div>
    <PageHeader selected="upload" />
    <section className="section">
      <div className="container is-tablet">
        <UploadForm />
      </div>
    </section>
    <PageFooter />
  </div>
);

export default UploadPage;
