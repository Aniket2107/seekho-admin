import React from "react";
import AdLeft from "../../components/AdLeft";
import AdRight from "../../components/AdRight";

const Dashboard = (): JSX.Element => {
  return (
    <div>
      <AdLeft />
      <h1 className="text-center">Welcome! Admin</h1>
      <div style={{ margin: "0 auto", width: "50%" }}>
        <AdRight />
      </div>
    </div>
  );
};

export default Dashboard;
