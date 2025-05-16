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

  const handlePanCenter = (event) => {
    setFieldValue("digitalElements", "");
    const value = event.target.value === "true";
    setFieldValue("panCenter", value);
  };

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
      <p className={classes.heading}>Franchisee Details</p>
      <form className={classes.form} onSubmit={handleSubmit}>
        <label htmlFor="franchiseName" className={classes.labelStyle}>
          Franchisee Name<span style={{ color: "red" }}>*</span>
        </label>
        <input
          id="franchiseName"
          className={classes.styledInput}
          value={values.franchiseName}
          name="franchiseName"
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Enter franchise Name"
          type="text"
        />

        {errors.franchiseName && touched.franchiseName && (
          <p id={classes.errors}>{errors.franchiseName}</p>
        )}

        <label htmlFor="businessType" className={classes.labelStyle}>
          Business Type<span style={{ color: "red" }}>*</span>
        </label>
        <input
          id="businessType"
          className={classes.styledInput}
          value={values.businessType}
          name="businessType"
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Enter Business Type"
          type="text"
        />

        {errors.businessType && touched.businessType && (
          <p id={classes.errors}>{errors.businessType}</p>
        )}

        <label htmlFor="franchiseAddressLine1" className={classes.labelStyle}>
          Franchise Address Line1<span style={{ color: "red" }}>*</span>
        </label>
        <input
          id="franchiseAddressLine1"
          className={classes.styledInput}
          value={values.franchiseAddressLine1}
          name="franchiseAddressLine1"
          onChange={handleChange}
          onBlur={handleBlur}
          type="text"
          placeholder="Enter Address line 1"
        />

        {errors.franchiseAddressLine1 && touched.franchiseAddressLine1 && (
          <p id={classes.errors}>{errors.franchiseAddressLine1}</p>
        )}
        <label htmlFor="franchiseAddressLine2" className={classes.labelStyle}>
          Franchise Address Line 2
        </label>
        <input
          id="franchiseAddressLine2"
          className={classes.styledInput}
          value={values.franchiseAddressLine2}
          name="franchiseAddressLine2"
          onChange={handleChange}
          onBlur={handleBlur}
          type="text"
          placeholder="Enter Address line 2"
        />

        {errors.franchiseAddressLine2 && touched.franchiseAddressLine2 && (
          <p id={classes.errors}>{errors.franchiseAddressLine2}</p>
        )}
        <label htmlFor="state" className={classes.labelStyle}>
          State<span style={{ color: "red" }}>*</span>
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
        <label htmlFor="postOffice" className={classes.labelStyle}>
          Post Office<span style={{ color: "red" }}>*</span>
        </label>
        <input
          id="postOffice"
          className={classes.styledInput}
          name="postOffice"
          value={values.postOffice}
          onChange={handleChange}
          onBlur={handleBlur}
          type="text"
          placeholder="Enter Post Office"
        />

        {errors.postOffice && touched.postOffice && (
          <p id={classes.errors}>{errors.postOffice}</p>
        )}
        <label htmlFor="pinCode" className={classes.labelStyle}>
          Pin Code<span style={{ color: "red" }}>*</span>
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
          placeholder="Enter Pin code"
        />

        {errors.pinCode && touched.pinCode && (
          <p id={classes.errors}>{errors.pinCode}</p>
        )}
        <label htmlFor="panchayath" className={classes.labelStyle}>
          Panchayath<span style={{ color: "red" }}>*</span>
        </label>
        <input
          id="panchayath"
          className={classes.styledInput}
          name="panchayath"
          value={values.panchayath}
          onChange={handleChange}
          onBlur={handleBlur}
          type="text"
          placeholder="Enter panchayath"
        />

        {errors.panchayath && touched.panchayath && (
          <p id={classes.errors}>{errors.panchayath}</p>
        )}
        <label htmlFor="ward" className={classes.labelStyle}>
          Ward<span style={{ color: "red" }}>*</span>
        </label>
        <input
          id="ward"
          className={classes.styledInput}
          name="ward"
          value={values.ward}
          onChange={handleChange}
          onBlur={handleBlur}
          type="text"
          placeholder="Enter ward"
        />

        {errors.ward && touched.ward && (
          <p id={classes.errors}>{errors.ward}</p>
        )}

        <div id={classes.styledInput} className={classes.radioContainer}>
          <p className={classes.subHeadings}>
            Is it possible to convert to Pan center
            <span style={{ color: "red" }}>*</span>
          </p>
          <label className={classes.radioLabel}>
            <input
              type="radio"
              name="panCenter"
              value="true"
              checked={values.panCenter === true}
              onChange={handlePanCenter}
            ></input>{" "}
            Yes
          </label>
          <label>
            <input
              type="radio"
              name="panCenter"
              value="false"
              checked={values.panCenter === false}
              onChange={handlePanCenter}
            ></input>{" "}
            No
          </label>
        </div>
        {values.panCenter ? (
          <div>
            <p>
              List all the digital equipments you have
              <span style={{ color: "red" }}>*</span>
            </p>
            <div className={classes.elements}>
              <label>
                <input
                  type="checkbox"
                  value="printer"
                  checked={values.digitalElements.includes("printer")}
                  name="digitalElements"
                  onChange={handleChange}
                />
                printer
              </label>
              <label>
                <input
                  type="checkbox"
                  value="computer"
                  checked={values.digitalElements.includes("computer")}
                  name="digitalElements"
                  onChange={handleChange}
                />
                computer
              </label>
              <label>
                <input
                  type="checkbox"
                  value="scanner"
                  checked={values.digitalElements.includes("scanner")}
                  name="digitalElements"
                  onChange={handleChange}
                />
                scanner
              </label>
            </div>
          </div>
        ) : (
          ""
        )}
      </form>
    </div>
  );
};

export default StepThree;
