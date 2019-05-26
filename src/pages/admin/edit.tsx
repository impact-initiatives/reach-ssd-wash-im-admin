import React from 'react';

import SEO from '../../components/seo';
import AdminEditForm from '../../components/admin-edit-form';
import PageHeader from '../../components/page-header';
import PageFooter from '../../components/page-footer';

const UploadPage = () => (
  <div>
    <SEO title="Admin" />
    <PageHeader tab="/admin" />
    <section className="section">
      <div className="container">
        <AdminEditForm />
      </div>
    </section>
    <PageFooter />
  </div>
);

export default UploadPage;
