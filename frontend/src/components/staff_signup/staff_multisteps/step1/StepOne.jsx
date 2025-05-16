import React from "react";
import classes from "./StepOne.module.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import UploadCard from "../../../upload_card/UploadCard";
import { fileMimeType } from "../../../../data/filemimetype.jsx";
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
        <label htmlFor="firstName" className={classes.labelStyle}>
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

        <label htmlFor="lastName" className={classes.labelStyle}>
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

        <label htmlFor="email" className={classes.labelStyle}>
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

        <label htmlFor="mobileNumber" className={classes.labelStyle}>
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
          Emergency Contact<span style={{ color: "red" }}>*</span>
        </label>
        <input
          className={classes.styledInput}
          id="emergencyContact"
          name="emergencyContact"
          value={values.emergencyContact}
          onChange={handleChange}
          onBlur={handleBlur}
          onWheel={(e) => e.target.blur()}
          type="number"
          placeholder="Enter Emergency Contact Number"
        />
        {errors.emergencyContact && touched.emergencyContact && (
          <p id={classes.errors}>{errors.emergencyContact}</p>
        )}

        <label className={classes.labelStyle}>
          Password<span style={{ color: "red" }}>*</span>
        </label>
        <input
          className={classes.styledInput}
          name="password"
          value={values.password}
          onChange={handleChange}
          onBlur={handleBlur}
          type="password"
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
          className={classes.styledInput}
          id={classes.datePicker}
          selected={values.dateOfBirth}
          placeholderText="Date of birth"
          onBlur={handleBlur}
          onChange={(date) => setFieldValue("dateOfBirth", date)}
          showMonthDropdown
          showYearDropdown
          dropdownMode="select"
        />
      {errors.dateOfBirth && touched.dateOfBirth && (
          <p id={classes.errors}>{errors.dateOfBirth}</p>
        )}

        <label htmlFor="gender" className={classes.labelStyle}>
          Gender <span style={{ color: "red" }}>*</span>
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
          <option key="male" value="male">
            Male
          </option>
          <option key="female" value="female">
            Female
          </option>
          <option key="other" value="other">
            Other
          </option>
        </select>
        {errors.gender && touched.gender && (
          <p id={classes.errors}>{errors.gender}</p>
        )}

        <label htmlFor="bloodGroup" className={classes.labelStyle}>
          Blood Group <span style={{ color: "red" }}>*</span>
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

        <UploadCard
          handleBlur={handleBlur}
          setFieldValue={setFieldValue}
          nameArray={[
            {
              name: "Profile picture",
              fieldName: "profilePic",
              mandatory: true,
              allowedMimeTypes: fileMimeType.documentsAndImages,
            },
          ]}
        />
      </form>
    </div>
  );
};

export default StepOne;
