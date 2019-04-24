import React, { useState } from 'react';
import { Link } from 'gatsby';

import Logo from '../images/wash-icon.svg';

const onClick = (state, setState) => {
  setState({ ...state, menuOpen: !state.menuOpen });
};

const PageHeader = () => {
  const [state, setState] = useState({ menuOpen: false });
  const isActive = state.menuOpen ? ' is-active' : '';
  return (
    <nav className="navbar" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <Link className="navbar-item" to="/">
          <Logo style={{ height: 28 }} />
        </Link>
        <a
          role="button"
          className={`navbar-burger burger${isActive}`}
          aria-label="menu"
          aria-expanded="false"
          onClick={() => onClick(state, setState)}
        >
          <span aria-hidden="true" />
          <span aria-hidden="true" />
          <span aria-hidden="true" />
        </a>
      </div>
      <div className={`navbar-menu${isActive}`}>
        <div className="navbar-start">
          <Link className="navbar-item" to="/">
            Home
          </Link>
          <Link className="navbar-item" to="/upload">
            Upload
          </Link>
          <Link className="navbar-item" to="/admin">
            Admin
          </Link>
        </div>
        <div className="navbar-end">
          <div className="navbar-item">
            <div className="buttons">
              <Link className="button is-light" to="/login">
                Sign up
              </Link>
              <Link className="button is-primary" to="/login">
                Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default PageHeader;
