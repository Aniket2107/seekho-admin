import React, { useState } from "react";
import AdLeft from "../components/AdLeft";

const AddLanguage = () => {
  const [lang, setLang] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const addLang = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(lang);
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
        <button className="btn btn-sm btn-success" type="submit">
          Add
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
          <div style={{ width: "60%" }}>{createLangForm()}</div>
        </div>
      </div>
    </div>
  );
};

export default AddLanguage;
