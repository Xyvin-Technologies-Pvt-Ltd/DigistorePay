import React, { useState, useEffect } from "react";
import classes from "./Dthrecharge.module.css";
import Button from "../../button/Button";
import { useFormik } from "formik";
import { dthRechargeSchema } from "../../../Validations/service_component_validations/dth/DthValidation";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { toast } from "react-hot-toast";
import {
  paymentStart,
  paymentSuccess,
  paymentFailure,
} from "../../../redux/operators/operatorSlice";
import AdvertCard from "../../../components/advert_card/AdvertCard";
import { fetchOperators } from "../../../utils/fetchOperators";
import { fetchWalletBalance } from "../../../utils/fetchWallet";

const DthRecharge = () => {
  const [bill, setBill] = useState({});
  const { currentUser } = useSelector((state) => state.user);
  const { dth, loading } = useSelector((state) => state.operator);
  const dispatch = useDispatch();

  const onSubmit = async () => {
    try {
      dispatch(paymentStart());
      const res = await axios.post("/billPaymentRoute/billPaymentRequest", {
        amount: values.amount,
        SPKey: values.operator,
        phoneNumber: values.phoneNumber,
        accountNo: values.vcNumber,
        fetchBillID: bill.fetchBillID ? bill.fetchBillID : "0",
      });

      if (res?.data?.data?.status === 3) {
        toast.error(res.data.data.msg, {
          id: "dth",
        });
      } else if (res?.data?.data?.status === 2) {
        toast.success("Recharge Successful", {
          id: "dth",
        });
        resetForm();
      } else if (res?.data?.data?.status === 1) {
        toast.success("Recharge Processing", {
          id: "dth",
        });
        resetForm();
      }
      fetchWalletBalance(dispatch, currentUser);
      dispatch(paymentSuccess());
    } catch (error) {
      dispatch(paymentFailure());
      if (error?.response?.data?.status === "fail") {
        toast.error(error?.response?.data?.message, {
          id: "dth",
        });
      } else {
        toast.error(error?.error?.msg || "Something went wrong", {
          id: "dth",
        });
      }
    }
  };

  const {
    values,
    errors,
    touched,
    setFieldValue,
    handleBlur,
    handleChange,
    handleSubmit,
    resetForm,
    isValid,
    dirty,
  } = useFormik({
    initialValues: {
      operator: "",
      vcNumber: "",
      phoneNumber: "",
      amount: 0,
    },
    validationSchema: dthRechargeSchema,
    onSubmit,
  });

  useEffect(() => {
    if (!dth) {
      fetchOperators(dispatch);
    }
  }, []);

  const isFormFilled = dirty && isValid;

  return (
    <>
      <section className={classes.mainContainer}>
        <form onSubmit={handleSubmit} className={classes.form}>
          <p className={classes.heading}>DTH Recharge</p>
          <label htmlFor="operator" className={classes.serviceLabel}>
            Operator
          </label>
          <select
            className={classes.dropdown}
            id={classes.styledInput}
            value={values.operator}
            name="operator"
            onChange={handleChange}
            onBlur={handleBlur}
          >
            <option>Select Operator</option>
            {dth?.map((provider) => {
              return (
                <option key={provider.id} value={provider.SP_key}>
                  {provider.serviceProvider}
                </option>
              );
            })}
          </select>
          {errors.operator && touched.operator && (
            <p id={classes.errors}>{errors.operator}</p>
          )}
          <label htmlFor="vcNumber" className={classes.serviceLabel}>
            VC Number
          </label>
          <input
            id={classes.styledInput}
            value={values.vcNumber}
            name="vcNumber"
            onChange={handleChange}
            onBlur={handleBlur}
            onWheel={(e) => e.target.blur()}
            placeholder="Enter VC Number"
            type="number"
          />

          {errors.vcNumber && touched.vcNumber && (
            <p id={classes.errors}>{errors.vcNumber}</p>
          )}
          <label htmlFor="phoneNumber" className={classes.serviceLabel}>
            Mobile Number
          </label>
          <input
            id={classes.styledInput}
            value={values.phoneNumber}
            name="phoneNumber"
            onChange={handleChange}
            onBlur={handleBlur}
            onWheel={(e) => e.target.blur()}
            placeholder="Enter Mobile Number"
            type="number"
          />

          {errors.phoneNumber && touched.phoneNumber && (
            <p id={classes.errors}>{errors.phoneNumber}</p>
          )}
          <label htmlFor="amount" className={classes.serviceLabel}>
            Amount
          </label>
          <input
            id={classes.styledInput}
            value={values.amount}
            name="amount"
            onChange={handleChange}
            onBlur={handleBlur}
            onWheel={(e) => e.target.blur()}
            placeholder="Amount"
            type="number"
          />

          {errors.amount && touched.amount && (
            <p id={classes.errors}>{errors.amount}</p>
          )}
          <Button
            btnType="submit"
            btnName={
              !isFormFilled
                ? "Please fill the form"
                : loading
                ? "Processing"
                : "Proceed"
            }
            disabled={!isFormFilled || loading}
          ></Button>
        </form>
      </section>

      <div style={{ position: "relative" }}>
        <AdvertCard image="/assets/ad/mobile.jpeg" alt="dthAd" sticky={true} />
      </div>
    </>
  );
};

export default DthRecharge;
