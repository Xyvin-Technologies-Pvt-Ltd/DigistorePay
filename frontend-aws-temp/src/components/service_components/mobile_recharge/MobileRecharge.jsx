import React, { useState, useEffect } from "react";
import classes from "./MobileRecharge.module.css";
import Button from "../../button/Button";
import { useFormik } from "formik";
import { mobileRechargeSchema } from "../../../Validations/service_component_validations/mobile_recharge/MobileRechargeValidation";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { toast } from "react-hot-toast";
import {
  paymentStart,
  paymentSuccess,
  paymentFailure,
} from "../../../redux/operators/operatorSlice";
import AdvertCard from "../../../components/advert_card/AdvertCard";
import PlanContentCard from "../../plan_content_card/PlanContentCard";
import BillCard from "../../bill_card/BillCard";
import { fetchOperators } from "../../../utils/fetchOperators";
import { fetchBill } from "../../../utils/fetchBill";
import { fetchWalletBalance } from "../../../utils/fetchWallet";

const MobileRecharge = () => {
  const [billType, setBillType] = useState("Prepaid");
  const [circleList, setCircleList] = useState([]);
  const [plans, setPlans] = useState({
    topup: [],
    std: [],
    sms: [],
    local: [],
    other: [],
    fulltime: [],
    isd: [],
    fourGData: [],
    threeGData: [],
  });
  const [planType, setPlanType] = useState("topup");
  const [showPlan, setShowPlan] = useState(false);
  const [bill, setBill] = useState({});
  const [showBill, setShowBill] = useState(false);
  const { currentUser } = useSelector((state) => state.user);
  const { prepaid, postpaid, loading } = useSelector((state) => state.operator);
  const dispatch = useDispatch();

  const handleBillType = (event) => {
    setBillType(event.target.value);
  };

  const onSubmit = async () => {
    try {
      dispatch(paymentStart());
      const res =
        billType === "Prepaid"
          ? await axios.post("/phoneRechargeRoute/mobileRecharge", values)
          : await axios.post("/billPaymentRoute/billPaymentRequest", {
              amount: values.amount,
              SPKey: values.sp_key,
              phoneNumber: values.phoneNumber,
              fetchBillID: bill.fetchBillID ? bill.fetchBillID : "0",
              accountNo: values.phoneNumber,
            });

      if (res?.data?.data?.status === 3) {
        toast.error(res.data.data.msg, {
          id: "mobile",
        });
      } else if (res?.data?.data?.status === 2) {
        toast.success("Recharge Successful", {
          id: "mobile",
        });
        resetForm();
      } else if (res?.data?.data?.status === 1) {
        toast.success("Recharge Processing", {
          id: "mobile",
        });
        resetForm();
      }
      fetchWalletBalance(dispatch, currentUser);
      dispatch(paymentSuccess());
    } catch (error) {
      dispatch(paymentFailure());
      if (error?.response?.data?.status === "fail") {
        toast.error(error?.response?.data?.message, {
          id: "mobile",
        });
      } else {
        toast.error(error?.error?.msg || "Something went wrong", {
          id: "mobile",
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
    handleSubmit,
    handleChange,
    resetForm,
    isValid,
    dirty,
  } = useFormik({
    initialValues: {
      phoneNumber: "",
      sp_key: "",
      circle: "",
      amount: 0,
    },
    validationSchema: mobileRechargeSchema,
    onSubmit,
  });

  const fetchPlans = async () => {
    let operator = "";
    if (values.sp_key && values.circle) {
      values.sp_key === "3"
        ? (operator = "airtel")
        : values.sp_key === "5"
        ? (operator = "bsnl")
        : values.sp_key === "12"
        ? (operator = "idea")
        : values.sp_key === "116"
        ? (operator = "jio")
        : values.sp_key === "37"
        ? (operator = "vodafone")
        : null;
      try {
        const response = await axios.get(
          `/fixedDataRoute/fetchMobileRechargePlans?operator_id=${operator}&circle_id=kerala`
        );
        if (response.error) {
          toast.error(response.error, {
            id: "plans",
          });
        } else {
          let plans = {
            topup: [],
            std: [],
            sms: [],
            local: [],
            other: [],
            fulltime: [],
            isd: [],
            fourGData: [],
            threeGData: [],
          };
          response.data.data.forEach((plan) => {
            if (plan.recharge_type === "Top up")
              plans.topup = [...plans.topup, plan];
            else if (plan.recharge_type === "STD")
              plans.std = [...plans.std, plan];
            else if (plan.recharge_type === "SMS")
              plans.sms = [...plans.sms, plan];
            else if (plan.recharge_type === "Local")
              plans.local = [...plans.local, plan];
            else if (plan.recharge_type === "Other")
              plans.other = [...plans.other, plan];
            else if (plan.recharge_type === "ISD")
              plans.isd = [...plans.isd, plan];
            else if (plan.recharge_type === "Full Talktime")
              plans.fulltime = [...plans.fulltime, plan];
            else if (plan.recharge_type === "4G Data")
              plans.fourGData = [...plans.fourGData, plan];
            else if (plan.recharge_type === "3G Data")
              plans.threeGData = [...plans.threeGData, plan];
          });
          setPlans(plans);
          setShowPlan(true);
          toast.success("Plans Updated Successfully", {
            id: "plans",
          });
        }
      } catch (error) {
        toast.error("Error fetching mobile plans", {
          id: "plans",
        });
      }
    }
  };

  const fetchCircleList = async () => {
    try {
      const response = await axios.get("/fixedDataRoute/circle");
      if (response.error) {
        toast.error(response.error, {
          id: "circle",
        });
      } else {
        setCircleList(response.data.data);
      }
    } catch (error) {
      toast.error("Error fetching operator circles", {
        id: "circle",
      });
    }
  };

  useEffect(() => {
    if (!prepaid || !postpaid) {
      fetchOperators(dispatch);
    }
  }, []);

  useEffect(() => {
    fetchCircleList();
    setShowPlan(false);
  }, [values]);

  const isFormFilled = dirty && isValid;

  return (
    <>
      <section className={classes.mainContainer}>
        <div className={classes.heading}>
          <p>Mobile Recharge</p>
        </div>
        <form onSubmit={handleSubmit} className={classes.form}>
          <div className={classes.content}>
            <div id={classes.styledInput} className={classes.radioContainer}>
              <label className={classes.radioLabel}>
                <input
                  type="radio"
                  name="billtype"
                  value="Prepaid"
                  defaultChecked
                  onChange={handleBillType}
                ></input>{" "}
                Prepaid
              </label>
              <label>
                <input
                  type="radio"
                  name="billtype"
                  value="Postpaid"
                  onChange={handleBillType}
                ></input>{" "}
                Postpaid
              </label>
            </div>
            <label htmlFor="phoneNumber" className={classes.serviceLabel}>
              Mobile Number
            </label>
            <input
              id={classes.styledInput}
              name="phoneNumber"
              className={classes.mobile}
              value={values.phoneNumber}
              onChange={handleChange}
              onBlur={handleBlur}
              onWheel={(e) => e.target.blur()}
              type="number"
              placeholder="Enter 10 digit mobile number"
            ></input>
            {errors.phoneNumber && touched.phoneNumber && (
              <p>{errors.phoneNumber}</p>
            )}
            <label htmlFor="sp_key" className={classes.serviceLabel}>
              Operator
            </label>
            <select
              id={classes.styledInput}
              className={classes.dropdown}
              value={values.sp_key}
              onChange={handleChange}
              onBlur={handleBlur}
              name="sp_key"
            >
              <option>Select an operator</option>
              {prepaid && billType === "Prepaid"
                ? prepaid?.map((provider) => {
                    return (
                      <option key={provider.id} value={provider.SP_key}>
                        {provider.serviceProvider}
                      </option>
                    );
                  })
                : postpaid && billType === "Postpaid"
                ? postpaid?.map((provider) => {
                    return (
                      <option key={provider.id} value={provider.SP_key}>
                        {provider.serviceProvider}
                      </option>
                    );
                  })
                : null}
            </select>
            {errors.sp_key && touched.sp_key && (
              <p id={classes.errors}>{errors.sp_key}</p>
            )}
            <label htmlFor="circle" className={classes.serviceLabel}>
              Circle
            </label>
            <select
              id={classes.styledInput}
              className={classes.dropdown}
              value={values.circle}
              onChange={handleChange}
              onBlur={handleBlur}
              name="circle"
            >
              <option>Select your circle</option>
              {circleList.map((circle) => {
                return (
                  <option
                    key={circle.id}
                    value={`${circle.latitude},${circle.longitude}`}
                  >
                    {circle.state}
                  </option>
                );
              })}
            </select>
            {/* {errors.circle && touched.circle && (
              <p id={classes.errors}>{errors.circle}</p>
            )} */}
            <label htmlFor="amount" className={classes.serviceLabel}>
              Amount
            </label>
            <div className={classes.amountContainer}>
              <input
                disabled={billType === "Prepaid" ? true : false}
                id={classes.styledInput}
                name="amount"
                value={values.amount}
                onChange={handleChange}
                onBlur={handleBlur}
                className={classes.amountInput}
                onWheel={(e) => e.target.blur()}
                type="number"
                placeholder="Amount"
              />
              <div
                className={classes.planButton}
                onClick={
                  billType === "Prepaid"
                    ? () => fetchPlans()
                    : () =>
                        fetchBill(
                          {
                            accountNo: values.phoneNumber,
                            phoneNumber: values.phoneNumber,
                            SPKey: values.sp_key,
                          },
                          setBill,
                          setShowBill
                        )
                }
              >
                {billType === "Prepaid" ? "Check Plan" : "Fetch Bill"}
              </div>
            </div>
            {errors.amount && touched.amount && <p>{errors.amount}</p>}

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
          </div>
        </form>
      </section>

      {billType === "Prepaid" && values.circle && values.sp_key && showPlan ? (
        <section className={classes.planContainer}>
          <div className={classes.heading}>
            <p>Choose Your Plan</p>
          </div>
          <select
            id={classes.styledInput}
            className={classes.dropdown}
            onChange={(e) => setPlanType(e.target.value)}
            value={planType}
            onBlur={handleBlur}
            name="planType"
          >
            {plans.topup.length !== 0 && <option value="topup">Top Up</option>}
            {plans.fulltime.length !== 0 && (
              <option value="fulltime">Fulltime</option>
            )}
            {plans.fourGData.length !== 0 && (
              <option value="fourGData">4G Data</option>
            )}
            {plans.threeGData.length !== 0 && (
              <option value="threeGData">3G Data</option>
            )}
            {plans.std.length !== 0 && <option value="std">STD</option>}
            {plans.isd.length !== 0 && <option value="isd">ISD</option>}
            {plans.local.length !== 0 && <option value="local">Local</option>}
            {plans.sms.length !== 0 && <option value="sms">SMS</option>}
            {plans.other.length !== 0 && <option value="other">Other</option>}
          </select>

          <div className={classes.planContent}>
            {plans[planType]?.map((plan) => {
              return (
                <PlanContentCard
                  key={plan.id}
                  amount={plan.recharge_amount}
                  type={plan.recharge_type}
                  description={plan.recharge_long_desc}
                  action={() =>
                    setFieldValue("amount", parseInt(plan.recharge_amount, 10))
                  }
                />
              );
            })}
          </div>
        </section>
      ) : billType === "Postpaid" &&
        values.circle &&
        values.sp_key &&
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
            alt="mobileAd"
            sticky={true}
          />
        </div>
      )}
    </>
  );
};

export default MobileRecharge;
