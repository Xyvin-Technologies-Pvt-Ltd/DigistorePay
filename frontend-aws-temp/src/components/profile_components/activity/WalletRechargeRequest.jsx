import React from "react";
import classes from "./WalletRechargeRequest.module.css";
import { Link } from "react-router-dom";

const WalletRechargeRequest = ({ children }) => {
  return (
    <div className={classes.container}>
      <div className={classes.header}>
        <p className={classes.head}>Wallet Top Up Request</p>
        <Link to="/profile/wallettopup" className={classes.link}>
          <p className={classes.button}>See All</p>
        </Link>
      </div>
      {children}
    </div>
  );
};

export default WalletRechargeRequest;
