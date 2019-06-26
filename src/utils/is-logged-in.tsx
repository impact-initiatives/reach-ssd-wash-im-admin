import React, { useState, useEffect } from 'react';
import Auth from '@aws-amplify/auth';

import LoginPage from '../components/login';

interface Props {
  element: Element;
}

const componentDidMount = (setState: Function) => {
  Auth.currentAuthenticatedUser()
    .then(() => setState(() => 'AUTHENTICATED'))
    .catch(() => setState(() => 'UNAUTHENTICATED'));
};

const IsLoggedIn = ({ element }: Props) => {
  const [state, setState] = useState('');
  useEffect(() => componentDidMount(setState), []);
  switch (state) {
    case 'AUTHENTICATED':
      return element;
    case 'UNAUTHENTICATED':
      return <LoginPage />;
    default:
      return null;
  }
};

export default IsLoggedIn;
