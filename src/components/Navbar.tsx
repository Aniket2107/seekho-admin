import React from "react";
import "../styles/landing.css";

const Navbar = () => {
  return (
    <header className="head my-3">
      <nav className="navbar navbar-expand-lg navbar-light head__custom-nav">
        <a className="navbar-brand d-flex align-items-center" href="#">
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
              <a className="nav-link" href="/">
                Home
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                About us
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                Work
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                Info
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link text-primary" href="#">
                Contact us
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
