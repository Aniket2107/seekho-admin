import React, { useState, useEffect } from "react";

import axios from "axios";
import { API } from "../../backend";

import AdLeft from "../../components/AdLeft";

const AddLanguage = () => {
  //Language
  const [lang, setLang] = useState("");

  //Level form
  const [lvlLang, setlvlLang] = useState("");
  const [level, setLevel] = useState("");
  const [dpLangs, setDpLangs] = useState<string[]>([]);

  //General
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [error1, setError1] = useState("");
  const [success1, setSuccess1] = useState("");

  const preload = () => {
    axios({
      method: "GET",
      url: `${API}lang/`,
    })
      .then((res) => setDpLangs(res.data.data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    preload();
    return () => {
      setDpLangs([]);
    };
  }, []);

  const addLang = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(lang);

    axios({
      method: "POST",
      url: `${API}lang/`,
      data: { language: lang },
    })
      .then((res) => {
        setSuccess("Language added");
        setLang("");
      })
      .catch((err) => {
        setError(
          err.response
            ? err.response.data.msg
            : "Something went wrong, Try again"
        );
      });
  };

  const addLevel = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(lvlLang, level);

    if (lvlLang === "") {
      setError1("Select valid language");
    }

    axios({
      method: "POST",
      url: `${API}lang/level`,
      data: { language: lvlLang, newLevel: level },
    })
      .then((res) => {
        setSuccess1(`Level added for ${lvlLang}`);
        setLang("");
      })
      .catch((err) => {
        setError1(
          err.response
            ? err.response.data.msg
            : "Something went wrong, Try again"
        );
      });
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setError("");
    setSuccess("");

    setLang(e.target.value);
  };

  const createLangForm = (): JSX.Element => {
    return (
      <form onSubmit={addLang}>
        <div className="form-group">
          <label htmlFor="formGroupExampleInput">Language</label>
          <input
            type="text"
            className="form-control"
            id="formGroupExampleInput"
            placeholder="Language"
            onChange={handleInput}
            required
          />
        </div>

        {error && <h4 className="text-danger">{error}</h4>}
        {success && <h4 className="text-success ">{success}</h4>}
        <button className="btn btn-md btn-success" type="submit">
          Add
        </button>
      </form>
    );
  };

  const createLevelForm = (): JSX.Element => {
    return (
      <form onSubmit={addLevel}>
        <div className="form-group">
          <label>Langauge</label>
          <select
            name="language"
            className="form-select"
            defaultValue={lvlLang}
            onChange={(e) => setlvlLang(e.target.value)}
          >
            <option>Select Language</option>
            {dpLangs.length > 0 &&
              dpLangs.map((lg) => {
                return (
                  <option key={lg} value={lg}>
                    {lg}
                  </option>
                );
              })}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="levelName">Level</label>
          <input
            type="text"
            className="form-control"
            id="levelName"
            placeholder="LevelName"
            onChange={(e) => setLevel(e.target.value)}
            required
          />
        </div>

        {error1 && <h4 className="text-danger">{error1}</h4>}
        {success1 && <h4 className="text-success ">{success1}</h4>}

        <button className="btn btn-md btn-success" type="submit">
          Add Level
        </button>
      </form>
    );
  };

  return (
    <div>
      <AdLeft />
      <div style={{ marginLeft: "220px" }}>
        <h1 className="mt-4">Add Language</h1>
        <div className="text-dark">
          <div style={{ width: "60%" }}>
            {createLangForm()}
            <div style={{ marginTop: "100px" }}></div>
            <h1>Add Level</h1>
            {createLevelForm()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddLanguage;
