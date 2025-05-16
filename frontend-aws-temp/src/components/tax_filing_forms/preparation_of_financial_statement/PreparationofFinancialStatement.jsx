import { useFormik } from "formik";
import { preparationOfFinancialStatementSchema } from "../../../Validations/service_component_validations/tax_filing/taxFilingValidation";
import { toast } from "react-hot-toast";
import { fileMimeType } from "../../../data/filemimetype";
import UploadCard from "../../upload_card/UploadCard";
import Button from "../../button/Button";
import axios from "axios";
import classes from "./PreparationofFinancialStatement.module.css";

const onSubmit = async (values) => {
  const formData = new FormData();
  formData.append("customerName", values.customerName);
  formData.append("email", values.email);
  formData.append("phoneNumber", values.mobile);
  formData.append("businessName", values.businessName);
  formData.append("businessType", values.businessType);
  formData.append("gstUsername", values.gstUsername);
  formData.append("gstPassword", values.gstPassword);
  formData.append("cashbookAndOtherAccounts", values.cashBookAndOtherAccounts);
  formData.append("creditorsAndDebitorsList", values.creditorsAndDebitorsList);
  formData.append("bankStatements", values.bankStatement);
  formData.append("gstStatement", values.gstStatement);
  formData.append("stockDetails", values.stockDetails);

  try {
    const res = await axios.post(
      "/financialStatementRoute/financialStatement",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    if (res.data.errorcode) {
      toast.error(res.data.msg, { id: "finance" });
    } else {
      toast.success("Financial Statements Submitted", { id: "finance" });
      resetForm();
    }
  } catch (error) {
    toast.error(error.response?.data?.message || "Something went wrong", {
      id: "finance",
    });
  }
};

const PreparationofFinancialStatement = () => {
  const {
    values,
    errors,
    touched,
    handleBlur,
    handleSubmit,
    handleChange,
    setFieldValue,
    resetForm,
    isValid,
    dirty,
  } = useFormik({
    initialValues: {
      customerName: "",
      mobile: "",
      email: "",
      businessName: "",
      businessType: "",
      gstUsername: "",
      gstPassword: "",
      cashBookAndOtherAccounts: "",
      creditorsAndDebitorsList: "",
      bankStatement: "",
      gstStatement: "",
      stockDetails: "",
    },
    validationSchema: preparationOfFinancialStatementSchema,
    onSubmit,
  });
  const isFormFilled = dirty && isValid;
  return (
    <form className={classes.form} onSubmit={handleSubmit}>
      <input
        id={classes.styledInput}
        name="customerName"
        value={values.customerName}
        onChange={handleChange}
        onBlur={handleBlur}
        type="text"
        placeholder="Enter Customer Name"
      />
      {errors.customerName && touched.customerName && (
        <p id={classes.errors}>{errors.customerName}</p>
      )}

      <input
        id={classes.styledInput}
        name="mobile"
        value={values.mobile}
        onChange={handleChange}
        onBlur={handleBlur}
        type="number"
        placeholder="Enter Mobile Number"
        onWheel={(e) => e.target.blur()}
      />
      {errors.mobile && touched.mobile && (
        <p id={classes.errors}>{errors.mobile}</p>
      )}

      <input
        id={classes.styledInput}
        name="email"
        value={values.email}
        onChange={handleChange}
        onBlur={handleBlur}
        type="email"
        placeholder="Enter Email ID"
      />
      {errors.email && touched.email && (
        <p id={classes.errors}>{errors.email}</p>
      )}
      <input
        id={classes.styledInput}
        name="businessName"
        value={values.businessName}
        onChange={handleChange}
        onBlur={handleBlur}
        type="text"
        placeholder="Enter Business Name"
      />
      {errors.businessName && touched.businessName && (
        <p id={classes.errors}>{errors.businessName}</p>
      )}

      <input
        id={classes.styledInput}
        name="businessType"
        value={values.businessType}
        onChange={handleChange}
        onBlur={handleBlur}
        type="text"
        placeholder="Business Type"
      />
      {errors.businessType && touched.businessType && (
        <p id={classes.errors}>{errors.businessType}</p>
      )}

      <input
        id={classes.styledInput}
        name="gstUsername"
        value={values.gstUsername}
        onChange={handleChange}
        onBlur={handleBlur}
        type="text"
        placeholder="Enter GST Username"
      />
      {errors.gstUsername && touched.gstUsername && (
        <p className={classes.errors}>{errors.gstUsername}</p>
      )}

      <input
        id={classes.styledInput}
        name="gstPassword"
        value={values.gstPassword}
        onChange={handleChange}
        onBlur={handleBlur}
        type="password"
        placeholder="Enter GST Password"
      />
      {errors.gstPassword && touched.gstPassword && (
        <p className={classes.errors}>{errors.gstPassword}</p>
      )}

      <UploadCard
        nameArray={[
          {
            name: "Cash Book and Other Accounts",
            fieldName: "cashBookAndOtherAccounts",
            allowedMimeTypes: fileMimeType.documentsOnly,
            mandatory: true,
          },
          {
            name: "Creditors and Debitors List",
            fieldName: "creditorsAndDebitorsList",
            allowedMimeTypes: fileMimeType.documentsOnly,
            mandatory: true,
          },
          {
            name: "Bank Statement",
            fieldName: "bankStatement",
            allowedMimeTypes: fileMimeType.documentsOnly,
            mandatory: true,
          },
          {
            name: "GST Statement",
            fieldName: "gstStatement",
            allowedMimeTypes: fileMimeType.documentsOnly,
            mandatory: true,
          },
          {
            name: "Stock Details",
            fieldName: "stockDetails",
            allowedMimeTypes: fileMimeType.documentsOnly,
            mandatory: true,
          },
        ]}
        handleBlur={handleBlur}
        setFieldValue={setFieldValue}
      />

      <Button
        btnType="submit"
        btnName={isFormFilled ? "Submit" : "Please fill the form"}
        disabled={!isFormFilled}
      />
    </form>
  );
};

export default PreparationofFinancialStatement;
