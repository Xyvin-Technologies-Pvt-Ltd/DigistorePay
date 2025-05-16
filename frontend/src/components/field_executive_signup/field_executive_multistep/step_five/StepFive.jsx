import React from "react";
import { getIndiaDistrict } from "india-state-district";
import classes from "./StepFive.module.css";

const StepFive = ({ formik }) => {
  const { handleChange, handleBlur, values, errors, touched, setFieldValue } =
    formik;

  const handleCheckboxChange = (e, fieldName) => {
    const isChecked = e.target.checked;
    setFieldValue(fieldName, isChecked ? true : false);
  };

  return (
    <div className={classes.mainContainer}>
      <p className={classes.heading}>Asset Allocation</p>
      <form className={classes.form}>
        <label htmlFor="reportingManager" className={classes.labelStyle}>
          Reporting Manager<span style={{ color: "red" }}>*</span>
        </label>
        <input
          className={classes.styledInput}
          id="reportingManager"
          name="reportingManager"
          value={values.reportingManager}
          onChange={handleChange}
          onBlur={handleBlur}
          type="text"
          placeholder="Enter Reporting Manager"
        />
        {errors.reportingManager && touched.reportingManager && (
          <p className={classes.errors}>{errors.reportingManager}</p>
        )}

        <label htmlFor="districtOfOperation" className={classes.labelStyle}>
          District of Operation<span style={{ color: "red" }}>*</span>
        </label>
        <select
          className={classes.dropdown}
          id="districtOfOperation"
          name="districtOfOperation"
          value={values.districtOfOperation}
          onChange={handleChange}
          onBlur={handleBlur}
        >
          <option>Select District</option>
          {getIndiaDistrict(values.stateCode).map((districtOfOperation) => (
            <option key={districtOfOperation} value={districtOfOperation}>
              {districtOfOperation}
            </option>
          ))}
        </select>
        {errors.districtOfOperation && touched.districtOfOperation && (
          <p className={classes.errors}>{errors.districtOfOperation}</p>
        )}

        <label htmlFor="assetallocated" className={classes.labelStyle}>
          Asset Allocated
        </label>

        <label className={classes.labelOption}>
          Laptop
          <input
            type="checkbox"
            name="laptop"
            checked={values.laptop || false}
            onChange={(e) => handleCheckboxChange(e, "laptop")}
            onBlur={handleBlur}
          />
        </label>
        {values.laptop && (
          <>
            <input
              className={classes.styledInput}
              name="laptopDetails"
              value={values.laptopDetails || ""}
              onChange={handleChange}
              onBlur={handleBlur}
              type="text"
              placeholder="Enter Laptop Details"
            />
            {errors.laptopDetails && touched.laptopDetails && (
              <p className={classes.errors}>{errors.laptopDetails}</p>
            )}
          </>
        )}

        <label className={classes.labelOption}>
          SIM
          <input
            type="checkbox"
            name="sim"
            checked={values.sim || false}
            onChange={(e) => handleCheckboxChange(e, "sim")}
            onBlur={handleBlur}
          />
        </label>
        {values.sim && (
          <>
            <input
              className={classes.styledInput}
              name="simDetails"
              value={values.simDetails || ""}
              onChange={handleChange}
              onBlur={handleBlur}
              type="text"
              placeholder="Enter SIM Details"
            />
            {errors.simDetails && touched.simDetails && (
              <p className={classes.errors}>{errors.simDetails}</p>
            )}
          </>
        )}

        <label className={classes.labelOption}>
          ID Card
          <input
            type="checkbox"
            name="idCard"
            checked={values.idCard || false}
            onChange={(e) => handleCheckboxChange(e, "idCard")}
            onBlur={handleBlur}
          />
        </label>
        {values.idCard && (
          <>
            <input
              className={classes.styledInput}
              name="idCardDetails"
              value={values.idCardDetails || ""}
              onChange={handleChange}
              onBlur={handleBlur}
              type="text"
              placeholder="Enter ID Card Details"
            />
            {errors.idCardDetails && touched.idCardDetails && (
              <p className={classes.errors}>{errors.idCardDetails}</p>
            )}
          </>
        )}

        <label className={classes.labelOption}>
          Phone
          <input
            type="checkbox"
            name="phone"
            checked={values.phone || false}
            onChange={(e) => handleCheckboxChange(e, "phone")}
            onBlur={handleBlur}
          />
        </label>
        {values.phone && (
          <>
            <input
              className={classes.styledInput}
              name="phoneDetails"
              value={values.phoneDetails || ""}
              onChange={handleChange}
              onBlur={handleBlur}
              type="text"
              placeholder="Enter Phone Details"
            />
            {errors.phoneDetails && touched.phoneDetails && (
              <p className={classes.errors}>{errors.phoneDetails}</p>
            )}
          </>
        )}

        <label className={classes.labelOption}>
          Visiting Card
          <input
            type="checkbox"
            name="vistingCard"
            checked={values.vistingCard || false}
            onChange={(e) => handleCheckboxChange(e, "vistingCard")}
            onBlur={handleBlur}
          />
        </label>
        {values.vistingCard && (
          <>
            <input
              className={classes.styledInput}
              name="vistingCardDetails"
              value={values.vistingCardDetails || ""}
              onChange={handleChange}
              onBlur={handleBlur}
              type="text"
              placeholder="Enter Visiting Card Details"
            />
            {errors.vistingCardDetails && touched.vistingCardDetails && (
              <p className={classes.errors}>{errors.vistingCardDetails}</p>
            )}
          </>
        )}

        <label className={classes.labelOption}>
          Posters/Brochures
          <input
            type="checkbox"
            name="posterOrBroucher"
            checked={values.posterOrBroucher || false}
            onChange={(e) => handleCheckboxChange(e, "posterOrBroucher")}
            onBlur={handleBlur}
          />
        </label>
        {values.posterOrBroucher && (
          <>
            <input
              className={classes.styledInput}
              name="posterOrBroucherDetails"
              value={values.posterOrBroucherDetails || ""}
              onChange={handleChange}
              onBlur={handleBlur}
              type="text"
              placeholder="Enter Poster/Broucher Details"
            />
            {errors.posterOrBroucherDetails &&
              touched.posterOrBroucherDetails && (
                <p className={classes.errors}>
                  {errors.posterOrBroucherDetails}
                </p>
              )}
          </>
        )}

        <label className={classes.labelOption}>
          Any Other
          <input
            type="checkbox"
            name="other"
            checked={values.other || false}
            onChange={(e) => handleCheckboxChange(e, "other")}
            onBlur={handleBlur}
          />
        </label>
        {values.other && (
          <>
            <input
              className={classes.styledInput}
              name="otherDetails"
              value={values.otherDetails || ""}
              onChange={handleChange}
              onBlur={handleBlur}
              type="text"
              placeholder="Enter Other Details"
            />
            {errors.otherDetails && touched.otherDetails && (
              <p className={classes.errors}>{errors.otherDetails}</p>
            )}
          </>
        )}

        <label className={classes.labelOption}>
          Remarks
          <input
            type="checkbox"
            name="remarksChecked"
            checked={values.remarksChecked || false}
            onChange={(e) => handleCheckboxChange(e, "remarksChecked")}
            onBlur={handleBlur}
          />
        </label>
        {values.remarksChecked && (
          <>
            <input
              className={classes.styledInput}
              name="remarks"
              value={values.remarks || ""}
              onChange={handleChange}
              onBlur={handleBlur}
              type="text"
              placeholder="Enter Remarks"
            />
            {errors.remarks && touched.remarks && (
              <p className={classes.errors}>{errors.remarks}</p>
            )}
          </>
        )}
      </form>
    </div>
  );
};

export default StepFive;
