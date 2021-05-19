import React, { useState, useEffect } from "react";

import axios from "axios";
import { API } from "../backend";
import AdLeft from "../components/AdLeft";

const AddVocab: React.FC = () => {
  const [values, setValues] = useState({
    language: "",
    level: "",
    hindiInHindi: "",
    englishInEnglish: "",
    languageInHindi: "",
    languageInEnglish: "",
    languageInLanguage: "",
    audio: "",
    image: "",
  });
  const [dpLang, setDpLang] = useState<string[]>([]);
  const [dpLevels, setDpLevels] = useState<string[]>([]);

  const [error, setError] = useState("");
  const [loading, setLoading] = useState("");
  const [success, setSuccess] = useState("");

  const preload = () => {
    //Fetching languages
    axios({
      method: "GET",
      url: `${API}lang/`,
    })
      .then((res) => {
        setDpLang(res.data.data);
      })
      .catch((err) => console.log(err));

    //Fetching levels
    if (values.language !== "") {
      axios({
        method: "GET",
        url: `${API}lang/level/${values.language}`,
      })
        .then((res) => {
          setDpLevels(res.data.data);
        })
        .catch((err) => console.log(err));
    }
  };

  useEffect(() => {
    preload();

    return () => {
      setDpLang([]);
      setDpLevels([]);
    };
  }, [values.language]);

  const handleInput =
    (name: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const val: any =
        name === "image" || name === "audio"
          ? e.target.files![0]
          : e.target.value;

      setValues({
        ...values,
        [name]: val,
      });
    };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading("Loading...");

    const formData = new FormData();

    formData.append("image", values.image);
    formData.append("audio", values.audio);
    formData.append("language", values.language);
    formData.append("level", values.level);
    formData.append("languageInHindi", values.languageInHindi);
    formData.append("languageInEnglish", values.languageInEnglish);
    formData.append("languageInLanguage", values.languageInLanguage);
    formData.append("hindiInHindi", values.hindiInHindi);
    formData.append("englishInEnglish", values.englishInEnglish);

    axios({
      method: "POST",
      url: `${API}vocab/`,
      data: formData,
    })
      .then((res) => {
        setLoading("");
        setSuccess("Vocab added");
      })
      .catch((err) => {
        setLoading("");
        setError(
          err.response
            ? err.response.data.msg
            : "Something went wrong, Try again"
        );
      });
  };

  const VocabForm = (): JSX.Element => {
    return (
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="selectLang">Select Language </label>
          <select
            className="form-select"
            id="selectLang"
            name="language"
            defaultValue={values.language}
            onChange={(e) => setValues({ ...values, language: e.target.value })}
          >
            <option value="null">Select Langauge</option>
            {dpLang.length > 0 &&
              dpLang.map((lang) => {
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
            className="form-select"
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
          <label>Select Image and Audio</label>
          <input
            type="file"
            className="form-control"
            id="formGroupExampleInput2"
            name="image"
            onChange={handleInput("image")}
            required
          />

          <input
            type="file"
            className="form-control"
            id="formGroupExampleInput2"
            placeholder="Audio"
            name="audio"
            onChange={handleInput("audio")}
            required
          />
        </div>

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
        {loading && <h4 className="text-warning">{loading}</h4>}
        {success && <h4 className="text-success ">{success}</h4>}
        <button className="btn btn-md btn-success mb-3">Submit</button>
      </form>
    );
  };

  return (
    <div>
      <AdLeft />
      <div style={{ marginLeft: "220px" }}>
        <h1 className="mt-4">Add vocab</h1>
        <div className="text-dark">
          <div style={{ width: "60%" }}>{VocabForm()}</div>
        </div>
      </div>
    </div>
  );
};

export default AddVocab;
