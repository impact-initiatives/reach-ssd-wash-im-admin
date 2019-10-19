import React, { useEffect } from 'react';
import { navigate } from 'gatsby';
import { useQuery } from '@apollo/react-hooks';

import PageHeader from '../../components/page-header';
import PageFooter from '../../components/page-footer';
import AdminForm from '../../components/admin-form';
import SEO from '../../components/seo';
import { LIST_DOCUMENTS } from '../../config/graphql';
import applyLabels from '../../utils/apply-labels';
import { useAuth0 } from '../../utils/react-auth0-wrapper';

interface Props {
  loading: boolean;
  data: {
    listDocuments: Data[];
  };
}

const componentDidMount = (loadingAuth: boolean, isAuthenticated: boolean) => {
  if (!loadingAuth && !isAuthenticated) navigate('/');
};

const sort = (a: Data, b: Data): number => b.createdAt - a.createdAt;

const AdminPage = () => {
  const { loading, data } = useQuery(LIST_DOCUMENTS);
  const { loading: loadingAuth, isAuthenticated } = useAuth0();
  useEffect(() => componentDidMount(loadingAuth, isAuthenticated), [
    isAuthenticated,
    loadingAuth,
  ]);
  return (
    <div>
      <SEO title="Admin" />
      <PageHeader tab="/admin" />
      <section className="section">
        <div className="container">
          <AdminForm
            data={
              data && data.listDocuments
                ? applyLabels(data.listDocuments.sort(sort))
                : []
            }
            loading={loading}
          />
        </div>
      </section>
      <PageFooter />
    </div>
  );
};

export default AdminPage;
