import React, { useState } from "react";
import Select from "react-select";
import styles from "./ResponseDisplay.module.css"; // 🎨 Import CSS Module

const ResponseDisplay = ({ response }) => {
  const [selectedOptions, setSelectedOptions] = useState([]);

  const options = [
    { value: "alphabets", label: "Alphabets" },
    { value: "numbers", label: "Numbers" },
    { value: "highest_alphabet", label: "Highest Alphabet" },
  ];

  return (
    <div className={styles.responseContainer}>
      <h2>Select Data to Display</h2>
      <Select
        isMulti
        options={options}
        className={styles.select}
        onChange={(selected) => setSelectedOptions(selected.map((opt) => opt.value))}
      />
      <div className={styles.result}>
        {selectedOptions.map((option) => (
          <p key={option}>
            <strong>{option.replace("_", " ")}:</strong> {JSON.stringify(response[option])}
          </p>
        ))}
      </div>
    </div>
  );
};

export default ResponseDisplay;
