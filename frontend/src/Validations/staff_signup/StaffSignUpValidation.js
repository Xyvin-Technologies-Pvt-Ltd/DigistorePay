import * as yup from "yup";

const phoneRegex = /^[6-9]{1}[0-9]{9}$/;
const alphabetSeries = /^[a-zA-Z\s]+$/;
const pinCode = /^[1-9]{1}[0-9]{2}[0-9]{3}$/;
const accountNumberRegex = /^[0-9]{9,18}$/;
const ifscRegex = /^[A-Z]{4}[0-9]{7}/;

export const staffSchema = yup.object().shape({
  firstName: yup
    .string()
    .min(3, "Must be at least 2 characters")
    .matches(alphabetSeries, "Enter a valid first name")
    .required("Please enter your first name"),
  lastName: yup
    .string()
    .min(1, "Must be atleast 1 character")
    .matches(alphabetSeries, "Enter a valid last name")
    .required("Please enter your last name"),
  email: yup
    .string()
    .email("Please enter a valid email")
    .required("Email is required"),
  phoneNumber: yup
    .string()
    .length(10, "Phone number must exactly be 10 digits")
    .matches(phoneRegex, "Please enter a valid 10 digit mobile number")
    .required("Mobile number is required"),
  emergencyContact: yup
    .string()
    .length(10, "Phone number must exactly be 10 digits")
    .matches(phoneRegex, "Please enter a valid 10 digit mobile number")
    .required("Mobile number is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters long"),
  dateOfBirth: yup.date().required("Date of birth is required"),
  gender: yup.string().required("Please select your gender"),
  addressLine1: yup
    .string()
    .min(3, "Must be at least 2 characters")
    .required("Please enter your address"),
  addressLine2: yup
    .string()
    .min(3, "Must be at least 2 characters")
    .required("Please enter your address"),
  city: yup.string().required("Please enter your city"),
  district: yup.string().required("Please enter your district"),
  state: yup.string().required("Please enter your state"),
  pinCode: yup
    .string()
    .matches(pinCode, "Please enter a valid pin code")
    .required("Pin code is required"),
  bank: yup.string().required("Please enter your bank name"),
  branchName: yup.string().required("Please enter your branch name"),
  accountNumber: yup
    .string()
    .matches(accountNumberRegex, "Please enter a valid account number")
    .required("Account number is required"),
  ifscCode: yup
    .string()
    .matches(ifscRegex, "Please enter a valid IFSC code")
    .required("IFSC code is required"),
  accountName: yup
    .string()
    .matches(alphabetSeries, "Enter a valid account holder name")
    .required("Account holder name is required"),
  dateOfJoin: yup.date().required("Date of joining is required"),
  bloodGroup: yup.string().required("Please enter your blood group"),
  employment: yup.string().required("Please enter your employment"),
  employmentType: yup.string().required("Please select your employment type"),
  districtOfOperation: yup
    .string()
    .required("Please enter district of operation"),
  emergencyContact: yup
    .string()
    .length(10, "Emergency contact must exactly be 10 digits")
    .matches(phoneRegex, "Please enter a valid 10 digit emergency contact")
    .required("Emergency contact is required"),
  reportingManager: yup
    .string()
    .required("Please enter your reporting manager"),
  totalTrainingDays: yup
    .number()
    .required("Please enter the number of training days"),
  needTraining: yup.boolean().required("Please specify if training is needed"),
});
