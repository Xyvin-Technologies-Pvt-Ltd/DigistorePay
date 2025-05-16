import React from "react";
import { IoMdArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import CircleTimer from "../../components/circle_timer/CircleTimer";
import classes from "./Payment.module.css";

const Payment = () => {
  const navigate = useNavigate();

  return (
    <div>
      <div className={classes.subLayout}>
        <p onClick={() => navigate("/profile")} className={classes.backlogo}>
          <IoMdArrowBack />
        </p>
        <div className={classes.paymentDetails}>
          <p className={classes.heading}>PAYMENTS</p>
          <p className={classes.detail}>To pay: ₹655</p>
        </div>
      </div>
      <hr className={classes.hr}></hr>
      <div className={classes.subLayout2}>
        <p className={classes.content}>
          Open your UPI app to approve the payment request from DigistorePay.
        </p>
      </div>
      <div className={classes.circletimer}>
        <CircleTimer duration={300} colors={["#197bbd"]} />
      </div>
      <div className={classes.subLayout3}>
        <p className={classes.lowerContent}>
          Please approve the payment request before it times out.
        </p>
        <p className={classes.content}>
          Do not hit back button until the transaction is complete.
        </p>
      </div>
      <div className={classes.paybutton}>
        <p className={classes.button}>Cancel payment</p>
      </div>
    </div>
  );
};

export default Payment;
