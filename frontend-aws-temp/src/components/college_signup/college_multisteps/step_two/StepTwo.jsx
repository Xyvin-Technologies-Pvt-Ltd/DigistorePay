import React from "react";
import classes from "./StepTwo.module.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useState } from "react";
import { getIndiaDistrict } from "india-state-district";
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
        <label htmlFor="collegeName" className={classes.labelStyle}>
          College Name<span style={{ color: "red" }}>*</span>
        </label>
        <input
          className={classes.styledInput}
          id="collegeName"
          name="collegeName"
          value={values.collegeName}
          onChange={handleChange}
          onBlur={handleBlur}
          type="text"
          placeholder="Enter College Name"
        ></input>
        {errors.collegeName && touched.collegeName && (
          <p id={classes.errors}>{errors.collegeName}</p>
        )}
        <label htmlFor="collegeId" className={classes.labelStyle}>
          College ID<span style={{ color: "red" }}>*</span>
        </label>
        <input
          className={classes.styledInput}
          id="collegeId"
          name="collegeId"
          value={values.collegeId}
          onChange={handleChange}
          onBlur={handleBlur}
          type="text"
          placeholder="Enter College Id"
        ></input>
        {errors.collegeId && touched.collegeId && (
          <p id={classes.errors}>{errors.collegeId}</p>
        )}
        <label htmlFor="teamId" className={classes.labelStyle}>
          Team ID<span style={{ color: "red" }}>*</span>
        </label>
        <input
          className={classes.styledInput}
          id="teamId"
          name="teamId"
          value={values.teamId}
          onChange={handleChange}
          onBlur={handleBlur}
          type="text"
          placeholder="Enter Team Id"
        ></input>
        {errors.teamId && touched.teamId && (
          <p id={classes.errors}>{errors.teamId}</p>
        )}
        <label htmlFor="facultyName" className={classes.labelStyle}>
          Faculty Name<span style={{ color: "red" }}>*</span>
        </label>
        <input
          className={classes.styledInput}
          id="facultyName"
          name="facultyName"
          value={values.facultyName}
          onChange={handleChange}
          onBlur={handleBlur}
          type="text"
          placeholder="Enter Faculty Name"
        ></input>
        {errors.facultyName && touched.facultyName && (
          <p id={classes.errors}>{errors.facultyName}</p>
        )}
        <label htmlFor="captainName" className={classes.labelStyle}>
          Captain Name<span style={{ color: "red" }}>*</span>
        </label>
        <input
          className={classes.styledInput}
          id="captainName"
          name="captainName"
          value={values.captainName}
          onChange={handleChange}
          onBlur={handleBlur}
          type="text"
          placeholder="Enter Captain Name"
        ></input>
        {errors.captainName && touched.captainName && (
          <p id={classes.errors}>{errors.captainName}</p>
        )}
        <label htmlFor="district" className={classes.labelStyle}>
          District<span style={{ color: "red" }}>*</span>
        </label>
        <select
          className={classes.dropdown}
          id="district"
          value={values.district}
          name="district"
          onChange={handleChange}
          onBlur={handleBlur}
        >
          <option>Select District</option>
          {getIndiaDistrict("KL").map((district) => {
            return (
              <option key={district} value={district}>
                {district}
              </option>
            );
          })}
        </select>

        {errors.district && touched.district && (
          <p id={classes.errors}>{errors.district}</p>
        )}
        <label htmlFor="email" className={classes.labelStyle}>
          Email<span style={{ color: "red" }}>*</span>
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
          Password<span style={{ color: "red" }}>*</span>
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
        <label htmlFor="mobileNumber" className={classes.labelStyle}>
          Mobile Number<span style={{ color: "red" }}>*</span>
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
      </form>
    </div>
  );
};

export default StepTwo;
