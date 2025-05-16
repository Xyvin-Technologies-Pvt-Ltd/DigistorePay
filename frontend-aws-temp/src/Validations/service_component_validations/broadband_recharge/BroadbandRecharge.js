import * as yup from "yup";

export const broadbandRechargeSchema = yup.object().shape({
  operator: yup.string().required("Please select an operator"),
  customerNumber: yup.number().required("Please enter a valid customer number"),
});
