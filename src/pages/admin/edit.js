import React from 'react';
import Amplify from 'aws-amplify';

import AdminEditForm from '../../components/admin-edit-form';
import PageHeader from '../../components/page-header';
import PageFooter from '../../components/page-footer';
import awsExports from '../../config/aws/aws-exports';

Amplify.configure(awsExports);

const UploadPage = () => (
  <div>
    <PageHeader selected="admin" />
    <section className="section">
      <div className="container">
        <AdminEditForm />
      </div>
    </section>
    <PageFooter />
  </div>
);

export default UploadPage;
