import React from "react";
import classes from "./DistributorSignUp.module.css";
import { useFormik } from "formik";
import { distributorSchema } from "../../Validations/distributor_signup/DistributorValidation";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import MultiStep from "react-multistep";
import StepOne from "./distributor_multisteps/step_one/StepOne";
import StepTwo from "./distributor_multisteps/step_two/StepTwo";
import StepThree from "./distributor_multisteps/step_three/StepThree";
import StepFour from "./distributor_multisteps/step_four/StepFour";
import StepFive from "./distributor_multisteps/step_five/StepFive";
import StepReferral from "../../pages/multistep_form/stepReferral/StepReferral";

const DistributorSignUp = () => {
  const { currentUser } = useSelector((state) => state.user);
  const onSubmit = () => {
    console.log("submitted");
  };

  const formik = useFormik({
    initialValues: {
      distributorName: "",
      name: "",
      mobileNumber: "",
      otp: "",
      email: "",
      password: "",
      gender: "",
      dateOfBirth: "",
      distributorAddressLine1: "",
      distributorAddressLine2: "",
      state: "",
      pinCode: "",
      district: "",
      accountNumber: "",
      accountName: "",
      bankName: "",
      ifscCode: "",
      aadhaarNumber: "",
      panNumber: "",
      aadhaarFrontImage: "",
      aadhaarBackImage: "",
      panCardImage: "",
      bankPassbookImage: "",
      onBoardedBy: "admin",
      onBoardedPersonId: "1",
      onBoardedPersonName: "admin",
    },
    validationSchema: distributorSchema,
    onSubmit,
  });

  return currentUser && currentUser.data.userType !== "admin" ? (
    <Navigate to="/profile" />
  ) : (
    <section className={classes.container}>
      <div className={classes.imageContainer}>
        <img src="/assets/signup.jpg" />
      </div>
      <div className={classes.signupContainer}>
        <div className={classes.formContainer}>
          <div className={classes.header}>
            <p className={classes.lineone}>
              {currentUser ? "Add Distributor" : "Join Us!"}{" "}
            </p>
            {/* <p className={classes.linetwo}>Enter details below</p> */}
          </div>

          <MultiStep
            className={classes.multiContainer}
            activeStep={0}
            prevButton={{
              title: "< Prev",
              style: {
                backgroundColor: "#197bbd",
                color: "white",
                padding: "0.5rem 2rem",
                borderRadius: "15px",
                border: 0,
                margin: "1rem",
                fontSize: "1rem",
                fontWeight: "bold",
                cursor: "pointer",
              },
            }}
            nextButton={{
              title: "Next >",
              style: {
                backgroundColor: "#197bbd",
                color: "white",
                padding: "0.5rem 2rem",
                borderRadius: "15px",
                border: 0,
                margin: "1rem",
                fontSize: "1rem",
                fontWeight: "bold",
                float: "right",
                cursor: "pointer",
              },
            }}
            steps={[
              { title: "1", component: <StepOne formik={formik} /> },
              { title: "2", component: <StepTwo formik={formik} /> },
              { title: "3", component: <StepThree formik={formik} /> },
              { title: "4", component: <StepFour formik={formik} /> },
              { title: "5", component: <StepReferral formik={formik} /> },
              { title: "6", component: <StepFive formik={formik} /> },
            ]}
          />
        </div>
      </div>
    </section>
  );
};

export default DistributorSignUp;
