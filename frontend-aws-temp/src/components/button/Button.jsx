import React from "react";
import classes from "./Button.module.css";

const Button = ({ btnName, btnType, disabled, clickEvent }) => {
  return clickEvent ? (
    <button
      onClick={clickEvent}
      className={classes.btn}
      type={btnType}
      disabled={disabled}
    >
      {btnName}
    </button>
  ) : (
    <button className={classes.btn} type={btnType} disabled={disabled}>
      {btnName}
    </button>
  );
};

export default Button;
