import { useFormik } from "formik";
import { fssaiRegistrationSchema } from "../../../Validations/service_component_validations/tax_filing/taxFilingValidation";
import { toast } from "react-hot-toast";
import { fileMimeType } from "../../../data/filemimetype";
import Button from "../../button/Button";
import UploadCard from "../../upload_card/UploadCard";
import axios from "axios";
import classes from "./FssaiRegistration.module.css";

const onSubmit = async (values) => {
  const formData = new FormData();
  formData.append("customerName", values.customerName);
  formData.append("email", values.email);
  formData.append("phoneNumber", values.mobile);
  formData.append("businessName", values.businessName);
  formData.append("businessAddressLine1", values.businessAddressLine1);
  formData.append("businessAddressLine2", values.businessAddressLine2);
  formData.append("pinCode", values.pincode);
  formData.append("productsOrItems", values.products);
  formData.append("circleOfTheUnit", values.circle);
  formData.append("aadhaarFront", values.aadhaarFront);
  formData.append("aadhaarBack", values.aadhaarBack);
  formData.append("panPic", values.panCard);
  formData.append("photo", values.photo);
  formData.append("waterTestPaper", values.waterTestPaper);

  try {
    const res = await axios.post("fssai/fssaiRegistration", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    if (res.data.errorcode) {
      toast.error(res.data.msg, { id: "fssai" });
    } else {
      toast.success("FSSAI Registration Submitted", { id: "fssai" });
      resetForm();
    }
  } catch (error) {
    console.log(error);
    toast.error(error?.response?.data?.message || "Something went wrong", {
      id: "fssai",
    });
  }
};

const FssaiRegistration = () => {
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
      products: "",
      circle: "",
      aadhaarFront: null,
      aadhaarBack: null,
      panCard: null,
      photo: null,
      waterTestPaper: null,
    },
    validationSchema: fssaiRegistrationSchema,
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
        placeholder="Enter Pincode"
        onWheel={(e) => e.target.blur()}
      />
      {errors.pincode && touched.pincode && (
        <p id={classes.errors}>{errors.pincode}</p>
      )}

      <input
        id={classes.styledInput}
        name="products"
        value={values.products}
        onChange={handleChange}
        onBlur={handleBlur}
        type="text"
        placeholder="Products/Items"
      />
      {errors.products && touched.products && (
        <p id={classes.errors}>{errors.products}</p>
      )}

      <input
        id={classes.styledInput}
        name="circle"
        value={values.circle}
        onChange={handleChange}
        onBlur={handleBlur}
        type="text"
        placeholder="Circle of the Unit"
      />
      {errors.circle && touched.circle && (
        <p id={classes.errors}>{errors.circle}</p>
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
            name: "PAN Card",
            fieldName: "panCard",
            allowedMimeTypes: fileMimeType.documentsAndImages,
            mandatory: true,
          },
          {
            name: "Photo",
            fieldName: "photo",
            allowedMimeTypes: fileMimeType.imagesOnly,
            mandatory: true,
          },
          {
            name: "Water Test Paper",
            fieldName: "waterTestPaper",
            allowedMimeTypes: fileMimeType.documentsAndImages,
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

export default FssaiRegistration;
