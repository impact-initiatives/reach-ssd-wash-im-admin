import React from 'react';

import LoginForm from '../components/login-form';
import LogoutForm from '../components/logout-form';
import PageHeader from '../components/page-header';
import PageFooter from '../components/page-footer';

const LoginPage = () => (
  <section className="hero is-fullheight">
    <PageHeader selected="login" />
    <div className="hero-body">
      <div className="container">
        <div className="columns is-centered">
          <div className="column is-5-tablet is-4-desktop is-3-widescreen">
            <LoginForm />
          </div>
        </div>
      </div>
    </div>
    <PageFooter />
  </section>
);

export default LoginPage;
