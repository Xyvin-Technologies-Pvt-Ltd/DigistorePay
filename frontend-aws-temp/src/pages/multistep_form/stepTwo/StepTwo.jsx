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
        <label htmlFor="ownerName" className={classes.labelStyle}>
          Owner Name<span style={{ color: "red" }}>*</span>
        </label>
        <input
          className={classes.styledInput}
          id="ownerName"
          name="ownerName"
          value={values.ownerName}
          onChange={handleChange}
          onBlur={handleBlur}
          type="text"
          placeholder="Enter Owner Name"
        ></input>
        {errors.ownerName && touched.ownerName && (
          <p id={classes.errors}>{errors.ownerName}</p>
        )}
        <label htmlFor="phoneNumber" className={classes.labelStyle}>
          Phone Number<span style={{ color: "red" }}>*</span>
        </label>
        <input
          id="phoneNumber"
          disabled
          className={classes.styledInput}
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
        <label htmlFor="gender" className={classes.labelStyle}>
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
          <option>Select Gender</option>
          <option key="male" value="male">
            Male
          </option>
          <option key="female" value="female">
            Female
          </option>
        </select>
        {errors.gender && touched.gender && (
          <p id={classes.errors}>{errors.gender}</p>
        )}
        <label className={classes.labelStyle}>
          Date of birth<span style={{ color: "red" }}>*</span>
        </label>
        <DatePicker
          name="dateOfBirth"
          id={classes.styledInput}
          className={classes.datePicker}
          selected={values.dateOfBirth}
          maxDate={new Date()}
          dateFormat="dd/MM/yyyy"
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
