import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import axios from "axios";
import { API } from "../../../backend";

import AdLeft from "../../../components/AdLeft";

interface dataType {
  _id: string;
  language: string;
  levels: string[];
}

const Managelanguages = () => {
  const [data, setData] = useState<dataType[]>([]);

  const preload = () => {
    axios({
      method: "GET",
      url: `${API}lang/all`,
    })
      .then((res) => {
        console.log(res.data.data);
        setData(res.data.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    preload();

    return () => {
      setData([]);
    };
  }, []);

  const dataTable = (): JSX.Element => {
    return (
      <div className="container">
        {data.length > 0 ? (
          data.map((dt, idx) => {
            return (
              <div
                key={dt._id}
                className="container border border-primary rounded p-4 m-4"
              >
                <details>
                  <summary style={{ cursor: "pointer", color: "#4b4276" }}>
                    <strong>{dt.language}</strong>
                  </summary>
                  <div className="container m-2">
                    <ul>
                      {dt.levels.length > 0 ? (
                        dt.levels.map((lvl, idx) => {
                          return <li key={idx + Math.random()}>{lvl}</li>;
                        })
                      ) : (
                        <h5>Levels not found</h5>
                      )}
                    </ul>
                  </div>
                </details>
              </div>
            );
          })
        ) : (
          <h4>No language available</h4>
        )}
      </div>
    );
  };

  return (
    <div>
      <AdLeft />
      <div style={{ marginLeft: "220px" }}>
        <h1 className="ml-4">Manage Language & Levels</h1>
        <Link
          to="/add-language"
          style={{ float: "right", marginRight: "30px" }}
          className="btn btn-md btn-danger"
        >
          Add Language
        </Link>
        <div style={{ width: "70%", marginTop: "3%" }}>{dataTable()}</div>
      </div>
    </div>
  );
};

export default Managelanguages;
