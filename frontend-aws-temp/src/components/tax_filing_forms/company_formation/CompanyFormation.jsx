import { useState, useEffect } from "react";
import { useFormik } from "formik";
import { companyFormationSchema } from "../../../Validations/service_component_validations/tax_filing/taxFilingValidation";
import { toast } from "react-hot-toast";
import { fileMimeType } from "../../../data/filemimetype";
import Button from "../../button/Button";
import UploadCard from "../../upload_card/UploadCard";
import axios from "axios";
import classes from "./CompanyFormation.module.css";

const CompanyFormation = () => {
  const [numberOfDirectors, setNumberOfDirectors] = useState();

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
      mobileNumber: "",
      email: "",
      businessType: "",
      businessName: "",
      businessAddressLine1: "",
      businessAddressLine2: "",
      shareHoldingDetails: "",
      numberOfDirectors: 0,
      directors: [],
      addressProof: "",
      bankStatement: "",
      NOC: "",
      educationDetails: "",
      rentAgreement: "",
    },
    validationSchema: companyFormationSchema,
    onSubmit: async (values) => {
      const formData = new FormData();

      formData.append("customerName", values.customerName);
      formData.append("phoneNumber", values.mobileNumber);
      formData.append("email", values.email);
      formData.append("businessType", values.businessType);
      formData.append("businessName", values.businessName);
      formData.append("businessAddressLine1", values.businessAddressLine1);
      formData.append("businessAddressLine2", values.businessAddressLine2);
      formData.append("numberOfDirectors", values.numberOfDirectors);
      formData.append("shareHoldingDetails", values.shareHoldingDetails);

      formData.append("addressProof", values.addressProof);
      formData.append("bankStatement", values.bankStatement);
      formData.append("NOC", values.NOC);
      formData.append("educationDetails", values.educationDetails);
      formData.append("rentAgreement", values.rentAgreement);

      values.directors.forEach((director, index) => {
        formData.append(`director${index + 1}photo`, director.photo);
        formData.append(`director${index + 1}panCard`, director.panCard);
        formData.append(`director${index + 1}signature`, director.signature);
        formData.append(
          `director${index + 1}aadhaarBack`,
          director.aadhaarBack,
        );
        formData.append(
          `director${index + 1}aadhaarFront`,
          director.aadhaarFront,
        );
        formData.append(
          `director${index + 1}addressProof`,
          director.directorsAddressProof,
        );
        formData.append(
          `director${index + 1}bankStatement`,
          director.bankStatement,
        );
        formData.append(
          `director${index + 1}digitalSignatureCertificate`,
          director.digitalSignatureCertificate,
        );
      });

      try {
        const response = await axios.post(
          "/companyFormationRoute/companyFormation",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          },
        );
        if (response.data.errorcode) {
          toast.error(response.data.msg, {
            id: "companyFormation",
          });
        } else {
          toast.success("Company Formation Submitted Successfully", {
            id: "companyFormation",
          });
        }
        resetForm();
      } catch (error) {
        toast.error(error?.response?.data?.message || "Something went wrong");
      }
    },
  });

  useEffect(() => {
    const updatedDirecors = Array.from(
      { length: numberOfDirectors },
      (_, i) => ({
        photo: "",
        panCard: "",
        signature: "",
        aadhaarBack: "",
        aadhaarFront: "",
        directorsAddressProof: "",
        bankStatement: "",
        digitalSignatureCertificate: "",
      }),
    );

    setFieldValue("directors", updatedDirecors);
    setFieldValue("numberOfDirectors", numberOfDirectors);
  }, [numberOfDirectors, setFieldValue]);

  const handleNumberOfDirectorsChange = (e) => {
    const value = parseInt(e.target.value);
    setNumberOfDirectors(value);
  };
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
        name="mobileNumber"
        value={values.mobileNumber}
        onChange={handleChange}
        onBlur={handleBlur}
        type="text"
        placeholder="Enter Mobile Number"
      />
      {errors.mobileNumber && touched.mobileNumber && (
        <p id={classes.errors}>{errors.mobileNumber}</p>
      )}

      <input
        id={classes.styledInput}
        name="email"
        value={values.email}
        onChange={handleChange}
        onBlur={handleBlur}
        type="email"
        placeholder="Enter Email Address"
      />
      {errors.email && touched.email && (
        <p id={classes.errors}>{errors.email}</p>
      )}

      <select
        className={classes.selectBType}
        name="businessType"
        value={values.businessType}
        onChange={handleChange}
        onBlur={handleBlur}
      >
        <option value="" disabled>
          Select Business Type
        </option>
        <option value="company">Company</option>
        <option value="partnership">Partnership</option>
        <option value="proprietary">Proprietary</option>
      </select>
      {errors.businessType && touched.businessType && (
        <p id={classes.errors}>{errors.businessType}</p>
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
        name="shareHoldingDetails"
        value={values.shareHoldingDetails}
        onChange={handleChange}
        onBlur={handleBlur}
        type="text"
        placeholder="Share Holding Details"
      />
      {errors.shareHoldingDetails && touched.shareHoldingDetails && (
        <p id={classes.errors}>{errors.shareHoldingDetails}</p>
      )}

      <UploadCard
        nameArray={[
          {
            name: "Address Proof",
            fieldName: "addressProof",
            allowedMimeTypes: fileMimeType.documentsAndImages,
            mandatory: true,
          },
          {
            name: "Bank Statement",
            fieldName: "bankStatement",
            allowedMimeTypes: fileMimeType.documentsOnly,
            mandatory: true,
          },
          {
            name: "NOC from Building Owner",
            fieldName: "NOC",
            allowedMimeTypes: fileMimeType.documentsAndImages,
            mandatory: true,
          },
          {
            name: "Education Details",
            fieldName: "educationDetails",
            allowedMimeTypes: fileMimeType.documentsOnly,
            mandatory: true,
          },
          {
            name: "Rent Agreement",
            fieldName: "rentAgreement",
            allowedMimeTypes: fileMimeType.documentsAndImages,
            mandatory: true,
          },
        ]}
        handleBlur={handleBlur}
        setFieldValue={setFieldValue}
      />

      <input
        id={classes.styledInput}
        value={numberOfDirectors}
        name="numberOfDirectors"
        onChange={handleNumberOfDirectorsChange}
        onBlur={handleBlur}
        onWheel={(e) => e.target.blur()}
        placeholder="Number of Directors"
        type="number"
      />
      {errors.numberOfDirectors && touched.numberOfDirectors && (
        <p id={classes.errors}>{errors.numberOfDirectors}</p>
      )}

      {numberOfDirectors > 0 &&
        values.directors.map((_, index) => (
          <div key={index}>
            <div className={classes.detailSection}>
              <p className={classes.detailHeadText}>
                Director {index + 1} Details
              </p>
            </div>
            <UploadCard
              nameArray={[
                {
                  name: "PAN Card",
                  fieldName: `directors[${index}].panCard`,
                  allowedMimeTypes: fileMimeType.documentsAndImages,
                  mandatory: true,
                },
                {
                  name: "Aadhaar Front",
                  fieldName: `directors[${index}].aadhaarFront`,
                  allowedMimeTypes: fileMimeType.documentsAndImages,
                  mandatory: true,
                },
                {
                  name: "Aadhaar Back",
                  fieldName: `directors[${index}].aadhaarBack`,
                  allowedMimeTypes: fileMimeType.documentsAndImages,
                  mandatory: true,
                },
                {
                  name: "Bank Statement",
                  fieldName: `directors[${index}].bankStatement`,
                  allowedMimeTypes: fileMimeType.documentsAndImages,
                  mandatory: true,
                },
                {
                  name: "Signature",
                  fieldName: `directors[${index}].signature`,
                  allowedMimeTypes: fileMimeType.imagesOnly,
                  mandatory: true,
                },
                {
                  name: "Photo",
                  fieldName: `directors[${index}].photo`,
                  allowedMimeTypes: fileMimeType.imagesOnly,
                  mandatory: true,
                },
                {
                  name: "Digital Signature Certificate",
                  fieldName: `directors[${index}].digitalSignatureCertificate`,
                  allowedMimeTypes: fileMimeType.documentsOnly,
                  mandatory: true,
                },
                {
                  name: "Address Proof (Utility Bill)",
                  fieldName: `directors[${index}].directorsAddressProof`,
                  allowedMimeTypes: fileMimeType.documentsOnly,
                  mandatory: true,
                },
              ]}
              handleBlur={handleBlur}
              setFieldValue={setFieldValue}
            />
          </div>
        ))}

      <Button
        btnType="submit"
        btnName={isFormFilled ? "Submit" : "Please fill the form"}
        disabled={!isFormFilled}
      />
    </form>
  );
};

export default CompanyFormation;
