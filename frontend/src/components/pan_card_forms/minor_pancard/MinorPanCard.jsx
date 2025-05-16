import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import { fileMimeType } from "../../../data/filemimetype";
import Button from "../../button/Button";
import UploadCard from "../../upload_card/UploadCard";
import classes from "./MinorPanCard.module.css";

import { minorPAnCardSchema } from "../../../Validations/service_component_validations/pan_card/PanCardValidation";
import toast from "react-hot-toast";
import axios from "axios";
const MinorPanCard = ({ panType }) => {
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
    formData.append("fatherName", values.father_name);
    formData.append("representativeName", values.reprentative_assessee);
    formData.append(
      "representativeRelation",
      values.reprentative_assessee_relation
    );
    formData.append("proofOfDOB", values.birth_proof);
    formData.append("proofOfAddress", values.address_proof);
    formData.append("aadhaarNumber", values.aadhaar_number);
    formData.append(
      "representativeAadhaarFront",
      values.representative_aadhaar_front
    );
    formData.append(
      "representativeAadhaarBack",
      values.representative_aadhaar_back
    );
    formData.append("representativeSignature", values.signature);
    formData.append("totalAmount", values.commission);
    formData.append("aadhaarFront", values.aadhaar_front);
    formData.append("aadhaarBack", values.aadhaar_back);
    try {
      const res = await axios.post(`/pancard/createPancard`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (res.data.errorcode) {
        toast.error(res.data.msg, {
          id: "minorPan",
        });
      } else {
        toast.success("Minor Pan application submitted", { id: "minorPan" });
      }
      resetForm();
      setResetUpload(true);
      setTimeout(() => setResetUpload(false), 0);
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong", {
        id: "minorPan",
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
      aadhaar_number: "",
      reprentative_assessee: "",
      reprentative_assessee_relation: "",
      birth_proof: null,
      address_proof: null,
      aadhaar_front: null,
      aadhaar_back: null,
      representative_aadhaar_front: null,
      representative_aadhaar_back: null,
      signature: null,
      commission: 250,
    },
    validationSchema: minorPAnCardSchema,
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
        placeholder="Phone Number"
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
      <label htmlFor="aadhaar_number" className={classes.serviceLabel}>
        Aadhaar Number
      </label>
      <input
        className={classes.styledInput}
        name="aadhaar_number"
        value={values.aadhaar_number}
        onChange={handleChange}
        onBlur={handleBlur}
        type="number"
        placeholder="Aadhaar number"
        autoComplete="off"
      />
      {errors.aadhaar_number && touched.aadhaar_number && (
        <p className={classes.errors}>{errors.aadhaar_number}</p>
      )}
      <label htmlFor="reprentative_assessee" className={classes.serviceLabel}>
        Representative Assessee Name
      </label>
      <input
        className={classes.styledInput}
        name="reprentative_assessee"
        value={values.reprentative_assessee}
        onChange={handleChange}
        onBlur={handleBlur}
        type="text"
        placeholder="Representative Assessee Name"
        autoComplete="off"
      />
      {errors.reprentative_assessee && touched.reprentative_assessee && (
        <p className={classes.errors}>{errors.reprentative_assessee}</p>
      )}
      <label
        htmlFor="reprentative_assessee_relation"
        className={classes.serviceLabel}
      >
        Representative Assessee Relation
      </label>
      <input
        className={classes.styledInput}
        name="reprentative_assessee_relation"
        value={values.reprentative_assessee_relation}
        onChange={handleChange}
        onBlur={handleBlur}
        type="text"
        placeholder="Representative Assessee Relation"
        autoComplete="off"
      />
      {errors.reprentative_assessee_relation &&
        touched.reprentative_assessee_relation && (
          <p className={classes.errors}>
            {errors.reprentative_assessee_relation}
          </p>
        )}

      <UploadCard
        nameArray={[
          {
            name: "Aadhar Front",
            description: "Aadhaar Front",
            fieldName: "aadhaar_front",
            allowedMimeTypes: fileMimeType.documentsAndImages,
            mandatory: true,
          },
        ]}
        handleBlur={handleBlur}
        setFieldValue={setFieldValue}
        fieldName="aadhaar_front"
        reset={resetUpload}
      />
      {errors.aadhaar_front && touched.aadhaar_front && (
        <p className={classes.errors}>{errors.aadhaar_front}</p>
      )}

      <UploadCard
        nameArray={[
          {
            name: "Aadhar Back",
            description: "Aadhaar Back",
            fieldName: "aadhaar_back",
            allowedMimeTypes: fileMimeType.documentsAndImages,
            mandatory: true,
          },
        ]}
        handleBlur={handleBlur}
        setFieldValue={setFieldValue}
        fieldName="aadhaar_back"
        reset={resetUpload}
      />
      {errors.aadhaar_back && touched.aadhaar_back && (
        <p className={classes.errors}>{errors.aadhaar_back}</p>
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
            description: "Aadhaar",
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
            name: "Representative Assessees Aadhaar Front",
            description: " Representative Assessees Aadhaar Front",
            fieldName: "representative_aadhaar_front",
            allowedMimeTypes: fileMimeType.documentsAndImages,
            mandatory: true,
          },
        ]}
        handleBlur={handleBlur}
        setFieldValue={setFieldValue}
        fieldName="representative_aadhaar_front"
        reset={resetUpload}
      />
      {errors.representative_aadhaar_front &&
        touched.representative_aadhaar_front && (
          <p className={classes.errors}>
            {errors.representative_aadhaar_front}
          </p>
        )}

      <UploadCard
        nameArray={[
          {
            name: "Representative Assessees Aadhaar Back",
            description: "Representative Assessees Aadhaar Back",
            fieldName: "representative_aadhaar_back",
            allowedMimeTypes: fileMimeType.documentsAndImages,
            mandatory: true,
          },
        ]}
        handleBlur={handleBlur}
        setFieldValue={setFieldValue}
        fieldName="representative_aadhaar_back"
        reset={resetUpload}
      />
      {errors.representative_aadhaar_back &&
        touched.representative_aadhaar_back && (
          <p className={classes.errors}>{errors.representative_aadhaar_back}</p>
        )}
      <UploadCard
        nameArray={[
          {
            name: "Signature",
            description: " Representative Assessees Signature",
            fieldName: "signature",
            allowedMimeTypes: fileMimeType.documentsAndImages,
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

export default MinorPanCard;
