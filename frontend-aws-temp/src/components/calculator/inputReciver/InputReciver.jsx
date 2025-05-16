import React, { useState } from "react";
import { FiMinusCircle, FiPlusCircle } from "react-icons/fi";
import classes from "./InputReciver.module.css";

function InputReciver({ service, commision, onChange }) {
  const [inputValue, setInputValue] = useState("");
  let msg = null;

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    onChange(e);
  };

  if (inputValue < 0) {
    msg = <p className={classes.error}>Enter a real number</p>;
  }

  return (
    <div className={classes.card}>
      <div className={classes.info}>
        <p className={classes.title}>{service}</p>
        <p className={classes.commision}>
          Avg commission &nbsp; ₹{" "}
          <span className={classes.blue}>{commision}/-</span>
        </p>
        {msg && <p>{msg}</p>}
      </div>
      <div className={classes.value}>
        <input
          type="number"
          className={classes.input}
          placeholder="0"
          min={0}
          max={9999}
          value={inputValue}
          onChange={handleInputChange}
        />
      </div>
    </div>
  );
}

export default InputReciver;
