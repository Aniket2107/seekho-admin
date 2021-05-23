import React from "react";
import { Link, Redirect } from "react-router-dom";
import "../styles/sidebar.css";

const AdLeft: React.FC = () => {
  const handleLogout = () => {
    localStorage.removeItem("jwt");
    return <Redirect to="/login" />;
  };

  return (
    <div className="wrapper">
      <div className="sidebar">
        <h2>Seekho.in</h2>
        <ul>
          <li>
            <Link to="/dashboard">
              <i className="fas fa-home"></i>Home
            </Link>
          </li>
          <li>
            <Link to="/manage-vocabs">
              <i className="fas fa-play-circle"></i>Vocabs
            </Link>
          </li>
          <li>
            <Link to="/manage-languages">
              <i className="fas fa-language"></i>Languages
            </Link>
          </li>
          <li>
            <Link to="/manage-questions">
              <i className="fas fa-book"></i>Questions
            </Link>
          </li>
          <li>
            <Link to="/manage-users">
              <i className="fas fa-user-circle"></i>Users
            </Link>
          </li>
          <li>
            <Link to="/feedbacks">
              <i className="far fa-comment-alt mr-2"></i>Feedbacks
            </Link>
          </li>
          <li>
            <a href="" onClick={handleLogout}>
              <i className="fas fa-sign-out-alt"></i>Logout
            </a>
          </li>
        </ul>
        <div className="social_media">
          <a
            href="https://github.com/Aniket2107/seekho-backend"
            target="_blank"
          >
            <i className="fab fa-github"></i>
          </a>
          <a href="https://instagram.com/aniket.ts" target="_blank">
            <i className="fab fa-instagram"></i>
          </a>
          <a href="https://github.com/Aniket2107/seekho-admin" target="_blank">
            <i className="fab fa-github"></i>
          </a>
        </div>
      </div>
    </div>
  );
};

export default AdLeft;
