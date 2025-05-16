import React from "react";
import classes from "./WorkReport.module.css";
import { Link } from "react-router-dom";

const WorkReport = ({ children }) => {
  return (
    <div className={classes.container}>
      <div className={classes.header}>
        <p className={classes.head}>Offline Work Report</p>
        <Link to="#" className={classes.link}>
          <p className={classes.button}>See All</p>
        </Link>
      </div>
      {children}
    </div>
  );
};

export default WorkReport;
