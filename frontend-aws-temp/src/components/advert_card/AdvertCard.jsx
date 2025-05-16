import React from "react";
import classes from "./AdvertCard.module.css";

const AdvertCard = ({ image, alt, sticky }) => {
  return (
    <div id={sticky ? classes.sticky : ""} className={classes.adContainer}>
      <img className={classes.ad} src={image} alt={alt} />
    </div>
  );
};

export default AdvertCard;
