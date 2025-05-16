import { useState } from "react";
import classes from "./StepFive.module.css";
import Button from "../../../components/button/Button";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const StepFive = ({ formik }) => {
  const [loading, setLoading] = useState(false);
  const { values } = formik;

  const {
    franchiseName,
    ownerName,
    phoneNumber,
    email,
    password,
    gender,
    dateOfBirth,
    businessType,
    franchiseAddressLine1,
    franchiseAddressLine2,
    state,
    pinCode,
    district,
    postOffice,
    panchayath,
    ward,
    accountNumber,
    accountName,
    bank,
    branchName,
    ifscCode,
    aadhaarNumber,
    panNumber,
    panCenter,
    digitalElements,
    referredBy,
    referredFranchiseName,
    referredFranchiseCode,
    onBoardedBy,
    onBoardedPersonId,
    onBoardedPersonName,
  } = values;

  const navigate = useNavigate();

  const createFranchisee = async () => {
    const formData = new FormData();
    for (const key in values) {
      formData.append(key, values[key]);
    }

    // Append each field to the FormData object
    // for (const key in values) {
    //   if (values.hasOwnProperty(key)) {
    //     if (Array.isArray(values[key])) {
    //       // If the field is an array, append each element individually
    //       values[key].forEach((element, index) => {
    //         formData.append(`${key}[${index}]`, element);
    //       });
    //     } else {
    //       // Append other fields normally
    //       formData.append(key, values[key]);
    //     }
    //   }
    // }

    try {
      setLoading(true);
      const res = await axios.post("/franchiseRouter/creatFranchise", formData);

      if (res.data.error) {
        setLoading(false);
        toast.error(res.data.message, {
          id: "franchisee",
        });
      } else {
        setLoading(false);
        navigate("/login");
        toast.success("Franchisee created", {
          id: "franchisee",
        });
      }
    } catch (error) {
      setLoading(false);
      toast.error(error?.response?.data?.message, {
        id: "franchisee",
      });
    }
  };

  return (
    <div className={classes.mainContainer}>
      <p className={classes.heading}>Confirm Your Details</p>
      <div>
        <p id={classes.styledInput}>
          <strong>Franchisee Name :</strong>{" "}
          {franchiseName ? (
            franchiseName.toUpperCase()
          ) : (
            <span style={{ color: "grey", fontStyle: "italic" }}>
              Please provide a franchise name
            </span>
          )}
        </p>
        <p id={classes.styledInput}>
          <strong>Owner Name :</strong>{" "}
          {ownerName ? (
            ownerName.toUpperCase()
          ) : (
            <span style={{ color: "grey", fontStyle: "italic" }}>
              Please provide your owner name
            </span>
          )}
        </p>
        <p id={classes.styledInput}>
          <strong>Phone Number :</strong>{" "}
          {phoneNumber ? (
            phoneNumber
          ) : (
            <span style={{ color: "grey", fontStyle: "italic" }}>
              Please provide your phone number
            </span>
          )}
        </p>
        <p id={classes.styledInput}>
          <strong>Email ID :</strong>{" "}
          {email ? (
            email
          ) : (
            <span style={{ color: "grey", fontStyle: "italic" }}>
              Please provide a valid email id
            </span>
          )}
        </p>
        <p id={classes.styledInput}>
          <strong>Password :</strong>{" "}
          {password ? (
            password
          ) : (
            <span style={{ color: "grey", fontStyle: "italic" }}>
              Please provide a strong password
            </span>
          )}
        </p>
        <p id={classes.styledInput}>
          <strong>Gender :</strong>{" "}
          {gender ? (
            gender.toUpperCase()
          ) : (
            <span style={{ color: "grey", fontStyle: "italic" }}>
              Please select your gender
            </span>
          )}
        </p>
        <p id={classes.styledInput}>
          <strong>Date Of Birth :</strong>{" "}
          {dateOfBirth ? (
            new Date(dateOfBirth).toLocaleDateString()
          ) : (
            <span style={{ color: "grey", fontStyle: "italic" }}>
              Please your date of birth
            </span>
          )}
        </p>
        <p id={classes.styledInput}>
          <strong>Business Type :</strong>{" "}
          {businessType ? (
            businessType.toUpperCase()
          ) : (
            <span style={{ color: "grey", fontStyle: "italic" }}>
              Please provide your domain of business
            </span>
          )}
        </p>
        <p id={classes.styledInput}>
          <strong>Franchise Address Line 1 :</strong>{" "}
          {franchiseAddressLine1 ? (
            franchiseAddressLine1.toUpperCase()
          ) : (
            <span style={{ color: "grey", fontStyle: "italic" }}>
              Please provide an address
            </span>
          )}
        </p>
        <p id={classes.styledInput}>
          <strong>Franchise Address Line 2 :</strong>{" "}
          {franchiseAddressLine2 ? (
            franchiseAddressLine2.toUpperCase()
          ) : (
            <span style={{ color: "grey", fontStyle: "italic" }}>Optional</span>
          )}
        </p>
        <p id={classes.styledInput}>
          <strong>State :</strong>{" "}
          {state ? (
            state.toUpperCase()
          ) : (
            <span style={{ color: "grey", fontStyle: "italic" }}>
              Please select your state
            </span>
          )}
        </p>
        <p id={classes.styledInput}>
          <strong>Pin Code :</strong>{" "}
          {pinCode ? (
            pinCode
          ) : (
            <span style={{ color: "grey", fontStyle: "italic" }}>
              Please provide your pincode
            </span>
          )}
        </p>
        <p id={classes.styledInput}>
          <strong>District :</strong>{" "}
          {district ? (
            district.toUpperCase()
          ) : (
            <span style={{ color: "grey", fontStyle: "italic" }}>
              Please select your district
            </span>
          )}
        </p>
        <p id={classes.styledInput}>
          <strong>Post Office :</strong>{" "}
          {postOffice ? (
            postOffice.toUpperCase()
          ) : (
            <span style={{ color: "grey", fontStyle: "italic" }}>
              Please provide your postoffice
            </span>
          )}
        </p>
        <p id={classes.styledInput}>
          <strong>Panchayath :</strong>{" "}
          {panchayath ? (
            panchayath.toUpperCase()
          ) : (
            <span style={{ color: "grey", fontStyle: "italic" }}>
              Please provide your panchayath
            </span>
          )}
        </p>
        <p id={classes.styledInput}>
          <strong>Ward :</strong>{" "}
          {ward ? (
            ward.toUpperCase()
          ) : (
            <span style={{ color: "grey", fontStyle: "italic" }}>
              Please provide your ward number
            </span>
          )}
        </p>
        {accountNumber && (
          <p id={classes.styledInput}>
            <strong>Account Number :</strong> {accountNumber}
          </p>
        )}
        {accountName && (
          <p id={classes.styledInput}>
            <strong>Account Name :</strong> {accountName.toUpperCase()}
          </p>
        )}
        {bank && (
          <p id={classes.styledInput}>
            <strong>Bank :</strong> {bank.toUpperCase()}
          </p>
        )}
        {branchName && (
          <p id={classes.styledInput}>
            <strong>Branch Name :</strong> {branchName.toUpperCase()}
          </p>
        )}
        {ifscCode && (
          <p id={classes.styledInput}>
            <strong>IFSC Code :</strong> {ifscCode}
          </p>
        )}
        {aadhaarNumber && (
          <p id={classes.styledInput}>
            <strong>Aadhaar Number :</strong> {aadhaarNumber}
          </p>
        )}
        {panNumber && (
          <p id={classes.styledInput}>
            <strong>PAN Number :</strong> {panNumber}
          </p>
        )}
        <p id={classes.styledInput}>
          <strong>PAN Center :</strong> {panCenter ? "YES" : "NO"}
        </p>
        {panCenter && digitalElements && (
          <p id={classes.styledInput}>
            <strong>Digital Elements :</strong>{" "}
            {digitalElements?.map((element, index) => {
              if (index === 0) return element.toUpperCase();
              else return `, ${element.toUpperCase()}`;
            })}
          </p>
        )}
        <p id={classes.styledInput}>
          <strong>Referral :</strong> {referredBy ? "YES" : "NO"}
        </p>
        {referredBy && (
          <>
            <p id={classes.styledInput}>
              <strong>Referral Franchise :</strong>{" "}
              {referredFranchiseName ? (
                referredFranchiseName.toUpperCase()
              ) : (
                <span style={{ color: "grey", fontStyle: "italic" }}>
                  Please provide referred franchise name
                </span>
              )}
            </p>
            <p id={classes.styledInput}>
              <strong>Referral Code :</strong>{" "}
              {referredFranchiseCode ? (
                referredFranchiseCode.toUpperCase()
              ) : (
                <span style={{ color: "grey", fontStyle: "italic" }}>
                  Please provide referred franchise code
                </span>
              )}
            </p>
          </>
        )}
        <p id={classes.styledInput}>
          <strong>Onboarded By :</strong>{" "}
          {onBoardedBy === "itsSelf" ? "SELF" : onBoardedBy.toUpperCase()}
        </p>
        {onBoardedBy !== "itsSelf" && (
          <>
            <p id={classes.styledInput}>
              <strong>Onboarded Person Id :</strong>{" "}
              {onBoardedPersonId.toUpperCase()}
            </p>
            <p id={classes.styledInput}>
              <strong>Onboarded Person Name :</strong>{" "}
              {onBoardedPersonName.toUpperCase()}
            </p>
          </>
        )}

        <div className={classes.flexContainer}>
          {values.aadhaarPicFront && (
            <div id={classes.styledInput}>
              <strong>Aadhaar Front </strong>{" "}
              <div className={classes.flexItem}>
                <img
                  src={
                    values.aadhaarPicFront
                      ? URL.createObjectURL(values.aadhaarPicFront)
                      : "/assets/placeholder.jpg"
                  }
                  alt="Default file"
                  width="100%"
                  height="100%"
                />
              </div>
            </div>
          )}
          {values.aadhaarPicback && (
            <div id={classes.styledInput}>
              <strong>Aadhaar Back </strong>{" "}
              <div className={classes.flexItem}>
                <img
                  src={
                    values.aadhaarPicback
                      ? URL.createObjectURL(values.aadhaarPicback)
                      : "/assets/placeholder.jpg"
                  }
                  alt="Default file"
                  width="100%"
                  height="100%"
                />
              </div>
            </div>
          )}
          {values.bankPassbookPic && (
            <div id={classes.styledInput}>
              <strong>Passbook </strong>{" "}
              <div className={classes.flexItem}>
                <img
                  src={
                    values.bankPassbookPic
                      ? URL.createObjectURL(values.bankPassbookPic)
                      : "/assets/placeholder.jpg"
                  }
                  alt="Default file"
                  width="100%"
                  height="100%"
                />
              </div>
            </div>
          )}
          {values.panPic && (
            <div id={classes.styledInput}>
              <strong>Pan Card</strong>{" "}
              <div className={classes.flexItem}>
                <img
                  src={
                    values.panPic
                      ? URL.createObjectURL(values.panPic)
                      : "/assets/placeholder.jpg"
                  }
                  alt="Default file"
                  width="100%"
                  height="100%"
                />
              </div>
            </div>
          )}
          {values.shopPic && (
            <div id={classes.styledInput}>
              <strong>Shop Pic</strong>{" "}
              <div className={classes.flexItem}>
                <img
                  src={
                    values.shopPic
                      ? URL.createObjectURL(values.shopPic)
                      : "/assets/placeholder.jpg"
                  }
                  alt="Default file"
                  width="100%"
                  height="100%"
                />
              </div>
            </div>
          )}
        </div>

        <div className={classes.btn}>
          <Button
            clickEvent={() => createFranchisee()}
            btnName={loading ? "Creating..." : "Confirm"}
            btnType="submit"
          />
        </div>
      </div>
    </div>
  );
};

export default StepFive;
