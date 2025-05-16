import * as yup from "yup";

const phoneRegex = /^[6-9]{1}[0-9]{9}$/;
const alphabetSeries = /^[a-zA-Z\s]+$/;
const panNumber = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;

const pinCode = /^[1-9]{1}[0-9]{2}[0-9]{3}$/;
const ifscCode = /^[A-Z]{4}0[A-Z0-9]{6}$/;
const AccountNumberRegex = /^[0-9]{9,18}$/;

const adhaarNumber = /\b[2-9][0-9]{3}[0-9]{4}[0-9]{4}\b/;
export const userSchema = yup.object().shape({
  ownerName: yup
    .string()
    .min(2, "Minimum two letter required")
    .required("Please enter a name")
    .matches(alphabetSeries, "Enter valid name"),
  franchiseName: yup
    .string()
    .required("Please enter franchisee name")
    .matches(alphabetSeries, "Enter a a valid name"),
  franchiseAddressLine1: yup.string().required("Please enter your address"),
  state: yup.string().required("Please enter your state name"),
  gender: yup.string().required("Please enter your gender"),
  dateOfBirth: yup.date().required("Date of birth is required"),
  panchayath: yup.string().required("Please enter your panchayath"),
  ward: yup.string().required("Please enter your ward"),
  accountName: yup.string().required("Please enter your Account name"),
  bank: yup.string().required("Please enter your bank name"),
  branchName: yup
    .string()
    .required("Please enter your branch name")
    .matches(alphabetSeries, "Enter a valid bank branch name"),
  businessType: yup.string().required("Please enter your business type"),
  pinCode: yup
    .string()
    // .length(6)
    .matches(pinCode, "Please enter valid pin code")
    .required("Please enter pin code"),
  district: yup.string().required("Please enter your district name"),
  postOffice: yup.string().required("Please enter your post office name"),
  panNumber: yup
    .string()
    // .length(10)
    .matches(panNumber, "Please enter valid PAN number")
    .required("Please enter Pan number"),
  accountNumber: yup
    .string()
    .matches(AccountNumberRegex, "Please enter valid account number")
    .required("Please enter account number"),
  ifscCode: yup
    .string()
    .matches(ifscCode, "Enter a valid IFSC code")
    // .matches("/^[A-Za-z]{4}[0-9]{7}$/", "Please enter valid Ifsc code")
    .required("Please enter Ifsc code"),
  phoneNumber: yup
    .string()
    // .length(10, "Phone number must exactly 10 characters")
    .matches(phoneRegex, "Please enter valid 10 digit mobile number")
    .required("Please enter mobile number"),
  email: yup
    .string()
    .email("Please enter a valid email")
    .required("Email is required"),
  password: yup.string().min(8).required("Password is required"),
  aadhaarNumber: yup
    .string()
    .length(12)
    .matches(adhaarNumber, "Please enter valid aadhaar number")
    .required("Please enter aadhaar number"),
});
