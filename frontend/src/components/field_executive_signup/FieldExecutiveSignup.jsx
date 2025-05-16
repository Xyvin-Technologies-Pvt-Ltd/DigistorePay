import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { useFormik } from "formik";
import signupimg from "/assets/signup.jpg";
import MultiStep from "react-multistep";
import StepOne from "./field_executive_multistep/step_one/StepOne";
import StepTwo from "./field_executive_multistep/step_two/StepTwo";
import StepThree from "./field_executive_multistep/step_three/StepThree";
import StepFour from "./field_executive_multistep/step_four/StepFour";
import StepFive from "./field_executive_multistep/step_five/StepFive";
import StepSix from "./field_executive_multistep/step_six/StepSix";
import { staffSchema } from "../../Validations/staff_signup/StaffSignUpValidation";
import classes from "./FieldExecutiveSignup.module.css";

const FieldExecutiveSignup = () => {
  const { currentUser } = useSelector((state) => state.user);

  const onSubmit = () => {
    console.log("Staff form submitted");
  };

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      emergencyContact: "",
      password: "",
      dateOfBirth: "",
      gender: "",
      bloodGroup: "",
      employment: "",
      employmentType: "Field Executive",
      dateOfJoin: "",
      totalTrainingDays: "",
      reportingManager: "",
      districtOfOperation: [],
      laptop: "",
      laptopDetails: "",
      sim: "",
      simDetails: "",
      idCard: "",
      idCardDetails: "",
      phone: "",
      phoneDetails: "",
      vistingCard: "",
      vistingCardDetails: "",
      posterOrBroucher: "",
      posterOrBroucherDetails: "",
      other: "",
      otherDetails: "",
      remarks: "",
      accountNumber: "",
      accountName: "",
      bank: "",
      branchName: "",
      ifscCode: "",
      addressLine1: "",
      addressLine2: "",
      state: "",
      district: "",
      city: "",
      pinCode: "",
    },
    validationSchema: staffSchema,
    onSubmit,
  });

  return currentUser && currentUser.data.userType !== "admin" ? (
    <Navigate to="/profile" />
  ) : (
    <section className={classes.container}>
      <div className={classes.imageContainer}>
        <img src={signupimg} />
      </div>
      <div className={classes.signupContainer}>
        <div className={classes.formContainer}>
          <div className={classes.header}>
            <p className={classes.lineone}>
              {currentUser ? "Add Field Executive" : "Join Us"}{" "}
            </p>
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
              { title: "5", component: <StepFive formik={formik} /> },
              { title: "6", component: <StepSix formik={formik} /> },
            ]}
          />
        </div>
      </div>
    </section>
  );
};

export default FieldExecutiveSignup;
