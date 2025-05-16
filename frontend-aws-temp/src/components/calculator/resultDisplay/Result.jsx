import React from "react";
import { FaRupeeSign } from "react-icons/fa";
import classes from "./Result.module.css";
import Button from "../../button/Button";
import { useNavigate } from "react-router-dom";
function Result({
  account,
  pan,
  bill,
  ticket,
  insurance,
  loan,
  money,
  sign,
  job,
  estate,
  edu,
  total,
}) {
  const navigate = useNavigate();
  const handleNavigation = () => {
    navigate(`/signup`);
  };
  return (
    <div className={classes.container}>
      <div className={classes.results}>
        <div className={classes.rescontainer}>
          <p className={classes.resulthead}>total income</p>
          <p className={classes.income}>
            <FaRupeeSign className={classes.icon} />
            {total}
          </p>
        </div>
        <div className={classes.btn}>
          <Button btnName="Join now" clickEvent={handleNavigation} />
        </div>
      </div>
      <div className={classes.info}>
        <p className={classes.sub}>Revenue per month</p>
        {/*jij */}
        <div className={classes.card}>
          <p className={classes.service}>Accounting Services</p>
          <p className={classes.amount}>₹{account}</p>
        </div>
        {/*jij */}
        <div className={classes.card}>
          <p className={classes.service}>Pan Card</p>
          <p className={classes.amount}>₹{pan}</p>
        </div>
        {/*jij */}
        <div className={classes.card}>
          <p className={classes.service}>Bill Payments</p>
          <p className={classes.amount}>₹{bill}</p>
        </div>
        {/*jij */}
        <div className={classes.card}>
          <p className={classes.service}>Ticket Booking</p>
          <p className={classes.amount}>₹{ticket}</p>
        </div>
        {/*jij */}
        <div className={classes.card}>
          <p className={classes.service}>All Insurance</p>
          <p className={classes.amount}>₹{insurance}</p>
        </div>
        {/*jij */}
        <div className={classes.card}>
          <p className={classes.service}>All Loans</p>
          <p className={classes.amount}>₹{loan}</p>
        </div>
        {/*jij */}
        <div className={classes.card}>
          <p className={classes.service}>Digital Signature</p>
          <p className={classes.amount}>₹{sign}</p>
        </div>
        {/*jij */}
        <div className={classes.card}>
          <p className={classes.service}>Job Portal</p>
          <p className={classes.amount}>₹{job}</p>
        </div>
        {/*jij */}
        <div className={classes.card}>
          <p className={classes.service}>Real Estate</p>
          <p className={classes.amount}>₹{estate}</p>
        </div>
        {/*jij */}
        <div className={classes.card}>
          <p className={classes.service}>Education Consultancy</p>
          <p className={classes.amount}>₹{edu}</p>
        </div>
        {/*jij */}
        <div className={classes.card}>
          <p className={classes.service}>Money Transfer</p>
          <p className={classes.amount}>₹{money}</p>
        </div>
      </div>
    </div>
  );
}

export default Result;
