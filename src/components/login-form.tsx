import React, { useState } from 'react';
import Auth from '@aws-amplify/auth';
import { FaLock, FaEnvelope } from 'react-icons/fa';

const handleSubmit = (
  e: React.FormEvent<HTMLFormElement>,
  setLoading: Function,
) => {
  e.preventDefault();
  setLoading({ loading: true, usernameErr: false, passwordErr: false });
  const values = { email: '', password: '' };
  for (const input of Array.from(e.currentTarget.elements)) {
    const { name, value } = input as HTMLInputElement;
    if (name === 'email') values.email = value;
    if (name === 'password') values.password = value;
  }
  Auth.signIn(values.email, values.password)
    .then(user => {
      console.log(user);
      if (user.challengeName === 'NEW_PASSWORD_REQUIRED') {
        Auth.completeNewPassword(user, values.password, {});
      } else window.location.assign('/');
    })
    .catch(({ code }) => {
      if (code === 'UserNotFoundException')
        setLoading({ loading: false, usernameErr: true, passwordErr: false });
      else if (code === 'NotAuthorizedException')
        setLoading({ loading: false, usernameErr: false, passwordErr: true });
      else setLoading({ loading: false, usernameErr: true, passwordErr: true });
    });
};

const NormalLoginForm = () => {
  const [state, setState] = useState({
    loading: false,
    usernameErr: false,
    passwordErr: false,
  });
  const loadingClass = state.loading ? ' is-loading' : '';
  const usernameErrClass = state.usernameErr ? 'help is-danger' : 'is-hidden';
  const passwordErrClass = state.passwordErr ? 'help is-danger' : 'is-hidden';
  return (
    <form onSubmit={e => handleSubmit(e, setState)}>
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
        <p className={usernameErrClass}>User does not exist</p>
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
        <p className={passwordErrClass}>Password is incorrect</p>
      </div>
      <div className="field">
        <p className="control">
          <button className={`button is-primary is-rounded ${loadingClass}`}>
            Submit
          </button>
        </p>
      </div>
    </form>
  );
};

export default NormalLoginForm;
