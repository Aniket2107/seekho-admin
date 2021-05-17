import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import AdLeft from "../components/AdLeft";

import axios from "axios";
import { API } from "../backend";

interface vocabType {
  _id: string;
  audio: string;
  image: string;
  languageInLanguage: string;
  languageInHindi: string;
  languageInEnglish: string;
  hindiInHindi: string;
  englishInEnglish: string;
}

const ManageVocabs: React.FC = (): JSX.Element => {
  const [vocab, setVocab] = useState<vocabType[]>([]);
  const [error, setError] = useState<string>("");
  const [search, setSearch] = useState<string>("");

  const preload = () => {
    axios({
      method: "GET",
      url: `${API}vocab/language/english`,
    })
      .then((res) => {
        // console.log(res.data);
        setVocab(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    preload();
    return () => {
      setVocab([]);
    };
  }, []);

  const removeVocab = (vocabId: string) => {
    axios({
      method: "DELETE",
      url: `${API}vocab/${vocabId}`,
    })
      .then((res) => {
        preload();
      })
      .catch((err) => {
        setError("Something went wrong, Try reloading the page");
      });
  };

  const searchBar = () => {
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
          placeholder="Search for any word"
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
    );
  };

  const filteredVocabs = vocab.filter((quote) => {
    return quote.englishInEnglish.toLowerCase().includes(search.toLowerCase());
  });

  const vocabTable = (): JSX.Element => {
    return (
      <table className="table table-striped">
        <thead className="thead-dark">
          <tr>
            <th>#</th>
            <th>Hindi</th>
            <th>English</th>
            <th>LHindi</th>
            <th>LEnglish</th>
            <th>LLanguage</th>
            <th>Image</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody className="text-dark ">
          {vocab.length > 0 &&
            filteredVocabs.map((word, idx) => {
              return (
                <tr key={word._id}>
                  <td>{idx + 1}</td>
                  <td>{word.hindiInHindi}</td>
                  <td>{word.englishInEnglish}</td>
                  <td>{word.languageInHindi}</td>
                  <td>{word.languageInEnglish}</td>
                  <td>{word.languageInLanguage}</td>
                  <td>
                    <img
                      src={word.image}
                      className="img-thumbnail"
                      style={{ width: "45px" }}
                    />
                  </td>
                  <td>
                    <Link
                      to={`/admin/product/update/${word._id}`}
                      className="text-info"
                    >
                      Edit
                    </Link>
                    |
                    <a
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        removeVocab(word._id);
                      }}
                      className="text-danger"
                    >
                      Delete
                    </a>
                  </td>
                </tr>
              );
            })}
          {vocab.length === 0 && <tr>No vocabs found</tr>}
        </tbody>
      </table>
    );
  };

  return (
    <div>
      <AdLeft />
      <div style={{ marginLeft: "220px", fontFamily: "sans-serif" }}>
        <h1 className="text-center">Manage Vocabs</h1>
        <Link
          to="/add-vocab"
          style={{ float: "right", marginRight: "30px" }}
          className="btn btn-md btn-danger"
        >
          Add Vocab
        </Link>
        {searchBar()}

        {error && <h4 className="text-danger">{error}</h4>}
        <div className="text-dark">{vocabTable()}</div>
      </div>
    </div>
  );
};

export default ManageVocabs;
