import React, { useState, useEffect } from "react";
import AdLeft from "../../../components/AdLeft";

import axios from "axios";
import { API } from "../../../backend";

interface userType {
  _id: string;
  name: string;
  email: string;
  isAdmin: string;
  points: Array<{
    language: string;
    coins: number;
  }>;
  age: number;
  city: string;
  country: string;
}

const ManageUser: React.FC = (): JSX.Element => {
  const [users, setUsers] = useState<userType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const [search, setSearch] = useState<string>("");

  const preload = () => {
    axios({
      method: "GET",
      url: `${API}user`,
    })
      .then((res) => {
        setUsers(res.data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };
  useEffect(() => {
    preload();
    return () => {
      setUsers([]);
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
          placeholder="Search for user"
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
    );
  };

  const filteredUser: Array<userType> = users.filter((user): boolean => {
    return user.name.toLowerCase().includes(search.toLowerCase());
  });

  const UserTable = (): JSX.Element => {
    return (
      <table className="table table-striped">
        <thead className="thead-dark">
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Email</th>
            <th>Age</th>
            <th>City</th>
            <th>Points</th>
            <th>isAdmin</th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 ? (
            filteredUser.map((word, idx) => {
              return (
                <tr key={word._id}>
                  <td>{idx + 1}</td>
                  <td>{word.name}</td>
                  <td>{word.email}</td>
                  <td>{word.age ? word.age : "_"}</td>
                  <td>{word.city ? `${word.city},${word.country}` : "_"}</td>
                  <td style={{ overflow: "auto" }}>
                    {word.points.length > 0 &&
                      word.points.map((pt) => {
                        return (
                          <ul key={pt.language}>
                            <li>Language : {pt.language} </li>
                            <li>Points: {pt.coins}</li>
                          </ul>
                        );
                      })}
                    {word.points.length === 0 && <td>Not learning</td>}
                  </td>
                  <td>{word.isAdmin ? "Yes" : "No"}</td>
                </tr>
              );
            })
          ) : (
            <tr>Not Found</tr>
          )}
        </tbody>
      </table>
    );
  };

  return (
    <div>
      <AdLeft />

      {loading ? (
        <div
          className="spinner-border text-primary loading_spinner"
          role="status"
          style={{ position: "absolute", left: "50%", top: "50%" }}
        >
          <span className="sr-only">Loading...</span>
        </div>
      ) : (
        <div style={{ marginLeft: "220px" }}>
          <h1 className="text-center">Manage Users</h1>

          {searchBar()}
          <div>{UserTable()}</div>
        </div>
      )}
    </div>
  );
};

export default ManageUser;
