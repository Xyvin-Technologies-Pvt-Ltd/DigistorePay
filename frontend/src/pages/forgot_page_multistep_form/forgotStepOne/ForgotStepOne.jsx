import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import classes from "./ForgotStepOne.module.css";

const ForgotStepOne = ({ formik }) => {
  const { values, handleChange, handleBlur, errors, handleSubmit, touched } =
    formik;

  const [loading, setLoading] = useState(false);
  const [btnState, setBtnState] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);

  const sendOtp = async () => {
    const data = { phoneNumber: values.phoneNumber };
    try {
      setLoading(true);
      const res = await axios.post("/forgotPassword/sendOtp", data);

      if (res.data.error) {
        setLoading(false);
        toast.error(res.data.message, {
          id: "phoneNumber",
        });
      } else {
        setLoading(false);
        setBtnState(true);
        toast.success("OTP send", {
          id: "phoneNumber",
        });
      }
    } catch (error) {
      setLoading(false);
      toast.error(error?.response?.data?.message, {
        id: "phoneNumber",
      });
    }
  };

  const verifyOtp = async () => {
    const data = {
      phoneNumber: values.phoneNumber,
      otp: values.otp,
    };

    try {
      const res = await axios.post("/forgotPassword/verifyOtp", data);

      if (res.data.error) {
        toast.error(res.data.message, {
          id: "otp",
        });
      } else {
        setOtpVerified(true);
        toast.success("OTP verified", {
          id: "otp",
        });
      }
    } catch (error) {
      toast.error(error?.response?.data?.message, {
        id: "otp",
      });
    }
  };

  const changePassword = async () => {
    const data = {
      newPassword: values.newPassword,
      confirmPassword: values.confirmPassword,
    };

    try {
      setLoading(true);
      const res = await axios.post("/forgotPassword/resetPassword", data);

      if (res.data.error) {
        setLoading(false);
        toast.error(res.data.message, {
          id: "password",
        });
      } else {
        setLoading(false);
        toast.success("Password changed successfully", {
          id: "password",
        });
      }
    } catch (error) {
      setLoading(false);
      toast.error(error?.response?.data?.message, {
        id: "password",
      });
    }
  };

  return (
    <div className={classes.mainContainer}>
      <p className={classes.heading}>
        {btnState
          ? otpVerified
            ? "Change Password"
            : "OTP verification"
          : "Verify your mobile number"}
      </p>
      <form className={classes.form} onSubmit={handleSubmit}>
        {btnState ? (
          otpVerified ? (
            <div>
              <div className={classes.miniContainer}>
                <label className={classes.labelStyle}>New Password</label>
                <input
                  id={classes.styledInput}
                  name="newPassword"
                  value={values.newPassword}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  type="password"
                  placeholder="Enter new password"
                ></input>
                {errors.newPassword && touched.newPassword && (
                  <p id={classes.errors}>{errors.newPassword}</p>
                )}
              </div>

              <div className={classes.miniContainer}>
                <label className={classes.labelStyle}>Confirm Password</label>
                <input
                  id={classes.styledInput}
                  name="confirmPassword"
                  value={values.confirmPassword}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  type="password"
                  placeholder="Enter confirm password"
                ></input>
                {errors.confirmPassword && touched.confirmPassword && (
                  <p id={classes.errors}>{errors.confirmPassword}</p>
                )}

                <div
                  onClick={() => changePassword()}
                  className={loading ? classes.btnDisabled : classes.btn}
                >
                  {loading ? "Changing Password..." : "Change Password"}
                </div>
              </div>
            </div>
          ) : (
            <div className={classes.miniContainer}>
              <label className={classes.labelStyle}>Mobile Number</label>
              <input
                id={classes.styledInput}
                name="phoneNumber"
                value={values.phoneNumber}
                onChange={handleChange}
                onBlur={handleBlur}
                onWheel={(e) => e.target.blur()}
                type="number"
                placeholder="Enter 10 digit mobile number"
              ></input>
              {errors.phoneNumber && touched.phoneNumber && (
                <p id={classes.errors}>{errors.phoneNumber}</p>
              )}
              <label className={classes.labelStyle}>OTP</label>
              <input
                id={classes.styledInput}
                name="otp"
                value={values.otp}
                onChange={handleChange}
                onBlur={handleBlur}
                onWheel={(e) => e.target.blur()}
                type="number"
                placeholder="Enter OTP"
              ></input>
              {errors.otp && touched.otp && (
                <p id={classes.errors}>{errors.otp}</p>
              )}

              <div
                onClick={() => verifyOtp()}
                className={loading ? classes.btnDisabled : classes.btn}
              >
                {loading ? "Verifying OTP..." : "Verify OTP"}
              </div>
            </div>
          )
        ) : (
          <div className={classes.miniContainer}>
            <label className={classes.labelStyle}>Mobile Number</label>
            <input
              id={classes.styledInput}
              name="phoneNumber"
              value={values.phoneNumber}
              onChange={handleChange}
              onBlur={handleBlur}
              onWheel={(e) => e.target.blur()}
              type="number"
              placeholder="Enter 10 digit mobile number"
            ></input>
            {errors.phoneNumber && touched.phoneNumber && (
              <p id={classes.errors}>{errors.phoneNumber}</p>
            )}

            <div
              onClick={() => sendOtp()}
              className={loading ? classes.btnDisabled : classes.btn}
            >
              {loading ? "Sending OTP..." : "Request OTP"}
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default ForgotStepOne;
