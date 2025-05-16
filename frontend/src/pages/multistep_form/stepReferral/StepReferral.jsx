import classes from "./StepReferral.module.css";
import { useLocation } from "react-router-dom";

const StepReferral = ({ formik }) => {
  let location = useLocation();
  const {
    handleChange,
    handleBlur,
    values,
    errors,
    handleSubmit,
    setFieldValue,
    touched,
  } = formik;

  const handleReferredBy = (event) => {
    const value = event.target.value === "true";
    setFieldValue("referredBy", value);
  };

  return (
    <div className={classes.mainContainer}>
      <p className={classes.heading}>Referral Details</p>
      <form className={classes.form} onSubmit={handleSubmit}>
        {(location.pathname === "/onboard/franchise" ||
          location.pathname === "/signup") && (
          <>
            <div id={classes.styledInput} className={classes.radioContainer}>
              <p className={classes.subHeadings}>
                Do u have a referral?<span style={{ color: "red" }}>*</span>
              </p>
              <label className={classes.radioLabel}>
                <input
                  type="radio"
                  name="referredBy"
                  value="true"
                  checked={values.referredBy === true}
                  onChange={handleReferredBy}
                ></input>{" "}
                Yes
              </label>
              <label>
                <input
                  type="radio"
                  name="referredBy"
                  value="false"
                  checked={values.referredBy === false}
                  onChange={handleReferredBy}
                ></input>{" "}
                No
              </label>
            </div>
            {values.referredBy && (
              <>
                <label
                  htmlFor="referredFranchiseName"
                  className={classes.labelStyle}
                >
                  Franchise Name/ Student Name
                  <span style={{ color: "red" }}>*</span>
                </label>
                <input
                  id="referredFranchiseName"
                  className={classes.styledInput}
                  name="referredFranchiseName"
                  value={values.referredFranchiseName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  type="text"
                  placeholder="Enter Franchise Name"
                ></input>
                {/* {errors.accountName && touched.accountName && (
          <p id={classes.errors}>{errors.accountName}</p>
        )} */}
                <label
                  htmlFor="referredFranchiseCode"
                  className={classes.labelStyle}
                >
                  Franchise Code/ Student Code
                  <span style={{ color: "red" }}>*</span>
                </label>
                <input
                  id="referredFranchiseCode"
                  className={classes.styledInput}
                  name="referredFranchiseCode"
                  value={values.referredFranchiseCode}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  type="text"
                  placeholder="Enter Franchise Code"
                ></input>
                {/* {errors.accountName && touched.accountName && (
          <p id={classes.errors}>{errors.accountName}</p>
        )} */}
              </>
            )}
          </>
        )}

        {values.onBoardedBy !== "itsSelf" && (
          <>
            <p className={classes.subHeadings}>
              Onboarded By :<span style={{ color: "red" }}>*</span>
            </p>
            <label htmlFor="onBoardedPersonName" className={classes.labelStyle}>
              Onboarder Name
            </label>
            <input
              id="onBoardedPersonName"
              disabled
              className={classes.styledInput}
              name="onBoardedPersonName"
              value={values.onBoardedPersonName}
              onChange={handleChange}
              onBlur={handleBlur}
              type="text"
              placeholder="Enter Onboarder Name"
            ></input>
            {/* {errors.accountName && touched.accountName && (
          <p id={classes.errors}>{errors.accountName}</p>
        )} */}
            <label htmlFor="onBoardedPersonId" className={classes.labelStyle}>
              Onboarder Id<span style={{ color: "red" }}>*</span>
            </label>
            <input
              id="onBoardedPersonId"
              disabled
              className={classes.styledInput}
              name="onBoardedPersonId"
              value={values.onBoardedPersonId}
              onChange={handleChange}
              onBlur={handleBlur}
              type="text"
              placeholder="Enter Onboarder Id"
            ></input>
            {/* {errors.accountName && touched.accountName && (
          <p id={classes.errors}>{errors.accountName}</p>
        )} */}
          </>
        )}
      </form>
    </div>
  );
};

export default StepReferral;
