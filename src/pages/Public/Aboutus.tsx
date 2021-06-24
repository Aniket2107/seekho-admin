import React from "react";
import Navbar from "../../components/Navbar";

const Aboutus = (): JSX.Element => {
  return (
    <div className="container">
      <Navbar />
      <div className="row" style={{ marginTop: "120px" }}>
        <div className="col-lg-6 col-12 col-md-6">
          <img
            src="/assets/images/aboutus.png"
            alt="about image"
            width="500"
            height="350"
          />
        </div>

        <div className="col-md-6 col-lg-6 col-12 mt-4">
          <h1>About Us</h1>
          <p>
            Our mission To help you learn the skills you need to achieve your
            full potential. We empathize with all our learners no matter how
            they are learning. By connecting students all over the INDIA to the
            best we can give, SeeKho INDIA is helping individuals reach their
            goals and pursue their dreams.
          </p>
          <ul>
            <li>Speaking</li>
            <li>Language</li>
            <li>Listening</li>
          </ul>
        </div>
      </div>
    </div>
  );
};
export default Aboutus;
