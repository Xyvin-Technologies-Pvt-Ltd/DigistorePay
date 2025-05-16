import { useFormik } from "formik";
import { gstFilingSchema } from "../../../Validations/service_component_validations/tax_filing/taxFilingValidation";
import { toast } from "react-hot-toast";
import { fileMimeType } from "../../../data/filemimetype";
import UploadCard from "../../upload_card/UploadCard";
import Button from "../../button/Button";
import axios from "axios";
import classes from "./GstFiling.module.css";

const onSubmit = async (values) => {
  const formData = new FormData();
  formData.append("customerName", values.customerName);
  formData.append("phoneNumber", values.mobile);
  formData.append("email", values.email);
  formData.append("businessName", values.businessName);
  formData.append("gstNumber", values.gstNumber);
  formData.append("gstUsername", values.gstUsername);
  formData.append("gstPassword", values.gstPassword);
  formData.append("bills", values.uploadTheBills);

  try {
    const res = await axios.post("gst/gstFiling", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    if (res.data.errorcode) {
      toast.error(res.data.msg, { id: "gst" });
    } else {
      toast.success("GST Filing Submitted", { id: "gst" });
      resetForm();
    }
  } catch (error) {
    toast.error(error.response?.data?.message || "Something went wrong", {
      id: "gst",
    });
  }
};

const GstFiling = () => {
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
      gstNumber: "",
      gstUsername: "",
      gstPassword: "",
      uploadTheBills: "",
    },
    validationSchema: gstFilingSchema,
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
        name="gstNumber"
        value={values.gstNumber}
        onChange={handleChange}
        onBlur={handleBlur}
        type="text"
        placeholder="Enter GST Number"
      />
      {errors.gstNumber && touched.gstNumber && (
        <p id={classes.errors}>{errors.gstNumber}</p>
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

      <div className={classes.uploadContainer}>
        <UploadCard
          nameArray={[
            {
              name: "Upload the Bills in our Format",
              fieldName: "uploadTheBills",
              allowedMimeTypes: fileMimeType.documentsOnly,
              mandatory: true,
            },
          ]}
          handleBlur={handleBlur}
          setFieldValue={setFieldValue}
        />
        <a
          href="/path/to/your/format/file"
          download
          className={classes.downloadLink}
        >
          Download Format
        </a>
      </div>

      <Button
        btnType="submit"
        btnName={isFormFilled ? "Submit" : "Please fill the form"}
        disabled={!isFormFilled}
      />
    </form>
  );
};

export default GstFiling;
