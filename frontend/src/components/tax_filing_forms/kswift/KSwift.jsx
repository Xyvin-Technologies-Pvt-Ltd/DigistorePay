import { useFormik } from "formik";
import { kswiftSchema } from "../../../Validations/service_component_validations/tax_filing/taxFilingValidation";
import { toast } from "react-hot-toast";
import { fileMimeType } from "../../../data/filemimetype";
import Button from "../../button/Button";
import UploadCard from "../../upload_card/UploadCard";
import axios from "axios";
import classes from "./KSwift.module.css";

const onSubmit = async (values) => {
  const formData = new FormData();
  formData.append("customerName", values.customerName);
  formData.append("email", values.email);
  formData.append("phoneNumber", values.mobile);
  formData.append("businessName", values.businessName);
  formData.append("businessAddressLine1", values.businessAddressLine1);
  formData.append("businessAddressLine2", values.businessAddressLine2);
  formData.append("pinCode", values.pincode);
  formData.append("businessType", values.businessType);
  formData.append("aadhaarFront", values.aadhaarFront);
  formData.append("aadhaarBack", values.aadhaarBack);
  formData.append("signature", values.signature);

  try {
    const res = await axios.post("/kswift/kswiftBooking", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    if (res.data.errorcode) {
      toast.error(res.data.msg, { id: "kswift" });
    } else {
      toast.success("K-SWIFT Submitted", { id: "kswift" });
      resetForm();
    }
  } catch (error) {
    toast.error(error.response?.data?.message || "Something went wrong", {
      id: "kswift",
    });
  }
};

const KSwift = () => {
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
      businessAddressLine1: "",
      businessAddressLine2: "",
      pincode: "",
      businessType: "",
      aadhaarFront: null,
      aadhaarBack: null,
      signature: "",
    },
    validationSchema: kswiftSchema,
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
        name="businessAddressLine1"
        value={values.businessAddressLine1}
        onChange={handleChange}
        onBlur={handleBlur}
        type="text"
        placeholder="Enter Business Address Line 1"
      />
      {errors.businessAddressLine1 && touched.businessAddressLine1 && (
        <p id={classes.errors}>{errors.businessAddressLine1}</p>
      )}

      <input
        id={classes.styledInput}
        name="businessAddressLine2"
        value={values.businessAddressLine2}
        onChange={handleChange}
        onBlur={handleBlur}
        type="text"
        placeholder="Enter Business Address Line 2"
      />
      {errors.businessAddressLine2 && touched.businessAddressLine2 && (
        <p id={classes.errors}>{errors.businessAddressLine2}</p>
      )}

      <input
        id={classes.styledInput}
        name="pincode"
        value={values.pincode}
        onChange={handleChange}
        onBlur={handleBlur}
        type="number"
        placeholder="Enter Pin Code"
        onWheel={(e) => e.target.blur()}
      />
      {errors.pincode && touched.pincode && (
        <p id={classes.errors}>{errors.pincode}</p>
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

      <UploadCard
        nameArray={[
          {
            name: "Aadhaar Front",
            fieldName: "aadhaarFront",
            allowedMimeTypes: fileMimeType.documentsAndImages,
            mandatory: true,
          },
          {
            name: "Aadhaar Back",
            fieldName: "aadhaarBack",
            allowedMimeTypes: fileMimeType.documentsAndImages,
            mandatory: true,
          },
          {
            name: "Signature",
            fieldName: "signature",
            allowedMimeTypes: fileMimeType.imagesOnly,
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

export default KSwift;
