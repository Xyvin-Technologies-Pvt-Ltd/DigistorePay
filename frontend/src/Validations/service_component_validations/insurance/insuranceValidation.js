import * as yup from "yup";

const phoneRegex = /^[6-9]{1}[0-9]{9}$/;
const alphabetSeries = /^[a-zA-Z\s]+$/;
export const insuranceSchema = yup.object().shape({
  customer_name: yup
    .string()
    .min(3, "Atleast 3 characters needed")
    .matches(alphabetSeries, "Please Enter a valid name")
    .required("Please enter a name"),

  mobile: yup
    .string()
    .matches(phoneRegex, "Please enter a valid mobile number")
    .required("Mobile number is required"),
  email: yup
    .string()
    .email("Please enter a valid email")
    .required("Email is required"),
});
