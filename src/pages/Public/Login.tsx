import React, { useState } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";
import "../../styles/login.css";

import { API } from "../../backend";
import { isAuthenticated } from "../../private/helper";
import Navbar from "../../components/Navbar";

const Login = (): JSX.Element => {
  //States
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const [didRedirect, setDidRedirect] = useState(false);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<string>("");

  //Helper function
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setError("");
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading("Loading...");

    axios({
      method: "POST",
      url: `${API}auth/admin/login`,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      data: values,
    })
      .then((res) => {
        const payload = {
          user: res.data.data.user,
          token: res.data.data.token,
        };
        localStorage.setItem("jwt", JSON.stringify(payload));
        setDidRedirect(true);
      })
      .catch((err) => {
        setLoading("");
        setError(
          err.response
            ? err.response.data.msg
            : "Something went wrong, Try again"
        );
      });
  };

  const preformRedirect = () => {
    if (didRedirect && isAuthenticated()) {
      return <Redirect to="/dashboard" />;
    }
  };

  return (
    <div className="container">
      {preformRedirect()}
      <Navbar />
      <div className="mainbenner">
        <img src="assets/images/mainbenner.png" alt="Team process banner" />
      </div>
      <div className="loginpg">
        <h3>Admin Login</h3>
        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              name="email"
              aria-describedby="emailHelp"
              value={values.email}
              onChange={handleInput}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              name="password"
              value={values.password}
              onChange={handleInput}
              required
            />
          </div>
          {error && <h4 className="text-danger">{error}</h4>}
          {loading && <h4 className="text-success ">{loading}</h4>}
          <button type="submit" className="btn btn-primary">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
