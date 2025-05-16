import * as yup from "yup";
// const handlePassword = (values) => {
//   const { newPassword, confirmPassword } = values;
// };
export const UpdatePasswordSchema = yup.object().shape({
  currentPassword: yup
    .string()
    .min(8, "Minimum 8 letters required")
    .required("Current password is required"),
  newPassword: yup
    .string()
    .min(8, "Minimum 8 letters required")
    .required("New password is required"),
  confirmPassword: yup
    .string()
    .min(8, "Minimum 8 letters required")
    .oneOf([yup.ref("newPassword"), null], "Passwords must match")
    .required("Confirm password is required"),
});
