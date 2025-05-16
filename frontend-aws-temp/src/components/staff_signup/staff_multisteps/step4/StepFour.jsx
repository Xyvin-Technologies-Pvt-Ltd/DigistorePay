import classes from "./StepFour.module.css";
import { getIndiaState, getIndiaDistrict } from "india-state-district";

const StepFour = ({ formik }) => {
  const {
    handleChange,
    handleBlur,
    values,
    errors,
    handleSubmit,
    setFieldValue,
    touched,
  } = formik;

  const handleStateChange = (event) => {
    setFieldValue("district", "");
    const selectedIndex = event.target.options.selectedIndex;
    setFieldValue("state", event.target.value);
    setFieldValue(
      "stateCode",
      event.target.options[selectedIndex].getAttribute("data-statecode"),
    );
  };

  return (
    <div className={classes.mainContainer}>
      <p className={classes.heading}>Address Details</p>
      <form className={classes.form} onSubmit={handleSubmit}>
        <label htmlFor="addressLine1" className={classes.labelStyle}>
          Address Line 1 <span style={{ color: "red" }}>*</span>
        </label>
        <input
          id="addressLine1"
          className={classes.styledInput}
          value={values.addressLine1}
          name="addressLine1"
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Enter Address Line 1"
          type="text"
        />
        {errors.addressLine1 && touched.addressLine1 && (
          <p id={classes.errors}>{errors.addressLine1}</p>
        )}

        <label htmlFor="addressLine2" className={classes.labelStyle}>
          Address Line 2<span style={{ color: "red" }}>*</span>
        </label>
        <input
          id="addressLine2"
          className={classes.styledInput}
          value={values.addressLine2}
          name="addressLine2"
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Enter Address Line 2"
          type="text"
        />
        {errors.addressLine2 && touched.addressLine2 && (
          <p id={classes.errors}>{errors.addressLine2}</p>
        )}

        <label htmlFor="state" className={classes.labelStyle}>
          State <span style={{ color: "red" }}>*</span>
        </label>
        <select
          className={classes.dropdown}
          id="state"
          value={values.state}
          name="state"
          onChange={(e) => handleStateChange(e)}
          onBlur={handleBlur}
        >
          <option>Select State</option>
          {getIndiaState().map((state) => (
            <option
              key={state.code}
              data-statecode={state.code}
              value={state.state}
            >
              {state.state}
            </option>
          ))}
        </select>
        {errors.state && touched.state && (
          <p id={classes.errors}>{errors.state}</p>
        )}

        <label htmlFor="district" className={classes.labelStyle}>
          District <span style={{ color: "red" }}>*</span>
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
          {getIndiaDistrict(values.stateCode).map((district) => (
            <option key={district} value={district}>
              {district}
            </option>
          ))}
        </select>
        {errors.district && touched.district && (
          <p id={classes.errors}>{errors.district}</p>
        )}

        <label htmlFor="city" className={classes.labelStyle}>
          City <span style={{ color: "red" }}>*</span>
        </label>
        <input
          id="city"
          className={classes.styledInput}
          name="city"
          value={values.city}
          onChange={handleChange}
          onBlur={handleBlur}
          type="text"
          placeholder="Enter City"
        />
        {errors.city && touched.city && (
          <p id={classes.errors}>{errors.city}</p>
        )}

        <label htmlFor="pinCode" className={classes.labelStyle}>
          Pin Code <span style={{ color: "red" }}>*</span>
        </label>
        <input
          id="pinCode"
          className={classes.styledInput}
          name="pinCode"
          value={values.pinCode}
          onChange={handleChange}
          onBlur={handleBlur}
          onWheel={(e) => e.target.blur()}
          type="number"
          placeholder="Enter Pin Code"
        />
        {errors.pinCode && touched.pinCode && (
          <p id={classes.errors}>{errors.pinCode}</p>
        )}
      </form>
    </div>
  );
};

export default StepFour;
