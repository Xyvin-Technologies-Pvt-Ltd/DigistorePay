import React from "react";
import classes from "./RoleSelector.module.css";

const RoleSelector = ({
  handleChange,
  valueOne,
  textOne,
  valueTwo,
  textTwo,
}) => {
  return (
    <div className={classes.radioContainer}>
      <input
        className={classes.radioBtn}
        type="radio"
        name="loginRole"
        value={valueOne}
        onChange={handleChange}
        defaultChecked
        id="option1"
      />
      <label className={classes.radioLabel} htmlFor="option1">
        {" "}
        {textOne}
      </label>
      <input
        className={classes.radioBtn}
        type="radio"
        name="loginRole"
        onChange={handleChange}
        value={valueTwo}
        id="option2"
      />
      <label className={classes.radioLabel} htmlFor="option2">
        {" "}
        {textTwo}
      </label>
    </div>
  );
};

export default RoleSelector;
