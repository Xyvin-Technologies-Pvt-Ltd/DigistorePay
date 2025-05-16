import React, { useState } from "react";
import classes from "./StepOne.module.css";
import toast from "react-hot-toast";
import axios from "axios";

const StepOne = ({ formik }) => {
  const { handleChange, handleBlur, values, errors, handleSubmit, touched } =
    formik;

  const [btnState, setBtnState] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);

  const sendOtp = async () => {
    const data = { mobileNumber: values.mobileNumber };
    try {
      const res = await axios.post("/auth/verify-mobile", data);

      if (res.data.error) {
        toast.error(res.data.message, {
          id: "mobileNumber",
        });
      } else {
        setBtnState(true);
        toast.success("OTP send", {
          id: "mobileNumber",
        });
      }
    } catch (error) {
      toast.error(error?.response?.data?.message, {
        id: "mobileNumber",
      });
    }
  };

  const verifyOtp = async () => {
    const data = {
      mobileNumber: values.mobileNumber,
      otp: values.otp,
    };
    try {
      const res = await axios.post("/auth/verify-otp", data);

      if (res.data.error) {
        toast.error(res.data.message, {
          id: "otpVerify",
        });
      } else {
        setOtpVerified(true);
        toast.success("OTP verified", {
          id: "otpVerify",
        });
      }
    } catch (error) {
      toast.error(error?.response?.data?.message, {
        id: "otpVerify",
      });
    }
  };

  return (
    <div className={classes.mainContainer}>
      <p className={classes.heading}>
        {btnState ? "OTP verification" : "Verify your mobile number"}
      </p>
      <form className={classes.form} onSubmit={handleSubmit}>
        {btnState ? (
          <div className={classes.miniContainer}>
            <label className={classes.labelStyle}>
              OTP<span style={{ color: "red" }}>*</span>
            </label>
            <input
              id={classes.styledInput}
              name="otp"
              value={values.otp}
              onChange={handleChange}
              onBlur={handleBlur}
              type="number"
              placeholder="Enter OTP"
            ></input>
            {errors.otp && touched.otp && (
              <p id={classes.errors}>{errors.otp}</p>
            )}

            {!otpVerified && (
              <div onClick={() => verifyOtp()} className={classes.btn}>
                Verify OTP
              </div>
            )}
          </div>
        ) : (
          <div className={classes.miniContainer}>
            <label className={classes.labelStyle}>
              Mobile Number<span style={{ color: "red" }}>*</span>
            </label>
            <input
              id={classes.styledInput}
              name="mobileNumber"
              value={values.mobileNumber}
              onChange={handleChange}
              onBlur={handleBlur}
              type="number"
              placeholder="Enter 10 digit mobile number"
            ></input>
            {errors.mobileNumber && touched.mobileNumber && (
              <p id={classes.errors}>{errors.mobileNumber}</p>
            )}

            <div onClick={() => sendOtp()} className={classes.btn}>
              Request OTP
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default StepOne;
