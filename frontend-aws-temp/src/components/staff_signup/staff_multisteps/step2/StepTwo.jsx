import React, { useState, useEffect } from "react";
import classes from "./StepTwo.module.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const StepTwo = ({ formik, handleEmploymentTypeChange }) => {
  const { handleChange, handleBlur, values, errors, touched, setFieldValue } =
    formik;

  const [isTrainingRequired, setIsTrainingRequired] = useState(
    values.isTrainingRequired || false
  );
  const [employmentStartDate, setEmploymentStartDate] = useState(
    values.dateOfJoin || null
  );

  const handleTrainingChange = (value) => {
    setIsTrainingRequired(value);
    setFieldValue("isTrainingRequired", value);

    if (!value) {
      setFieldValue("trainingDays", "");
      setFieldValue("employmentStartDate", null);
    }
  };

  useEffect(() => {
    if (isTrainingRequired) {
      setEmploymentStartDate(values.dateOfJoin);
      setFieldValue("employmentStartDate", values.dateOfJoin);
    }
  }, [values.dateOfJoin, isTrainingRequired, setFieldValue]);

  return (
    <div className={classes.mainContainer}>
      <p className={classes.heading}>Employment Details</p>
      <form className={classes.form}>
        <label htmlFor="employment" className={classes.labelStyle}>
          Employment <span style={{ color: "red" }}>*</span>
        </label>
        <select
          className={classes.dropdown}
          id="employment"
          value={values.employment}
          name="employment"
          onChange={handleChange}
          onBlur={handleBlur}
        >
          <option value="">Select Employment</option>
          <option value="fullTime">Full Time</option>
          <option value="partTime">Part Time</option>
          <option value="trainee">Trainee</option>
        </select>
        {errors.employment && touched.employment && (
          <p id={classes.errors}>{errors.employment}</p>
        )}

        <label className={classes.labelStyle}>Remarks</label>
        <input
          id="remarks"
          className={classes.styledInput}
          value={values.remarks}
          name="remarks"
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Any Remarks"
          type="text"
        />
        {errors.remarks && touched.remarks && (
          <p id={classes.errors}>{errors.remarks}</p>
        )}

        <label className={classes.labelStyle}>
          Date of Joining <span style={{ color: "red" }}>*</span>
        </label>
        <DatePicker
          name="dateOfJoin"
          className={classes.datePicker}
          selected={values.dateOfJoin}
          placeholderText="Date of joining"
          onBlur={handleBlur}
          onChange={(date) => setFieldValue("dateOfJoin", date)}
        />
        {errors.dateOfJoin && touched.dateOfJoin && (
          <p id={classes.errors}>{errors.dateOfJoin}</p>
        )}

        <div className={classes.trainingContainer}>
          <label className={classes.labelStyle}>Need Training?</label>
          <label className={classes.checkboxLabel}>
            <input
              type="radio"
              name="isTrainingRequired"
              value={true}
              checked={isTrainingRequired === true}
              onChange={() => handleTrainingChange(true)}
              className={classes.checkbox}
            />
            Yes
          </label>
          <label className={classes.checkboxLabel}>
            <input
              type="radio"
              name="isTrainingRequired"
              value={false}
              checked={isTrainingRequired === false}
              onChange={() => handleTrainingChange(false)}
              className={classes.checkbox}
            />
            No
          </label>
        </div>
        {errors.isTrainingRequired && touched.isTrainingRequired && (
          <p id={classes.errors}>{errors.isTrainingRequired}</p>
        )}

        {isTrainingRequired && (
          <>
            <div className={classes.trainingDaysContainer}>
              <label htmlFor="totalTrainingDays" className={classes.labelStyle}>
                Number of Days of Training
              </label>
              <input
                className={classes.styledInput}
                id="totalTrainingDays"
                name="totalTrainingDays"
                value={values.totalTrainingDays}
                onChange={handleChange}
                onBlur={handleBlur}
                onWheel={(e) => e.target.blur()}
                type="number"
                placeholder="Enter Number of Days"
              />
              {errors.totalTrainingDays && touched.totalTrainingDays && (
                <p id={classes.errors}>{errors.totalTrainingDays}</p>
              )}
            </div>
          </>
        )}
      </form>
    </div>
  );
};

export default StepTwo;
