import React from 'react';
import { Auth } from 'aws-amplify';

const onClick = () => {
  Auth.signOut()
    .then(() => window.location.reload())
    .catch(() => {});
};

const LogoutForm = () => (
  <button className="button is-primary" onClick={onClick}>
    Log out
  </button>
);

export default LogoutForm;
