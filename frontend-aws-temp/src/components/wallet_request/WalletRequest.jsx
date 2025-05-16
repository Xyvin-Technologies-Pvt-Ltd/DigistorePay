import { useState, useEffect } from "react";
import classes from "./WalletRequest.module.css";
import Button from "../button/Button";
import { useFormik } from "formik";
import UploadCard from "../upload_card/UploadCard";
import { walletRequestSchema } from "../../Validations/wallet_request_form/WalletRequestValidation";
import axios from "axios";
import { toast } from "react-hot-toast";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { fileMimeType } from "../../data/filemimetype";

const WalletRequest = ({ onClose }) => {
  const [date, setDate] = useState(null);
  const [loading, setLoading] = useState(false);
  const [newInitial, setNewInitial] = useState({
    transactionType: "",
    amount: "",
    executiveName: "",
    executiveId: "",
    date: null,
    fromAcc: "",
    toAcc: "",
    referenceNo: "",
    remark: "",
    documentPic: "",
    fromUpiId: "",
    toUpiId: "",
    documentpic: null,
  });

  const onSubmit = async (values) => {
    setLoading(true);
    const data =
      values.transactionType === "upi"
        ? {
            fromUpiId: values.fromUpiId,
            toUpiId: values.toUpiId,
            referenceNo: values.referenceNo,
            amount: values.amount,
            date: values.date,
            transactionType: values.transactionType,
          }
        : values.transactionType === "executive"
          ? {
              executiveName: values.executiveName,
              executiveId: values.executiveId,
              amount: values.amount,
              date: values.date,
              transactionType: values.transactionType,
            }
          : values.transactionType === "internetBanking"
            ? {
                fromAcc: values.fromAcc,
                toAcc: values.toAcc,
                referenceNo: values.referenceNo,
                remark: values.remark,
                transactionType: values.transactionType,
                amount: values.amount,
                date: values.date,
                documentPic: [],
              }
            : null;

    try {
      const res = await axios.post(
        "/moneyTransferRoute/moneyTransferDetails",
        data,
      );

      if (res.error) {
        setLoading(false);
        toast.error(res.error.msg, {
          id: "topup",
        });
      } else {
        setLoading(false);
        setFieldValue({
          newInitial,
        });
        toast.success("Top Up Request Sent", {
          id: "topup",
        });
        onClose();
      }
    } catch (error) {
      setLoading(false);
      toast.error(error?.response?.data?.message || "Something went wrong", {
        id: "topup",
      });
    }
  };

  const formik = useFormik({
    initialValues: newInitial,
    enableReinitialize: true,
    onSubmit,

    validationSchema: walletRequestSchema,
  });

  const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
    setFieldValue,
  } = formik;

  useEffect(() => {
    let newValues = {
      transactionType: values.transactionType,
      amount: "",
      executiveName: "",
      executiveId: "",
      date: "",
      fromAcc: "",
      toAcc: "",
      referenceNo: "",
      remark: "",
      documentPic: "",
      fromUpiId: "",
      toUpiId: "",
    };

    if (values.transactionType === "executive") {
      newValues = {
        ...newValues,
        executiveName: "",
        executiveId: "",
        amount: "",
        date: "",
      };
    } else if (values.transactionType === "internetBanking") {
      newValues = {
        ...newValues,
        fromAcc: "",
        toAcc: "",
        referenceNo: "",
        remark: "",
        amount: "",
        date: "",
        documentPic: "",
      };
    } else if (values.transactionType === "upi") {
      newValues = {
        ...newValues,
        fromUpiId: "",
        toUpiId: "",
        referenceNo: "",
        amount: "",
        date: "",
      };
    }
    setNewInitial(newValues);
  }, [values.transactionType]);

  return (
    <div>
      <section
        className={`${classes.mainContainer} ${
          values.transactionType === "internetBanking"
            ? classes.internetBanking
            : ""
        }`}
      >
        <form onSubmit={handleSubmit} className={classes.form}>
          <p className={classes.heading}>Wallet Top Up Request</p>
          <select
            className={classes.dropdown}
            id={classes.styledInput}
            value={values.transactionType}
            name="transactionType"
            onChange={handleChange}
            onBlur={handleBlur}
          >
            <option value="">Select Transaction Type</option>
            <option value="internetBanking">Internet Banking</option>
            <option value="executive">Executive</option>
            <option value="upi">UPI</option>
          </select>
          {errors.transactionType && touched.transactionType && (
            <p id={classes.errors}>{errors.transactionType}</p>
          )}

          {values.transactionType === "internetBanking" && (
            <div className={classes.inputContainer}>
              <input
                id={classes.styledInput}
                value={values.fromAcc}
                name="fromAcc"
                onChange={handleChange}
                onBlur={handleBlur}
                onWheel={(e) => e.target.blur()}
                placeholder="Enter from Account Number"
                type="number"
              />
              {errors.fromAcc && touched.fromAcc && (
                <p id={classes.errors}>{errors.fromAcc}</p>
              )}

              <input
                id={classes.styledInput}
                value={values.toAcc}
                name="toAcc"
                onChange={handleChange}
                onBlur={handleBlur}
                onWheel={(e) => e.target.blur()}
                placeholder="Enter to Account Number"
                type="number"
              />
              {errors.toAcc && touched.toAcc && (
                <p id={classes.errors}>{errors.toAcc}</p>
              )}

              <DatePicker
                id={classes.styledInput}
                className={classes.datePicker}
                selected={values.date}
                placeholderText="Date of Payment"
                // onChange={(date) => setDate(date)}
                onChange={(date) => setFieldValue("date", date)}
                showMonthDropdown
                showYearDropdown
                dropdownMode="select"
              />
              {errors.date && touched.date && (
                <p id={classes.errors}>{errors.date}</p>
              )}

              <input
                id={classes.styledInput}
                value={values.referenceNo}
                name="referenceNo"
                onChange={handleChange}
                onBlur={handleBlur}
                onWheel={(e) => e.target.blur()}
                placeholder="Enter Reference Number"
                type="number"
              />
              {errors.referenceNo && touched.referenceNo && (
                <p id={classes.errors}>{errors.referenceNo}</p>
              )}

              <input
                id={classes.styledInput}
                value={values.amount}
                name="amount"
                onChange={handleChange}
                onBlur={handleBlur}
                onWheel={(e) => e.target.blur()}
                placeholder="Enter Amount"
                type="number"
              />
              {errors.amount && touched.amount && (
                <p id={classes.errors}>{errors.amount}</p>
              )}

              <textarea
                id={classes.styledInput}
                value={values.remark}
                name="remark"
                placeholder="Enter Remark"
                onChange={handleChange}
                onBlur={handleBlur}
                rows="5"
              ></textarea>

              {errors.remark && touched.remark && (
                <p id={classes.errors}>{errors.remark}</p>
              )}

              <UploadCard
                handleChange={handleChange}
                handleBlur={handleBlur}
                setFieldValue={setFieldValue}
                nameArray={[
                  {
                    name: "Document Pic",
                    mandatory: true,
                    allowedMimeTypes: fileMimeType.documentsAndImages,
                  },
                ]}
              />
            </div>
          )}

          {values.transactionType === "executive" && (
            <div className={classes.inputContainer}>
              <input
                id={classes.styledInput}
                value={values.executiveName}
                name="executiveName"
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Enter Executive Name"
                type="text"
              />
              {errors.executiveName && touched.executiveName && (
                <p id={classes.errors}>{errors.executiveName}</p>
              )}

              <input
                id={classes.styledInput}
                value={values.executiveId}
                name="executiveId"
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Enter Executive Id"
                type="text"
              />
              {errors.executiveId && touched.executiveId && (
                <p id={classes.errors}>{errors.executiveId}</p>
              )}

              <DatePicker
                id={classes.styledInput}
                className={classes.datePicker}
                selected={values.date}
                placeholderText="Date of Payment"
                // onChange={(date) => setDate(date)}
                onChange={(date) => setFieldValue("date", date)}
                showMonthDropdown
                showYearDropdown
                dropdownMode="select"
              />
              {errors.date && touched.date && (
                <p id={classes.errors}>{errors.date}</p>
              )}

              <input
                id={classes.styledInput}
                value={values.amount}
                name="amount"
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Enter Amount"
                type="text"
              />
              {errors.amount && touched.amount && (
                <p id={classes.errors}>{errors.amount}</p>
              )}
            </div>
          )}

          {values.transactionType === "upi" && (
            <div className={classes.inputContainer}>
              <input
                id={classes.styledInput}
                value={values.fromUpiId}
                name="fromUpiId"
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Enter From UPI Id"
                type="text"
              />
              {errors.fromUpiId && touched.fromUpiId && (
                <p id={classes.errors}>{errors.fromUpiId}</p>
              )}

              <input
                id={classes.styledInput}
                value={values.toUpiId}
                name="toUpiId"
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Enter To UPI Id"
                type="text"
              />
              {errors.toUpiId && touched.toUpiId && (
                <p id={classes.errors}>{errors.toUpiId}</p>
              )}

              <DatePicker
                id={classes.styledInput}
                className={classes.datePicker}
                selected={values.date}
                placeholderText="Date of Payment"
                // onChange={(date) => setDate(date)}
                onChange={(date) => setFieldValue("date", date)}
                showMonthDropdown
                showYearDropdown
                dropdownMode="select"
              />
              {errors.date && touched.date && (
                <p id={classes.errors}>{errors.date}</p>
              )}

              <input
                id={classes.styledInput}
                value={values.referenceNo}
                name="referenceNo"
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Enter Reference Number"
                type="text"
              />
              {errors.referenceNo && touched.referenceNo && (
                <p id={classes.errors}>{errors.referenceNo}</p>
              )}

              <input
                id={classes.styledInput}
                value={values.amount}
                name="amount"
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Enter Amount"
                type="text"
              />
              {errors.amount && touched.amount && (
                <p id={classes.errors}>{errors.amount}</p>
              )}
            </div>
          )}

          {values.transactionType && (
            <Button
              btnType="submit"
              btnName={loading ? "Processing" : "Send"}
              disabled={loading}
            ></Button>
          )}
        </form>
      </section>
    </div>
  );
};

export default WalletRequest;
