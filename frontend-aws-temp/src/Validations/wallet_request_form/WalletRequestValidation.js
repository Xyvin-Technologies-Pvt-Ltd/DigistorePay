import * as yup from "yup";

const accountNumberRegex = /^[0-9]{11,17}$/;
const upiIdRegex = /^[a-zA-Z0-9.\-_]{2,256}@[a-zA-Z]{2,64}$/;
const alphabetSeries = /^[a-zA-Z\s]+$/;
const executiveIdRegex = /^[A-Z]{3}[0-9]{6,10}$/;

export const walletRequestSchema = yup.object().shape({
  amount: yup
    .number()
    .positive("Amount cannot be negative")
    .required("Please enter an amount"),

  date: yup.date().required("Enter the date of payment"),

  remark: yup.string().when("transactionType", {
    is: "internetBanking",
    then: (schema) => schema.max(250, "Maximum only 250 characters allowed"),
    otherwise: (schema) => schema.nullable().notRequired(),
  }),

  fromAcc: yup.string().when("transactionType", {
    is: "internetBanking",
    then: (schema) =>
      schema
        .matches(accountNumberRegex, "Please enter a valid account number")
        .required("Please enter sender's account number"),
    otherwise: (schema) => schema.nullable().notRequired(),
  }),
  toAcc: yup.string().when("transactionType", {
    is: "internetBanking",
    then: (schema) =>
      schema
        .matches(accountNumberRegex, "Please enter a valid account number")
        .required("Please enter receiver's account number"),
    otherwise: (schema) => schema.nullable().notRequired(),
  }),
  referenceNo: yup.string().when("transactionType", {
    is: (val) => val === "internetBanking" || val === "upi",
    then: (schema) =>
      schema
        .required("Please enter a reference number")
        .max(16, "Enter a valid  referance NUmber"),
    otherwise: (schema) => schema.nullable(),
  }),

  executiveName: yup.string().when("transactionType", {
    is: "executive",
    then: (schema) =>
      schema
        .required("Please enter executive's name")
        .matches(alphabetSeries, "Enter a valid name"),
    otherwise: (schema) => schema.nullable().notRequired(),
  }),
  executiveId: yup.string().when("transactionType", {
    is: "executive",
    then: (schema) =>
      schema
        .required("Please enter executive's ID")
        .matches(executiveIdRegex, "Please enter a valid ID"),
    otherwise: (schema) => schema.nullable().notRequired(),
  }),

  fromUpiId: yup.string().when("transactionType", {
    is: "upi",
    then: (schema) =>
      schema
        .matches(upiIdRegex, "Please enter a valid Upi ID")
        .required("Please enter sender Upi ID"),
    otherwise: (schema) => schema.nullable().notRequired(),
  }),
  toUpiId: yup.string().when("transactionType", {
    is: "upi",
    then: (schema) =>
      schema
        .matches(upiIdRegex, "Please enter a valid Upi ID")
        .required("Please enter receiver Upi ID"),
    otherwise: (schema) => schema.nullable().notRequired(),
  }),
});

export const walletAdminSchema = yup.object().shape({
  paymentMethod: yup.string().required("Please select a payment method"),
  amount: yup
    .number()
    .required("Please enter an amount")
    .positive("Amount must be greater than zero"),
});
