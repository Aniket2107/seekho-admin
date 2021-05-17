import React from "react";
import { Link } from "react-router-dom";
import "../styles/sidebar.css";

const AdLeft = () => {
  return (
    <div className="wrapper">
      <div className="sidebar">
        <h2>Seekho India</h2>
        <ul>
          <li>
            <Link to="/dashboard">
              <i className="fas fa-home"></i>Home
            </Link>
          </li>
          <li>
            <Link to="/manage-vocabs">
              <i className="fas fa-user"></i>Vocabs
            </Link>
          </li>
          <li>
            <Link to="/add-language">
              <i className="fas fa-address-card"></i>Languages
            </Link>
          </li>
          <li>
            <Link to="#">
              <i className="fas fa-project-diagram"></i>Questions
            </Link>
          </li>
          <li>
            <Link to="#">
              <i className="fas fa-blog"></i>Users
            </Link>
          </li>
        </ul>
        <div className="social_media">
          <Link to="#">
            <i className="fab fa-facebook-f"></i>
          </Link>
          <Link to="#">
            <i className="fab fa-twitter"></i>
          </Link>
          <Link to="#">
            <i className="fab fa-instagram"></i>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdLeft;
