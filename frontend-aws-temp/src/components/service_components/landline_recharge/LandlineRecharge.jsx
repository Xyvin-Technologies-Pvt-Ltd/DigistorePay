import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import classes from "./Landlinerecharge.module.css";
import Button from "../../button/Button";
import { telephoneBillSchema } from "../../../Validations/service_component_validations/telephone_bill/TelephoneBill";
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

const LandlineRecharge = () => {
  const [bill, setBill] = useState({});
  const { currentUser } = useSelector((state) => state.user);
  const { landline, loading } = useSelector((state) => state.operator);
  const dispatch = useDispatch();

  const onSubmit = async () => {
    try {
      dispatch(paymentStart());
      const res = await axios.post("/billPaymentRoute/billPaymentRequest", {
        amount: values.amount,
        SPKey: values.operator,
        phoneNumber: values.phoneNumber,
        accountNo: values.telephoneNumber,
        fetchBillID: bill.fetchBillID ? bill.fetchBillID : "0",
      });

      if (res.data.errorcode) {
        toast.error(res.data.msg, {
          id: "landline",
        });
      } else {
        setFieldValue({
          telephoneNumber: "",
          operator: "",
          phoneNumber: "",
          circle: "",
          amount: 0,
        });
        toast.success("Recharge Successful", {
          id: "landline",
        });
        resetForm();
      }
      fetchWalletBalance(dispatch, currentUser);
      dispatch(paymentSuccess());
    } catch (error) {
      dispatch(paymentFailure());
      toast.error(error?.response?.data?.message || "Something went wrong", {
        id: "landline",
      });
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
      telephoneNumber: "",
      phoneNumber: "",
      amount: 0,
    },
    validationSchema: telephoneBillSchema,
    onSubmit,
  });

  useEffect(() => {
    if (!landline) {
      fetchOperators(dispatch);
    }
  }, []);
  const isFormFilled = dirty && isValid;

  return (
    <>
      <section className={classes.mainContainer}>
        <form onSubmit={handleSubmit} className={classes.form}>
          <p className={classes.heading}>Landline Bill Payment</p>
          <select
            className={classes.dropdown}
            id={classes.styledInput}
            value={values.operator}
            name="operator"
            onChange={handleChange}
            onBlur={handleBlur}
          >
            <option>Select Operator</option>
            {landline?.map((provider) => {
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
        <AdvertCard
          image="/assets/ad/mobile.jpeg"
          alt="landlineAd"
          sticky={true}
        />
      </div>
    </>
  );
};

export default LandlineRecharge;
