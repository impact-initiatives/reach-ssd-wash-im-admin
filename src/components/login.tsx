import React from 'react';

import LoginForm from './login-form';
import PageFooter from './page-footer';

const LoginPage = () => (
  <section className="hero is-fullheight">
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
