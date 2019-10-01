import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/react-hooks';

import SEO from '../../components/seo';
import AdminEditForm from '../../components/admin-edit-form';
import PageHeader from '../../components/page-header';
import PageFooter from '../../components/page-footer';
import { LIST_DOCUMENTS } from '../../config/graphql';
import { dataTpl } from '../../config/schema';

const componentDidMount = (setId: Function) =>
  setId(() => window.location.hash.slice(1));

const UploadPage = () => {
  const [id, setId] = useState('');
  useEffect(() => componentDidMount(setId), []);
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
