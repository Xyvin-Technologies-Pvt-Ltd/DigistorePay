import React from "react";
import { Navigate } from "react-router-dom";
import { useFormik } from "formik";
import { staffSchema } from "../../Validations/staff_signup/StaffSignUpValidation";
import { useSelector } from "react-redux";
import MultiStep from "react-multistep";
import StepOne from "./staff_multisteps/step1/StepOne";
import StepTwo from "./staff_multisteps/step2/StepTwo";
import StepThree from "./staff_multisteps/step3/StepThree";
import StepFour from "./staff_multisteps/step4/StepFour";
import StepFive from "./staff_multisteps/step5/StepFive";
import classes from "./StaffSignUp.module.css";

const StaffSignUp = () => {
  const { currentUser } = useSelector((state) => state.user);

  const onSubmit = () => {};

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      phoneNumber: "",
      dateOfBirth: "",
      gender: "",
      addressLine1: "",
      addressLine2: "",
      emergencyContact: "",
      city: "",
      district: "",
      state: "",
      pinCode: "",
      bank: "",
      branchName: "",
      accountNumber: "",
      ifscCode: "",
      accountName: "",
      dateOfJoin: "",
      bloodGroup: "",
      employment: "",
      employmentType: "officeExecutive",
      isTrainingRequired: false,
      totalTrainingDays: "",
      laptop: false,
      sim: false,
      idCard: false,
      phone: false,
      vistingCard: false,
      posterOrBroucher: false,
      other: false,
      remarks: "",
      profilePic: "",
    },

    validationSchema: staffSchema,
    onSubmit,
  });

  return currentUser && currentUser.data.userType !== "admin" ? (
    <Navigate to="/profile" />
  ) : (
    <section className={classes.container}>
      <div className={classes.imageContainer}>
        <img
          className={classes.responsiveImage}
          src="/assets/signup.jpg"
          alt="Sign Up"
        />
      </div>
      <div className={classes.signupContainer}>
        <div className={classes.formContainer}>
          <div className={classes.header}>
            <p className={classes.lineone}>
              {currentUser ? "Add Staff" : "Join Us!"}
            </p>
          </div>
          <MultiStep
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
            ]}
          />
        </div>
      </div>
    </section>
  );
};

export default StaffSignUp;
