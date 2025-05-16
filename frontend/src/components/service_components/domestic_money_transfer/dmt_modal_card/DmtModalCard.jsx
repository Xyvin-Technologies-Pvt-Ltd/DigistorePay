import React from "react";
import classes from "./DmtModalCard.module.css";
import { useNavigate } from "react-router-dom";

const DmtModalCard = ({
  transactionDetails,
  selectedBenificiary,
  customerId,
  amount,
}) => {
  const navigate = useNavigate();
  return (
    <div className={classes.mainContainer}>
      <p className={classes.heading}>Transaction Details</p>
      <div className={classes.detailsContainer}>
        <p>
          <b>Customer Number :</b> {customerId}
        </p>
        <p>
          <b>Benificiary Name :</b> {selectedBenificiary?.recipientName}
        </p>
        <p>
          <b>Benificiary Account Number :</b> {selectedBenificiary?.udf2}
        </p>
        <p>
          <b>Bank Name :</b> {selectedBenificiary?.bankName}
        </p>
        <p>
          <b>Total Amount :</b> <span className={classes.total}>{amount}</span>{" "}
        </p>
        {/* <p>
          <b>Success Amount :</b>{" "}
          <span className={classes.success}>
            {" "}
            {transactionDetails?.successAmount}
          </span>
        </p>
        <p>
          <b>Failure Amount :</b>{" "}
          <span className={classes.failure}>
            {transactionDetails?.failureAmount}
          </span>{" "}
        </p> */}
      </div>

      <div className={classes.btnContainer}>
        <button
          onClick={() => navigate("/profile/transactions")}
          className={classes.btn}
        >
          View Transaction History
        </button>
        <button
          onClick={() => navigate("/services/dmt")}
          className={classes.btn}
        >
          View Customer
        </button>
      </div>
    </div>
  );
};

export default DmtModalCard;
