import React from "react";
import classes from "./BroadbandRecharge.module.css";
import Button from "../../button/Button";
import { useFormik } from "formik";
import { broadbandRechargeSchema } from "../../../Validations/service_component_validations/broadband_recharge/BroadbandRecharge";

const BroadbandRecharge = () => {
  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: {
        operator: "",
        customerNumber: "",
      },
      validationSchema: broadbandRechargeSchema,
    });

  return (
    <section className={classes.mainContainer}>
      <form className={classes.form}>
        <p className={classes.heading}>Broadband Bill Payment</p>
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
          value={values.customerNumber}
          name="customerNumber"
          onChange={handleChange}
          onBlur={handleBlur}
          onWheel={(e) => e.target.blur()}
          placeholder="Enter Customer Number"
          type="number"
        />

        {errors.customerNumber && touched.customerNumber && (
          <p id={classes.errors}>{errors.customerNumber}</p>
        )}
        <Button btnName="Proceed" btnType="submit" />
      </form>
    </section>
  );
};

export default BroadbandRecharge;
