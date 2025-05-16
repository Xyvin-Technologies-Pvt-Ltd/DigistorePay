import * as yup from "yup";

const phoneRegex = /^[6-9]{1}[0-9]{9}$/;

export const dthRechargeSchema = yup.object().shape({
  operator: yup.string().required("Please select an operator"),
  vcNumber: yup.number().required("Please enter a valid VC Number"),
  phoneNumber: yup
    .string()
    .matches(phoneRegex, "Please enter a valid mobile number")
    .required("Mobile number is required"),
  amount: yup
    .number()
    .positive("Amount cannot be less than or equal to zero")
    .integer("Amount cannot be decimal")
    .required("Please enter an amount"),
});
