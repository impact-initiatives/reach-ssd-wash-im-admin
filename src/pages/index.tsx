import React from 'react';

import SEO from '../components/seo';
import HomeForm from '../components/home-form';
import PageHeader from '../components/page-header';
import PageFooter from '../components/page-footer';
import exports from '../config/exports';

const IndexPage = () => (
  <div>
    <SEO title="Home" />
    <PageHeader tab="/" />
    <section className="section">
      <div className="container is-fluid">
        <h1 className="title has-text-centered">{exports.site.title}</h1>
        <HomeForm />
      </div>
    </section>
    <PageFooter />
  </div>
);

export default IndexPage;
