import React, { useState } from "react";
import classes from "./AddCustomer.module.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useFormik } from "formik";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { dmtAddCustomerSchema } from "../../../../Validations/dmt/DmtValidation";

const AddCustomer = () => {
  const navigate = useNavigate();

  const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
    setFieldValue,
  } = useFormik({
    initialValues: {
      name: "",
      phoneNumber: "",
      address: "",
      otp: "",
    },

    validationSchema: dmtAddCustomerSchema,
  });

  const [btnState, setBtnState] = useState(false);

  const [loading, setLoading] = useState(false);

  const sendOtp = async () => {
    const data = { phoneNumber: values.phoneNumber };
    try {
      setLoading(true);
      const res = await axios.post("/dmtRoute/DMTsendOtp", data);

      if (res.data.errorMsg === "SUCCESS") {
        setLoading(false);
        setBtnState(true);
        toast.success("OTP send", {
          id: "phoneNumber",
        });
      } else {
        setLoading(false);
        toast.error(res.data.errorMsg, {
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

  const createCustomer = async () => {
    const data = {
      phoneNumber: values.phoneNumber,
      name: values.name,
      address: values.address,
      dateOfBirth: values.dateOfBirth,
      otp: values.otp,
    };
    try {
      setLoading(true);
      const res = await axios.post("/dmtRoute/DMTuserCreate", data);
      if (res.data.errorMsg === "SUCCESS") {
        setLoading(false);
        // page redirection
        toast.success("Customer created", {
          id: "phoneNumber",
        });
        navigate("/services/dmt");
      } else {
        setLoading(false);
        toast.error(res.data.errorMsg, {
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

  return (
    <div className={classes.mainContainer}>
      <form onSubmit={handleSubmit}>
        <p className={classes.heading}>
          {!btnState ? "OTP Verification" : "Create Customer"}
        </p>

        {!btnState ? (
          <div className={classes.mobContainer}>
            <input
              className={classes.styledInput}
              name="phoneNumber"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.phoneNumber}
              type="number"
              placeholder="Customer Mobile Number"
            />
            {errors.phoneNumber && touched.phoneNumber && (
              <p className={classes.errors}>{errors.phoneNumber}</p>
            )}
            <button
              onClick={() => sendOtp()}
              className={loading ? classes.btnDisabled : classes.btn}
              type="submit"
            >
              {loading ? "Sending OTP..." : "Request OTP"}
            </button>
          </div>
        ) : (
          <div className={classes.createContainer}>
            <div className={classes.inputContainer}>
              <div>
                <input
                  className={classes.styledInput}
                  name="name"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.name}
                  type="text"
                  placeholder=" Name"
                />
                {errors.name && touched.name && (
                  <p className={classes.errors}>{errors.name}</p>
                )}
              </div>

              <div>
                <input
                  className={classes.styledInput}
                  name="address"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.address}
                  type="text"
                  placeholder="Address"
                />
                {errors.address && touched.address && (
                  <p className={classes.errors}>{errors.address}</p>
                )}
              </div>

              <div>
                <input
                  className={classes.styledInput}
                  name="phoneNumber"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.phoneNumber}
                  type="number"
                  placeholder="Phone Number"
                />
                {errors.phoneNumber && touched.phoneNumber && (
                  <p className={classes.errors}>{errors.phoneNumber}</p>
                )}
              </div>

              <div className={classes.dateContainer}>
                <DatePicker
                  id={classes.styledInput}
                  className={classes.datePicker}
                  selected={values.dateOfBirth}
                  placeholderText="Date of birth"
                  onChange={(date) => setFieldValue("dateOfBirth", date)}
                  showMonthDropdown
                  showYearDropdown
                  dropdownMode="select"
                />
                {errors.dateOfBirth && touched.dateOfBirth && (
                  <p className={classes.errors}>{errors.dateOfBirth}</p>
                )}
              </div>
              <div>
                <input
                  className={classes.styledInput}
                  name="otp"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.otp}
                  type="number"
                  placeholder="OTP"
                />
                {errors.otp && touched.otp && (
                  <p className={classes.errors}>{errors.otp}</p>
                )}
              </div>
            </div>
            <button
              type="submit"
              onClick={() => createCustomer()}
              className={loading ? classes.btnDisabled : classes.btn}
            >
              {loading ? "Please Wait" : "Create Customer"}
            </button>
          </div>
        )}
      </form>
    </div>
  );
};

export default AddCustomer;
