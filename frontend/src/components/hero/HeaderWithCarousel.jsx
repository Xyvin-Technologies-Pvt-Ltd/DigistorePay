import React from "react";
import Carousel from "../carousel/Carousel";
import classes from "./HeaderWithCarousel.module.css";
import { Link } from "react-router-dom";
import heroImages from "../../data/heroimages";

const HeaderWithCarousel = () => {
  return (
    <div className={classes.HeroSection}>
      <div className={classes.HeroContainer}>
        <div className={classes.HeroContent}>
          <h1 className={classes.HeroTitle}>
            <div className={classes.companyName}>
              <span className={classes.digiName}>Digistore</span> Pay
            </div>{" "}
            - Simplifying Online Payments and Services.
          </h1>
          <p className={classes.HeroDescription}>
            Streamline your business transactions with our secure and
            user-friendly payment solutions and services.
          </p>
          <div className={classes.HeroBtnContainer}>
            <a
              href="https://play.google.com/store/apps/details?id=io.ionic.digistorepay"
              target="_blank"
            >
              <div className={classes.HeroBtnPrimary}>Download Now</div>
            </a>

            <Link to="/login" className={classes.HeroBtnSecondary}>
              Get Started
            </Link>
          </div>
        </div>
        <div className={classes.HeroImageContainer}>
          <Carousel imageData={heroImages} />
        </div>
      </div>
    </div>
  );
};

export default HeaderWithCarousel;
