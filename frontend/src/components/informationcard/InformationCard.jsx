import React from "react";
import classes from "./InformationCard.module.css";

function InformationCard() {
  return (
    <div className={classes.cardsContainer}>
      <div className={classes.cardComponent}>
        <div className={classes.cardImgContainer}>
          <img
            src="/images/homePage/efficency.jpg"
            alt="Seamless Integration, Limitless Potential"
            className={classes.cardImg}
          />
        </div>
        <div className={classes.cardBody}>
          <h5 className={classes.cardTitle}>
            Seamless Integration, Limitless Potential
          </h5>
          <p className={classes.cardText}>
            Integrate, innovate, and inspire with a platform that seamlessly
            connects your business processes. Unlock limitless potential with
            intuitive solutions designed for today’s challenges.
          </p>
        </div>
      </div>
      <div className={classes.cardComponent}>
        <div className={classes.cardImgContainer}>
          <img
            src="/images/homePage/advantages.jpg"
            alt="Stability. Security. Success."
            className={classes.cardImg}
          />
        </div>
        <div className={classes.cardBody}>
          <h5 className={classes.cardTitle}>Stability. Security. Success.</h5>
          <p className={classes.cardText}>
            Elevate your business with a platform built on stability and
            fortified by state-of-the-art security measures. Experience seamless
            operations and accelerated growth.
          </p>
        </div>
      </div>
      <div className={classes.cardComponent}>
        <div className={classes.cardImgContainer}>
          <img
            src="/images/homePage/finance.jpg"
            alt="Your Ultimate Financial Hub"
            className={classes.cardImg}
          />
        </div>
        <div className={classes.cardBody}>
          <h5 className={classes.cardTitle}>Your Ultimate Financial Hub</h5>
          <p className={classes.cardText}>
            Choose Digi Suvidha as your comprehensive financial partner,
            offering everything your local business needs in one place.
          </p>
        </div>
      </div>
      <div className={classes.cardComponent}>
        <div className={classes.cardImgContainer}>
          <img
            src="/images/homePage/optimize.png"
            alt="Optimize Financial Efficiency"
            className={classes.cardImg}
          />
        </div>
        <div className={classes.cardBody}>
          <h5 className={classes.cardTitle}>Optimize Financial Efficiency</h5>
          <p className={classes.cardText}>
            Simplify transactions, track expenses, and maximize savings with our
            intuitive platform designed for seamless financial management
          </p>
        </div>
      </div>
      <div className={classes.cardComponent}>
        <div className={classes.cardImgContainer}>
          <img
            src="/images/homePage/advtanges.png"
            alt="Unveiling the DigiStore Pay Advantage"
            className={classes.cardImg}
          />
        </div>
        <div className={classes.cardBody}>
          <h5 className={classes.cardTitle}>
            Unveiling the DigiStore Pay Advantage
          </h5>
          <p className={classes.cardText}>
            Experience the future of convenience and efficiency with DigiStore
            Pay. Empowering you with seamless digital solutions for enhanced
            productivity and peace of mind
          </p>
        </div>
      </div>
      <div className={classes.cardComponent}>
        <div className={classes.cardImgContainer}>
          <img
            src="/images/homePage/fast.png"
            alt="Swift, Secure, Sustainable"
            className={classes.cardImg}
          />
        </div>
        <div className={classes.cardBody}>
          <h5 className={classes.cardTitle}>Swift, Secure, Sustainable</h5>
          <p className={classes.cardText}>
            Drive your business forward with swift transactions, secure
            processes, and sustainable growth strategies. Experience the power
            of reliability and speed
          </p>
        </div>
      </div>
    </div>
  );
}

export default InformationCard;
