import React from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import classes from "./CircleTimer.module.css";

const CircleTimer = ({ duration, colors }) => {
  const formatTime = (remainingTime) => {
    const minutes = Math.floor(remainingTime / 60);
    const seconds = remainingTime % 60;
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
      2,
      "0",
    )}`;
  };
  return (
    <div className={classes.CircleTimer}>
      <CountdownCircleTimer isPlaying duration={duration} colors={colors}>
        {({ remainingTime }) => (
          <div>
            <div className={classes.time}>{formatTime(remainingTime)}</div>
            <div className={classes.mins}>mins</div>
          </div>
        )}
      </CountdownCircleTimer>
    </div>
  );
};

export default CircleTimer;
