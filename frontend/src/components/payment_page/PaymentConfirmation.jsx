import React, { useState } from "react";
import { PiWarningCircleFill } from "react-icons/pi";
import { GoCheckCircleFill } from "react-icons/go";
import { TbLoader } from "react-icons/tb";
import classes from "./PaymentConfirmation.module.css";

const PaymentConfirmation = () => {
  const [status, setStatus] = useState("fail");

  return (
    <div className={classes.mainLayout}>
      <div className={classes.subLayout}>
        {status === "fail" && (
          <div>
            <p className={classes.icon} id={classes.failIcon}>
              <PiWarningCircleFill size={100} />
            </p>
            <p className={classes.content}>Your payment couldn't go through!</p>
          </div>
        )}
        {status === "success" && (
          <div>
            <p className={classes.icon} id={classes.successIcon}>
              <GoCheckCircleFill size={90} />
            </p>
            <p className={classes.content}>Yay! Payment Received.</p>
          </div>
        )}
        {status === "processing" && (
          <div>
            <p className={classes.content2}>
              Your payment is under processing.
            </p>
            <p className={classes.icon} id={classes.processIcon}>
              <TbLoader size={100} className={classes.rotatedIcon} />
            </p>
            <p className={classes.content}>Don't worry. Your money is safe!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentConfirmation;
