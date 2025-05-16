import React from "react";
import classes from "./TopFranchise.module.css";

const TopFranchise = ({ heading, subHead, rankList, showImage }) => {
  return (
    <div className={classes.container}>
      <div>
        <h3 className={classes.head}>{heading}</h3>
        <p className={classes.subhead}>{subHead}</p>
      </div>
      {rankList?.map((item, index) => {
        return (
          <div
            key={index}
            id={
              index === 0
                ? classes.first
                : index === 1
                  ? classes.second
                  : index === 2
                    ? classes.third
                    : ""
            }
            className={classes.card}
          >
            <p className={classes.position}>#{index + 1}</p>
            {showImage && (
              <div className={classes.photo_container}>
                <img
                  className={classes.photo}
                  src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                ></img>
              </div>
            )}
            <div>
              <p className={classes.name}>{item.name}</p>
              <p className={classes.location}>{item.location}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default TopFranchise;
