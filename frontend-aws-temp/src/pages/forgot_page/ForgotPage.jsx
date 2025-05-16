import React from "react";
import classes from "./ForgotPage.module.css";
import forgotIMG from "/assets/forgotPW.svg";
import { useFormik } from "formik";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import ForgotStepOne from "../forgot_page_multistep_form/forgotStepOne/ForgotStepOne";

const ForgotPage = () => {
  const { currentUser } = useSelector((state) => state.user);
  const onSubmit = () => {
    console.log("submitted");
  };

  const formik = useFormik({
    initialValues: {
      phoneNumber: "",
      otp: "",
      newPassword: "",
      confirmPassword: "",
    },
    // validationSchema: userSchema,
    onSubmit,
  });

  return currentUser ? (
    <Navigate to="/profile" />
  ) : (
    <section className={classes.container}>
      <div className={classes.imageContainer}>
        <img className={classes.responsiveImage} src={forgotIMG} />
      </div>
      <div className={classes.forgotContainer}>
        <div className={classes.formContainer}>
          <div className={classes.header}>
            <p className={classes.lineone}>Forgot Password?</p>
            <p className={classes.linetwo}>Let us help you</p>
          </div>

          <ForgotStepOne formik={formik} />
        </div>
      </div>
    </section>
  );
};

export default ForgotPage;
