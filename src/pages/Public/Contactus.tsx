import React, { useState, useEffect } from "react";

import axios from "axios";
import { API } from "../../backend";

import Navbar from "../../components/Navbar";

const Contactus = () => {
  const [ctInput, setInput] = useState({
    name: "",
    email: "",
    contact: "",
    subject: "",
    message: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleInput = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setError("");
    setInput({
      ...ctInput,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    axios({
      method: "POST",
      url: `${API}feedbacks`,
      data: ctInput,
    })
      .then((res) => {
        setSuccess("Response sent !!");
        setInput({
          ...ctInput,
          name: "",
          email: "",
          contact: "",
          subject: "",
          message: "",
        });
      })
      .catch((err) => {
        setError(
          err.response
            ? err.response.data.msg
            : "Something went wrong, Try again"
        );
      });
  };

  const feedbackForm = () => {
    return (
      <form onSubmit={handleSubmit} className="text-dark">
        <h2>Contact Us</h2>
        {error && (
          <div className="alert alert-danger mt-3">
            <h4>{error}</h4>
          </div>
        )}
        {success && (
          <div className="alert alert-success mt-3">
            <h4>{success}</h4>
          </div>
        )}
        <div className="form-group">
          <label htmlFor="name">Name: </label>
          <input
            type="text"
            id="name"
            className="form-control"
            value={ctInput.name}
            name="name"
            onChange={handleInput}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email: </label>
          <input
            type="email"
            id="email"
            className="form-control"
            value={ctInput.email}
            name="email"
            onChange={handleInput}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="contact">Contact Number: </label>
          <input
            type="text"
            id="contact"
            className="form-control"
            value={ctInput.contact}
            name="contact"
            onChange={handleInput}
          />
        </div>
        <div className="form-group">
          <label htmlFor="subject">Subject: </label>
          <input
            type="text"
            id="subject"
            className="form-control"
            value={ctInput.subject}
            name="subject"
            onChange={handleInput}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="message">Message</label>
          <textarea
            id="message"
            className="form-control"
            value={ctInput.message}
            name="message"
            onChange={handleInput}
            required
          />
        </div>
        <button className="btn btn-primary" type="submit">
          Submit
        </button>
      </form>
    );
  };

  return (
    <div className="container">
      <Navbar />
      <div className="row bg-white" style={{ padding: "5%" }}>
        <div className="col-lg-6 col-md-6">
          <img
            src="assets/images/contactus.png"
            alt="contact us image"
            height="500"
            width="500"
          />
        </div>
        <div className="col-6">{feedbackForm()}</div>
      </div>
    </div>
  );
};

export default Contactus;
