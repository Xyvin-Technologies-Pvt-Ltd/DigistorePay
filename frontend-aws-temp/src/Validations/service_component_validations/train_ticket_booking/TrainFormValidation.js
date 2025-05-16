import * as yup from "yup";

const phoneRegex = /^[6-9]{1}[0-9]{9}$/;
const alphabetSeries = /^[a-zA-Z\s]+$/;

export const trainFormSchema = yup.object().shape({
  customer_name: yup
    .string()
    .min(3, "Minimum three letters required")
    .required("Please enter a name")
    .matches(alphabetSeries, "Please enter a valid name"),
  mobile: yup
    .string()
    .matches(phoneRegex, "Please enter a valid mobile number")
    .required("Mobile number is required"),
  email: yup
    .string()
    .email("Please enter a valid email")
    .required("Email is required"),
  boarding: yup
    .string()
    .min(3, "Minimum three letters required")
    .required("Please enter your boarding station")
    .matches(alphabetSeries, "Please enter a valid name"),
  destination: yup
    .string()
    .min(3, "Minimum three letters required")
    .required("Please enter your destination")
    .matches(alphabetSeries, "Please enter a valid name"),
  train_number: yup.string(),
  preference: yup.string(),
  total_passengers: yup
    .number()
    .positive("Minimum of 1 passenger required")
    .integer("Total passengers cannot be decimal")
    .max(5, "One user can only book maximum 5 passengers")
    .required("Total no. of passengers required"),
  passengers: yup.array("Atleast one passenger detail required").of(
    yup.object().shape({
      name: yup
        .string()
        .min(3, "Minimum three letters required")
        .required("Please enter a name")
        .matches(alphabetSeries, "Please enter a valid name"),
      age: yup
        .number()
        .positive("Age cannot be negative")
        .integer("Age cannot be decimal")
        .required("Age is required"),
      gender: yup
        .string()
        .oneOf(["Female", "Male", "Other"])
        .required("Gender is required"),
    }),
  ),
});
