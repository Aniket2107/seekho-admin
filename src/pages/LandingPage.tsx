import React from "react";
import Navbar from "../components/Navbar";
import "../styles/landing.css";

const LandingPage = (): JSX.Element => {
  return (
    <div>
      <div className="container">
        <Navbar />
      </div>
      <div className="container">
        <div className="row custom-section d-flex align-items-center">
          <div className="col-12 col-lg-4">
            <h2>SeeKho</h2>
            <h3>Start Your Journey</h3>
            <p>A Way To Connect To Different Cultures</p>
            <a href="login">GET STARTED</a>
          </div>
          <div className="col-12 col-lg-8">
            <img src="assets/images/mainbenner.png" alt="Team process banner" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
