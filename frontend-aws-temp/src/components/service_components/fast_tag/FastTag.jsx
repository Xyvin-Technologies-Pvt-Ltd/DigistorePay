import React, { useState, useEffect } from "react";
import classes from "./FastTag.module.css";
import { fastTagRechargeSchema } from "../../../Validations/service_component_validations/fast_tag/FastTagValidation";
import { useFormik } from "formik";
import Button from "../../button/Button";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { toast } from "react-hot-toast";
import {
  paymentStart,
  paymentSuccess,
  paymentFailure,
} from "../../../redux/operators/operatorSlice";
import AdvertCard from "../../../components/advert_card/AdvertCard";
import BillCard from "../../bill_card/BillCard";
import { fetchOperators } from "../../../utils/fetchOperators";
import { fetchBill } from "../../../utils/fetchBill";
import { fetchWalletBalance } from "../../../utils/fetchWallet";

const FastTag = () => {
  const [bill, setBill] = useState({});
  const [showBill, setShowBill] = useState(false);
  const { currentUser } = useSelector((state) => state.user);
  const { fasttag, loading } = useSelector((state) => state.operator);
  const dispatch = useDispatch();

  const onSubmit = async () => {
    try {
      dispatch(paymentStart());
      const res = await axios.post("/billPaymentRoute/billPaymentRequest", {
        amount: values.amount,
        SPKey: values.operator,
        phoneNumber: values.phoneNumber,
        accountNo: values.vehicleNumber,
        fetchBillID: bill.fetchBillID ? bill.fetchBillID : "0",
      });

      if (res?.data?.data?.status === 3) {
        toast.error(res.data.data.msg, {
          id: "fasttag",
        });
      } else if (res?.data?.data?.status === 2) {
        toast.success("Recharge Successful", {
          id: "fasttag",
        });
        resetForm();
      } else if (res?.data?.data?.status === 1) {
        toast.success("Recharge Processing", {
          id: "fasttag",
        });
        resetForm();
      }
      fetchWalletBalance(dispatch, currentUser);
      dispatch(paymentSuccess());
    } catch (error) {
      dispatch(paymentFailure());
      if (error?.response?.data?.status === "fail") {
        toast.error(error?.response?.data?.message, {
          id: "fasttag",
        });
      } else {
        toast.error(error?.error?.msg || "Something went wrong", {
          id: "fasttag",
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
      vehicleNumber: "",
      phoneNumber: "",
      amount: 0,
    },
    validationSchema: fastTagRechargeSchema,
    onSubmit,
  });

  useEffect(() => {
    if (!fasttag) {
      fetchOperators(dispatch);
    }
  }, []);
  const isFormFilled = dirty && isValid;
  return (
    <>
      <section className={classes.mainContainer}>
        <form onSubmit={handleSubmit} className={classes.form}>
          <p className={classes.heading}>FASTag Recharge</p>
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
            {fasttag?.map((provider) => {
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
          <label htmlFor="vehicleNumber" className={classes.serviceLabel}>
          Vehicle Registration Number
          </label>
          <input
            type="text"
            id={classes.styledInput}
            value={values.vehicleNumber}
            name="vehicleNumber"
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Vehicle Registration Number"
          />
          {errors.vehicleNumber && touched.vehicleNumber && (
            <p id={classes.errors}>{errors.vehicleNumber}</p>
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
          <div className={classes.amountContainer}>
            <input
              id={classes.styledInput}
              className={classes.amountInput}
              value={values.amount}
              name="amount"
              onChange={handleChange}
              onBlur={handleBlur}
              onWheel={(e) => e.target.blur()}
              placeholder="Amount"
              type="number"
            />
            <div
              className={classes.fetchButton}
              onClick={() =>
                fetchBill(
                  {
                    accountNo: values.vehicleNumber,
                    phoneNumber: values.phoneNumber,
                    SPKey: values.operator,
                  },
                  setBill,
                  setShowBill,
                )
              }
            >
              Fetch Bill
            </div>
          </div>

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
      {values.vehicleNumber &&
      values.operator &&
      showBill &&
      bill.status === 2 ? (
        <section className={classes.planContainer}>
          <div className={classes.heading}>
            <p>Bill Details</p>
          </div>
          <div className={classes.planContent}>
            <BillCard
              amount={bill.dueamount}
              dueDate={bill.duedate}
              billNumber={bill.billnumber}
              billDate={bill.billdate}
              account={bill.account}
              balance={bill.bal}
            />
          </div>
        </section>
      ) : (
        <div style={{ position: "relative" }}>
          <AdvertCard
            image="/assets/ad/mobile.jpeg"
            alt="fastagAd"
            sticky={true}
          />
        </div>
      )}
    </>
  );
};

export default FastTag;
