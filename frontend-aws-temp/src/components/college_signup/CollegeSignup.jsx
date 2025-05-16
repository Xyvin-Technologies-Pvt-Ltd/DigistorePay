import React from "react";
import classes from "./CollegeSignup.module.css";
import { useFormik } from "formik";
// import { distributorSchema } from "../../Validations/distributor_signup/DistributorValidation";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import MultiStep from "react-multistep";
import StepOne from "./college_multisteps/step_one/StepOne";
import StepTwo from "./college_multisteps/step_two/StepTwo";
import StepThree from "./college_multisteps/step_three/StepThree";
import StepReferral from "../../pages/multistep_form/stepReferral/StepReferral";

const CollegeSignUp = () => {
  const { currentUser } = useSelector((state) => state.user);
  const onSubmit = () => {
    console.log("submitted");
  };

  const formik = useFormik({
    initialValues: {
      collegeName: "",
      collegeId: "",
      mobileNumber: "",
      otp: "",
      email: "",
      password: "",
      district: "",
      facultyName: "",
      teamId: "",
      captainName: "",
      onBoardedBy: "admin",
      onBoardedPersonId: "1",
      onBoardedPersonName: "admin",
    },
    // validationSchema: distributorSchema,
    onSubmit,
  });

  return currentUser && currentUser?.data.userType !== "admin" ? (
    <Navigate to="/profile" />
  ) : (
    <section className={classes.container}>
      <div className={classes.imageContainer}>
        <img src="/assets/collegeQuest.svg" />
      </div>
      <div className={classes.signupContainer}>
        <div className={classes.formContainer}>
          <div className={classes.header}>
            <p className={classes.lineone}>
              {currentUser ? "Add College Team" : "Join Us!"}{" "}
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
              { title: "3", component: <StepReferral formik={formik} /> },
              { title: "4", component: <StepThree formik={formik} /> },
            ]}
          />
        </div>
      </div>
    </section>
  );
};

export default CollegeSignUp;
