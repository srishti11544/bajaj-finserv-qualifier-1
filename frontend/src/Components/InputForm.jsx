import React, { useState } from "react";
import axios from "axios";
import ResponseDisplay from "./ResponseDisplay";
import styles from "./InputForm.module.css"; // 🎨 Import CSS Module

const InputForm = () => {
  const [jsonInput, setJsonInput] = useState("");
  const [response, setResponse] = useState(null);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    try {
      const parsedInput = JSON.parse(jsonInput);
      if (!parsedInput.data || !Array.isArray(parsedInput.data)) {
        throw new Error("Invalid JSON format");
      }

      const res = await axios.post("http://localhost:5000/bfhl", parsedInput); // Update URL after backend deployment
      setResponse(res.data);
      setError("");
    } catch (err) {
      setError("Invalid JSON format. Please check your input.");
      setResponse(null);
    }
  };

  return (
    <div className={styles.inputContainer}>
      <h2>Enter JSON Data</h2>
      <textarea
        className={styles.textArea}
        rows="4"
        placeholder='{"data": ["A", "C", "1", "5"]}'
        value={jsonInput}
        onChange={(e) => setJsonInput(e.target.value)}
      />
      <button className={styles.button} onClick={handleSubmit}>
        Submit
      </button>
      {error && <p className={styles.error}>{error}</p>}
      {response && <ResponseDisplay response={response} />}
    </div>
  );
};

export default InputForm;
