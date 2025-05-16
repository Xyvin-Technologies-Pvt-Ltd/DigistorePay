import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import { partnershipDeedPreparationSchema } from "../../../Validations/service_component_validations/tax_filing/taxFilingValidation";
import { fileMimeType } from "../../../data/filemimetype";
import UploadCard from "../../upload_card/UploadCard";
import Button from "../../button/Button";
import axios from "axios";
import toast from "react-hot-toast";
import classes from "./PartnershipDeedPreparation.module.css";

const PartnershipDeedPreparation = () => {
  const [numOfPartners, setNumOfPartners] = useState();

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
      customer_name: "",
      mobile: "",
      email: "",
      business_name: "",
      business_address: "",
      numOfPartners: 0,
      partners: [],
      bankAmountStatement: "",
      rentOrLeaseAgreement: "",
      latestPropertyTax: "",
      LandTaxRecipt: "",
    },
    validationSchema: partnershipDeedPreparationSchema,
    onSubmit: async (values) => {
      const formData = new FormData();

      formData.append("customerName", values.customer_name);
      formData.append("email", values.email);
      formData.append("phoneNumber", values.mobile);
      formData.append("businessName", values.business_name);
      formData.append("businessAddress", values.business_address);
      formData.append("numberOfPartners", values.numOfPartners);

      formData.append("bankAmountStatement", values.bankAmountStatement);
      formData.append("rentOrLeaseAgreement", values.rentOrLeaseAgreement);
      formData.append("latestPropertyTax", values.latestPropertyTax);
      formData.append("LandTaxRecipt", values.LandTaxRecipt);

      values.partners.forEach((partner, index) => {
        formData.append(`partner${index + 1}panCard`, partner.panCard);
        formData.append(
          `partner${index + 1}aadhaarFront`,
          partner.aadhaarcard_front,
        );
        formData.append(
          `partner${index + 1}aadhaarBack`,
          partner.aadhaarcard_back,
        );
        formData.append(`partner${index + 1}photo`, partner.photo);
        formData.append(`partner${index + 1}signature`, partner.signature);
        formData.append(
          `partner${index + 1}addressLine1`,
          partner.addressline1,
        );
        formData.append(
          `partner${index + 1}addressLine2`,
          partner.addressline2,
        );
      });

      try {
        const response = await axios.post(
          "/partnerShipDeedPreperationRoute/partnerShipDeedPreperation",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          },
        );
        if (response.data.errorcode) {
          toast.error(response.data.msg, {
            id: "partnershipDeedPreparation",
          });
        } else {
          toast.success("Partnership Deed Preparation Submitted Successfully", {
            id: "partnershipDeedPreparation",
          });
        }
        resetForm();
      } catch (error) {
        toast.error(error.response?.data?.message || "Something went wrong");
      }
    },
  });

  useEffect(() => {
    const updatedPartners = Array.from({ length: numOfPartners }, (_, i) => ({
      panCard: "",
      aadhaarcard_front: "",
      aadhaarcard_back: "",
      photo: "",
      signature: "",
      addressline1: "",
      addressline2: "",
    }));

    setFieldValue("partners", updatedPartners);
    setFieldValue("numOfPartners", numOfPartners);
  }, [numOfPartners, setFieldValue]);

  const handlenumOfPartnersChange = (e) => {
    const value = parseInt(e.target.value);
    setNumOfPartners(value);
  };
  const isFormFilled = dirty && isValid;
  return (
    <section className={classes.mainContainer}>
      <form className={classes.form} onSubmit={handleSubmit}>
        <input
          id={classes.styledInput}
          name="customer_name"
          value={values.customer_name}
          onChange={handleChange}
          onBlur={handleBlur}
          type="text"
          placeholder="Enter Customer Name"
        />
        {errors.customer_name && touched.customer_name && (
          <p id={classes.errors}>{errors.customer_name}</p>
        )}

        <input
          id={classes.styledInput}
          name="mobile"
          value={values.mobile}
          onChange={handleChange}
          onBlur={handleBlur}
          type="number"
          onWheel={(e) => e.target.blur()}
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
          name="business_name"
          value={values.business_name}
          onChange={handleChange}
          onBlur={handleBlur}
          type="text"
          placeholder="Enter Business Name"
        />
        {errors.business_name && touched.business_name && (
          <p id={classes.errors}>{errors.business_name}</p>
        )}

        <input
          id={classes.styledInput}
          name="business_address"
          value={values.business_address}
          onChange={handleChange}
          onBlur={handleBlur}
          type="text"
          placeholder="Enter Business Address"
        />
        {errors.business_address && touched.business_address && (
          <p id={classes.errors}>{errors.business_address}</p>
        )}

        <UploadCard
          nameArray={[
            {
              name: "Bank account statement",
              fieldName: "bankAmountStatement",
              allowedMimeTypes: fileMimeType.documentsAndImages,
              mandatory: true,
            },
            {
              name: "Rent/lease agreement",
              fieldName: "rentOrLeaseAgreement",
              allowedMimeTypes: fileMimeType.documentsAndImages,
              mandatory: true,
            },
            {
              name: "Latest property tax",
              fieldName: "latestPropertyTax",
              allowedMimeTypes: fileMimeType.documentsOnly,
              mandatory: true,
            },
            {
              name: "Land tax reciept",
              fieldName: "LandTaxRecipt",
              allowedMimeTypes: fileMimeType.documentsOnly,
              mandatory: true,
            },
          ]}
          handleBlur={handleBlur}
          setFieldValue={setFieldValue}
        />

        <input
          id={classes.styledInput}
          name="numOfPartners"
          type="number"
          value={numOfPartners}
          onChange={handlenumOfPartnersChange}
          onWheel={(e) => e.target.blur()}
          className={classes.numOfPartnersInput}
          placeholder="Enter number of partners"
        />
        {errors.numOfPartners && touched.numOfPartners && (
          <p id={classes.errors}>{errors.numOfPartners}</p>
        )}

        {numOfPartners > 0 &&
          values.partners.map((_, index) => (
            <div key={index} className={classes.partnerSection}>
              <div className={classes.detailSection}>
                <p className={classes.detailHeadText}>
                  Partner {index + 1} Details
                </p>
              </div>

              <UploadCard
                nameArray={[
                  {
                    name: "PAN Card",
                    fieldName: `partners[${index}].panCard`,
                    allowedMimeTypes: fileMimeType.documentsAndImages,
                    mandatory: true,
                  },
                  {
                    name: "Aadhaar Card Front",
                    fieldName: `partners[${index}].aadhaarcard_front`,
                    allowedMimeTypes: fileMimeType.documentsAndImages,
                    mandatory: true,
                  },
                  {
                    name: "Aadhaar Card Back",
                    fieldName: `partners[${index}].aadhaarcard_back`,
                    allowedMimeTypes: fileMimeType.documentsAndImages,
                    mandatory: true,
                  },
                  {
                    name: "Photograph",
                    fieldName: `partners[${index}].photo`,
                    allowedMimeTypes: fileMimeType.imagesOnly,
                    mandatory: true,
                  },
                  {
                    name: "Signature",
                    fieldName: `partners[${index}].signature`,
                    allowedMimeTypes: fileMimeType.imagesOnly,
                    mandatory: true,
                  },
                ]}
                handleBlur={handleBlur}
                setFieldValue={setFieldValue}
              />

              <input
                id={classes.styledInput}
                name={`partners[${index}].addressline1`}
                value={values.partners[index]?.addressline1 || ""}
                onChange={handleChange}
                onBlur={handleBlur}
                type="text"
                placeholder="Enter Address Line 1"
              />
              {errors.partners &&
                errors.partners[index]?.addressline1 &&
                touched.partners &&
                touched.partners[index]?.addressline1 && (
                  <p id={classes.errors}>
                    {errors.partners[index]?.addressline1}
                  </p>
                )}

              <input
                id={classes.styledInput}
                name={`partners[${index}].addressline2`}
                value={values.partners[index]?.addressline2 || ""}
                onChange={handleChange}
                onBlur={handleBlur}
                type="text"
                placeholder="Enter Address Line 2"
              />
              {errors.partners &&
                errors.partners[index]?.addressline2 &&
                touched.partners &&
                touched.partners[index]?.addressline2 && (
                  <p id={classes.errors}>
                    {errors.partners[index]?.addressline2}
                  </p>
                )}
            </div>
          ))}

        <Button
          btnType="submit"
          btnName={isFormFilled ? "Submit" : "Please fill the form"}
          disabled={!isFormFilled}
        />
      </form>
    </section>
  );
};

export default PartnershipDeedPreparation;
