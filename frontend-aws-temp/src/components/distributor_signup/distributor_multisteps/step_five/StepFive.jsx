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
    distributorName,
    name,
    mobileNumber,
    email,
    password,
    gender,
    dateOfBirth,
    distributorAddressLine1,
    distributorAddressLine2,
    state,
    pinCode,
    district,
    accountNumber,
    accountName,
    bankName,
    ifscCode,
    adhaarNumber,
    panNumber,
    onBoardedBy,
    onBoardedPersonId,
    onBoardedPersonName,
  } = values;

  const navigate = useNavigate();

  const createDistributor = async () => {
    const formData = new FormData();

    // Append each field to the FormData object
    for (const key in values) {
      if (values.hasOwnProperty(key)) {
        if (Array.isArray(values[key])) {
          // If the field is an array, append each element individually
          values[key].forEach((element, index) => {
            formData.append(`${key}[${index}]`, element);
          });
        } else {
          // Append other fields normally
          formData.append(key, values[key]);
        }
      }
    }

    try {
      setLoading(true);
      const res = await axios.post(
        "/distributor/registerDistributor",
        formData,
      );

      if (res.data.error) {
        setLoading(false);
        toast.error(res.data.message, {
          id: "distributor",
        });
      } else {
        setLoading(false);
        navigate("/login");
        toast.success("Distributor created", {
          id: "distributor",
        });
      }
    } catch (error) {
      setLoading(false);
      toast.error(error?.response?.data?.message, {
        id: "distributor",
      });
    }
  };

  return (
    <div className={classes.mainContainer}>
      <p className={classes.heading}>Confirm Your Details</p>
      <div>
        <p id={classes.styledInput}>
          <strong>Distributor Name:</strong> {distributorName.toUpperCase()}
        </p>
        <p id={classes.styledInput}>
          <strong>Name:</strong> {name.toUpperCase()}
        </p>
        <p id={classes.styledInput}>
          <strong>Mobile Number:</strong> {mobileNumber}
        </p>
        <p id={classes.styledInput}>
          <strong>Email:</strong> {email}
        </p>
        <p id={classes.styledInput}>
          <strong>Password:</strong> {password}
        </p>
        <p id={classes.styledInput}>
          <strong>Gender:</strong> {gender.toUpperCase()}
        </p>
        <p id={classes.styledInput}>
          <strong>Date of birth:</strong> {dateOfBirth.toString()}
        </p>

        <p id={classes.styledInput}>
          <strong>Distributor Address Line 1:</strong>{" "}
          {distributorAddressLine1.toUpperCase()}
        </p>
        <p id={classes.styledInput}>
          <strong>Distributor Address Line 2:</strong>{" "}
          {distributorAddressLine2.toUpperCase()}
        </p>
        <p id={classes.styledInput}>
          <strong>State:</strong> {state.toUpperCase()}
        </p>
        <p id={classes.styledInput}>
          <strong>Pin Code:</strong> {pinCode}
        </p>
        <p id={classes.styledInput}>
          <strong>District:</strong> {district.toUpperCase()}
        </p>

        <p id={classes.styledInput}>
          <strong>Account Number:</strong> {accountNumber}
        </p>
        <p id={classes.styledInput}>
          <strong>Account Name:</strong> {accountName.toUpperCase()}
        </p>
        <p id={classes.styledInput}>
          <strong>Bank:</strong> {bankName.toUpperCase()}
        </p>

        <p id={classes.styledInput}>
          <strong>IFSC Code:</strong> {ifscCode}
        </p>
        <p id={classes.styledInput}>
          <strong>Aadhaar Number:</strong> {adhaarNumber}
        </p>
        <p id={classes.styledInput}>
          <strong>PAN Number:</strong> {panNumber}
        </p>

        <p id={classes.styledInput}>
          <strong>Onboarded By:</strong>{" "}
          {onBoardedBy === "itsSelf" ? "SELF" : onBoardedBy.toUpperCase()}
        </p>
        {onBoardedBy !== "itsSelf" && (
          <>
            <p id={classes.styledInput}>
              <strong>Onboarded Person Id:</strong>{" "}
              {onBoardedPersonId.toUpperCase()}
            </p>
            <p id={classes.styledInput}>
              <strong>Onboarded Person Name:</strong>{" "}
              {onBoardedPersonName.toUpperCase()}
            </p>
          </>
        )}

        <div className={classes.flexContainer}>
          <div id={classes.styledInput}>
            <strong>Aadhaar Front:</strong>{" "}
            <div className={classes.flexItem}>
              <img
                src={
                  values.aadhaarFrontImage
                    ? URL.createObjectURL(values.aadhaarFrontImage)
                    : "/assets/placeholder.jpg"
                }
                alt="Default file"
                width="100%"
                height="100%"
              />
            </div>
          </div>
          <div id={classes.styledInput}>
            <strong>Aadhaar Back:</strong>{" "}
            <div className={classes.flexItem}>
              <img
                src={
                  values.aadhaarBackImage
                    ? URL.createObjectURL(values.aadhaarBackImage)
                    : "/assets/placeholder.jpg"
                }
                alt="Default file"
                width="100%"
                height="100%"
              />
            </div>
          </div>
          <div id={classes.styledInput}>
            <strong>Passbook:</strong>{" "}
            <div className={classes.flexItem}>
              <img
                src={
                  values.bankPassbookImage
                    ? URL.createObjectURL(values.bankPassbookImage)
                    : "/assets/placeholder.jpg"
                }
                alt="Default file"
                width="100%"
                height="100%"
              />
            </div>
          </div>
          <div id={classes.styledInput}>
            <strong>Pan Card:</strong>{" "}
            <div className={classes.flexItem}>
              <img
                src={
                  values.panCardImage
                    ? URL.createObjectURL(values.panCardImage)
                    : "/assets/placeholder.jpg"
                }
                alt="Default file"
                width="100%"
                height="100%"
              />
            </div>
          </div>
        </div>

        {/* <div>
            <input
              type="checkbox"
              value="true"
              name="acknowledgment"
              id="acknowledgment"
            />
            <label htmlFor="acknowledgment">
              I acknowledge the details are correct
            </label>
          </div> */}

        <div className={classes.btn}>
          <Button
            clickEvent={() => createDistributor()}
            btnName={loading ? "Creating..." : "Confirm"}
            btnType="submit"
          />
        </div>
      </div>
    </div>
  );
};

export default StepFive;
