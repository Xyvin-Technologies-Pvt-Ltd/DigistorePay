import * as yup from "yup";

// Reusable regular expressions
const phoneRegex = /^[6-9]{1}[0-9]{9}$/;
const alphabetSeries = /^[a-zA-Z\s]+$/;
const passportRegex = /^[A-Za-z0-9]{6,9}$/;

export const passportValidationSchema = yup.object().shape({
  passportRenewal: yup.boolean(),
  old_passport_number: yup.string().when("passportRenewal", {
    is: true,
    then: (schema) =>
      schema
        .required("Old passport number is required")
        .matches(passportRegex, "Please enter a valid passport number"),
    otherwise: (schema) => schema.notRequired(),
  }),
  customer_name: yup
    .string()
    .min(3, "Minimum three letters required")
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
  education_qualification: yup
    .string()
    .required("Educational qualification is required"),

  marital_status: yup.mixed().required("Marital status is required"),
  spouse_name: yup.string().when("marital_status", {
    is: "yes",
    then: (schema) =>
      schema
        .matches(alphabetSeries, "Please enter a valid name")
        .min(3, "Minimum three letters required")
        .required("Spouse name is required"),
    otherwise: (schema) => schema.nullable(),
  }),
  employment_type: yup.string().required("Employment type is required"),

  birth_place: yup.string().required("Birth place is required"),
  identical_mark_1: yup.string()
    .matches(/^[^0-9]*$/, "Identical mark 1 must not contain numbers")
    .required("Identical mark 1 is required"),
  identical_mark_2: yup.string()
    .matches(/^[^0-9]*$/, "Identical mark 2 must not contain numbers")
    .required("Identical mark 2 is required"),
  police_station: yup.string().required("Police station is required"),
  village: yup.string().required("Village is required"),
  emergency_contact_person: yup
    .string()
    .matches(alphabetSeries, "Please enter a valid name")
    .required("Emergency contact person is required"),
  emergency_contact_number: yup
    .string()
    .matches(phoneRegex, "Please enter a valid emergency contact number")
    .required("Emergency contact number is required"),
  emergency_contact_address: yup
    .string()
    .required("Emergency contact address is required"),
  personal_contact_address: yup
    .string()
    .required("Personal contact address is required"),
  passport_office_zone: yup
    .string()
    .required("Passport office zone is required"),
  passport_office_preference: yup
    .string()
    .required("Passport office preference is required"),
  date_preference_1: yup
    .date()
    .required("Appointment date preference 1 is required"),
  date_preference_2: yup
    .date()
    .required("Appointment date preference 2 is required")
    .notOneOf(
      [yup.ref("date_preference_1")],
      "Appointment date preference 2 must be different from preference 1"
    ),
  date_preference_3: yup
    .date()
    .required("Appointment date preference 3 is required")
    .notOneOf(
      [yup.ref("date_preference_1"), yup.ref("date_preference_2")],
      "Appointment date preference 3 must be different from preferences 1 and 2"
    ),
  identity_proof: yup.mixed().required("Please upload identity proof"),
  birth_proof: yup.mixed().required("Please upload birth proof"),
  address_proof: yup.mixed().required("Please upload address proof"),
  old_passport_copy: yup.mixed().when("passportRenewal", {
    is: true,
    then: (schema) => schema.required("Please upload old passport copy"),
    otherwise: (schema) => schema.notRequired(),
  }),
  amount: yup
    .number()
    .min(1750, "Service charge must be at least 1750")
    .max(1850, "Service charge cannot exceed 1850")
    .required("Service charge is required"),
});
