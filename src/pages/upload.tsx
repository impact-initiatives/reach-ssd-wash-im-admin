import React, { useEffect } from 'react';
import { navigate } from 'gatsby';

import SEO from '../components/seo';
import UploadForm from '../components/upload-form';
import PageHeader from '../components/page-header';
import PageFooter from '../components/page-footer';
import { useAuth0 } from '../utils/react-auth0-wrapper';

const componentDidMount = (loadingAuth: boolean, isAuthenticated: boolean) => {
  if (!loadingAuth && !isAuthenticated) navigate('/');
};

const UploadPage = () => {
  const { loading: loadingAuth, isAuthenticated } = useAuth0();
  useEffect(() => componentDidMount(loadingAuth, isAuthenticated), [
    loadingAuth,
    isAuthenticated,
  ]);
  return (
    <div>
      <SEO title="Upload" />
      <PageHeader tab="/upload" />
      <section className="section">
        <div className="container is-tablet">
          <UploadForm />
        </div>
      </section>
      <PageFooter />
    </div>
  );
};

export default UploadPage;
