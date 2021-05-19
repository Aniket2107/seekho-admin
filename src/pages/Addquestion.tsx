import React, { useState, useEffect } from "react";
import AdLeft from "../components/AdLeft";

import axios from "axios";
import { API } from "../backend";

const Addquestion: React.FC = (): JSX.Element => {
  const [values, setValues] = useState({
    question: "",
    language: "",
    level: "",
    opt_1: "",
    opt_2: "",
    opt_3: "",
    opt_4: "",
    time: 10,
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [dpLangs, setDpLangs] = useState<string[]>([]);
  const [dpLevels, setDpLevels] = useState<string[]>([]);

  const preload = () => {
    axios({
      method: "GET",
      url: `${API}lang/`,
    })
      .then((res) => setDpLangs(res.data.data))
      .catch((err) => console.log(err));

    if (values.language !== "") {
      axios({
        method: "GET",
        url: `${API}lang/level/${values.language}`,
      })
        .then((res) => setDpLevels(res.data.data))
        .catch((err) => console.log(err));
    }
  };

  useEffect(() => {
    preload();

    return () => {
      setError("");
      setSuccess("");
    };
  }, [values.language]);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError("");
    setSuccess("");
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!values.language || !values.level) {
      setError("Select valid langauge/level");
      return;
    }

    const payload = {
      language: values.language,
      level: values.level,
      question: values.question,
      options: [
        { option: values.opt_1, isCorrect: true },
        { option: values.opt_2, isCorrect: false },
        { option: values.opt_3, isCorrect: false },
        { option: values.opt_4, isCorrect: false },
      ],
      time: values.time,
    };

    // console.log(payload);

    axios({
      method: "POST",
      url: `${API}quiz/`,
      data: payload,
    })
      .then((res) => {
        setSuccess("Question added");
        setValues({
          ...values,
          opt_1: "",
          opt_2: "",
          opt_3: "",
          opt_4: "",
          question: "",
          time: 10,
        });
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
        {/* langauge and level + options */}

        <div className="form-group">
          <label htmlFor="selectLang">Select Language </label>
          <select
            className="form-control"
            id="selectLang"
            name="language"
            defaultValue={values.language}
            onChange={(e) => setValues({ ...values, language: e.target.value })}
          >
            <option value="null">Select Langauge</option>
            {dpLangs.length > 0 &&
              dpLangs.map((lang) => {
                return (
                  <option key={lang} value={lang}>
                    {lang}
                  </option>
                );
              })}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="selectLevel">Select Level</label>
          <select
            className="form-control"
            id="selectLevel"
            name="level"
            defaultValue={values.level}
            onChange={(e) => setValues({ ...values, level: e.target.value })}
          >
            <option value="null">Select Level</option>
            {dpLevels.length > 0 &&
              dpLevels.map((lvl) => {
                return (
                  <option key={lvl} value={lvl}>
                    {lvl}
                  </option>
                );
              })}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="formGroupExampleInput">Question</label>
          <input
            type="text"
            className="form-control"
            id="formGroupExampleInput"
            placeholder="Question"
            name="question"
            onChange={handleInput}
            value={values.question}
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
                value={values.opt_1}
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
                value={values.opt_2}
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
                value={values.opt_3}
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
                value={values.opt_4}
                name="opt_4"
                onChange={handleInput}
                required
              />
            </div>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="formGroupExampleInput">Time(seconds)</label>
          <input
            type="number"
            className="form-control"
            id="formGroupExampleInput"
            placeholder="Time"
            name="time"
            onChange={handleInput}
            value={values.time}
            required
          />
        </div>
        {error && <h4 className="text-danger">{error}</h4>}
        {success && <h4 className="text-success">{success}</h4>}
        <button className="btn btn-sm btn-success" type="submit">
          Add Question
        </button>
      </form>
    );
  };

  return (
    <div>
      <AdLeft />
      <div style={{ marginLeft: "220px" }}>
        <h1>Add Question</h1>
        <div style={{ width: "60%" }}>{questionForm()}</div>
      </div>
    </div>
  );
};

export default Addquestion;
