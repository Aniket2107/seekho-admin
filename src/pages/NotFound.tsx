import React from "react";
import { Link } from "react-router-dom";

const NotFound = (): JSX.Element => {
  return (
    <div className="container" style={{ width: "50%" }}>
      <h1 className="text-primary text-center bg-warning">Seekho India</h1>

      <div style={{ marginTop: "8%" }}>
        <h3>Oops!</h3>
        <h5>Seems you are lost</h5>
        <Link to="/">Homepage</Link>
      </div>
    </div>
  );
};

export default NotFound;
