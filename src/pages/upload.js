import React from 'react';

import UploadForm from '../components/upload-form';
import PageHeader from '../components/page-header';
import PageFooter from '../components/page-footer';

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
