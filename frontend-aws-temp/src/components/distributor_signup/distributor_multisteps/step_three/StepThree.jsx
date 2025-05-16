import classes from "./StepThree.module.css";
import { getIndiaState, getIndiaDistrict } from "india-state-district";

const StepThree = ({ formik }) => {
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
      <p className={classes.heading}>Distributor Details</p>
      <form className={classes.form} onSubmit={handleSubmit}>
        <label htmlFor="distributorName" className={classes.labelStyle}>
          Distributor Name
        </label>
        <input
          id="distributorName"
          className={classes.styledInput}
          value={values.distributorName}
          name="distributorName"
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Enter Distributor Name"
          type="text"
        />

        {errors.distributorName && touched.distributorName && (
          <p id={classes.errors}>{errors.distributorName}</p>
        )}

        <label htmlFor="distributorAddressLine1" className={classes.labelStyle}>
          Distributor Address Line1
        </label>
        <input
          id="distributorAddressLine1"
          className={classes.styledInput}
          value={values.distributorAddressLine1}
          name="distributorAddressLine1"
          onChange={handleChange}
          onBlur={handleBlur}
          type="text"
          placeholder="Enter Address line 1"
        />

        {errors.distributorAddressLine1 && touched.distributorAddressLine1 && (
          <p id={classes.errors}>{errors.distributorAddressLine1}</p>
        )}
        <label htmlFor="distributorAddressLine2" className={classes.labelStyle}>
          Distributor Address Line 2
        </label>
        <input
          id="distributorAddressLine2"
          className={classes.styledInput}
          value={values.distributorAddressLine2}
          name="distributorAddressLine2"
          onChange={handleChange}
          onBlur={handleBlur}
          type="text"
          placeholder="Enter Address line 2"
        />

        {errors.distributorAddressLine2 && touched.distributorAddressLine2 && (
          <p id={classes.errors}>{errors.distributorAddressLine2}</p>
        )}
        <label htmlFor="state" className={classes.labelStyle}>
          State
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
          {getIndiaState().map((state) => {
            return (
              <option
                key={state.code}
                data-statecode={state.code}
                value={state.state}
              >
                {state.state}
              </option>
            );
          })}
        </select>
        {errors.state && touched.state && (
          <p id={classes.errors}>{errors.state}</p>
        )}
        <label htmlFor="district" className={classes.labelStyle}>
          District
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
          {getIndiaDistrict(values.stateCode).map((district) => {
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

        <label htmlFor="pinCode" className={classes.labelStyle}>
          Pin Code
        </label>
        <input
          id="pinCode"
          className={classes.styledInput}
          name="pinCode"
          value={values.pinCode}
          onChange={handleChange}
          onBlur={handleBlur}
          type="number"
          placeholder="Enter Pin code"
        />

        {errors.pinCode && touched.pinCode && (
          <p id={classes.errors}>{errors.pinCode}</p>
        )}
      </form>
    </div>
  );
};

export default StepThree;
