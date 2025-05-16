import * as yup from "yup";

export const gasFormSchema = yup.object().shape({
  operator: yup.string().required("Please select an operator"),
  telephoneNumber: yup
    .number()
    .required("Please enter a valid telephone number"),
});
