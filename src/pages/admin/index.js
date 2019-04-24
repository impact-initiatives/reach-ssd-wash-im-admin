import React from 'react';
import Amplify from 'aws-amplify';

import AdminForm from '../../components/admin-form';
import PageHeader from '../../components/page-header';
import PageFooter from '../../components/page-footer';
import awsExports from '../../config/aws/aws-exports';

Amplify.configure(awsExports);

const AdminPage = () => (
  <div>
    <PageHeader selected="admin" />
    <section className="section">
      <div className="container">
        <AdminForm />
      </div>
    </section>
    <PageFooter />
  </div>
);

export default AdminPage;
