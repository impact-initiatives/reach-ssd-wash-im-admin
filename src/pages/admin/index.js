import React from 'react';

import AdminForm from '../../components/admin-form';
import PageHeader from '../../components/page-header';
import PageFooter from '../../components/page-footer';

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
