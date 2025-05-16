import MultiStep from "react-multistep";
import StepOne from "./stepOne/StepOne";
import StepTwo from "./stepTwo/StepTwo";
import StepThree from "./stepThree/StepThree";
import classes from "./MultistepForm.module.css";
import { useFormik } from "formik";
import Stepfour from "./stepFour/Stepfour";
import StepFive from "./stepFive/StepFive";
import { userSchema } from "../../Validations/signup/SignupValidation";

const onSubmit = () => {
  console.log("Custom form submission:");
};

const MultistepForm = () => {
  const formik = useFormik({
    initialValues: {
      franchiseName: "",
      ownerName: "",
      phoneNumber: "",
      mobileOtp: "",
      email: "",
      password: "",
      gender: "",
      businessType: "",
      franchiseAddressLine1: "",
      franchiseAddressLine2: "",
      state: "",
      stateCode: "",
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
    },
    validationSchema: userSchema,
    onSubmit,
  });

  return (
    <div className={classes.container}>
      <div className={classes.multiContainer}>
        <MultiStep
          prevButton={{
            title: "Back",
            style: {
              backgroundColor: "var(---honoblue)",
              color: "#1EAEDB",

              border: "0",
              fontSize: "1.5rem",
              fontWeight: "500",
            },
          }}
          nextButton={{
            title: "Next",
            style: {
              color: "#1EAEDB",
              backgroundColor: "var(---honoblue)",
              border: "0",
              fontSize: "1.5rem",
              fontWeight: "500",
              float: "right",
            },
          }}
          activeStep={0}
        >
          <StepOne formik={formik} />
          <StepTwo formik={formik} />
          <StepThree formik={formik} />
          <Stepfour formik={formik} />
          <StepFive formik={formik} />
        </MultiStep>
      </div>
    </div>
  );
};

export default MultistepForm;
