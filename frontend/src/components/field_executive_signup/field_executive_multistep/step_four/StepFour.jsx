import React from "react";
import classes from "./StepFour.module.css";

const StepFour = ({ formik }) => {
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
      <p className={classes.heading}>Bank Details</p>
      <form className={classes.form} onSubmit={handleSubmit}>
        <label className={classes.labelStyle}>
          Account Number<span style={{ color: "red" }}>*</span>
        </label>
        <input
          id="accountNumber"
          className={classes.styledInput}
          name="accountNumber"
          value={values.accountNumber}
          onChange={handleChange}
          onBlur={handleBlur}
          type="number"
          placeholder="Enter Account Number"
        />
        {errors.accountNumber && touched.accountNumber && (
          <p id={classes.errors}>{errors.accountNumber}</p>
        )}

        <label className={classes.labelStyle}>
          Account Holder Name<span style={{ color: "red" }}>*</span>
        </label>
        <input
          id="accountName"
          className={classes.styledInput}
          name="accountName"
          value={values.accountName}
          onChange={handleChange}
          onBlur={handleBlur}
          type="text"
          placeholder="Enter Account Name"
        />
        {errors.accountName && touched.accountName && (
          <p id={classes.errors}>{errors.accountName}</p>
        )}

        <label className={classes.labelStyle}>
          Bank Name<span style={{ color: "red" }}>*</span>
        </label>
        <input
          id="bank"
          className={classes.styledInput}
          name="bank"
          value={values.bank}
          onChange={handleChange}
          onBlur={handleBlur}
          type="text"
          placeholder="Enter Bank Name"
        />
        {errors.bank && touched.bank && (
          <p id={classes.errors}>{errors.bank}</p>
        )}

        <label className={classes.labelStyle}>
          Branch Name<span style={{ color: "red" }}>*</span>
        </label>
        <input
          id="branchName"
          className={classes.styledInput}
          name="branchName"
          value={values.branchName}
          onChange={handleChange}
          onBlur={handleBlur}
          type="text"
          placeholder="Enter Branch Name"
        />
        {errors.branchName && touched.branchName && (
          <p id={classes.errors}>{errors.branchName}</p>
        )}

        <label className={classes.labelStyle}>
          IFSC Code<span style={{ color: "red" }}>*</span>
        </label>
        <input
          id="ifscCode"
          className={classes.styledInput}
          name="ifscCode"
          value={values.ifscCode}
          onChange={handleChange}
          onBlur={handleBlur}
          type="text"
          placeholder="Enter IFSC Code"
        />
        {errors.ifscCode && touched.ifscCode && (
          <p id={classes.errors}>{errors.ifscCode}</p>
        )}
      </form>
    </div>
  );
};

export default StepFour;
