import React, { useState } from 'react';
import { Link } from 'gatsby';

import logo from '../config/icon.svg';
import { useAuth0 } from '../utils/react-auth0-wrapper';

interface Props {
  tab: string;
}

interface State {
  menuOpen: boolean;
}

const onClick = (state: State, setState: Function) =>
  setState({ menuOpen: !state.menuOpen });

const PageHeader = ({ tab }: Props) => {
  const [state, setState] = useState({ menuOpen: false });
  const isActive = state.menuOpen ? ' is-active' : '';
  const { isAuthenticated, loginWithRedirect, logout } = useAuth0();
  return (
    <nav className="navbar" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <Link className="navbar-item" to="/" aria-label="Home page">
          <img src={logo} alt="logo" style={{ height: 28 }} />
        </Link>
        <button
          className={`button is-white navbar-burger burger${isActive}`}
          aria-label="menu"
          aria-expanded="false"
          onClick={() => onClick(state, setState)}
        >
          <span aria-hidden="true" />
          <span aria-hidden="true" />
          <span aria-hidden="true" />
        </button>
      </div>
      <div className={`navbar-menu${isActive}`}>
        <div className="navbar-start">
          <Link
            className={`navbar-item is-tab${tab === '/' ? ' is-active' : ''}`}
            to="/"
            aria-label="Home page"
          >
            Home
          </Link>
          <Link
            className={`navbar-item is-tab${
              tab === '/files' ? ' is-active' : ''
            }`}
            to="/files"
            aria-label="Files and documents"
          >
            Files
          </Link>
          <Link
            className={`navbar-item is-tab${
              tab === '/maps' ? ' is-active' : ''
            }`}
            to="/maps"
            aria-label="Interactive maps"
          >
            Maps
          </Link>
          {isAuthenticated && (
            <Link
              className={`navbar-item is-tab${
                tab === '/upload' ? ' is-active' : ''
              }`}
              to="/upload"
              aria-label="Upload files"
            >
              Upload
            </Link>
          )}
          {isAuthenticated && (
            <Link
              className={`navbar-item is-tab${
                tab === '/admin' ? ' is-active' : ''
              }`}
              to="/admin"
              aria-label="Admin console"
            >
              Admin
            </Link>
          )}
        </div>
        <div className="navbar-end">
          <div className="navbar-item">
            <div className="buttons">
              {!isAuthenticated && (
                <button
                  className="button is-primary is-rounded"
                  onClick={() => loginWithRedirect({})}
                >
                  Log in
                </button>
              )}
              {isAuthenticated && (
                <button
                  className="button is-primary is-rounded"
                  onClick={() => logout()}
                >
                  Log out
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default PageHeader;
