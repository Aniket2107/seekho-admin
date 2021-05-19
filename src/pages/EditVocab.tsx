import React, { useState, useEffect } from "react";
import { RouteComponentProps } from "react-router-dom";

import axios from "axios";
import { API } from "../backend";

import AdLeft from "../components/AdLeft";

interface MatchParams {
  vocabId: string;
}

interface MatchProps extends RouteComponentProps<MatchParams> {}

const EditVocab: React.FC<MatchProps> = ({ match }) => {
  const [values, setValues] = useState({
    language: "",
    level: "",
    hindiInHindi: "",
    englishInEnglish: "",
    languageInHindi: "",
    languageInEnglish: "",
    languageInLanguage: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const preload = () => {
    axios({
      method: "GET",
      url: `${API}vocab/id/${match.params.vocabId}`,
    })
      .then((res) => {
        setValues({
          ...values,
          language: res.data.data.language,
          level: res.data.data.level,
          hindiInHindi: res.data.data.hindiInHindi,
          englishInEnglish: res.data.data.englishInEnglish,
          languageInEnglish: res.data.data.languageInEnglish,
          languageInHindi: res.data.data.languageInHindi,
          languageInLanguage: res.data.data.languageInLanguage,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    preload();
  }, []);

  const handleInput =
    (name: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setError("");
      setSuccess("");

      setValues({
        ...values,
        [name]: e.target.value,
      });
    };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(values);

    axios({
      method: "PUT",
      url: `${API}vocab/${match.params.vocabId}`,
      data: values,
    })
      .then((res) => {
        setSuccess("Vocab updated");
      })
      .catch((err) => {
        setError(
          err.response
            ? err.response.data.msg
            : "Something went wrong, Try again"
        );
      });
  };

  const editVocabForm = () => {
    return (
      <form onSubmit={handleSubmit} className="mt-4">
        <h5>
          Language: <strong className="text-danger">{values.language}</strong>
        </h5>
        <h5>
          Level: <strong className="text-danger">{values.level}</strong>
        </h5>

        <div className="form-group">
          <label htmlFor="formGroupExampleInput">HindiInHindi</label>
          <input
            type="text"
            className="form-control"
            id="formGroupExampleInput"
            placeholder="Hindi"
            name="hindiInHindi"
            onChange={handleInput("hindiInHindi")}
            value={values.hindiInHindi}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="formGroupExampleInput2">EnglishInEnglish</label>
          <input
            type="text"
            className="form-control"
            id="formGroupExampleInput2"
            placeholder="English"
            name="englishInEnglish"
            onChange={handleInput("englishInEnglish")}
            value={values.englishInEnglish}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="formGroupExampleInput">LanguageInHindi</label>
          <input
            type="text"
            className="form-control"
            id="formGroupExampleInput"
            placeholder="Hindi"
            name="languageInHindi"
            onChange={handleInput("languageInHindi")}
            value={values.languageInHindi}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="formGroupExampleInput2">LanguageInEnglish</label>
          <input
            type="text"
            className="form-control"
            id="formGroupExampleInput2"
            placeholder="English"
            name="languageInEnglish"
            onChange={handleInput("languageInEnglish")}
            value={values.languageInEnglish}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="formGroupExampleInput2">LanguageInLanguage</label>
          <input
            type="text"
            className="form-control"
            id="formGroupExampleInput2"
            placeholder="Language"
            name="languageInLanguage"
            onChange={handleInput("languageInLanguage")}
            value={values.languageInLanguage}
            required
          />
        </div>
        {error && <h4 className="text-danger">{error}</h4>}
        {success && <h4 className="text-success ">{success}</h4>}
        <button className="btn btn-md btn-success mb-3">Submit</button>
      </form>
    );
  };

  return (
    <div>
      <AdLeft />
      <div style={{ marginLeft: "220px" }}>
        <h1>Edit Vocab</h1>
        <div>{editVocabForm()}</div>
      </div>
    </div>
  );
};

export default EditVocab;
