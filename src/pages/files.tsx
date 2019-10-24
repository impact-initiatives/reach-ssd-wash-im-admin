import React from 'react';
import { useQuery } from '@apollo/react-hooks';

import PageHeader from '../components/page-header';
import PageFooter from '../components/page-footer';
import FileTable from '../components/file-table';
import SEO from '../components/seo';
import { LIST_DOCUMENTS } from '../config/graphql';
import applyLabels from '../utils/apply-labels';

const sort = (a: Data, b: Data): number => b.endDate.localeCompare(a.endDate);

const FilesPage = () => {
  const { data } = useQuery(LIST_DOCUMENTS);
  return (
    <div>
      <SEO title="Files" />
      <PageHeader tab="/files" />
      <section className="section">
        <div className="container">
          <FileTable
            data={
              data && data.listDocuments
                ? applyLabels(
                    data.listDocuments
                      .filter((d: Data) => d.status === 'PUBLISHED')
                      .sort(sort),
                  )
                : []
            }
          />
        </div>
      </section>
      <PageFooter />
    </div>
  );
};

export default FilesPage;
