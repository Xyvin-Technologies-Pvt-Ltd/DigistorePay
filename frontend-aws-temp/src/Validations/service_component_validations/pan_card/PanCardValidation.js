import * as yup from "yup";

const phoneRegex = /^[6-9]{1}[0-9]{9}$/;
const alphabetSeries = /^[a-zA-Z\s]+$/;
const panNumber = /^[A-Za-z]{5}[0-9]{4}[A-Za-z]{1}$/;
const aadhaarNumber = /\b[2-9][0-9]{3}[0-9]{4}[0-9]{4}\b/;

export const newPanCardSchema = yup.object().shape({
  customer_name: yup
    .string()
    .min(3, "Minimum three letter required")
    .required("Please enter a name")
    .matches(alphabetSeries, "Please enter a valid name"),
  mobile: yup
    .string()
    .matches(phoneRegex, "Please enter a valid mobile number")
    .required("Mobile number is required"),
  email: yup
    .string()
    .email("Please enter a valid email")
    .required("Email id is required"),
  aadhaar_number: yup
    .string()
    .matches(aadhaarNumber, "Please enter a valid Aadhaar Number")
    .required("Aadhaar number is required"),
  father_name: yup
    .string()
    .required("Father's name is required")
    .matches(alphabetSeries, "Please enter a valid name"),
  aadhaar_front: yup.mixed().required("Please upload aadhaar front"),
  aadhaar_back: yup.mixed().required("Please upload aadhaar back"),
  photo: yup.mixed().required("Please upload photo"),
  signature: yup.mixed().required("Please upload signature"),
  birth_proof: yup.mixed().required("Please upload birth proof"),
  address_proof: yup.mixed().required("Please upload address proof"),
  commission: yup
    .number()
    .min(150, "Service charge must be at least 150")
    .max(250, "Service charge cannot exceed 250")
    .required("Service charge is required"),
});

{
  /*Schema of duplicate pan card */
}

export const duplicateOrChangePanCardSchema = yup.object().shape({
  customer_name: yup
    .string()
    .min(3, "Minimum three letter required")
    .required("Please enter a name")
    .matches(alphabetSeries, "Please enter a valid name"),
  email: yup
    .string()
    .email("Please enter a valid email")
    .required("Email id is required"),
  mobile: yup
    .string()
    .matches(phoneRegex, "Please enter a valid mobile number")
    .required("Phone number is required"),
  aadhaar_number: yup
    .string()
    .matches(aadhaarNumber, "Please enter a valid Aadhaar Number")
    .required("Aadhaar number is required"),
  pan_number: yup
    .string()
    .matches(panNumber, "Please Enter a valid pan number")
    .required("Pan number is required"),
  father_name: yup
    .string()
    .required("Father name is required")
    .matches(alphabetSeries, "Please enter a valid name"),
  request_option: yup
    .string()
    .oneOf(["duplicate", "change"], "Invalid option")
    .required("Request option is required"),

  reason_for_duplicate: yup.string().when("request_option", {
    is: "duplicate",
    then: (schema) => schema.required("The reason is required"),
    otherwise: (schema) => schema.nullable(),
    commission: yup
      .number()
      .min(150, "Service charge must be at least 150")
      .max(250, "Service charge cannot exceed 250")
      .required("Service charge is required"),
  }),
  change_name: yup.boolean(),
  new_name: yup.string().when("change_name", {
    is: true,
    then: (schema) =>
      schema
        .required("The name is required")
        .matches(alphabetSeries, "Please enter a valid name"),
    otherwise: (schema) => schema.nullable(),
  }),
  change_address: yup.boolean(),
  new_address: yup.string().when("change_address", {
    is: true,
    then: (schema) =>
      schema
        .required("The address is required")
        .min(3, "Minimum 3 letter required"),
    otherwise: (schema) => schema.nullable(),
  }),
  change_date_of_birth: yup.boolean(),
  new_date_of_birth: yup.date().when("change_date_of_birth", {
    is: true,
    then: (schema) => schema.required("The Dob is required"),
    otherwise: (schema) => schema.nullable(),
  }),
  change_father: yup.boolean(),
  new_father: yup.string().when("change_father", {
    is: true,
    then: (schema) =>
      schema
        .required("Father name is required")
        .matches(alphabetSeries, "Enter a valid father name"),
    otherwise: (schema) => schema.nullable(),
  }),
  aadhaar_front: yup.mixed().required("Please upload aadhaar front"),
  aadhaar_back: yup.mixed().required("Please upload aadhaar back"),
  photo: yup.mixed().required("Please upload your photo"),
  signature: yup.mixed().required("Please upload your signature"),
  commission: yup
    .number()
    .min(150, "Service charge must be at least 150")
    .max(250, "Service charge cannot exceed 250")
    .required("Service charge is required"),
});
{
  /*schema of minor pan */
}

export const minorPAnCardSchema = yup.object().shape({
  customer_name: yup
    .string()
    .min(3, "Minimum three letter required")
    .required("Please enter a name")
    .matches(alphabetSeries, "Please Enter a valid name"),
  email: yup
    .string()
    .email("Please enter a valid email")
    .required("Email id is required"),
  mobile: yup
    .string()
    .matches(phoneRegex, "Please enter a valid mobile number")
    .required("Phone number is required"),
  father_name: yup
    .string()
    .required("Father's name is required")
    .matches(alphabetSeries, "Please enter a valid name"),
  aadhaar_number: yup
    .string()
    .matches(aadhaarNumber, "Please enter a valid Aadhaar Number")
    .required("Aadhaar number is required"),
  reprentative_assessee: yup
    .string()
    .min(3, "Minimum three letter required")
    .required("Please enter respresentative assessee name")
    .matches(alphabetSeries, "Please enter a valid name"),
  reprentative_assessee_relation: yup
    .string()
    .min(3, "Minimum three letter required")
    .required("Please Enter the assessee's realation ")
    .matches(alphabetSeries, "Please enter a valid relation"),
  aadhaar_front: yup
    .mixed()
    .required("Please upload representative assessees aadhaar front"),
  aadhaar_back: yup
    .mixed()
    .required("Please upload representative assessees aadhaar back"),
  birth_proof: yup.mixed().required("Please upload birth proof"),
  address_proof: yup.mixed().required("Please upload address proof"),
  representative_aadhaar_front: yup
    .mixed()
    .required("Please upload representative assessee aadhaar front"),
  representative_aadhaar_back: yup
    .mixed()
    .required("Please upload representative assessee aadhaar back"),
  signature: yup
    .mixed()
    .required("Please upload representative assessees signature"),
  commission: yup
    .number()
    .min(150, "Service charge must be at least 150")
    .max(250, "Service charge cannot exceed 250")
    .required("Service charge is required"),
});

{
  /*Nri Pan Schema */
}

export const nriPAnCardSchema = yup.object().shape({
  customer_name: yup
    .string()
    .min(3, "Minimum three letter required")
    .required("Please enter a name")
    .matches(alphabetSeries, "Please Enter a valid name"),
  email: yup
    .string()
    .email("Please enter a valid email")
    .required("Email id is required"),
  mobile: yup
    .string()
    .matches(phoneRegex, "Please enter a valid mobile number")
    .required("Phone number is required"),
  nri_address: yup.mixed().required("Please Enter your assessee address"),
  father_name: yup
    .string()
    .required("Father's name is required")
    .matches(alphabetSeries, "Please enter a valid name"),
  identity_proof: yup.mixed().required("Please upload  identity proof"),
  birth_proof: yup.mixed().required("Please upload birth proof"),
  address_proof: yup.mixed().required("Please upload address proof"),
  photo: yup.mixed().required("Please upload your photo"),
  signature: yup.mixed().required("Please upload your signature"),
  commission: yup
    .number()
    .min(150, "Service charge must be at least 150")
    .max(250, "Service charge cannot exceed 250")
    .required("Service charge is required"),
});
