import React from "react";

const AdRight = () => {
  return (
    <div className="card">
      <h4 className="card-header">Admin Information</h4>
      <ul className="list-group">
        <li className="list-group-item">
          <span className="badge badge-success mr-2">Name:</span>
          {"Aniket Habib"}
        </li>
        <li className="list-group-item">
          <span className="badge badge-success mr-2">Email:</span>
          {"admin@seekho.in"}
        </li>
        <li className="list-group-item">
          <span className="badge badge-pill badge-danger">Admin area</span>
        </li>
      </ul>
    </div>
  );
};

export default AdRight;
