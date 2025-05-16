import * as yup from "yup";

const phoneRegex = /^[6-9]{1}[0-9]{9}$/;

export const fastTagRechargeSchema = yup.object().shape({
  operator: yup.string().required("Please select an operator"),
  vehicleNumber: yup
    .string()
    .required("Please enter vehicle registration number"),
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
