import React, { useState, useEffect } from "react";
import { RouteComponentProps } from "react-router-dom";

import axios from "axios";
import { API } from "../../backend";

import AdLeft from "../../components/AdLeft";

interface MatchParams {
  questionId: string;
}

interface MatchProps extends RouteComponentProps<MatchParams> {}

const Editquestion: React.FC<MatchProps> = ({ match }): JSX.Element => {
  const [ctInput, setInput] = useState({
    question: "",
    opt_1: "",
    opt_2: "",
    opt_3: "",
    opt_4: "",
    time: 10,
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const preload = () => {
    axios({
      method: "GET",
      url: `${API}quiz/${match.params.questionId}`,
    })
      .then((res) => {
        setInput({
          ...ctInput,
          question: res.data.data.question,
          opt_1: res.data.data.options[0].option,
          opt_2: res.data.data.options[1].option,
          opt_3: res.data.data.options[2].option,
          opt_4: res.data.data.options[3].option,
          time: res.data.data.time,
        });
      })
      .catch((err) => {
        setError("Try refreshing the page! ;(");
      });
  };

  useEffect(() => {
    preload();

    return () => {
      setError("");
      setSuccess("");
    };
  }, []);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError("");
    setSuccess("");
    setInput({
      ...ctInput,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    const payload = {
      question: ctInput.question,
      options: [
        { option: ctInput.opt_1, isCorrect: true },
        { option: ctInput.opt_2, isCorrect: false },
        { option: ctInput.opt_3, isCorrect: false },
        { option: ctInput.opt_4, isCorrect: false },
      ],
      time: ctInput.time,
    };

    axios({
      method: "PUT",
      url: `${API}quiz/${match.params.questionId}`,
      data: payload,
    })
      .then((res) => {
        setSuccess("Question updated");
      })
      .catch((err) => {
        setError(
          err.response
            ? err.response.data.msg
            : "Something went wrong, Try again"
        );
      });
  };

  const questionForm = (): JSX.Element => {
    return (
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="question">Question</label>
          <input
            type="text"
            className="form-control"
            id="question"
            placeholder="Question"
            name="question"
            onChange={handleInput}
            value={ctInput.question}
            required
          />
        </div>

        <div className="form-group">
          <label>Options</label>
          <div className="row">
            <div className="col">
              <input
                type="text"
                className="form-control"
                placeholder="Option 1 (Right Answer)"
                value={ctInput.opt_1}
                name="opt_1"
                onChange={handleInput}
                required
              />
            </div>
            <div className="col">
              <input
                type="text"
                className="form-control"
                placeholder="Option 2"
                value={ctInput.opt_2}
                name="opt_2"
                onChange={handleInput}
                required
              />
            </div>
          </div>

          <div className="row">
            <div className="col">
              <input
                type="text"
                className="form-control"
                placeholder="Option 3"
                value={ctInput.opt_3}
                name="opt_3"
                onChange={handleInput}
                required
              />
            </div>
            <div className="col">
              <input
                type="text"
                className="form-control"
                placeholder="Option 4"
                value={ctInput.opt_4}
                name="opt_4"
                onChange={handleInput}
                required
              />
            </div>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="time">Time(seconds)</label>
          <input
            type="number"
            className="form-control"
            id="time"
            placeholder="Time"
            name="time"
            onChange={handleInput}
            value={ctInput.time}
            required
          />
        </div>
        {error && <h4 className="text-danger">{error}</h4>}
        {success && <h4 className="text-success">{success}</h4>}
        <button className="btn btn-primary" type="submit">
          Update
        </button>
      </form>
    );
  };

  return (
    <div>
      <AdLeft />
      <div style={{ marginLeft: "220px" }}>
        <h1>Edit Question</h1>
        <div style={{ width: "60%" }}>{questionForm()}</div>
      </div>
    </div>
  );
};

export default Editquestion;
