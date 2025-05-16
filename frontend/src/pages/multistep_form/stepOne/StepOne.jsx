import { useState } from "react";
import classes from "./StepOne.module.css";
import axios from "axios";
import toast from "react-hot-toast";

const StepOne = ({ formik }) => {
  const { handleChange, handleBlur, values, errors, handleSubmit, touched } =
    formik;

  const [btnState, setBtnState] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [loading, setLoading] = useState(false);

  const sendOtp = async () => {
    const data = { phoneNumber: values.phoneNumber };
    try {
      setLoading(true);
      const res = await axios.post("/franchiseRouter/sendOtpPhoneNumber", data);

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
      otp: values.mobileOtp,
    };
    try {
      const res = await axios.post("/franchiseRouter/verifyOtp", data);

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
              name="mobileOtp"
              value={values.mobileOtp}
              onChange={handleChange}
              onBlur={handleBlur}
              onWheel={(e) => e.target.blur()}
              type="number"
              placeholder="Enter OTP"
            ></input>
            {errors.mobileOtp && touched.mobileOtp && (
              <p id={classes.errors}>{errors.mobileOtp}</p>
            )}

            {!otpVerified && (
              <div
                onClick={() => verifyOtp()}
                className={loading ? classes.btnDisabled : classes.btn}
              >
                {loading ? "Verifying OTP..." : "Verify OTP"}
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

export default StepOne;
