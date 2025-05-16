import { useState } from "react";
import Button from "../../../button/Button";
import axios from "axios";
import toast from "react-hot-toast";
import classes from "./StepFive.module.css";
import { useNavigate } from "react-router-dom";

const StepFive = ({ formik }) => {
  const [loading, setLoading] = useState(false);
  const { values } = formik;

  const {
    firstName,
    lastName,
    email,
    phoneNumber,
    password,
    dateOfBirth,
    gender,
    addressLine1,
    addressLine2,
    emergencyContact,
    city,
    district,
    state,
    pinCode,
    bank,
    branchName,
    accountNumber,
    ifscCode,
    accountName,
    dateOfJoin,
    bloodGroup,
    employment,
    totalTrainingDays,
    isTrainingRequired,
    remarks,
    profilePic,
  } = values;

  const navigate = useNavigate();

  const createStaff = async () => {
    try {
      const formData = new FormData();
      for (const key in values) {
        formData.append(key, values[key]);
      }
      setLoading(true);
      const res = await axios.post("/staff/createStaff", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

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
          <strong>First Name:</strong> {firstName.toUpperCase()}
        </p>
        <p id={classes.styledInput}>
          <strong>Last Name:</strong> {lastName.toUpperCase()}
        </p>
        <p id={classes.styledInput}>
          <strong>Email:</strong> {email}
        </p>
        <p id={classes.styledInput}>
          <strong>Mobile Number:</strong> {phoneNumber}
        </p>
        <p id={classes.styledInput}>
          <strong>Password:</strong>
          {password}
        </p>
        <p id={classes.styledInput}>
          <strong>Date of Birth:</strong>{" "}
          {dateOfBirth && new Date(dateOfBirth).toLocaleDateString()}
        </p>
        <p id={classes.styledInput}>
          <strong>Gender:</strong> {gender.toUpperCase()}
        </p>
        <p id={classes.styledInput}>
          <strong>Address Line 1:</strong> {addressLine1.toUpperCase()}
        </p>
        <p id={classes.styledInput}>
          <strong>Address Line 2:</strong> {addressLine2.toUpperCase()}
        </p>
        <p id={classes.styledInput}>
          <strong>Emergency Contact:</strong> {emergencyContact}
        </p>
        <p id={classes.styledInput}>
          <strong>City:</strong> {city.toUpperCase()}
        </p>
        <p id={classes.styledInput}>
          <strong>District:</strong> {district.toUpperCase()}
        </p>
        <p id={classes.styledInput}>
          <strong>State:</strong> {state.toUpperCase()}
        </p>
        <p id={classes.styledInput}>
          <strong>Pin Code:</strong> {pinCode}
        </p>
        <p id={classes.styledInput}>
          <strong>Bank:</strong> {bank.toUpperCase()}
        </p>
        <p id={classes.styledInput}>
          <strong>Branch:</strong> {branchName.toUpperCase()}
        </p>
        <p id={classes.styledInput}>
          <strong>Account Number:</strong> {accountNumber}
        </p>
        <p id={classes.styledInput}>
          <strong>IFSC Code:</strong> {ifscCode}
        </p>
        <p id={classes.styledInput}>
          <strong>Account Holder Name:</strong> {accountName.toUpperCase()}
        </p>
        <p id={classes.styledInput}>
          <strong>Date of Joining:</strong>{" "}
          {dateOfJoin && new Date(dateOfJoin).toLocaleDateString()}
        </p>
        <p id={classes.styledInput}>
          <strong>Blood Group:</strong> {bloodGroup}
        </p>
        <p id={classes.styledInput}>
          <strong>Employment:</strong> {employment}
        </p>
        <p id={classes.styledInput}>
          <strong>Need Training:</strong> {isTrainingRequired ? "Yes" : "No"}
        </p>
        <p id={classes.styledInput}>
          <strong>Number of days of Training:</strong> {totalTrainingDays}
        </p>
        <p id={classes.styledInput}>
          <strong>Remarks:</strong> {remarks}
        </p>
        <div id={classes.styledInput}>
          <strong>Profile Pic</strong> <br />
          <img
            src={
              profilePic
                ? URL.createObjectURL(profilePic)
                : "/assets/placeholder.jpg"
            }
            alt="Default file"
            width="100%"
            height="100%"
          />
        </div>
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

export default StepFive;
