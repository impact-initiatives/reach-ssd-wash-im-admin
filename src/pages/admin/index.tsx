import React from 'react';
import { useQuery } from '@apollo/react-hooks';

import PageHeader from '../../components/page-header';
import PageFooter from '../../components/page-footer';
import AdminForm from '../../components/admin-form';
import SEO from '../../components/seo';
import { LIST_DOCUMENTS } from '../../config/graphql';
import applyLabels from '../../utils/apply-labels';

interface Props {
  loading: boolean;
  data: {
    listDocuments: Data[];
  };
}

const sort = (a: Data, b: Data): number => b.createdAt - a.createdAt;

const AdminPage = () => {
  const { loading, data } = useQuery(LIST_DOCUMENTS);
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
