import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import Button from "../../../button/Button";
import classes from "./StepSix.module.css";

const StepSix = ({ formik }) => {
  const { values } = formik;
  const [loading, setLoading] = useState(false);

  const {
    firstName,
    lastName,
    email,
    phoneNumber,
    emergencyContact,
    password,
    dateOfBirth,
    gender,
    bloodGroup,
    employment,
    dateOfJoin,
    totalTrainingDays,
    reportingManager,
    districtOfOperation,
    laptop,
    laptopDetails,
    sim,
    simDetails,
    idCard,
    idCardDetails,
    phone,
    phoneDetails,
    vistingCard,
    vistingCardDetails,
    posterOrBroucher,
    posterOrBroucherDetails,
    other,
    otherDetails,
    remarks,
    accountNumber,
    accountName,
    bank,
    branchName,
    ifscCode,
    addressLine1,
    addressLine2,
    state,
    district,
    city,
    pinCode,
  } = values;

  const navigate = useNavigate();

  const createStaff = async () => {
    const formData = new FormData();

    // Append each field to the FormData object
    for (const key in values) {
      if (values.hasOwnProperty(key)) {
        formData.append(key, values[key]);
      }
    }

    try {
      setLoading(true);
      const res = await axios.post("/staff/createStaff", formData);

      if (res.data.error) {
        setLoading(false);
        toast.error(res.data.message, {
          id: "staffSignUp",
        });
      } else {
        setLoading(false);
        navigate("/login");
        toast.success("Staff created", {
          id: "staffSignUp",
        });
      }
    } catch (error) {
      setLoading(false);
      toast.error(error.message, {
        id: "staffSignUp",
      });
    }
  };

  return (
    <div className={classes.mainContainer}>
      <p className={classes.heading}>Confirm Your Details</p>
      <div>
        <p id={classes.styledInput}>
          <strong>First name:</strong>
          {firstName}
        </p>
        <p id={classes.styledInput}>
          <strong>Last Name:</strong>
          {lastName}
        </p>
        <p id={classes.styledInput}>
          <strong>Email:</strong>
          {email}
        </p>
        <p id={classes.styledInput}>
          <strong>Phone:</strong>
          {phoneNumber}
        </p>
        <p id={classes.styledInput}>
          <strong>Emergency Contact:</strong>
          {emergencyContact}
        </p>
        <p id={classes.styledInput}>
          <strong>Password:</strong>
          {password}
        </p>
        <p id={classes.styledInput}>
          <strong>Date of Birth:</strong>
          {dateOfBirth && new Date(dateOfBirth).toLocaleDateString()}
        </p>
        <p id={classes.styledInput}>
          <strong>Gender:</strong>
          {gender}
        </p>
        <p id={classes.styledInput}>
          <strong>Blood Group:</strong>
          {bloodGroup}
        </p>
        <p id={classes.styledInput}>
          <strong>Employment:</strong>
          {employment}
        </p>
        <p id={classes.styledInput}>
          <strong>Date of Join:</strong>
          {dateOfJoin && new Date(dateOfJoin).toLocaleDateString()}
        </p>
        <p id={classes.styledInput}>
          <strong>Training Days:</strong>
          {totalTrainingDays}
        </p>
        <p id={classes.styledInput}>
          <strong>Reporting Manager:</strong>
          {reportingManager}
        </p>
        <p id={classes.styledInput}>
          <strong>District of Operation:</strong>
          {districtOfOperation}
        </p>
        <p id={classes.styledInput}>
          <strong>Laptop:</strong>
          {laptop ? "Yes" : "No"}
        </p>
        <p id={classes.styledInput}>
          <strong>Laptop Details:</strong>
          {laptopDetails}
        </p>
        <p id={classes.styledInput}>
          <strong>Sim:</strong>
          {sim ? "Yes" : "No"}
        </p>
        <p id={classes.styledInput}>
          <strong>Sim Details:</strong>
          {simDetails}
        </p>
        <p id={classes.styledInput}>
          <strong>ID Card:</strong>
          {idCard ? "Yes" : "No"}
        </p>
        <p id={classes.styledInput}>
          <strong>ID Card Details:</strong>
          {idCardDetails}
        </p>
        <p id={classes.styledInput}>
          <strong>Phone:</strong>
          {phone ? "Yes" : "No"}
        </p>
        <p id={classes.styledInput}>
          <strong>Phone Details:</strong>
          {phoneDetails}
        </p>
        <p id={classes.styledInput}>
          <strong>Visiting Card:</strong>
          {vistingCard}
        </p>
        <p id={classes.styledInput}>
          <strong>Visiting Card Details:</strong>
          {vistingCardDetails}
        </p>
        <p id={classes.styledInput}>
          <strong>Posters/Brouchers:</strong>
          {posterOrBroucher ? "Yes" : "No"}
        </p>
        <p id={classes.styledInput}>
          <strong>Poster/Broucher Details:</strong>
          {posterOrBroucherDetails}
        </p>
        <p id={classes.styledInput}>
          <strong>Other:</strong>
          {other ? "Yes" : "No"}
        </p>
        <p id={classes.styledInput}>
          <strong>Other Details:</strong>
          {otherDetails}
        </p>
        <p id={classes.styledInput}>
          <strong>Remarks:</strong>
          {remarks}
        </p>
        <p id={classes.styledInput}>
          <strong>Account Number:</strong>
          {accountNumber}
        </p>
        <p id={classes.styledInput}>
          <strong>Account Holder Name:</strong>
          {accountName}
        </p>
        <p id={classes.styledInput}>
          <strong>Bank:</strong>
          {bank}
        </p>
        <p id={classes.styledInput}>
          <strong>Branch:</strong>
          {branchName}
        </p>
        <p id={classes.styledInput}>
          <strong>IFSC Code:</strong>
          {ifscCode}
        </p>
        <p id={classes.styledInput}>
          <strong>Address Line 1:</strong>
          {addressLine1}
        </p>
        <p id={classes.styledInput}>
          <strong>Address Line 2:</strong>
          {addressLine2}
        </p>
        <p id={classes.styledInput}>
          <strong>State:</strong>
          {state}
        </p>
        <p id={classes.styledInput}>
          <strong>District:</strong>
          {district}
        </p>
        <p id={classes.styledInput}>
          <strong>City:</strong>
          {city}
        </p>
        <p id={classes.styledInput}>
          <strong>Pincode:</strong>
          {pinCode}
        </p>
        <div className={classes.btn}>
          <Button
            clickEvent={() => createStaff()}
            btnName={loading ? "Creating..." : "Confirm"}
            btnType="submit"
          />
        </div>
      </div>
    </div>
  );
};

export default StepSix;
