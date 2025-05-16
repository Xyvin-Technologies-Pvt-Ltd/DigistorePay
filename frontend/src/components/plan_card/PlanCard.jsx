import React from "react";
import classes from "./PlanCard.module.css";
import Button from "../button/Button";
import { GoIssueClosed } from "react-icons/go";
import { RiCloseCircleLine } from "react-icons/ri";

const PlanCard = ({ title, amount, offers }) => {
  return (
    <>
      <div className={classes.card_container}>
        <div className={classes.card}>
          <div className={classes.header}>
            <p>{title}</p>
          </div>
          <div className={classes.amount}>
            <p>₹ {amount}</p>
            <p className={classes.subtext}>per month</p>
          </div>
          <div className={classes.subtext}>
            {offers.map((offer) => (
              <div className={classes.offer}>
                {offer.available ? (
                  <span style={{ color: "green" }}>
                    <GoIssueClosed />
                  </span>
                ) : (
                  <span style={{ color: "red" }}>
                    <RiCloseCircleLine />
                  </span>
                )}
                <p className={classes.offerText}>{offer.name}</p>
              </div>
            ))}
          </div>
          <div className={classes.btn_container}>
            <Button btnName="Choose"></Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default PlanCard;
