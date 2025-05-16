import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import { nriPAnCardSchema } from "../../../Validations/service_component_validations/pan_card/PanCardValidation";
import { fileMimeType } from "../../../data/filemimetype";
import Button from "../../button/Button";
import UploadCard from "../../upload_card/UploadCard";
import axios from "axios";
import toast from "react-hot-toast";
import classes from "./NriPanCard.module.css";

const NriPanCard = ({ panType }) => {
  const [resetUpload, setResetUpload] = useState(false);
  const [commission, setCommission] = useState(250);
  const [commissionEarned, setCommissionEarned] = useState(commission - 150);

  useEffect(() => {
    if (commission > 150) {
      setCommissionEarned(commission - 150);
    } else {
      setCommissionEarned(0);
    }
  }, [commission]);

  const onSubmit = async (values) => {
    const formData = new FormData();
    formData.append("panType", panType);
    formData.append("customerName", values.customer_name);
    formData.append("email", values.email);
    formData.append("phoneNumber", values.mobile);
    formData.append("abroadAddress", values.nri_address);
    formData.append("fatherName", values.father_name);
    formData.append("proofOfIdentity", values.identity_proof);
    formData.append("proofOfDOB", values.birth_proof);
    formData.append("proofOfAddress", values.address_proof);
    formData.append("photo", values.photo);
    formData.append("signature", values.signature);
    formData.append("totalAmount", values.commission);
    try {
      const res = await axios.post(`/pancard/createPancard`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (res.data.errorcode) {
        toast.error(res.data.msg, {
          id: "nriPan",
        });
      } else {
        toast.success("NRI pancard application submitted", { id: "nriPan" });
      }
      resetForm();
      setResetUpload(true); // Trigger the reset for upload cards
      setTimeout(() => setResetUpload(false), 0); // Reset the flag
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong", {
        id: "nriPan",
      });
    }
  };

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
      panType: panType,
      customer_name: "",
      email: "",
      mobile: "",
      father_name: "",
      nri_address: "",
      identity_proof: null,
      birth_proof: null,
      address_proof: null,
      photo: null,
      signature: null,
      commission: 250,
    },
    validationSchema: nriPAnCardSchema,
    onSubmit,
    validateOnChange: true,
    validateOnBlur: true,
  });

  const handleCommissionChange = (e) => {
    const value = e.target.value === "" ? "" : Number(e.target.value);
    setCommission(value);
    setFieldValue("commission", value);
  };

  const isFormFilled = dirty && isValid;

  return (
    <form className={classes.form} onSubmit={handleSubmit}>
      <label htmlFor="customer_name" className={classes.serviceLabel}>
        Customer Name
      </label>
      <input
        className={classes.styledInput}
        name="customer_name"
        value={values.customer_name}
        onChange={handleChange}
        onBlur={handleBlur}
        type="text"
        placeholder="Customer Name"
        autoComplete="off"
      />
      {errors.customer_name && touched.customer_name && (
        <p className={classes.errors}>{errors.customer_name}</p>
      )}
      <label htmlFor="email" className={classes.serviceLabel}>
        Email ID
      </label>
      <input
        className={classes.styledInput}
        name="email"
        value={values.email}
        onChange={handleChange}
        onBlur={handleBlur}
        type="email"
        placeholder="Email ID"
        autoComplete="off"
      />
      {errors.email && touched.email && (
        <p className={classes.errors}>{errors.email}</p>
      )}
      <label htmlFor="mobile" className={classes.serviceLabel}>
        Mobile Number
      </label>
      <input
        className={classes.styledInput}
        name="mobile"
        value={values.mobile}
        onChange={handleChange}
        onBlur={handleBlur}
        type="number"
        placeholder="Mobile Number"
        autoComplete="off"
        onWheel={(e) => e.target.blur()}
      />
      {errors.mobile && touched.mobile && (
        <p className={classes.errors}>{errors.mobile}</p>
      )}
      <label htmlFor="father_name" className={classes.serviceLabel}>
        Father's Name
      </label>
      <input
        className={classes.styledInput}
        name="father_name"
        value={values.father_name}
        onChange={handleChange}
        onBlur={handleBlur}
        type="text"
        placeholder="Father's Name"
        autoComplete="off"
      />
      {errors.father_name && touched.father_name && (
        <p className={classes.errors}>{errors.father_name}</p>
      )}
      <label htmlFor="nri_address" className={classes.serviceLabel}>
        Abroad Address
      </label>
      <input
        className={classes.styledInput}
        name="nri_address"
        value={values.nri_address}
        onChange={handleChange}
        onBlur={handleBlur}
        type="text"
        placeholder="Abroad Address"
        autoComplete="off"
      />
      {errors.nri_address && touched.nri_address && (
        <p className={classes.errors}>{errors.nri_address}</p>
      )}

      <UploadCard
        nameArray={[
          {
            name: "Proof of Identity",
            description: "Aadhaar/Passport/OCI Card",
            fieldName: "identity_proof",
            allowedMimeTypes: fileMimeType.documentsAndImages,
            mandatory: true,
          },
        ]}
        handleBlur={handleBlur}
        setFieldValue={setFieldValue}
        fieldName="identity_proof"
        reset={resetUpload}
      />
      {errors.identity_proof && touched.identity_proof && (
        <p className={classes.errors}>{errors.identity_proof}</p>
      )}

      <UploadCard
        nameArray={[
          {
            name: "Proof of Birth ",
            description: "Aadhaar / Birth / Sslc / Passport",
            fieldName: "birth_proof",
            allowedMimeTypes: fileMimeType.documentsAndImages,
            mandatory: true,
          },
        ]}
        handleBlur={handleBlur}
        setFieldValue={setFieldValue}
        fieldName="birth_proof"
        reset={resetUpload}
      />
      {errors.birth_proof && touched.birth_proof && (
        <p className={classes.errors}>{errors.birth_proof}</p>
      )}

      <UploadCard
        nameArray={[
          {
            name: "Proof of Address",
            description: "Passport/OCI Card",
            fieldName: "address_proof",
            allowedMimeTypes: fileMimeType.documentsAndImages,
            mandatory: true,
          },
        ]}
        handleBlur={handleBlur}
        setFieldValue={setFieldValue}
        fieldName="address_proof"
        reset={resetUpload}
      />
      {errors.address_proof && touched.address_proof && (
        <p className={classes.errors}>{errors.address_proof}</p>
      )}
      <UploadCard
        nameArray={[
          {
            name: "Photo",
            description: "Photo of Applicant",
            fieldName: "photo",
            allowedMimeTypes: fileMimeType.imagesOnly,
            mandatory: true,
          },
        ]}
        handleBlur={handleBlur}
        setFieldValue={setFieldValue}
        fieldName="photo"
        reset={resetUpload}
      />
      {errors.photo && touched.photo && (
        <p className={classes.errors}>{errors.photo}</p>
      )}

      <UploadCard
        nameArray={[
          {
            name: "Signature",
            description: "Signature of Applicant",
            fieldName: "signature",
            allowedMimeTypes: fileMimeType.imagesOnly,
            mandatory: true,
          },
        ]}
        handleBlur={handleBlur}
        setFieldValue={setFieldValue}
        fieldName="signature"
        reset={resetUpload}
      />
      {errors.signature && touched.signature && (
        <p className={classes.errors}>{errors.signature}</p>
      )}
      <label className={classes.labelstyle}>Service Charge</label>
      <input
        className={classes.styledInput}
        name="commission"
        value={values.commission}
        onChange={handleCommissionChange}
        onBlur={handleBlur}
        placeholder="The total amount"
        type="number"
        autoComplete="off"
      />
      {errors.commission && touched.commission && (
        <p className={classes.errors}>{errors.commission}</p>
      )}

      <p className={classes.commission}>
        Commission Earned: {commissionEarned}
      </p>

      <Button
        btnType="submit"
        btnName={isFormFilled ? "Submit" : "Please fill the form"}
        disabled={!isFormFilled}
      />
    </form>
  );
};

export default NriPanCard;
