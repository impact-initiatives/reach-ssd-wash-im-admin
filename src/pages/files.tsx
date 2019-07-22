import React from 'react';
import { Query } from 'react-apollo';

import PageHeader from '../components/page-header';
import PageFooter from '../components/page-footer';
import FileTable from '../components/file-table';
import SEO from '../components/seo';
import { listDocuments } from '../config/graphql-queries';
import applyLabels from '../utils/apply-labels';

interface Props {
  loading: boolean;
  data: {
    listDocuments: Data[];
  };
}

const sort = (a: Data, b: Data): number => b.createdAt - a.createdAt;

const FilesPage = () => (
  <div>
    <SEO title="Files" />
    <PageHeader tab="/files" />
    <section className="section">
      <div className="container">
        <Query query={listDocuments}>
          {({ loading, data: { listDocuments } }: Props) => (
            <FileTable
              data={
                listDocuments
                  ? applyLabels(
                      listDocuments
                        .filter(d => d.status === 'PUBLISHED')
                        .sort(sort),
                    )
                  : []
              }
            />
          )}
        </Query>
      </div>
    </section>
    <PageFooter />
  </div>
);

export default FilesPage;
