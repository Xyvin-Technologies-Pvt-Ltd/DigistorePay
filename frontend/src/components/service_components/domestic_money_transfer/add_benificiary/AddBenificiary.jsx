import React, { useState } from "react";
import classes from "./AddBenificiary.module.css";
import { useFormik } from "formik";
import axios from "axios";
import toast from "react-hot-toast";
import { useEffect } from "react";
import { addBeneficiarySchema } from "../../../../Validations/dmt/DmtValidation";
import { useNavigate, useLocation } from "react-router-dom";

const AddBenificiary = () => {
  const [loading, setLoading] = useState(false);
  const [bankList, setBankList] = useState([]);

  const navigate = useNavigate();
  const { state } = useLocation();

  const dmtAddBenificiary = async () => {
    const data = values;
    try {
      setLoading(true);
      const res = await axios.post("/dmtRoute/DMTaddBeneficery", data);

      if (res.data.errorMsg === "SUCCESS") {
        setLoading(false);
        toast.error(res.data.errorMsg, {
          id: "dmtAddBenificiary",
        });
      } else {
        setLoading(false);
        toast.success("Beneficiary Added", {
          id: "dmtAddBenificiary",
        });
        navigate("/services/dmt");
      }
    } catch (error) {
      setLoading(false);
      toast.error(error?.response?.data?.message, {
        id: "dmtAddBenificiary",
      });
    }
  };

  const onSubmit = () => {
    dmtAddBenificiary();
  };

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: {
        recipientName: "",
        phoneNumber: "",
        mobileNo: "",
        accountNo: "",
        bankName: "",
        ifsc: "",
      },
      onSubmit,
      validationSchema: addBeneficiarySchema,
    });

  useEffect(() => {
    const dmtFetchBankList = async () => {
      try {
        setLoading(true);
        const res = await axios.post("/dmtRoute/DMTfetchBankList");

        if (res.data.errorMsg === "SUCCESS") {
          setBankList(res.data.data.bankList);
          setLoading(false);
        } else {
          setLoading(false);

          toast.error(res.data.errorMsg, {
            id: "dmtFetchBankList",
          });
        }
      } catch (error) {
        setLoading(false);
        toast.error(error?.response?.data?.message, {
          id: "dmtFetchBankList",
        });
      }
    };
    dmtFetchBankList();
  }, []);

  return (
    <div className={classes.mainContainer}>
      <form onSubmit={handleSubmit}>
        <p className={classes.heading}>Add Benificiary</p>
        <div className={classes.inputContainer}>
          <div>
            <input
              className={classes.styledInput}
              name="recipientName"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.recipientName}
              type="text"
              placeholder="Benificiary Name"
            />
            {errors.recipientName && touched.recipientName && (
              <p className={classes.errors}>{errors.recipientName}</p>
            )}
          </div>
          <div>
            <select
              className={classes.dropdown}
              id="bankName"
              value={values.bankName}
              name="bankName"
              onChange={handleChange}
              onBlur={handleBlur}
            >
              <option>Select Bank Name</option>
              {bankList.map((item, index) => {
                return (
                  <option key={index} value={item.bankCode}>
                    {item.bankName}
                  </option>
                );
              })}
            </select>
            {errors.bankName && touched.bankName && (
              <p className={classes.errors}>{errors.bankName}</p>
            )}
          </div>

          <div>
            <input
              className={classes.styledInput}
              name="accountNo"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.accountNo}
              type="number"
              placeholder="Account Number"
            />
            {errors.accountNo && touched.accountNo && (
              <p className={classes.errors}>{errors.accountNo}</p>
            )}
          </div>
          <div>
            <input
              className={classes.styledInput}
              name="ifsc"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.ifsc}
              type="text"
              placeholder="IFSC Code"
            />
            {errors.ifsc && touched.ifsc && (
              <p className={classes.errors}>{errors.ifsc}</p>
            )}
          </div>
          <div>
            <input
              className={classes.styledInput}
              name="mobileNo"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.mobileNo}
              type="number"
              placeholder="Benificiary mobile Number"
            />
            {errors.mobileNo && touched.mobileNo && (
              <p className={classes.errors}>{errors.mobileNo}</p>
            )}
          </div>
          <div>
            <input
              className={classes.styledInput}
              name="phoneNumber"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.phoneNumber}
              type="number"
              placeholder="Customer Mobile  Number"
            />
            {errors.phoneNumber && touched.phoneNumber && (
              <p className={classes.errors}>{errors.phoneNumber}</p>
            )}
          </div>
        </div>

        <div className={classes.btnContainer}>
          {/* <button className={classes.btn}>Verify With Penny Drop</button> */}
          <button
            type="submit"
            className={loading ? classes.btnDisabled : classes.btn}
          >
            {loading ? "Please Wait" : "Add Benificiary"}{" "}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddBenificiary;
