import { useFormik } from "formik";
import { gstRegistrationSchema } from "../../../Validations/service_component_validations/tax_filing/taxFilingValidation";
import { toast } from "react-hot-toast";
import { fileMimeType } from "../../../data/filemimetype";
import Button from "../../button/Button";
import UploadCard from "../../upload_card/UploadCard";
import axios from "axios";
import classes from "./GstRegistration.module.css";

const onSubmit = async (values) => {
  const formData = new FormData();
  formData.append("customerName", values.customerName);
  formData.append("email", values.customerEmail);
  formData.append("phoneNumber", values.mobile);
  formData.append("businessName", values.businessName);
  formData.append("businessAddressLine1", values.businessAddress1);
  formData.append("businessAddressLine2", values.businessAddress2);
  formData.append("pinCode", values.pincode);
  formData.append("building", values.building);
  formData.append("shopLatitude", values.latitude);
  formData.append("shopLongitude", values.longitude);
  formData.append("panPic", values.panCard);
  formData.append("aadhaarFront", values.aadhaarFront);
  formData.append("aadhaarBack", values.aadhaarBack);
  formData.append("buildingTaxReceipt", values.buildingTaxReceipt);
  formData.append("rentAgreement", values.rentAgreement);
  formData.append("landTaxReceipt", values.landTaxReceipt);
  formData.append("bankDetails", values.bankDetails);
  formData.append("photo", values.passportSizePhoto);
  formData.append("residenceLatitude", values.residenceLatitude);
  formData.append("residenceLongitude", values.residenceLongitude);
  formData.append("typeOfBusiness", values.businessType);
  formData.append("noOfPartners", values.numPartners);
  formData.append("noOfDirectors", values.numDirectors);

  values.partners.forEach((partner, index) => {
    formData.append(`partner${index + 1}photo`, partner.photo);
    formData.append(`partner${index + 1}panPic`, partner.panCard);
    formData.append(`partner${index + 1}aadhaarFront`, partner.aadhaarFront);
    formData.append(`partner${index + 1}aadhaarBack`, partner.aadhaarBack);

    formData.append(`partner${index + 1}addressLine1`, partner.addressline1);
    formData.append(`partner${index + 1}addressLine2`, partner.addressline2);
    formData.append(`partner${index + 1}pinCode`, partner.pincode);
    formData.append(`partner${index + 1}latitude`, partner.partnerLatitude);
    formData.append(`partner${index + 1}longitude`, partner.partnerLongitude);
  });

  formData.append("partnershipDeed", values.partnershipDeed);
  formData.append(
    "noObjectionCertificate",
    values.noObjectionCertificatePartner
  );
  formData.append("rentAgreement", values.rentAgreementPartner);
  formData.append("propertyTaxReceipt", values.propertyTaxReceiptPartner);
  formData.append("bankDetails", values.bankDetailsPartner);
  formData.append("landTaxReceipt", values.landTaxReceiptPartner);

  values.partners.forEach((director, index) => {
    formData.append(`director${index + 1}panPic`, director.panCard);
    formData.append(`director${index + 1}photo`, director.photo);
    formData.append(`director${index + 1}aadhaarFront`, director.aadhaarFront);
    formData.append(`director${index + 1}aadhaarBack`, director.aadhaarBack);
    formData.append(`director${index + 1}latitude`, director.latitude);
    formData.append(`director${index + 1}longitude`, director.longitude);
    formData.append(`director${index + 1}pinCode`, director.pin);
  });
  formData.append("incorporationCertificate", values.incorporationCertificate);
  formData.append("noObjectionCertificate", values.noObjectionCertificate);
  formData.append("rentAgreementCompany", values.rentAgreement);
  formData.append("propertyTaxReceipt", values.propertyTaxReceipt);
  formData.append("landTaxReceiptCompany", values.landTaxReceipt);

  try {
    const res = await axios.post("/gst/gstRegistrations", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    if (res.data.errorcode) {
      toast.error(res.data.msg, { id: "gst" });
    } else {
      toast.success("GST Registration Submitted", { id: "gst" });
      resetForm();
    }
  } catch (error) {
    toast.error(error.response?.data?.message || "Something went wrong", {
      id: "gst",
    });
  }
};

const GstRegistration = () => {
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
      customerEmail: "",
      mobile: "",
      businessName: "",
      businessAddress1: "",
      businessAddress2: "",
      pincode: "",
      building: "",
      latitude: "",
      longitude: "",
      businessType: "",

      numPartners: 1,
      partners: [
        {
          photo: null,
          panCard: null,
          aadhaarFront: null,
          aadhaarBack: null,
          addressLine1: "",
          addressLine2: "",
          pincode: "",
          partnerLatitude: "",
          partnerLongitude: "",
        },
      ],
      panCard: null,
      aadhaarFront: null,
      aadhaarBack: null,
      buildingTaxReceipt: null,
      rentAgreement: null,
      passportSizePhoto: null,
      bankDetails: null,
      landTaxReceipt: null,
      residenceLatitude: "",
      residenceLongitude: "",
      partnershipDeed: null,
      noObjectionCertificatePartner: null,
      rentAgreementPartner: null,
      propertyTaxReceiptPartner: null,
      bankDetailsPartner: null,
      landTaxReceiptPartner: null,
      shopLatitude: "",
      shopLongitude: "",
      numDirectors: 1,
      directors: [
        {
          panCardDirector: null,
          photoDirector: null,
          aadhaarFrontDirector: null,
          aadhaarBackDirector: null,
          pinDirector: "",
          directorlatitude: "",
          directorlongitude: "",
        },
      ],

      incorporationCertificate: null,
      noObjectionCertificate: null,
      rentAgreementCompany: null,
      propertyTaxReceipt: null,
      landTaxReceiptCompany: null,
    },
    validationSchema: gstRegistrationSchema,
    onSubmit,
  });

  const handleNumPartnersChange = (e) => {
    const numPartners = parseInt(e.target.value, 10);
    setFieldValue("numPartners", numPartners);
    const newPartners = [...values.partners];
    while (newPartners.length < numPartners) {
      newPartners.push({
        photo: null,
        panCard: null,
        aadhaarFront: null,
        aadhaarBack: null,
        addressLine1: "",
        addressLine2: "",
        pincode: "",
        partnerLatitude: "",
        partnerLongitude: "",
      });
    }
    while (newPartners.length > numPartners) {
      newPartners.pop();
    }
    setFieldValue("partners", newPartners);
  };

  const handleNumDirectorsChange = (e) => {
    const numDirectors = parseInt(e.target.value, 10);
    setFieldValue("numDirectors", numDirectors);
    const newDirectors = [...values.directors];
    while (newDirectors.length < numDirectors) {
      newDirectors.push({
        panCardDirector: null,
        pinDirector: "",
        photoDirector: null,
        aadhaarFrontDirector: null,
        aadhaarBackDirector: null,
        directorlatitude: "",
        directorlongitude: "",
      });
    }
    while (newDirectors.length > numDirectors) {
      newDirectors.pop();
    }
    setFieldValue("directors", newDirectors);
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
        name="customerEmail"
        value={values.customerEmail}
        onChange={handleChange}
        onBlur={handleBlur}
        type="email"
        placeholder="Enter Email ID"
      />
      {errors.customerEmail && touched.customerEmail && (
        <p id={classes.errors}>{errors.customerEmail}</p>
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
        name="businessAddress1"
        value={values.businessAddress1}
        onChange={handleChange}
        onBlur={handleBlur}
        type="text"
        placeholder="Business Address Line 1"
      />
      {errors.businessAddress1 && touched.businessAddress1 && (
        <p id={classes.errors}>{errors.businessAddress1}</p>
      )}

      <input
        id={classes.styledInput}
        name="businessAddress2"
        value={values.businessAddress2}
        onChange={handleChange}
        onBlur={handleBlur}
        type="text"
        placeholder="Business Address Line 2"
      />
      {errors.businessAddress2 && touched.businessAddress2 && (
        <p id={classes.errors}>{errors.businessAddress2}</p>
      )}

      <input
        id={classes.styledInput}
        name="pincode"
        value={values.pincode}
        onChange={handleChange}
        onBlur={handleBlur}
        type="number"
        placeholder="Pincode"
        onWheel={(e) => e.target.blur()}
      />
      {errors.pincode && touched.pincode && (
        <p id={classes.errors}>{errors.pincode}</p>
      )}

      <input
        id={classes.styledInput}
        name="latitude"
        value={values.latitude}
        onChange={handleChange}
        onBlur={handleBlur}
        type="number"
        placeholder="Shop Latitude"
        onWheel={(e) => e.target.blur()}
      />
      {errors.latitude && touched.latitude && (
        <p id={classes.errors}>{errors.latitude}</p>
      )}

      <input
        id={classes.styledInput}
        name="longitude"
        value={values.longitude}
        onChange={handleChange}
        onBlur={handleBlur}
        type="number"
        placeholder="Shop Longitude"
        onWheel={(e) => e.target.blur()}
      />
      {errors.longitude && touched.longitude && (
        <p id={classes.errors}>{errors.longitude}</p>
      )}

      <div className={classes.dropdownGroup}>
        <p className={classes.heading}>Select Building Status</p>
        <select
          className={classes.dropdown}
          id={classes.styledInput}
          name="building"
          value={values.building}
          onChange={handleChange}
          onBlur={handleBlur}
        >
          <option>Select Building Status</option>
          <option value="owned">Owned</option>
          <option value="rent/leased">Rent/Leased</option>
        </select>
        {errors.building && touched.building && (
          <p id={classes.errors}>{errors.building}</p>
        )}
      </div>

      <div className={classes.dropdownGroup}>
        <p className={classes.heading}>Select Type of Business</p>
        <select
          className={classes.dropdown}
          id={classes.styledInput}
          name="businessType"
          value={values.businessType}
          onChange={handleChange}
          onBlur={handleBlur}
        >
          <option>Select Type of Business</option>
          <option value="proprietary">Proprietary</option>
          <option value="partnership">Partnership</option>
          <option value="company">Company</option>
        </select>
        {errors.businessType && touched.businessType && (
          <p id={classes.errors}>{errors.businessType}</p>
        )}
      </div>

      {values.businessType === "proprietary" && (
        <>
          <UploadCard
            nameArray={[
              {
                name: "Pan Card",
                fieldName: "panCard",
                allowedMimeTypes: fileMimeType.documentsAndImages,
                mandatory: true,
              },
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
                name: "Building Tax Receipt(Latest)",
                fieldName: "buildingTaxReceipt",
                allowedMimeTypes: fileMimeType.documentsAndImages,
                mandatory: true,
              },
              {
                name: "Rent/Lease Agreement",
                fieldName: "rentAgreement",
                allowedMimeTypes: fileMimeType.documentsAndImages,
                mandatory: true,
              },
              {
                name: "Bank Details",
                fieldName: "bankDetails",
                allowedMimeTypes: fileMimeType.documentsAndImages,
                mandatory: true,
              },
              {
                name: "Land Tax Receipt",
                fieldName: "landTaxReceipt",
                allowedMimeTypes: fileMimeType.documentsAndImages,
                mandatory: true,
              },
              {
                name: "Passport Size Photo",
                fieldName: "passportSizePhoto",
                allowedMimeTypes: fileMimeType.imagesOnly,
                mandatory: true,
              },
            ]}
            handleBlur={handleBlur}
            setFieldValue={setFieldValue}
          />

          <input
            id={classes.styledInput}
            name="residenceLatitude"
            value={values.residenceLatitude}
            onChange={handleChange}
            onBlur={handleBlur}
            type="number"
            placeholder="Residence Latitude"
            onWheel={(e) => e.target.blur()}
          />
          {errors.residenceLatitude && touched.residenceLatitude && (
            <p id={classes.errors}>{errors.residenceLatitude}</p>
          )}

          <input
            id={classes.styledInput}
            name="residenceLongitude"
            value={values.residenceLongitude}
            onChange={handleChange}
            onBlur={handleBlur}
            type="number"
            placeholder="Residence Longitude"
            onWheel={(e) => e.target.blur()}
          />
          {errors.residenceLongitude && touched.residenceLongitude && (
            <p id={classes.errors}>{errors.residenceLongitude}</p>
          )}
        </>
      )}

      {values.businessType === "partnership" && (
        <>
          <input
            id={classes.styledInput}
            type="number"
            value={values.numPartners}
            onChange={handleNumPartnersChange}
            onBlur={handleBlur}
            placeholder="Number of Partners"
            onWheel={(e) => e.target.blur()}
            max={5}
          />

          {values.partners.map((partner, index) => (
            <div key={index} className={classes.partnerSection}>
              <h3 id={classes.partnerHeading}>Partner {index + 1}</h3>
              <UploadCard
                nameArray={[
                  {
                    name: "Partner Photo",
                    fieldName: `partners[${index}].photo`,
                    allowedMimeTypes: fileMimeType.imagesOnly,
                    mandatory: true,
                  },
                  {
                    name: "Partner Pan Card",
                    fieldName: `partners[${index}].panCard`,
                    allowedMimeTypes: fileMimeType.documentsAndImages,
                    mandatory: true,
                  },
                  {
                    name: "Partner Aadhaar Front",
                    fieldName: `partners[${index}].aadhaarFront`,
                    allowedMimeTypes: fileMimeType.documentsAndImages,
                    mandatory: true,
                  },
                  {
                    name: "Partner Aadhaar Back",
                    fieldName: `partners[${index}].aadhaarBack`,
                    allowedMimeTypes: fileMimeType.documentsAndImages,
                    mandatory: true,
                  },
                ]}
                handleBlur={handleBlur}
                setFieldValue={setFieldValue}
              />

              <input
                id={classes.styledInput}
                name={`partners[${index}].addressLine1`}
                value={partner.addressLine1}
                onChange={handleChange}
                onBlur={handleBlur}
                type="text"
                placeholder="Partner Address Line 1"
              />
              {errors.partners?.[index]?.addressLine1 &&
                touched.partners?.[index]?.addressLine1 && (
                  <p id={classes.errors}>
                    {errors.partners[index].addressLine1}
                  </p>
                )}

              <input
                id={classes.styledInput}
                name={`partners[${index}].addressLine2`}
                value={partner.addressLine2}
                onChange={handleChange}
                onBlur={handleBlur}
                type="text"
                placeholder="Partner Address Line 2"
              />
              {errors.partners?.[index]?.addressLine2 &&
                touched.partners?.[index]?.addressLine2 && (
                  <p id={classes.errors}>
                    {errors.partners[index].addressLine2}
                  </p>
                )}

              <input
                id={classes.styledInput}
                name={`partners[${index}].pincode`}
                value={partner.pincode}
                onChange={handleChange}
                onBlur={handleBlur}
                type="number"
                placeholder="Partner Pincode"
                onWheel={(e) => e.target.blur()}
              />
              {errors.partners?.[index]?.pincode &&
                touched.partners?.[index]?.pincode && (
                  <p id={classes.errors}>{errors.partners[index].pincode}</p>
                )}

              <input
                id={classes.styledInput}
                name={`partners[${index}].partnerLatitude`}
                value={partner.partnerLatitude}
                onChange={handleChange}
                onBlur={handleBlur}
                type="number"
                placeholder="Partner Latitude"
                onWheel={(e) => e.target.blur()}
              />
              {errors.partners?.[index]?.partnerLatitude &&
                touched.partners?.[index]?.partnerLatitude && (
                  <p id={classes.errors}>
                    {errors.partners[index].partnerLatitude}
                  </p>
                )}

              <input
                id={classes.styledInput}
                name={`partners[${index}].partnerLongitude`}
                value={partner.partnerLongitude}
                onChange={handleChange}
                onBlur={handleBlur}
                type="number"
                placeholder="Partner Longitude"
                onWheel={(e) => e.target.blur()}
              />
              {errors.partners?.[index]?.partnerLongitude &&
                touched.partners?.[index]?.partnerLongitude && (
                  <p id={classes.errors}>
                    {errors.partners[index].partnerLongitude}
                  </p>
                )}
            </div>
          ))}

          <h3 id={classes.directorHeading}>Documents</h3>
          <UploadCard
            nameArray={[
              {
                name: "Partnership Deed",
                fieldName: "partnershipDeed",
                allowedMimeTypes: fileMimeType.documentsAndImages,
                mandatory: true,
              },
              {
                name: "No Objection Certificate",
                fieldName: "noObjectionCertificatePartner",
                allowedMimeTypes: fileMimeType.documentsOnly,
                mandatory: true,
              },
              {
                name: "Rent Agreement",
                fieldName: "rentAgreementPartner",
                allowedMimeTypes: fileMimeType.documentsAndImages,
                mandatory: true,
              },
              {
                name: "Property Tax Receipt",
                fieldName: "propertyTaxReceiptPartner",
                allowedMimeTypes: fileMimeType.documentsAndImages,
                mandatory: true,
              },
              {
                name: "Bank Details",
                fieldName: "bankDetailsPartner",
                allowedMimeTypes: fileMimeType.documentsAndImages,
                mandatory: true,
              },
              {
                name: "Land Tax Receipt",
                fieldName: "landTaxReceiptPartner",
                allowedMimeTypes: fileMimeType.documentsAndImages,
                mandatory: true,
              },
            ]}
            handleBlur={handleBlur}
            setFieldValue={setFieldValue}
          />
        </>
      )}

      {values.businessType === "company" && (
        <>
          <input
            type="number"
            id={classes.styledInput}
            value={values.numDirectors}
            onChange={handleNumDirectorsChange}
            onBlur={handleBlur}
            placeholder="Number of Directors"
            onWheel={(e) => e.target.blur()}
            max={5}
          />

          {values.directors.map((director, index) => (
            <div key={index} className={classes.directorSection}>
              <h3 id={classes.directorHeading}>Director {index + 1}</h3>
              <UploadCard
                nameArray={[
                  {
                    name: "Director Pan Card",
                    fieldName: `directors[${index}].panCardDirector`,
                    allowedMimeTypes: fileMimeType.documentsAndImages,
                    mandatory: true,
                  },
                  {
                    name: "Director Photo",
                    fieldName: `directors[${index}].photoDirector`,
                    allowedMimeTypes: fileMimeType.imagesOnly,
                    mandatory: true,
                  },
                  {
                    name: "Director Aadhaar Front",
                    fieldName: `directors[${index}].aadhaarFrontDirector`,
                    allowedMimeTypes: fileMimeType.documentsAndImages,
                    mandatory: true,
                  },
                  {
                    name: "Director Aadhaar Back",
                    fieldName: `directors[${index}].aadhaarBackDirector`,
                    allowedMimeTypes: fileMimeType.documentsAndImages,
                    mandatory: true,
                  },
                ]}
                handleBlur={handleBlur}
                setFieldValue={setFieldValue}
              />

              <input
                id={classes.styledInput}
                name={`directors[${index}].pinDirector`}
                value={director.pinDirector}
                onChange={handleChange}
                onBlur={handleBlur}
                type="number"
                placeholder="Director Pincode"
                onWheel={(e) => e.target.blur()}
              />
              {errors.directors?.[index]?.pinDirector &&
                touched.directors?.[index]?.pinDirector && (
                  <p id={classes.errors}>
                    {errors.directors[index].pinDirector}
                  </p>
                )}

              <input
                id={classes.styledInput}
                name={`directors[${index}].directorlatitude`}
                value={director.directorlatitude}
                onChange={handleChange}
                onBlur={handleBlur}
                type="number"
                placeholder="Director Latitude"
                onWheel={(e) => e.target.blur()}
              />
              {errors.directors?.[index]?.directorlatitude &&
                touched.directors?.[index]?.directorlatitude && (
                  <p id={classes.errors}>
                    {errors.directors[index].directorlatitude}
                  </p>
                )}

              <input
                id={classes.styledInput}
                name={`directors[${index}].directorlongitude`}
                value={director.directorlongitude}
                onChange={handleChange}
                onBlur={handleBlur}
                type="number"
                placeholder="Director Longitude"
                onWheel={(e) => e.target.blur()}
              />
              {errors.directors?.[index]?.directorlongitude &&
                touched.directors?.[index]?.directorlongitude && (
                  <p id={classes.errors}>
                    {errors.directors[index].directorlongitude}
                  </p>
                )}
            </div>
          ))}

          <h3 id={classes.directorHeading}>Director Documents</h3>
          <UploadCard
            nameArray={[
              {
                name: "Certificate of Incorporation",
                fieldName: "incorporationCertificate",
                allowedMimeTypes: fileMimeType.documentsAndImages,
                mandatory: true,
              },
              {
                name: "No Objection Certificate (NOC)",
                fieldName: "noObjectionCertificate",
                allowedMimeTypes: fileMimeType.documentsOnly,
                mandatory: true,
              },
              {
                name: "Rent/Lease Agreement",
                fieldName: "rentAgreementCompany",
                allowedMimeTypes: fileMimeType.documentsAndImages,
                mandatory: true,
              },
              {
                name: "Property Tax Receipt",
                fieldName: "propertyTaxReceipt",
                allowedMimeTypes: fileMimeType.documentsAndImages,
                mandatory: true,
              },
              {
                name: "Land Tax Receipt",
                fieldName: "landTaxReceiptCompany",
                allowedMimeTypes: fileMimeType.documentsAndImages,
                mandatory: true,
              },
            ]}
            handleBlur={handleBlur}
            setFieldValue={setFieldValue}
          />
        </>
      )}

      <Button
        btnType="submit"
        btnName={isFormFilled ? "Submit" : "Please fill the form"}
        disabled={!isFormFilled}
      />
    </form>
  );
};

export default GstRegistration;
