import React from 'react';
import { graphql } from 'gatsby';

import PageHeader from '../components/page-header';
import PageFooter from '../components/page-footer';
import image from '../images/image-home.jpg';

const DocumentationPage = ({ data }) => (
  <div>
    <PageHeader />
    <section className="section">
      <div className="container">
        <h1 className="title has-text-centered">
          South Sudan WASH Information Management System
        </h1>
        <img src={image} alt="A flooded area in South Sudan" />
        <div className="content" dangerouslySetInnerHTML={{ __html: data.markdownRemark.html }} />
      </div>
    </section>
    <PageFooter />
  </div>
);

export const query = graphql`
  query getMarkdown($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
    }
  }
`;

export default DocumentationPage;
