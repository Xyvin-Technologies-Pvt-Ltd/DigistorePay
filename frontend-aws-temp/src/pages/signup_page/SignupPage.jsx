import React from "react";
import classes from "./SignupPage.module.css";
import { useFormik } from "formik";
import { userSchema } from "../../Validations/signup/SignupValidation";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import MultiStep from "react-multistep";
import StepOne from "../multistep_form/stepOne/StepOne";
import StepTwo from "../multistep_form/stepTwo/StepTwo";
import StepThree from "../multistep_form/stepThree/StepThree";
import Stepfour from "../multistep_form/stepFour/Stepfour";
import StepFive from "../multistep_form/stepFive/StepFive";
import StepReferral from "../multistep_form/stepReferral/StepReferral";

const SignupPage = () => {
  const { currentUser } = useSelector((state) => state.user);
  const onSubmit = () => {
    console.log("submitted");
  };

  const formik = useFormik({
    initialValues: {
      franchiseName: "",
      ownerName: "",
      phoneNumber: "",
      mobileOtp: "",
      email: "",
      password: "",
      gender: "",
      dateOfBirth: "",
      businessType: "",
      franchiseAddressLine1: "",
      franchiseAddressLine2: "",
      state: "",
      pinCode: "",
      district: "",
      postOffice: "",
      panchayath: "",
      ward: "",
      accountNumber: "",
      accountName: "",
      bank: "",
      branchName: "",
      ifscCode: "",
      aadhaarNumber: "",
      panNumber: "",
      panCenter: false,
      digitalElements: [],
      panPic: "",
      bankPassbookPic: "",
      shopPic: "",
      aadhaarPicFront: "",
      aadhaarPicback: "",
      referredBy: false,
      referredFranchiseName: "",
      referredFranchiseCode: "",
      onBoardedBy:
        currentUser && currentUser?.data.userType === "distributor"
          ? "distributor"
          : currentUser && currentUser?.data.userType === "fieldExecutive"
            ? "fieldExecutive"
            : currentUser && currentUser?.data.userType === "admin"
              ? "admin"
              : currentUser && currentUser?.data.userType === "teleCaller"
                ? "teleCaller"
                : currentUser && currentUser?.data.userType === "student"
                  ? "collegeQuest"
                  : "itsSelf",
      onBoardedPersonId:
        currentUser && currentUser?.data.userType === "admin"
          ? "1"
          : currentUser?.data.userType === "student"
            ? currentUser?.data.teamId
            : "",
      onBoardedPersonName:
        currentUser && currentUser?.data.userType === "admin"
          ? "admin"
          : currentUser?.data.userType === "student"
            ? currentUser?.data.collegeName
            : "",
    },
    validationSchema: userSchema,
    onSubmit,
  });

  return (currentUser && currentUser?.data.userType === "teleCaller") ||
    (currentUser && currentUser?.data.userType === "franchise") ? (
    <Navigate to="/profile" />
  ) : (
    <>
      <section className={classes.container}>
        <div
          className={classes.imageContainer}
          style={{ position: "relative" }}
        >
          <p
            style={{
              position: "absolute",
              color: "white",
              fontWeight: "bold",
              fontSize: "3rem",
              textAlign: "center",
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%)",
              margin: "0",
              textShadow: "2px 2px var(--honoblue)",
            }}
          >
            Maximize Your Earnings With Digistore Pay. Join Now!
          </p>
          <img className={classes.responsiveImage} src="/assets/signup.jpg" />
        </div>
        <div className={classes.signupContainer}>
          <div className={classes.formContainer}>
            <div className={classes.header}>
              <p className={classes.lineone}>
                {currentUser ? "Add Franchise" : "Join Us!"}{" "}
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
                { title: "4", component: <Stepfour formik={formik} /> },
                { title: "5", component: <StepReferral formik={formik} /> },
                { title: "6", component: <StepFive formik={formik} /> },
              ]}
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default SignupPage;
