import React from 'react';
import { graphql } from 'gatsby';

import PageHeader from '../components/page-header';
import PageFooter from '../components/page-footer';
import TableauMaps from '../components/tableau-maps';
import SEO from '../components/seo';

interface Props {
  data: {
    allImageSharp: {
      edges: {
        node: {
          fluid: {
            src: string;
          };
        };
      };
    };
  };
}

const MapsPage = ({ data: { allImageSharp } }: Props) => (
  <div>
    <SEO title="Maps" />
    <PageHeader tab="/maps" />
    <section className="section">
      <TableauMaps images={allImageSharp.edges} />
    </section>
    <PageFooter />
  </div>
);

export const query = graphql`
  query {
    allImageSharp {
      edges {
        node {
          fluid {
            sizes
            src
            aspectRatio
            originalName
            srcSet
          }
        }
      }
    }
  }
`;

export default MapsPage;
