import React from "react";
import classes from "./WorkSummary.module.css";
import { FaSyncAlt } from "react-icons/fa";
import {
  FcHighPriority,
  FcLowPriority,
  FcMediumPriority,
} from "react-icons/fc";

function WorkSummary() {
  const jobs = {
    high: 4,
    medium: 55,
    low: 777,
  };
  return (
    <>
      <div className={classes.container}>
        <div>
          <div className={classes.header}>
            <p className={classes.content}>Work Summary</p>
            <FaSyncAlt className={classes.sync} />
          </div>
          <div>
            <div className={classes.workIndicator}>
              <div className={classes.workTitle} id={classes.high}>
                High
              </div>
              <div className={classes.count}>{jobs.high}</div>
            </div>
            <div
              // className={`${classes.workIndicator} ${
              //   jobs.medium != 0 ? classes.available : classes.none
              // }`}
              className={classes.workIndicator}
            >
              <div className={classes.workTitle} id={classes.medium}>
                Medium
              </div>
              <div className={classes.count}>{jobs.medium}</div>
            </div>
            <div className={classes.workIndicator}>
              <div className={classes.workTitle} id={classes.low}>
                Low
              </div>
              <div className={classes.count}>{jobs.low}</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default WorkSummary;
