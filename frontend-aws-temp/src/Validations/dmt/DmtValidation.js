import * as yup from "yup";

export const dmtAddCustomerSchema = yup.object().shape({
  phoneNumber: yup
    .string()
    .length(10, "Phone number must exactly 10 characters")
    .matches(
      "^[+]?[(]?[0-9]{3}[)]?[-s.]?[0-9]{3}[-s.]?[0-9]{4,6}$",
      "Please enter valid 10 digit mobile number",
    )
    .required("Please enter customer mobile number"),
  name: yup
    .string()
    .min(3, "Atleast 3 characters needed")
    .required("Please enter Customer name"),
  address: yup.string().required("Please enter Customer address"),
  otp: yup.string().required("Please enter OTP"),
  dateOfBirth: yup.string().required("Please enter date of birth"),
});

export const addBeneficiarySchema = yup.object().shape({
  ifsc: yup
    .string()
    // .matches("/^[A-Za-z]{4}[0-9]{7}$/", "Please enter valid Ifsc code")
    .required("Please enter Ifsc code"),
  accountNo: yup
    .string()
    .matches("[0-9]{9,18}", "Please enter valid Account Number")
    .required("Please enter Account number"),
  bankName: yup.string().required("Please enter your bank name"),
  mobileNo: yup
    .string()
    .length(10, "Phone number must exactly 10 characters")
    .matches(
      "^[+]?[(]?[0-9]{3}[)]?[-s.]?[0-9]{3}[-s.]?[0-9]{4,6}$",
      "Please enter valid 10 digit mobile number",
    )
    .required("Please enter benificiary mobile number"),

  phoneNumber: yup
    .string()
    .length(10, "Phone number must exactly 10 characters")
    .matches(
      "^[+]?[(]?[0-9]{3}[)]?[-s.]?[0-9]{3}[-s.]?[0-9]{4,6}$",
      "Please enter valid 10 digit mobile number",
    )
    .required("Please enter customer mobile number"),
  recipientName: yup
    .string()
    .min(3, "Atleast 3 characters needed")
    .required("Please enter benificiary name"),
});

export const dmtMoneyTransferSchema = yup.object().shape({
  amount: yup
    .number()
    .positive("Amount cannot be negative")
    .integer("Amount cannot be decimal")
    .max(5000, "Max. limit ₹5000")
    .required("Please enter an amount"),
  recipientId: yup.string().required("Please select benificiary "),
});
