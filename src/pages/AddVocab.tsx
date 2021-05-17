import React, { useState, useEffect } from "react";

import axios from "axios";
import { API } from "../backend";
import AdLeft from "../components/AdLeft";

//FORM data
//Input handling:--

const AddVocab = () => {
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
    formdata: null,
  });
  const [dpLang, setDpLang] = useState<string[]>([]);
  const [dpLevels, setDpLevels] = useState<string[]>([]);

  const preload = () => {
    //
  };

  useEffect(() => {
    //Fetching languages
    axios({
      method: "GET",
      url: `${API}`,
    })
      .then((res) => {
        setDpLang(res.data.data);
      })
      .catch((err) => console.log(err));

    //Fetching levels
    axios({
      method: "GET",
      url: `${API}`,
    })
      .then((res) => {
        setDpLevels(res.data.data);
      })
      .catch((err) => console.log(err));

    return () => {
      setDpLang([]);
      setDpLevels([]);
    };
  }, []);

  const handleInput =
    (name: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const val =
        name === "image" || name === "audio" ? e.target.files : e.target.value;

      setValues({
        ...values,
        [name]: val,
      });
    };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(values);
  };

  const createProductForm = (): JSX.Element => {
    return (
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="selectLang">Select Language</label>
          <select
            id="selectLang"
            className="custom-select"
            style={{ width: "100%" }}
            onChange={(e) => setValues({ ...values })}
          >
            <option disabled>Language</option>
            <option value="1">Gujarati</option>
            <option value="1">Marathi</option>
            <option value="2">Telugu</option>
            <option value="3">Punjabi</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="selectLevel">Select Level</label>
          <select
            id="selectLevel"
            className="custom-select"
            style={{ width: "100%" }}
          >
            <option disabled>Level</option>
            <option value="1">LEVEL I</option>
            <option value="1">LEVEL II</option>
            <option value="2">LEVEL III</option>
            <option value="3">LEVEL IV</option>
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
          <label htmlFor="formGroupExampleInput2">LanguageInEnglish</label>
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
          <div style={{ width: "60%" }}>{createProductForm()}</div>
        </div>
      </div>
    </div>
  );
};

export default AddVocab;
