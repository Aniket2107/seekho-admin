import React, { useState, useEffect } from "react";

import axios from "axios";
import { API } from "../../backend";

import AdLeft from "../../components/AdLeft";

interface feedType {
  name: string;
  email: string;
  subject: string;
  contact: string;
  message: string;
}

const Feedbacks: React.FC = (): JSX.Element => {
  const [feedbacks, setFeedbacks] = useState<feedType[]>([]);
  const [search, setSearch] = useState("");

  const preload = () => {
    axios({
      method: "GET",
      url: `${API}feedbacks`,
    })
      .then((res) => {
        setFeedbacks(res.data.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    preload();

    return () => {
      setFeedbacks([]);
      setSearch("");
    };
  }, []);

  const searchBar = (): JSX.Element => {
    return (
      <div className="form-group w-100 d-flex justify-content-center align-items-center">
        <input
          type="text"
          className="form-control"
          name="search_query"
          style={{
            maxWidth: "500px",
            borderRadius: "15px",
          }}
          id="search_query"
          placeholder="Search for any subject"
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
    );
  };

  const filteredFeeds: Array<feedType> = feedbacks.filter((feed): boolean => {
    return feed.subject.toLowerCase().includes(search.toLowerCase());
  });

  return (
    <div>
      <AdLeft />
      <div style={{ marginLeft: "200px" }}>
        <h1 className="text-center">Feedbacks</h1>
        <br />
        {searchBar()}
        <div className="row" style={{ width: "100%" }}>
          {feedbacks.length > 0 &&
            filteredFeeds.map((fd, idx) => {
              return (
                <div
                  key={idx}
                  className="m-4 col-md-6 col-12 col-lg-6"
                  style={{ width: "45%" }}
                >
                  <div className="card">
                    <div className="card-header">
                      <strong style={{ fontSize: "20px" }}>{fd.subject}</strong>
                    </div>
                    <div className="card-body">
                      <blockquote className="blockquote mb-0">
                        <p style={{ overflow: "auto" }}>{fd.message}</p>
                        <br />
                        <footer className="blockquote-footer">
                          {fd.name}
                          {" / "}
                          <cite title="Source Title">{fd.email}</cite>
                        </footer>
                      </blockquote>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
        {feedbacks.length === 0 && <h5>No feedbacks/reviews ;) </h5>}
      </div>
    </div>
  );
};

export default Feedbacks;
