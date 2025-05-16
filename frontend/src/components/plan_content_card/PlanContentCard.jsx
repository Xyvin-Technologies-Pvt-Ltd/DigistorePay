import React from "react";
import classes from "./PlanContentCard.module.css";

const PlanContentCard = ({ amount, type, description, action }) => {
  return (
    <div className={classes.mainContainer}>
      <div className={classes.headerSection}>
        <p className={classes.planAmount}>
          Plan Amount : <span className={classes.amount}>{amount}</span>
        </p>
        <p className={classes.planAmount}>{type}</p>
        <div className={classes.button} onClick={action}>
          select
        </div>
      </div>
      <div className={classes.description}>{description}</div>
    </div>
  );
};

export default PlanContentCard;
