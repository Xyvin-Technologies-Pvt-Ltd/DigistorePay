import { useFormik } from "formik";
import { packingLicenseSchema } from "../../../Validations/service_component_validations/tax_filing/taxFilingValidation";
import { toast } from "react-hot-toast";
import { fileMimeType } from "../../../data/filemimetype";
import UploadCard from "../../upload_card/UploadCard";
import Button from "../../button/Button";
import axios from "axios";
import AdvertCard from "../../../components/advert_card/AdvertCard";
import mobile from "/assets/ad/mobile.jpeg";
import classes from "./PackingLicense.module.css";

const PackingLicense = () => {
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
      email: "",
      phoneNumber: "",
      panNumber: "",
      businessName: "",
      businessAddressLine1: "",
      businessAddressLine2: "",
      pinCode: "",
      listOfProducts: "",
      aadhaarFront: "",
      aadhaarBack: "",
      panCard: "",
      fssaiRegistrationCertificate: "",
      buildingTaxReceipt: "",
      rentAgreement: "",
      ownershipCertificate: "",
      selfDeclaration: "",
      photo: "",
      signature: "",
    },
    validationSchema: packingLicenseSchema,
    onSubmit: async (values) => {
      const formData = new FormData();

      formData.append("customerName", values.customerName);
      formData.append("email", values.email);
      formData.append("phoneNumber", values.phoneNumber);
      formData.append("panNumber", values.panNumber);
      formData.append("businessName", values.businessName);
      formData.append("businessAddressLine1", values.businessAddressLine1);
      formData.append("businessAddressLine2", values.businessAddressLine2);
      formData.append("pinCode", values.pinCode);
      formData.append("listOfProducts", values.listOfProducts);
      formData.append("aadhaarFront", values.aadhaarFront);
      formData.append("aadhaarBack", values.aadhaarBack);
      formData.append("panCard", values.panCard);
      formData.append(
        "fassaiRegistrationCertificate",
        values.fssaiRegistrationCertificate,
      );
      formData.append("buildingTaxReceipt", values.buildingTaxReceipt);
      formData.append("rentAgreement", values.rentAgreement);
      formData.append("ownershipCertificate", values.ownershipCertificate);
      formData.append("selfDeclaration", values.selfDeclaration);
      formData.append("photo", values.photo);
      formData.append("signature", values.signature);

      try {
        const response = await axios.post(
          "/packingLicenceRoute/packingLicence",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          },
        );
        if (response.data.errorcode) {
          toast.error(response.data.msg, {
            id: "packinglicence",
          });
        } else {
          toast.success("Packing Licence Submitted Successfully", {
            id: "packinglicence",
          });
        }
        resetForm();
      } catch (error) {
        console.log("error", error);
        toast.error(error.response?.data?.message || "Something went wrong");
      }
    },
  });
  const isFormFilled = dirty && isValid;
  return (
    <>
      <section className={classes.mainContainer}>
        <div className={classes.heading}>
          <p>Packing License </p>
        </div>
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
            name="phoneNumber"
            value={values.phoneNumber}
            onChange={handleChange}
            onBlur={handleBlur}
            type="number"
            onWheel={(e) => e.target.blur()}
            placeholder="Enter Phone Number"
          />
          {errors.phoneNumber && touched.phoneNumber && (
            <p id={classes.errors}>{errors.phoneNumber}</p>
          )}

          <input
            id={classes.styledInput}
            name="email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            type="text"
            placeholder="Enter email ID"
          />
          {errors.email && touched.email && (
            <p id={classes.errors}>{errors.email}</p>
          )}

          <input
            id={classes.styledInput}
            name="panNumber"
            value={values.panNumber}
            onChange={handleChange}
            onBlur={handleBlur}
            type="text"
            placeholder="Enter Pan Number"
          />
          {errors.panNumber && touched.panNumber && (
            <p id={classes.errors}>{errors.panNumber}</p>
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
            name="pinCode"
            value={values.pinCode}
            onChange={handleChange}
            onBlur={handleBlur}
            type="number"
            onWheel={(e) => e.target.blur()}
            placeholder="Enter Pincode"
          />
          {errors.pinCode && touched.pinCode && (
            <p id={classes.errors}>{errors.pinCode}</p>
          )}

          <input
            id={classes.styledInput}
            name="listOfProducts"
            value={values.listOfProducts}
            onChange={handleChange}
            onBlur={handleBlur}
            type="text"
            placeholder="Enter List of Products"
          />
          {errors.listOfProducts && touched.listOfProducts && (
            <p id={classes.errors}>{errors.listOfProducts}</p>
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
                name: "FSSAI Registration Certificate",
                fieldName: "fssaiRegistrationCertificate",
                allowedMimeTypes: fileMimeType.documentsOnly,
                mandatory: true,
              },
              {
                name: "Building Tax Receipt",
                fieldName: "buildingTaxReceipt",
                allowedMimeTypes: fileMimeType.documentsAndImages,
                mandatory: true,
              },
              {
                name: "Rent Agreement",
                fieldName: "rentAgreement",
                allowedMimeTypes: fileMimeType.documentsAndImages,
                mandatory: true,
              },
              {
                name: "Ownership Certificate",
                fieldName: "ownershipCertificate",
                allowedMimeTypes: fileMimeType.documentsAndImages,
                mandatory: true,
              },
              {
                name: "Self Declaration",
                fieldName: "selfDeclaration",
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
      </section>
      <div style={{ position: "relative" }}>
        <AdvertCard image={mobile} alt="waterAd" sticky={true} />
      </div>
    </>
  );
};

export default PackingLicense;
