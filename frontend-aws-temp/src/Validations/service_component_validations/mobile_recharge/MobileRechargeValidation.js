import * as yup from "yup";

const phoneRegex = /^[6-9]{1}[0-9]{9}$/;

export const mobileRechargeSchema = yup.object().shape({
  phoneNumber: yup
    .string()
    .matches(phoneRegex, "Please enter a valid mobile number")
    .required("Mobile number is required"),
  sp_key: yup.string().required("Please select an operator"),
  circle: yup.string().required("Please select your circle"),
  amount: yup
    .number()
    .positive("Amount cannot be less than or equal to zero")
    .required("Please enter an amount"),
});
