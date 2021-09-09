import React from "react";
import { Link } from "react-router-dom";
import "../styles/landing.css";

const Navbar = () => {
  return (
    <header className="head my-3">
      <nav className="navbar navbar-expand-lg navbar-light head__custom-nav">
        <a className="navbar-brand d-flex align-items-center" href="!#">
          <img src="assets/images/logo.png" alt="website logo" />
          <span>SeeKho</span>
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
        >
          <span>
            <img src="assets/images/menu.png" alt="" />
          </span>
        </button>
        <div
          className="collapse navbar-collapse justify-content-end"
          id="navbarNav"
        >
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/about-us">
                About us
              </Link>
            </li>
            <li className="nav-item">
              <a
                className="nav-link"
                href="https://drive.google.com/file/d/1smGtjgFyBXH8q1WO0qGu1lyZZXucASvj/view"
                rel="noreferrer"
                target="_blank"
              >
                Download App
              </a>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-primary" to="/contact-us">
                Contact us
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/login">
                Login
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
