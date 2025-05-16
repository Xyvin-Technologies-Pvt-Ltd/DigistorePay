import React from "react";
import classes from "./gasForm.module.css";
import { useFormik } from "formik";
import Button from "../../button/Button";
import { gasFormSchema } from "../../../Validations/service_component_validations/lpg_cylinder_booking/GasForm";

const GasForm = () => {
  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: {
        operator: "",
        telephoneNumber: "",
      },
      validationSchema: gasFormSchema,
    });
  return (
    <section className={classes.mainContainer}>
      <form className={classes.form} onSubmit={handleSubmit}>
        <p className={classes.heading}>Book LPG Cylinder </p>
        <select
          className={classes.dropdown}
          id={classes.styledInput}
          value={values.operator}
          name="operator"
          onChange={handleChange}
          onBlur={handleBlur}
        >
          <option>Select Operator</option>
        </select>
        {errors.operator && touched.operator && (
          <p id={classes.errors}>{errors.operator}</p>
        )}
        <input
          id={classes.styledInput}
          name="telephoneNumber"
          className={classes.telephoneNumber}
          value={values.telephoneNumber}
          onChange={handleChange}
          onBlur={handleBlur}
          onWheel={(e) => e.target.blur()}
          type="number"
          placeholder="Enter 10 digit Telephone Number"
        ></input>
        {errors.telephoneNumber && touched.telephoneNumber && (
          <p id={classes.errors}>{errors.telephoneNumber}</p>
        )}
        <Button btnName="Proceed" btnType="submit" />
      </form>
    </section>
  );
};

export default GasForm;
