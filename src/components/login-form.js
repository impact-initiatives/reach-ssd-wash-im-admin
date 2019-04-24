import React from 'react';
import { Auth } from 'aws-amplify';
import { FaLock, FaEnvelope } from 'react-icons/fa';

const handleSubmit = e => {
  e.preventDefault();
  const values = {};
  for (const { name, value } of e.target.elements) values[name] = value;
  Auth.signIn(values.email, values.password)
    .then(() => window.location.reload())
    .catch(() => {});
};

const NormalLoginForm = () => (
  <form onSubmit={handleSubmit}>
    <div className="field">
      <p className="control has-icons-left">
        <input
          className="input"
          type="email"
          name="email"
          placeholder="Email"
          autoComplete="username"
          required={true}
          aria-required="true"
          aria-label="Email"
        />
        <span className="icon is-small is-left">
          <FaEnvelope />
        </span>
      </p>
    </div>
    <div className="field">
      <p className="control has-icons-left">
        <input
          className="input"
          type="password"
          name="password"
          placeholder="Password"
          autoComplete="current-password"
          required={true}
          aria-required="true"
          aria-label="Password"
        />
        <span className="icon is-small is-left">
          <FaLock />
        </span>
      </p>
    </div>
    <div className="field">
      <p className="control">
        <button className="button is-link">Login</button>
      </p>
    </div>
  </form>
);

export default NormalLoginForm;
