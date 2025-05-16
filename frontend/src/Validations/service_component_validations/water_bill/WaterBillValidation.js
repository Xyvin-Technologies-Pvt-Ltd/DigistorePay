import * as yup from "yup";

const phoneRegex = /^[6-9]{1}[0-9]{9}$/;

export const waterBillSchema = yup.object().shape({
  operator: yup.string().required("Please select an operator"),
  customerNumber: yup.number().required("Please enter a valid Customer Number"),
  phoneNumber: yup
    .string()
    .matches(phoneRegex, "Please enter a valid mobile number")
    .required("Mobile number is required"),
  amount: yup
    .number()
    .positive("Amount cannot be negative")
    .integer("Amount cannot be decimal")
    .required("Please enter an amount"),
});
