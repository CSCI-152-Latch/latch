import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { logout } from "../../actions/auth";

const Navbar2 = ({ auth: { isAuthenticated, loading }, logout }) => {
  const authLinks = (
    <ul className="navbar-nav">
      <li className="logo">
        <Link to="/" className="nav-link">
          <i className="fas fa-code"></i>
          <span className="link-text logo-text">Latch</span>
        </Link>
      </li>
      <li className="nav-item">
        <Link to="/dashboard" className="nav-link">
          <i className="fas fa-space-shuttle"></i>
          <span className="link-text">dashboard</span>
        </Link>
      </li>
      <li className="nav-item">
        <Link to="/profiles" className="nav-link">
          <i className="fas fa-space-shuttle"></i>
          <span className="link-text">Profiles</span>
        </Link>
      </li>

      <li className="nav-item">
        <Link to="/jobs" className="nav-link">
          <i className="fas fa-space-shuttle"></i>
          <span className="link-text">Jobs</span>
        </Link>
      </li>
      <li className="nav-item">
        <Link to="/documents" className="nav-link">
          <i className="fas fa-space-shuttle"></i>
          <span className="link-text">Documents</span>
        </Link>
      </li>
      <li className="nav-item">
        <Link to="/social" className="nav-link">
          <i className="fas fa-cog"></i>
          <span className="link-text">Social</span>
        </Link>
      </li>
      <li className="nav-item" >
        <Link to="/communityboard" className="nav-link">
        <i className="fas fa-cog"></i>
          <span className="link-text">Community</span>
        </Link>
      </li>
      <li className="nav-item">
        <Link to="/setting" className="nav-link">
          <i className="fas fa-cog"></i>
          <span className="link-text">Settings</span>
        </Link>
      </li>
      <li class="nav-item">
        <a onClick={logout} href="#!" className="nav-link">
          <i className="fas fa-sign-out-alt"></i> Logout
        </a>
      </li>
    </ul>
  );

  const guestLinks = (
    <ul className="navbar-nav">
      <li className="logo">
        <Link to="/" className="nav-link">
          <i className="fas fa-code"></i>
          <span className="link-text logo-text">Latch</span>
        </Link>
      </li>
      <li className="nav-item">
        <Link to="/register" className="nav-link">
          <i className="fas fa-space-shuttle"></i>
          <span className="link-text">Register</span>
        </Link>
      </li>
      <li class="nav-item">
        <Link to="/login" className="nav-link">
          <i className="fas fa-space-shuttle"></i>
          <span className="link-text">Login</span>
        </Link>
      </li>
      <li class="nav-item">
        <Link to="/profiles" className="nav-link">
          <i className="fas fa-user" />{" "}
          <span className="link-text">profiles</span>
        </Link>
      </li>
    </ul>
  );

  return (
    <nav className="navbar">
      {!loading && (
        <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
      )}
    </nav>
  );
};

Navbar2.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout })(Navbar2);
