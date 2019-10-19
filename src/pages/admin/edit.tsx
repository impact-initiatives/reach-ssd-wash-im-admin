import React, { useState, useEffect } from 'react';
import { navigate } from 'gatsby';
import { useQuery } from '@apollo/react-hooks';

import SEO from '../../components/seo';
import AdminEditForm from '../../components/admin-edit-form';
import PageHeader from '../../components/page-header';
import PageFooter from '../../components/page-footer';
import { LIST_DOCUMENTS } from '../../config/graphql';
import { dataTpl } from '../../config/schema';
import { useAuth0 } from '../../utils/react-auth0-wrapper';

const componentDidMount = (
  setId: Function,
  loadingAuth: boolean,
  isAuthenticated: boolean,
) => {
  setId(() => window.location.hash.slice(1));
  if (!loadingAuth && !isAuthenticated) navigate('/');
};

const UploadPage = () => {
  const [id, setId] = useState('');
  const { loading: loadingAuth, isAuthenticated } = useAuth0();
  useEffect(() => componentDidMount(setId, loadingAuth, isAuthenticated), [
    loadingAuth,
    isAuthenticated,
  ]);
  const { loading, data } = useQuery(LIST_DOCUMENTS);
  return (
    <div>
      <SEO title="Admin" />
      <PageHeader tab="/admin" />
      <section className="section">
        <div className="container is-tablet">
          {id ? (
            <AdminEditForm
              data={data.listDocuments.find(d => d.id === id) || dataTpl}
              loading={loading}
            />
          ) : null}
        </div>
      </section>
      <PageFooter />
    </div>
  );
};

export default UploadPage;
