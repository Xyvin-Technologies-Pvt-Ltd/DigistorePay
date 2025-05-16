import { useFormik } from "formik";
import { udayamRegistrationSchema } from "../../../Validations/service_component_validations/tax_filing/taxFilingValidation";
import { toast } from "react-hot-toast";
import { fileMimeType } from "../../../data/filemimetype";
import Button from "../../button/Button";
import UploadCard from "../../upload_card/UploadCard";
import axios from "axios";
import AdvertCard from "../../../components/advert_card/AdvertCard";
import mobile from "/assets/ad/mobile.jpeg";
import classes from "./UdyamRegistration.module.css";

const onSubmit = async (values) => {
  const formData = new FormData();
  formData.append("customerName", values.customerName);
  formData.append("phoneNumber", values.mobile);
  formData.append("email", values.email);
  formData.append("businessName", values.businessName);
  formData.append("businessAddressLine1", values.businessAddressLine1);
  formData.append("businessAddressLine2", values.businessAddressLine2);
  formData.append("pinCode", values.pincode);
  formData.append("shopLongitude", values.shopLatitude);
  formData.append("shopLatitude", values.shopLongitude);
  formData.append("religionWithCaste", values.religion);
  formData.append("totalNumberOfEmployees", values.numberOfEmployees);
  formData.append("totalMen", values.numberOfMen);
  formData.append("totalWomen", values.numberOfWomen);
  formData.append("firmRegistrationDate", values.dateOfRegistration);
  formData.append("firmCommencementDate", values.dateOfCommencement);
  formData.append("businessType", values.businessType);
  formData.append("annualTurnOver", values.annualTurnover);
  formData.append("aadhaarFront", values.aadhaarFront);
  formData.append("aadhaarBack", values.aadhaarBack);
  formData.append("panPic", values.panCard);

  try {
    const res = await axios.post("/udyam/udyamRegister", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    if (res.data.errorcode) {
      toast.error(res.data.msg, { id: "udyam" });
    } else {
      toast.success("Udyam Registration Submitted", { id: "udyam" });
      resetForm();
    }
  } catch (error) {
    toast.error(error.response?.data?.message || "Something went wrong", {
      id: "udyam",
    });
  }
};

const UdayamRegistration = () => {
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
      shopLatitude: "",
      shopLongitude: "",
      religion: "",
      numberOfEmployees: "",
      numberOfMen: "",
      numberOfWomen: "",
      dateOfRegistration: "",
      dateOfCommencement: "",
      businessType: "",
      annualTurnover: "",
      aadhaarFront: null,
      aadhaarBack: null,
      panCard: null,
    },
    validationSchema: udayamRegistrationSchema,
    onSubmit,
  });
  const isFormFilled = dirty && isValid;
  return (
    <>
      <section className={classes.mainContainer}>
        <div className={classes.heading}>
          <p>Udyam Registration </p>
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
            placeholder="Enter Pincode"
            onWheel={(e) => e.target.blur()}
          />
          {errors.pincode && touched.pincode && (
            <p id={classes.errors}>{errors.pincode}</p>
          )}

          <input
            id={classes.styledInput}
            value={values.shopLatitude}
            name="shopLatitude"
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Shop Latitude"
            type="number"
            onWheel={(e) => e.target.blur()}
          />
          {errors.shopLatitude && touched.shopLatitude && (
            <p id={classes.errors}>{errors.shopLatitude}</p>
          )}
          <input
            id={classes.styledInput}
            value={values.shopLongitude}
            name="shopLongitude"
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Shop Longitude"
            type="number"
            onWheel={(e) => e.target.blur()}
          />
          {errors.shopLongitude && touched.shopLongitude && (
            <p id={classes.errors}>{errors.shopLongitude}</p>
          )}

          <input
            id={classes.styledInput}
            name="religion"
            value={values.religion}
            onChange={handleChange}
            onBlur={handleBlur}
            type="text"
            placeholder="Religion with Caste"
          />
          {errors.religion && touched.religion && (
            <p id={classes.errors}>{errors.religion}</p>
          )}

          <div className={classes.employeeContainer}>
            <input
              id={classes.styledInput}
              name="numberOfEmployees"
              value={values.numberOfEmployees}
              onChange={handleChange}
              onBlur={handleBlur}
              type="number"
              placeholder="Number of Employees"
              onWheel={(e) => e.target.blur()}
            />
            {errors.numberOfEmployees && touched.numberOfEmployees && (
              <p id={classes.errors}>{errors.numberOfEmployees}</p>
            )}

            <input
              id={classes.styledInput}
              name="numberOfMen"
              value={values.numberOfMen}
              onChange={handleChange}
              onBlur={handleBlur}
              type="number"
              placeholder="Men"
              onWheel={(e) => e.target.blur()}
            />
            {errors.numberOfMen && touched.numberOfMen && (
              <p id={classes.errors}>{errors.numberOfMen}</p>
            )}

            <input
              id={classes.styledInput}
              name="numberOfWomen"
              value={values.numberOfWomen}
              onChange={handleChange}
              onBlur={handleBlur}
              type="number"
              placeholder="Women"
              onWheel={(e) => e.target.blur()}
            />
            {errors.numberOfWomen && touched.numberOfWomen && (
              <p id={classes.errors}>{errors.numberOfWomen}</p>
            )}
          </div>

          <p className={classes.heading}>Date of Registration of Firm</p>
          <input
            id={classes.styledInput}
            name="dateOfRegistration"
            value={values.dateOfRegistration}
            onChange={handleChange}
            onBlur={handleBlur}
            type="date"
            placeholder="Date of Registration of Firm"
          />
          {errors.dateOfRegistration && touched.dateOfRegistration && (
            <p id={classes.errors}>{errors.dateOfRegistration}</p>
          )}

          <p className={classes.heading}>Date of Commencement of Firm</p>
          <input
            id={classes.styledInput}
            name="dateOfCommencement"
            value={values.dateOfCommencement}
            onChange={handleChange}
            onBlur={handleBlur}
            type="date"
            placeholder="Date of Commencement of Firm"
          />
          {errors.dateOfCommencement && touched.dateOfCommencement && (
            <p id={classes.errors}>{errors.dateOfCommencement}</p>
          )}

          <div className={classes.dropdownGroup}>
            <p className={classes.heading}>Select Type of Business</p>
            <select
              className={classes.dropdown}
              id={classes.styledInput}
              value={values.businessType}
              name="businessType"
              onChange={handleChange}
              onBlur={handleBlur}
            >
              <option value="proprietary">Proprietary</option>
              <option value="partnership">Partnership</option>
              <option value="company">Company</option>
            </select>
            {errors.businessType && touched.businessType && (
              <p id={classes.errors}>{errors.businessType}</p>
            )}
          </div>

          <input
            id={classes.styledInput}
            name="annualTurnover"
            value={values.annualTurnover}
            onChange={handleChange}
            onBlur={handleBlur}
            type="number"
            placeholder="Annual Turnover"
            onWheel={(e) => e.target.blur()}
          />
          {errors.annualTurnover && touched.annualTurnover && (
            <p id={classes.errors}>{errors.annualTurnover}</p>
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

export default UdayamRegistration;
