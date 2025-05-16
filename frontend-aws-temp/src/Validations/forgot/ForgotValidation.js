import * as yup from "yup";

const phoneRegex = /^[6-9]{1}[0-9]{9}$/;

export const userSchema = yup.object().shape({
  isEmailValue: yup.boolean(),
  username: yup.string().when("isEmailValue", {
    is: true,
    then: () =>
      yup
        .string()
        .email("Please enter a valid email or phone number")
        .required("User Name is required"),

    otherwise: () =>
      yup
        .string()
        .matches(phoneRegex, "Please enter a valid email or phone number")
        .required("User Name is required"),
  }),
});
