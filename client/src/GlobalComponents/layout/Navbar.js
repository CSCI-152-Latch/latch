import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { logout } from "../../actions/auth";

const Navbar = ({ auth: { isAuthenticated, loading }, logout }) => {
  const authLinks = (
    <ul>
      <li>
        <Link to="/dashboard">
          <i className="fas fa-user" /> <span>Dashboard</span>
        </Link>
      </li>
      <li>
        <a onClick={logout} href="#!">
          <i className="fas fa-sign-out-alt"></i> Logout
        </a>
      </li>
      <li>
        <Link to="/profiles">
          <i className="fas fa-user" /> <span>Profiles</span>
        </Link>
      </li>
      <li>
        <Link to="/social">
          <i className="fas fa-user" /> <span>Social</span>
        </Link>
      </li>
      <li>
        <Link to="/setting">
          <i className="fas fa-user" /> <span>Setting</span>
        </Link>
      </li>
      <li>
        <Link to="/communityboard">
          <i className="fas fa-user" /> <span>Community Board</span>
        </Link>
      </li>
    </ul>
  );

  const guestLinks = (
    <ul>
      <li>
        <a href="#!">Developers</a>
      </li>
      <li>
        <Link to="/register">Register</Link>
      </li>
      <li>
        <Link to="/login">Login</Link>
      </li>
      <li>
        <Link to="/profiles">
          <i className="fas fa-user" /> <span>profiles</span>
        </Link>
      </li>
    </ul>
  );

  return (
    <nav className="navbar bg-dark">
      <h1>
        <Link to="/">
          <i className="fas fa-code"></i> Latch
        </Link>
      </h1>
      {!loading && (
        <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
      )}
    </nav>
  );
};

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { logout })(Navbar);
