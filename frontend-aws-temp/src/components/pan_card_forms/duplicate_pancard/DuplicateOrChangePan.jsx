import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import { duplicateOrChangePanCardSchema } from "../../../Validations/service_component_validations/pan_card/PanCardValidation";
import { fileMimeType } from "../../../data/filemimetype";
import Button from "../../button/Button";
import UploadCard from "../../upload_card/UploadCard";
import toast from "react-hot-toast";
import axios from "axios";
import classes from "./DuplicateOrChangePan.module.css";

const DuplicateOrChangePan = ({ panType }) => {
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
    formData.append("panNumber", values.pan_number);
    formData.append("fatherName", values.father_name);
    formData.append("aadhaarNumber", values.aadhaar_number);
    formData.append("isDuplicateOrChangePan", values.request_option);
    formData.append("reasonForDuplicate", values.reason_for_duplicate);
    formData.append("nameChange", values.new_name);
    formData.append("addressChange", values.new_address);
    formData.append("dobChange", values.new_date_of_birth);
    formData.append("changeFatherName", values.new_father);
    formData.append("aadhaarFront", values.aadhaar_front);
    formData.append("aadhaarBack", values.aadhaar_back);
    formData.append("photo", values.photo);
    formData.append("signature", values.signature);
    formData.append("proofOfAddress", values.address_proof);
    formData.append("proofOfDOB", values.birth_proof);
    formData.append("totalAmount", values.commission);

    try {
      const res = await axios.post("/pancard/createPancard", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (res.data.errorcode) {
        toast.error(res.data.msg, { id: "duplicateOrChange" });
      } else {
        toast.success(
          `${
            values.request_option.charAt(0).toUpperCase() +
            values.request_option.slice(1)
          } Application Submitted`,
          {
            id: "duplicateOrChange",
          }
        );
      }
      resetForm();
      setResetUpload(true);
      setTimeout(() => setResetUpload(false), 0);
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong", {
        id: "duplicateOrChange",
      });
    }
  };

  const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
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
      pan_number: "",
      father_name: "",
      aadhaar_number: "",
      request_option: "",
      reason_for_duplicate: "",
      change_name: false,
      new_name: "",
      change_address: false,
      new_address: "",
      change_date_of_birth: false,
      new_date_of_birth: "",
      change_father: false,
      new_father: "",
      photo: null,
      signature: null,
      aadhaar_front: null,
      aadhaar_back: null,
      birth_proof: null,
      address_proof: null,
      commission: 250,
    },
    validationSchema: duplicateOrChangePanCardSchema,
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
      <label htmlFor="pan_number" className={classes.serviceLabel}>
        PAN Number
      </label>
      <input
        className={classes.styledInput}
        name="pan_number"
        value={values.pan_number}
        onChange={handleChange}
        onBlur={handleBlur}
        type="text"
        placeholder="PAN Number"
        autoComplete="off"
      />
      {errors.pan_number && touched.pan_number && (
        <p className={classes.errors}>{errors.pan_number}</p>
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
        onWheel={(e) => e.target.blur()}
        placeholder="Aadhaar Number"
        autoComplete="off"
      />
      {errors.aadhaar_number && touched.aadhaar_number && (
        <p className={classes.errors}>{errors.aadhaar_number}</p>
      )}

      <div className={classes.dropdownContainer}>
        <select
          name="request_option"
          className={classes.dropdown}
          value={values.request_option}
          onChange={handleChange}
          onBlur={handleBlur}
        >
          <option value="" disabled>
            Choose Your Service ?
          </option>
          <option value="duplicate">Duplicate</option>
          <option value="change">Change</option>
        </select>
      </div>

      {errors.request_option && touched.request_option && (
        <p className={classes.errors}>{errors.request_option}</p>
      )}

      {values.request_option === "duplicate" && (
        <>
          <label
            htmlFor="reason_for_duplicate"
            className={classes.serviceLabel}
          >
            Reason for Duplicate
          </label>
          <input
            className={classes.styledInput}
            name="reason_for_duplicate"
            value={values.reason_for_duplicate}
            onChange={handleChange}
            onBlur={handleBlur}
            type="text"
            placeholder="Reason for Duplicate"
            autoComplete="off"
          />
          {errors.reason_for_duplicate && touched.reason_for_duplicate && (
            <p className={classes.errors}>{errors.reason_for_duplicate}</p>
          )}
        </>
      )}

      {values.request_option === "change" && (
        <>
          <label className={classes.labelOption}>
            Change Name
            <input
              className={classes.checkBoxButton}
              type="checkbox"
              name="change_name"
              checked={values.change_name}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </label>
          {values.change_name && (
            <>
              <input
                className={classes.styledInput}
                name="new_name"
                value={values.new_name}
                onChange={handleChange}
                onBlur={handleBlur}
                type="text"
                placeholder="Enter the New Name"
                autoComplete="off"
              />
              {errors.new_name && touched.new_name && (
                <p className={classes.errors}>{errors.new_name}</p>
              )}
            </>
          )}

          <label className={classes.labelOption}>
            Change Address
            <input
              className={classes.checkBoxButton}
              type="checkbox"
              name="change_address"
              checked={values.change_address}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </label>
          {values.change_address && (
            <>
              <input
                className={classes.styledInput}
                name="new_address"
                value={values.new_address}
                onChange={handleChange}
                onBlur={handleBlur}
                type="text"
                placeholder="Enter the New Address"
                autoComplete="off"
              />
              {errors.new_address && touched.new_address && (
                <p className={classes.errors}>{errors.new_address}</p>
              )}
            </>
          )}

          <label className={classes.labelOption}>
            Change Date of Birth
            <input
              className={classes.checkBoxButton}
              type="checkbox"
              name="change_date_of_birth"
              checked={values.change_date_of_birth}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </label>
          {values.change_date_of_birth && (
            <>
              <input
                className={classes.styledInput}
                name="new_date_of_birth"
                value={values.new_date_of_birth}
                onChange={handleChange}
                onBlur={handleBlur}
                type="date"
              />
              {errors.new_date_of_birth && touched.new_date_of_birth && (
                <p className={classes.errors}>{errors.new_date_of_birth}</p>
              )}
            </>
          )}

          <label className={classes.labelOption}>
            Change Father Name
            <input
              className={classes.checkBoxButton}
              type="checkbox"
              name="change_father"
              checked={values.change_father}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </label>
          {values.change_father && (
            <>
              <input
                className={classes.styledInput}
                name="new_father"
                value={values.new_father}
                onChange={handleChange}
                onBlur={handleBlur}
                type="text"
                placeholder="Updated Father Name"
                autoComplete="off"
              />
              {errors.new_father && touched.new_father && (
                <p className={classes.errors}>{errors.new_father}</p>
              )}
            </>
          )}
        </>
      )}
      <UploadCard
        nameArray={[
          {
            name: "Aadhaar Front",
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
            name: "Aadhaar Back",
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
            name: "Proof of Birth",
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

export default DuplicateOrChangePan;
