import React from "react";
import classes from "./StepTwo.module.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const StepTwo = ({ formik }) => {
  const {
    handleChange,
    handleBlur,
    values,
    errors,
    handleSubmit,
    touched,
    setFieldValue,
  } = formik;
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className={classes.mainContainer}>
      <p className={classes.heading}>Personal details</p>
      <form className={classes.form} onSubmit={handleSubmit}>
        <label htmlFor="name" className={classes.labelStyle}>
          Name
        </label>
        <input
          className={classes.styledInput}
          id="name"
          name="name"
          value={values.name}
          onChange={handleChange}
          onBlur={handleBlur}
          type="text"
          placeholder="Enter Name"
        ></input>
        {errors.name && touched.name && (
          <p id={classes.errors}>{errors.name}</p>
        )}
        <label htmlFor="mobileNumber" className={classes.labelStyle}>
          Mobile Number
        </label>
        <input
          id="mobileNumber"
          disabled
          className={classes.styledInput}
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
        <label htmlFor="email" className={classes.labelStyle}>
          Email
        </label>
        <input
          id="email"
          className={classes.styledInput}
          name="email"
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
          type="text"
          placeholder="Enter Email ID"
        />
        {errors.email && touched.email && (
          <p id={classes.errors}>{errors.email}</p>
        )}
        <label htmlFor="password" className={classes.labelStyle}>
          Password
        </label>
        <div className={classes.input}>
          <input
            id="password"
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
            type={showPassword ? "text" : "password"}
            placeholder="Enter password"
          />
          <span
            className={classes.hide_password}
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>
        {errors.password && touched.password && (
          <p id={classes.errors}>{errors.password}</p>
        )}
        <label htmlFor="gender" className={classes.labelStyle}>
          Gender
        </label>
        <select
          className={classes.dropdown}
          id="gender"
          value={values.gender}
          name="gender"
          onChange={handleChange}
          onBlur={handleBlur}
        >
          <option>Select Gender</option>
          <option key="male" value="Male">
            Male
          </option>
          <option key="female" value="Female">
            Female
          </option>
        </select>
        {errors.gender && touched.gender && (
          <p id={classes.errors}>{errors.gender}</p>
        )}
        <label className={classes.labelStyle}>Date of birth</label>
        <DatePicker
          name="dateOfBirth"
          id={classes.styledInput}
          className={classes.datePicker}
          selected={values.dateOfBirth}
          placeholderText="Date of birth"
          onChange={(date) => setFieldValue("dateOfBirth", date)}
          onBlur={handleBlur}
          showMonthDropdown
          showYearDropdown
          dropdownMode="select"
        />
        {errors.dateOfBirth && touched.dateOfBirth && (
          <p id={classes.errors}>{errors.dateOfBirth}</p>
        )}
      </form>
    </div>
  );
};

export default StepTwo;
