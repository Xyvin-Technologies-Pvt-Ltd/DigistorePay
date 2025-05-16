import * as yup from "yup";

const alphabetSeries = /^[a-zA-Z\s]+$/;
const phoneRegex = /^[A-Za-z0-9]{6,9}$/;

export const loanSchema = yup.object().shape({
  customerName: yup
    .string()
    .min(3, "At least 3 characters needed")
    .matches(alphabetSeries, "Please enter a valid name")
    .required("Please enter a name"),

  email: yup
    .string()
    .email("Please enter a valid email")
    .required("Email is required"),

  mobile: yup
    .string()
    .matches(phoneRegex, "Please enter a valid mobile number")
    .required("Mobile number is required"),

  cibilCheck: yup
    .string()
    .oneOf(["yes", "no"], "Invalid option")
    .required("Please select an option"),

  cibil: yup.number().when("cibilCheck", {
    is: "yes",
    then: (schema) =>
      schema
        .required("CIBIL score is required")
        .min(300, "CIBIL score must be at least 300")
        .max(900, "CIBIL score must be at most 900"),
    otherwise: (schema) => schema.nullable().notRequired(),
  }),

  aadharFront: yup.mixed().when("cibilCheck", {
    is: "no",
    then: (schema) => schema.required("Please upload Aadhar Front"),
    otherwise: (schema) => schema.nullable().notRequired(),
  }),

  aadharBack: yup.mixed().when("cibilCheck", {
    is: "no",
    then: (schema) => schema.required("Please upload Aadhar Back"),
    otherwise: (schema) => schema.nullable().notRequired(),
  }),

  panCard: yup.mixed().when("cibilCheck", {
    is: "no",
    then: (schema) => schema.required("Please upload Pan Card"),
    otherwise: (schema) => schema.nullable().notRequired(),
  }),

  cibilReportSelection: yup
    .string()
    .oneOf(["yes", "no"], "Please select an option")
    .required("Please select if you have a Cibil Report"),

  cibilReport: yup.mixed().when("cibilReportSelection", {
    is: "yes",
    then: (schema) => schema.required("Cibil Report is required"),
    otherwise: (schema) => schema.nullable().notRequired(),
  }),

  form: yup.mixed().when("cibilReportSelection", {
    is: "no",
    then: (schema) => schema.required("Form is required"),
    otherwise: (schema) => schema.nullable().notRequired(),
  }),
});
