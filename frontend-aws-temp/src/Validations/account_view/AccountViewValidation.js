import * as yup from "yup";

const phoneRegex = /^[6-9]{1}[0-9]{9}$/;
const alphabetSeries = /^[a-zA-Z\s]+$/;
const panNumber = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
const pinCode = /^[1-9]{1}[0-9]{2}[0-9]{3}$/;
const ifscCode = /^[A-Z]{4}[0-9]{7}/;
const AccountNumberRegex = /^[0-9]{9,18}$/;
const adhaarNumber = /\b[2-9][0-9]{3}[0-9]{4}[0-9]{4}\b/;
const bloodGroupRegex = /[A|B|AB|O][\+|\-]/;
export const commonEditSchema = yup.object().shape({
  state: yup.string().required("Required, please enter the state"),

  district: yup.string().required("Required, please enter the district"),

  pinCode: yup
    .string()
    .required("Required, please enter the pin code ")
    .matches(pinCode, "Enter a valid pinCode"),

  dateOfBirth: yup.date().when("loginUser", {
    is: "admin",
    then: (schema) => schema.required("Required ,please select a date"),
    otherwise: (schema) => schema.notRequired(),
  }),
  accountNumber: yup.string().when("loginUser", {
    is: "admin",
    then: (schema) =>
      schema
        .matches(AccountNumberRegex, "Enter a valid account number")
        .required("Required, Please enter an account number"),
    otherwise: (schema) => schema.notRequired(),
  }),
  accountName: yup.string().when("loginUser", {
    is: "admin",
    then: (schema) =>
      schema
        .min(3, "Minimum of three letters required")
        .matches(alphabetSeries, "Enter a valid account name")
        .required("Required, Please enter an account name"),
    otherwise: (schema) => schema.notRequired(),
  }),
  bank: yup.string().when("loginUser", {
    is: "admin",
    then: (schema) =>
      schema
        .min(3, "Minimum of three letters required")
        .matches(alphabetSeries, "Enter a valid  bank name")
        .required("Required, Please enter an bank name"),
    otherwise: (schema) => schema.notRequired(),
  }),
  branchName: yup.string().when("loginUser", {
    is: "admin",
    then: (schema) =>
      schema
        .min(3, "Minimum of three letters required")
        .matches(alphabetSeries, "Enter a valid  bank name")
        .required("Required, Please enter an bank name"),
    otherwise: (schema) => schema.notRequired(),
  }),
  ifscCode: yup.string().when("loginUser", {
    is: "admin",
    then: (schema) =>
      schema
        .matches(ifscCode, "Enter a valid  bank name")
        .required("Required, Please enter an bank name"),
    otherwise: (schema) => schema.notRequired(),
  }),
});

export const franchiseEditSchema = commonEditSchema.concat(
  yup.object().shape({
    franchiseName: yup.string().when("loginUser", {
      is: "admin",
      then: (schema) =>
        schema
          .min(3, "Minimum of three letter required")
          .matches(alphabetSeries, "Enter a valid name")
          .required("Required, Please enter name"),
      otherwise: (schema) => schema.notRequired(),
    }),
    businessType: yup.string().when("loginUser", {
      is: "admin",
      then: (schema) =>
        schema
          .min(3, "Minimum of three letter required")
          .matches(alphabetSeries, "Enter a valid data")
          .required("Required, Please enter the feild"),
      otherwise: (schema) => schema.notRequired(),
    }),
    panCenter: yup.boolean().required("Required, Select an option"),
    franchiseAddressLine1: yup
      .string()
      .min(3, "Minimum of three letter required")
      .required("Required, Please enter an address"),

    franchiseAddressLine2: yup
      .string()
      .min(3, "Minimum of three letter required"),

    panchayath: yup.string().required("Required, please enter the panchayath"),

    ward: yup.string().required("Required, please enter the Ward "),

    postOffice: yup
      .string()
      .required("Required, please enter the post office "),

    ownerName: yup.string().when("loginUser", {
      is: "admin",
      then: (schema) =>
        schema
          .min(3, "Minimum of three letter required")
          .matches(alphabetSeries, "Enter a valid name")
          .required("Required, Please enter an owner name"),
      otherwise: (schema) => schema.notRequired(),
    }),
    aadhaarNumber: yup.string().when("loginUser", {
      is: "admin",
      then: (schema) =>
        schema
          .matches(adhaarNumber, "Enter a valid adhaar number")
          .required("Required, Please enter an adhaar number"),
      otherwise: (schema) => schema.notRequired(),
    }),
    panNumber: yup.string().when("loginUser", {
      is: "admin",
      then: (schema) =>
        schema
          .matches(panNumber, "Enter a valid pan number")
          .required("Required, Please enter an pan number"),
      otherwise: (schema) => schema.notRequired(),
    }),
    referredBy: yup.boolean().when("loginUser", {
      is: "admin",
      then: (schema) => schema.required("Required ,select a gender"),
      otherwise: (schema) => schema.notRequired(),
    }),
  }),

  //[TODO] valiadtion for refer paga (mathews)
);

export const staffEditSchema = commonEditSchema.concat(
  yup.object().shape({
    firstName: yup.string().when("loginUser", {
      is: "admin",
      then: (schema) =>
        schema
          .required("Require , please fill this feild")
          .matches(alphabetSeries, "Please Enter a valid name")
          .min(2, "Enter a name with minimum of 3 letters"),
      otherwise: (schema) => schema.notRequired(),
    }),
    lastName: yup.string().when("loginUser", {
      is: "admin",
      then: (schema) =>
        schema
          .required("Require , please fill this feild")
          .matches(alphabetSeries, "Please Enter a valid name")
          .min(2, "Enter a name with minimum of 3 letters"),
      otherwise: (schema) => schema.notRequired(),
    }),

    emergencyContact: yup.string().when("loginUser", {
      is: "admin",
      then: (schema) =>
        schema
          .matches(phoneRegex, "Enter a valid number")
          .required("Required ,please enter the number"),
      otherwise: (schema) => schema.notRequired(),
    }),
    bloodGroup: yup.string().when("loginUser", {
      is: "admin",
      then: (schema) =>
        schema.matches(bloodGroupRegex, "Enter a valid blood group"),
      otherwise: (schema) => schema.notRequired(),
    }),
    gender: yup.string().when("loginUser", {
      is: "admin",
      then: (schema) => schema.required("Required ,select a gender"),
      otherwise: (schema) => schema.notRequired(),
    }),

    addressLine1: yup
      .string()
      .required("Required ,please fill this feild")
      .min(3, "Please enter minimum 3 letters"),
    addressLine2: yup
      .string()
      .required("Required ,please fill this feild")
      .min(3, "Please enter minimum 3 letters"),
    city: yup
      .string()
      .required("Required ,please fill this feild")
      .min(2, "Please enter minimum 3 letters")
      .matches(alphabetSeries, "Please enter a valid name"),

    employment: yup.string().when("loginUser", {
      is: "admin",
      then: (schema) => schema.required("Required ,select a gender"),
      otherwise: (schema) => schema.notRequired(),
    }),

    dateOfJoin: yup.date().when("loginUser", {
      is: "admin",
      then: (schema) => schema.required("Required ,select a gender"),
      otherwise: (schema) => schema.notRequired(),
    }),

    isTrainingRequired: yup.boolean().when("loginUser", {
      is: "admin",
      then: (schema) => schema.required("Required ,select a gender"),
      otherwise: (schema) => schema.notRequired(),
    }),
    totalTrainingDays: yup.number().when(["loginUser", "isTrainingRequired"], {
      is: (loginUser, isTrainingRequired) =>
        loginUser === "admin" && isTrainingRequired,
      then: (schema) => schema.required("Required , fill this feild "),
      otherwise: (schema) => schema.notRequired(),
    }),
  }),
);
