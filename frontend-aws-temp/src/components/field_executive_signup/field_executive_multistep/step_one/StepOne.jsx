import React from "react";
import DatePicker from "react-datepicker";
import classes from "./StepOne.module.css";

const StepOne = ({ formik }) => {
  const {
    handleChange,
    handleBlur,
    values,
    errors,
    handleSubmit,
    touched,
    setFieldValue,
  } = formik;

  return (
    <div className={classes.mainContainer}>
      <p className={classes.heading}>Personal Information</p>
      <form className={classes.form} onSubmit={handleSubmit}>
        <label className={classes.labelStyle}>
          First Name<span style={{ color: "red" }}>*</span>
        </label>
        <input
          className={classes.styledInput}
          id="firstName"
          name="firstName"
          value={values.firstName}
          onChange={handleChange}
          onBlur={handleBlur}
          type="text"
          placeholder="Enter First Name"
        />
        {errors.firstName && touched.firstName && (
          <p id={classes.errors}>{errors.firstName}</p>
        )}

        <label className={classes.labelStyle}>
          Last Name<span style={{ color: "red" }}>*</span>
        </label>
        <input
          className={classes.styledInput}
          id="lastName"
          name="lastName"
          value={values.lastName}
          onChange={handleChange}
          onBlur={handleBlur}
          type="text"
          placeholder="Enter Last Name"
        />
        {errors.lastName && touched.lastName && (
          <p id={classes.errors}>{errors.lastName}</p>
        )}

        <label className={classes.labelStyle}>
          Email<span style={{ color: "red" }}>*</span>
        </label>
        <input
          className={classes.styledInput}
          id="email"
          name="email"
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
          type="email"
          placeholder="Enter Email"
        />
        {errors.email && touched.email && (
          <p id={classes.errors}>{errors.email}</p>
        )}

        <label className={classes.labelStyle}>
          Phone Number<span style={{ color: "red" }}>*</span>
        </label>
        <input
          className={classes.styledInput}
          id="phoneNumber"
          name="phoneNumber"
          value={values.phoneNumber}
          onChange={handleChange}
          onBlur={handleBlur}
          onWheel={(e) => e.target.blur()}
          type="number"
          placeholder="Enter Phone Number"
        />
        {errors.phoneNumber && touched.phoneNumber && (
          <p id={classes.errors}>{errors.phoneNumber}</p>
        )}

        <label className={classes.labelStyle}>
          Password<span style={{ color: "red" }}>*</span>
        </label>
        <input
          className={classes.styledInput}
          name="password"
          type="password"
          value={values.password}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Enter Your Password"
        />

        {errors.password && touched.password && (
          <p id={classes.errors}>{errors.password}</p>
        )}

        <label className={classes.labelStyle}>
          Date of Birth<span style={{ color: "red" }}>*</span>
        </label>
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

        <label className={classes.labelStyle}>
          Gender<span style={{ color: "red" }}>*</span>
        </label>
        <select
          className={classes.dropdown}
          id="gender"
          value={values.gender}
          name="gender"
          onChange={handleChange}
          onBlur={handleBlur}
        >
          <option value="">Select Gender</option>
          <option key="male" value="Male">
            Male
          </option>
          <option key="female" value="Female">
            Female
          </option>
          <option key="other" value="Other">
            Other
          </option>
        </select>
        {errors.gender && touched.gender && (
          <p id={classes.errors}>{errors.gender}</p>
        )}

        <label className={classes.labelStyle}>
          Blood Group<span style={{ color: "red" }}>*</span>
        </label>
        <input
          className={classes.styledInput}
          id="bloodGroup"
          name="bloodGroup"
          value={values.bloodGroup}
          onChange={handleChange}
          onBlur={handleBlur}
          type="text"
          placeholder="Enter Blood Group"
        />
        {errors.bloodGroup && touched.bloodGroup && (
          <p id={classes.errors}>{errors.bloodGroup}</p>
        )}
      </form>
    </div>
  );
};

export default StepOne;
