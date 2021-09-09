import { useState, useEffect } from "react";
import { API } from "../../backend";

import Navbar from "../../components/Navbar";
import "../../styles/landing.css";

const LandingPage = (): JSX.Element => {
  const [showModal, setShowModal] = useState(true);

  useEffect(() => {
    fetch(`${API}`)
      .then((res) => res.json())
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="blur">
      <div className="container">
        <Navbar />
      </div>

      {showModal && (
        <div
          style={{
            zIndex: 999,
            position: "absolute",
            top: "20%",
            left: "30%",
          }}
        >
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5
                  className="modal-title text-danger"
                  id="exampleModalLongTitle"
                >
                  Attention!!! Users
                </h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                  onClick={() => setShowModal(false)}
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                A good news, now you can download our app with just a click.
                Just click on the download now button ( or Download App link on
                the navbar ) and enjoy our seamless fast and user friendly
                learning app absolutly free. Thank you
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-dismiss="modal"
                  onClick={() => setShowModal(false)}
                >
                  Close
                </button>
                <a
                  className="btn btn-success"
                  href="https://drive.google.com/file/d/1smGtjgFyBXH8q1WO0qGu1lyZZXucASvj/view"
                  rel="noreferrer"
                  target="_blank"
                >
                  Download Now
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

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
