import React from "react";
import classes from "./BillCard.module.css";

const BillCard = ({
  amount,
  dueDate,
  billNumber,
  billDate,
  account,
  balance,
}) => {
  return (
    <div className={classes.mainContainer}>
      <div className={classes.headerSection}>
        <p>
          Due Amount : <span>{amount}</span>
        </p>
        <p>
          Due Date : <span>{dueDate}</span>
        </p>
      </div>
      <div className={classes.details}>
        <div className={classes.billDetails}>
          <p>
            Bill Number : <span>{billNumber}</span>
          </p>
          <p>
            Bill Date : <span>{billDate}</span>
          </p>
        </div>
        <div className={classes.billDetails}>
          <p>
            Account : <span>{account}</span>
          </p>
          <p>
            Balance Amount : <span>{balance}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default BillCard;
