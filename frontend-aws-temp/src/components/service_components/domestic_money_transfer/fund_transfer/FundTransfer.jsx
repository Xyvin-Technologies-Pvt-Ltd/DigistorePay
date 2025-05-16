import React, { useState } from "react";
import classes from "./FundTransfer.module.css";
import { useFormik } from "formik";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import Modal from "../../../modal/Modal";
import DmtModalCard from "../dmt_modal_card/DmtModalCard";
import { dmtMoneyTransferSchema } from "../../../../Validations/dmt/DmtValidation";

const FundTransfer = () => {
  const [benificiaries, setBenificiaries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedBenificiary, setSelectedBenificiary] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [transactionDetails, setTransactionDetails] = useState({});

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const { state } = useLocation();
  const user = state[0];

  useEffect(() => {
    const dmtFetchAllBenificiaries = async () => {
      const data = {
        phoneNumber: user.customerId,
      };
      try {
        setLoading(true);
        const res = await axios.post(
          "/dmtRoute/DMTfetchAllRecipientsOfUser",
          data,
        );

        if (res.data.errorMsg) {
          setBenificiaries([...res.data.data.recipientList]);
          setLoading(false);
          toast.success("Beneficiaries loaded", {
            id: "dmtFetchAllBenificiaries",
          });
        } else {
          setLoading(false);
        }
      } catch (error) {
        setLoading(false);
        toast.error(error?.response?.data?.message, {
          id: "dmtFetchAllBenificiaries",
        });
      }
    };
    dmtFetchAllBenificiaries();
  }, []);

  const onSubmit = () => {
    dmtRemit();
  };

  const {
    values,
    errors,
    touched,
    setFieldValue,
    handleBlur,
    handleChange,
    handleSubmit,
  } = useFormik({
    initialValues: {
      recipientId: "",
      amount: "",
    },
    validationSchema: dmtMoneyTransferSchema,
    onSubmit,
  });

  const dmtRemit = async () => {
    const data = {
      phoneNumber: user.customerId,
      recipientId: values.recipientId,
      amount: values.amount,
    };
    try {
      setLoading(true);
      const res = await axios.post("/dmtRoute/DMTremitAPI", data);
      if (res.data) {
        const transaction = res.data;
        setTransactionDetails(transaction);
        setIsModalOpen(true);
        setLoading(false);
        toast.success("Fund Tranfer successful", {
          id: "dmtRemit",
        });
      }
    } catch (error) {
      setLoading(false);
      toast.error(error?.response?.data?.message, {
        id: "dmtRemit",
      });
    }
  };

  const handleBenificiaryChange = (e) => {
    const selectedItem = benificiaries[e.target.value];
    setSelectedBenificiary(selectedItem);
    setFieldValue("recipientId", selectedItem.recipientId);
  };

  return (
    <div className={classes.mainContainer}>
      <p className={classes.heading}>Money Transfer</p>
      <div className={classes.detailsOne}>
        <div className={classes.detailItem1}>
          Selected Customer : {user.name}
        </div>
        <div className={classes.detailItem2}>
          Remaining Limit : {user.walletbal}{" "}
        </div>
      </div>
      <hr />
      <div className={classes.viewNav}>
        <div className="div">SENDER MOBILE : {user.customerId}</div>
        <div className="div">BENIFICIARY A/C : {selectedBenificiary?.udf2}</div>
        <div className="div">
          BENIFICIARY IFSC : {selectedBenificiary?.udf1}{" "}
        </div>
        <div className="div">
          BENIFICIARY MOBILE : {selectedBenificiary?.mobileNo}
        </div>
      </div>
      <form className={classes.form} onSubmit={handleSubmit}>
        <div className={classes.itemRow}>
          <div className={classes.itemContainer}>
            <select
              className={classes.dropdown}
              id="paymentMode"
              value={values.paymentMode}
              name="paymentMode"
              onChange={handleChange}
              onBlur={handleBlur}
            >
              <option>Select Payment Mode</option>
              <option key="imps" value="imps">
                IMPS
              </option>
            </select>

            <div className={classes.addBox}>
              <select
                className={classes.dropdown}
                id="benificiary"
                value={values.benificiary}
                name="benificiary"
                onChange={handleBenificiaryChange}
                onBlur={handleBlur}
              >
                <option>Select Benificiary</option>
                {benificiaries.map((item, index) => {
                  return (
                    <option key={index} value={index}>
                      {item.recipientName}
                    </option>
                  );
                })}
              </select>

              <Link to={"/services/dmtAddBenificiary"}>
                <button className={classes.addBtn}>
                  <span className={classes.iconContainer}>+</span>
                </button>
              </Link>
            </div>
            <div>
              <input
                className={classes.amount}
                type="number"
                value={values.amount}
                name="amount"
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Amount"
              />

              {errors.amount && touched.amount && (
                <p id={classes.errors}>{errors.amount}</p>
              )}
            </div>
          </div>
        </div>
        <div className={classes.btnContainer}>
          <button
            type="submit"
            className={loading ? classes.btnDisabled : classes.btn}
          >
            {loading ? "Please Wait" : "Transfer"}
          </button>
        </div>
      </form>

      {selectedBenificiary && user && (
        <Modal isOpen={isModalOpen} onClose={closeModal}>
          <DmtModalCard
            user={user}
            amount={values.amount}
            transactionDetails={transactionDetails}
            selectedBenificiary={selectedBenificiary}
            customerId={user.customerId}
          />
        </Modal>
      )}
    </div>
  );
};

export default FundTransfer;
