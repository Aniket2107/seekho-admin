import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AdLeft from "../../../components/AdLeft";

import axios from "axios";
import { API } from "../../../backend";

interface questionType {
  _id: string;
  question: string;
  language: string;
  level: string;
  time: number;
  options: Array<{
    option: string;
    isCorrect: boolean;
  }>;
}

const Managequestion: React.FC = (): JSX.Element => {
  const [question, setQuestion] = useState<questionType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const [search, setSearch] = useState<string>("");

  const preload = () => {
    axios({
      method: "GET",
      url: `${API}quiz/`,
    })
      .then((res) => {
        // console.log(res.data);
        setQuestion(res.data.data);
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
      setQuestion([]);
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
          placeholder="Search for word"
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
    );
  };

  const filteredQuestions: Array<questionType> = question.filter((qt) => {
    return qt.question.toLowerCase().includes(search.toLowerCase());
  });

  const deleteQuestion = (qstID: string) => {
    axios({
      method: "DELETE",
      url: `${API}quiz/${qstID}`,
    })
      .then((res) => {
        preload();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const questionTable = (): JSX.Element => {
    return (
      <table className="table table-striped">
        <thead className="thead-dark">
          <tr>
            <th>#</th>
            <th>Question</th>
            <th>Option 1</th>
            <th>Option 2</th>
            <th>Option 3</th>
            <th>Option 4</th>
            <th>Time(sec)</th>
            <th>Level</th>
            <th>Language</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {question.length > 0 ? (
            filteredQuestions.map((word, idx) => {
              return (
                <tr key={word._id}>
                  <td>{idx + 1}</td>
                  <td>{word.question}</td>
                  {word.options.map((opt) => {
                    return <td key={opt.option}>{opt.option}</td>;
                  })}
                  <td>{word.time}</td>
                  <td>{word.level}</td>
                  <td>{word.language}</td>

                  <td>
                    <Link
                      to={`/edit-question/${word._id}`}
                      className="text-info"
                    >
                      Edit
                    </Link>
                    |
                    <a
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        deleteQuestion(word._id);
                      }}
                      className="text-danger"
                    >
                      Delete
                    </a>
                  </td>
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
          <h1 className="text-center">Manage Questions</h1>
          <Link
            to="/add-question"
            style={{ float: "right", marginRight: "30px" }}
            className="btn btn-md btn-danger"
          >
            Add Question
          </Link>
          {searchBar()}
          <div>{questionTable()}</div>
        </div>
      )}
    </div>
  );
};

export default Managequestion;
