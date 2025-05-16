import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import { passportValidationSchema } from "../../../Validations/service_component_validations/passport/Passport";
import { educationQualification, employmentType } from "../../../data/passport";
import { fileMimeType } from "../../../data/filemimetype";
import Button from "../../button/Button";
import AdvertCard from "../../../components/advert_card/AdvertCard";
import mobile from "/assets/ad/mobile.jpeg";
import UploadCard from "../../upload_card/UploadCard";
import DatePicker from "react-datepicker";
import axios from "axios";
import toast from "react-hot-toast";
import classes from "./Passport.module.css";
import "react-datepicker/dist/react-datepicker.css";

const Passport = () => {
  const [passportType, setPassportType] = useState("false");
  const [maritalStatus, setMaritalStatus] = useState("Unmarried");
  const [selectedzone, setSelectedZone] = useState("");
  const [officePreferences, setOfficePreferences] = useState([]);
  const [selecteducation, setSelectEducation] = useState("");
  const [selectemployment, setSelectEmployment] = useState("");
  const [commission, setCommission] = useState(1850);
  const [commissionEarned, setCommissionEarned] = useState(commission - 1750);

  useEffect(() => {
    if (commission > 1750) {
      setCommissionEarned(commission - 1750);
    } else {
      setCommissionEarned(0);
    }
  }, [commission]);

  useEffect(() => {
    const fetchPlace = async () => {
      if (selectedzone) {
        try {
          const response = await axios.get("/fixedDataRoute/getPlacesByZone", {
            params: { zone: selectedzone },
          });
          setOfficePreferences(response.data);
        } catch (error) {
          console.error("Error fetching place:", error);
          setOfficePreferences([]);
        }
      } else {
        setOfficePreferences([]);
      }
    };

    fetchPlace();
  }, [selectedzone]);

  const handlePassportTypeChange = (event) => {
    const { value } = event.target;
    setPassportType(value);
    setFieldValue("passportRenewal", value);
  };

  const handleMaritalStatusChange = (event) => {
    setMaritalStatus(event.target.value);
  };

  const handleEducationChange = (event) => {
    const { value } = event.target;
    setSelectEducation(value);
    setFieldValue("education_qualification", value);
  };

  const handleEmploymentChange = (event) => {
    const { value } = event.target;
    setSelectEmployment(value);
    setFieldValue("employment_type", value);
  };

  const handleZoneChange = (event) => {
    const { value } = event.target;
    setSelectedZone(value);
    setFieldValue("passport_office_zone", value);
  };
  const onSubmit = async (values) => {
    const formData = new FormData();

    formData.append("customerName", values.customer_name);
    formData.append("email", values.email);
    formData.append("phoneNumber", values.mobile);
    formData.append("educationQualification", values.education_qualification);
    formData.append("personalAddress", values.personal_contact_address);
    formData.append("maritalStatus", values.marital_status);
    formData.append("spouseName", values.spouse_name);
    formData.append("employmentType", values.employment_type);
    formData.append("birthPlace", values.birth_place);
    formData.append("identificationMark1", values.identical_mark_1);
    formData.append("identificationMark2", values.identical_mark_2);
    formData.append("policeStation", values.police_station);
    formData.append("village", values.village);
    formData.append("emergencyContactPerson", values.emergency_contact_person);
    formData.append("emergencyContactNumber", values.emergency_contact_number);
    formData.append(
      "emergencyContactAddress",
      values.emergency_contact_address
    );
    formData.append(
      "passportOfficePreference",
      values.passport_office_preference
    );
    formData.append("appointmentDatePreference1", values.date_preference_1);
    formData.append("appointmentDatePreference2", values.date_preference_2);
    formData.append("appointmentDatePreference3", values.date_preference_3);
    formData.append("proofOfIdentity", values.identity_proof);
    formData.append("proofOfDob", values.birth_proof);
    formData.append("proofOfAddress", values.address_proof);

    if (passportType === "true") {
      formData.append("passportRenewal", true);
      formData.append("oldPassportNumber", values.old_passport_number);
      formData.append("oldPassportCopy", values.old_passport_copy);
    } else {
      formData.append("passportRenewal", false);
      formData.append("amount", values.amount);
    }

    try {
      const response = await axios.post(`/passport/createPassport`, formData);

      if (response.data.errorcode) {
        toast.error(response.data.msg, { id: "passport" });
      } else {
        toast.success("Passport Application Submitted", { id: "passport" });
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong", {
        id: "passport",
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
    dirty,
    isValid,
  } = useFormik({
    initialValues: {
      customer_name: "",
      email: "",
      mobile: "",
      education_qualification: "",
      marital_status: "",
      spouse_name: "",
      employment_type: "",
      birth_place: "",
      identical_mark_1: "",
      identical_mark_2: "",
      police_station: "",
      village: "",
      emergency_contact_person: "",
      emergency_contact_number: "",
      personal_contact_address: "",
      emergency_contact_address: "",
      passport_office_zone: "",
      passport_office_preference: "",
      date_preference_1: "",
      date_preference_2: "",
      date_preference_3: "",
      identity_proof: "",
      birth_proof: null,
      address_proof: null,
      old_passport_number: "",
      old_passport_copy: "",
      passportRenewal: passportType,
      amount: 1850,
    },
    validationSchema: passportValidationSchema,
    onSubmit,
  });

  const isFormFilled = dirty && isValid;

  const handleCommissionChange = (e) => {
    const value = e.target.value === "" ? "" : Number(e.target.value);
    setCommission(value);
    setFieldValue("amount", value);
  };

  const uploadFields = [
    {
      name: "Proof of Identity ",
      fieldName: "identity_proof",
      allowedMimeTypes: fileMimeType.documentsAndImages,
      mandatory: true,
      description: "Aadhaar Card / PAN Card",
    },
    {
      name: "Proof of Date of Birth",
      fieldName: "birth_proof",
      allowedMimeTypes: fileMimeType.documentsAndImages,
      mandatory: true,
      description: "Birth Certificate / PAN Card",
    },
    {
      name: "Proof of Address",
      fieldName: "address_proof",
      allowedMimeTypes: fileMimeType.documentsAndImages,
      mandatory: true,
      description: "Aadhaar Card / Voter ID / Bank Passbook",
    },
  ];

  if (passportType === "true") {
    uploadFields.push({
      name: "Old Passport Copy",
      fieldName: "old_passport_copy",
      allowedMimeTypes: fileMimeType.documentsAndImages,
      mandatory: true,
      description: "Upload Old Passport Copy",
    });
  }

  return (
    <>
      <section className={classes.mainContainer}>
        <div className={classes.heading}>
          <p>Passport Application</p>
        </div>
        <form className={classes.form} onSubmit={handleSubmit}>
          <div className={classes.content}>
            <div id={classes.styledInput} className={classes.radioContainer}>
              <label className={classes.radioLabel}>
                <input
                  type="radio"
                  name="passportType"
                  value="false"
                  onChange={handlePassportTypeChange}
                  checked={passportType === "false"}
                />{" "}
                New Passport
              </label>
              <label>
                <input
                  type="radio"
                  name="passportType"
                  value="true"
                  onChange={handlePassportTypeChange}
                  checked={passportType === "true"}
                />{" "}
                Passport Renewal
              </label>
            </div>

            {passportType === "true" && (
              <>
                <label
                  htmlFor="old_passport_number"
                  className={classes.serviceLabel}
                >
                  Old Passport Number
                </label>
                <input
                  id={classes.styledInput}
                  name="old_passport_number"
                  value={values.old_passport_number}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  type="text"
                  placeholder="Old Passport Number"
                />
                {errors.old_passport_number && touched.old_passport_number && (
                  <p id={classes.errors}>{errors.old_passport_number}</p>
                )}
              </>
            )}
            <label htmlFor="customer_name" className={classes.serviceLabel}>
              Customer Name
            </label>
            <input
              id={classes.styledInput}
              name="customer_name"
              value={values.customer_name}
              onChange={handleChange}
              onBlur={handleBlur}
              type="text"
              placeholder="Customer Name"
            />
            {errors.customer_name && touched.customer_name && (
              <p id={classes.errors}>{errors.customer_name}</p>
            )}
            <label htmlFor="email" className={classes.serviceLabel}>
              Customer Email ID
            </label>
            <input
              id={classes.styledInput}
              name="email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              type="email"
              placeholder="Customer Email ID"
            />
            {errors.email && touched.email && (
              <p id={classes.errors}>{errors.email}</p>
            )}
            <label htmlFor="mobile" className={classes.serviceLabel}>
              Mobile Number
            </label>
            <input
              id={classes.styledInput}
              name="mobile"
              value={values.mobile}
              onChange={handleChange}
              onBlur={handleBlur}
              type="number"
              onWheel={(e) => e.target.blur()}
              placeholder="Mobile Number"
            />
            {errors.mobile && touched.mobile && (
              <p id={classes.errors}>{errors.mobile}</p>
            )}
            <label
              htmlFor="education_qualification"
              className={classes.serviceLabel}
            >
              Educational Qualification
            </label>
            <select
              id={classes.styledInput}
              className={classes.dropdown}
              name="education_qualification"
              value={selecteducation}
              onChange={handleEducationChange}
              onBlur={handleBlur}
            >
              <option value="">Select Educational Qualification</option>
              {educationQualification.map((education) => (
                <option key={education} value={education}>
                  {education}
                </option>
              ))}
            </select>
            {errors.education_qualification &&
              touched.education_qualification && (
                <p id={classes.errors}>{errors.education_qualification}</p>
              )}

            <div id={classes.styledInput} className={classes.radioContainer}>
              <label className={classes.radioLabel}>
                <input
                  type="radio"
                  name="marital_status"
                  value="yes"
                  onChange={(e) => {
                    handleChange(e);
                    handleMaritalStatusChange(e);
                  }}
                  onBlur={handleBlur}
                  checked={values.marital_status === "yes"}
                />{" "}
                Married
              </label>
              <label>
                <input
                  type="radio"
                  name="marital_status"
                  value="no"
                  onChange={(e) => {
                    handleChange(e);
                    handleMaritalStatusChange(e);
                  }}
                  onBlur={handleBlur}
                  checked={values.marital_status === "no"}
                />{" "}
                Unmarried
              </label>
              {errors.marital_status && touched.marital_status && (
                <p id={classes.errors}>{errors.marital_status}</p>
              )}
            </div>

            {maritalStatus === "yes" && (
              <>
                <label htmlFor="spouse_name" className={classes.serviceLabel}>
                  Spouse Name
                </label>
                <input
                  id={classes.styledInput}
                  name="spouse_name"
                  value={values.spouse_name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  type="text"
                  placeholder="Spouse Name"
                />
                {errors.spouse_name && touched.spouse_name && (
                  <p id={classes.errors}>{errors.spouse_name}</p>
                )}
              </>
            )}
            <label htmlFor="employment_type" className={classes.serviceLabel}>
              Employment Type
            </label>
            <select
              id={classes.styledInput}
              className={classes.dropdown}
              name="employment_type"
              value={selectemployment}
              onChange={handleEmploymentChange}
              onBlur={handleBlur}
            >
              <option value="">Select Employment Type</option>
              {employmentType.map((employment) => (
                <option key={employment} value={employment}>
                  {employment}
                </option>
              ))}
            </select>

            {errors.employment_type && touched.employment_type && (
              <p id={classes.errors}>{errors.employment_type}</p>
            )}
            <label htmlFor="birth_place" className={classes.serviceLabel}>
              Birth Place
            </label>
            <input
              id={classes.styledInput}
              name="birth_place"
              value={values.birth_place}
              onChange={handleChange}
              onBlur={handleBlur}
              type="text"
              placeholder="Birth Place"
            />
            {errors.birth_place && touched.birth_place && (
              <p id={classes.errors}>{errors.birth_place}</p>
            )}
            <label htmlFor="identical_mark_1" className={classes.serviceLabel}>
              Identification Mark 1
            </label>
            <input
              id={classes.styledInput}
              name="identical_mark_1"
              value={values.identical_mark_1}
              onChange={handleChange}
              onBlur={handleBlur}
              type="text"
              placeholder="Identification Mark 1"
            />
            {errors.identical_mark_1 && touched.identical_mark_1 && (
              <p id={classes.errors}>{errors.identical_mark_1}</p>
            )}
            <label htmlFor="identical_mark_2" className={classes.serviceLabel}>
              Identification Mark 2
            </label>
            <input
              id={classes.styledInput}
              name="identical_mark_2"
              value={values.identical_mark_2}
              onChange={handleChange}
              onBlur={handleBlur}
              type="text"
              placeholder="Identification Mark 2"
            />
            {errors.identical_mark_2 && touched.identical_mark_2 && (
              <p id={classes.errors}>{errors.identical_mark_2}</p>
            )}
            <label htmlFor="police_station" className={classes.serviceLabel}>
              Police Station
            </label>
            <input
              id={classes.styledInput}
              name="police_station"
              value={values.police_station}
              onChange={handleChange}
              onBlur={handleBlur}
              type="text"
              placeholder="Police Station"
            />
            {errors.police_station && touched.police_station && (
              <p id={classes.errors}>{errors.police_station}</p>
            )}
            <label htmlFor="village" className={classes.serviceLabel}>
              Village
            </label>
            <input
              id={classes.styledInput}
              name="village"
              value={values.village}
              onChange={handleChange}
              onBlur={handleBlur}
              type="text"
              placeholder="Village"
            />
            {errors.village && touched.village && (
              <p id={classes.errors}>{errors.village}</p>
            )}
            <label
              htmlFor="emergency_contact_person"
              className={classes.serviceLabel}
            >
              Emergency Contact Person
            </label>
            <input
              id={classes.styledInput}
              name="emergency_contact_person"
              value={values.emergency_contact_person}
              onChange={handleChange}
              onBlur={handleBlur}
              type="text"
              placeholder="Emergency Contact Person"
            />
            {errors.emergency_contact_person &&
              touched.emergency_contact_person && (
                <p id={classes.errors}>{errors.emergency_contact_person}</p>
              )}
            <label
              htmlFor="emergency_contact_number"
              className={classes.serviceLabel}
            >
              Emergency Contact Number
            </label>
            <input
              id={classes.styledInput}
              name="emergency_contact_number"
              value={values.emergency_contact_number}
              onChange={handleChange}
              onBlur={handleBlur}
              type="number"
              placeholder="Emergency Contact Number"
            />
            {errors.emergency_contact_number &&
              touched.emergency_contact_number && (
                <p id={classes.errors}>{errors.emergency_contact_number}</p>
              )}
            <label
              htmlFor="personal_contact_address"
              className={classes.serviceLabel}
            >
              Personal Contact Address
            </label>
            <input
              id={classes.styledInput}
              name="personal_contact_address"
              value={values.personal_contact_address}
              onChange={handleChange}
              onBlur={handleBlur}
              type="text"
              placeholder="Personal Contact Address"
            />
            {errors.personal_contact_address &&
              touched.personal_contact_address && (
                <p id={classes.errors}>{errors.personal_contact_address}</p>
              )}
            <label
              htmlFor="emergency_contact_address"
              className={classes.serviceLabel}
            >
              Emergency Contact Address
            </label>
            <input
              id={classes.styledInput}
              name="emergency_contact_address"
              value={values.emergency_contact_address}
              onChange={handleChange}
              onBlur={handleBlur}
              type="text"
              placeholder="Emergency Contact Address"
            />
            {errors.emergency_contact_address &&
              touched.emergency_contact_address && (
                <p id={classes.errors}>{errors.emergency_contact_address}</p>
              )}
            <label
              htmlFor="passport_office_zone"
              className={classes.serviceLabel}
            >
              Passport Office Zone
            </label>
            <select
              id={classes.styledInput}
              name="passport_office_zone"
              className={classes.dropdown}
              value={selectedzone}
              onChange={handleZoneChange}
              onBlur={handleBlur}
            >
              <option value="" hidden>
                Select Passport Office Zone
              </option>
              {["Trivandrum", "Cochin", "Kozhikode"].map((zone) => (
                <option key={zone} value={zone}>
                  {zone}
                </option>
              ))}
            </select>
            {errors.passport_office_zone && touched.passport_office_zone && (
              <p id={classes.errors}>{errors.passport_office_zone}</p>
            )}
            <label
              htmlFor="passport_office_preference"
              className={classes.serviceLabel}
            >
              Passport office Preference
            </label>
            <select
              id={classes.styledInput}
              name="passport_office_preference"
              value={values.passport_office_preference}
              onChange={handleChange}
              onBlur={handleBlur}
              className={classes.dropdown}
            >
              <option value="">Select Passport Office Preference</option>
              {officePreferences.map((preference, index) => (
                <option key={index} value={preference.place}>
                  {preference.place}
                </option>
              ))}
            </select>
            {errors.passport_office_preference &&
              touched.passport_office_preference && (
                <p id={classes.errors}>{errors.passport_office_preference}</p>
              )}
            <label htmlFor="date_preference_1" className={classes.serviceLabel}>
              Appointment Date Preference 1
            </label>
            <DatePicker
              id={classes.styledInput}
              className={classes.DatePicker}
              name="date_preference_1"
              selected={values.date_preference_1}
              onChange={(date) => setFieldValue("date_preference_1", date)}
              minDate={new Date()}
              onBlur={handleBlur}
              dateFormat="dd/MM/yyyy"
              placeholderText="Appointment Date Preference 1"
            />

            {errors.date_preference_1 && touched.date_preference_1 && (
              <p id={classes.errors}>{errors.date_preference_1}</p>
            )}
            <label htmlFor="date_preference_2" className={classes.serviceLabel}>
              Appointment Date Preference 2
            </label>
            <DatePicker
              id={classes.styledInput}
              className={classes.DatePicker}
              name="date_preference_2"
              selected={values.date_preference_2}
              onChange={(date) => setFieldValue("date_preference_2", date)}
              minDate={
                values.date_preference_1
                  ? new Date(
                      values.date_preference_1.getTime() + 24 * 60 * 60 * 1000
                    )
                  : new Date()
              }
              onBlur={handleBlur}
              dateFormat="dd/MM/yyyy"
              placeholderText="Appointment Date Preference 2"
            />

            {errors.date_preference_2 && touched.date_preference_2 && (
              <p id={classes.errors}>{errors.date_preference_2}</p>
            )}
            <label htmlFor="date_preference_3" className={classes.serviceLabel}>
              Appointment Date Preference 3
            </label>
            <DatePicker
              id={classes.styledInput}
              className={classes.DatePicker}
              name="date_preference_3"
              selected={values.date_preference_3}
              onChange={(date) => setFieldValue("date_preference_3", date)}
              minDate={
                values.date_preference_2
                  ? new Date(
                      values.date_preference_2.getTime() + 24 * 60 * 60 * 1000
                    )
                  : new Date()
              }
              onBlur={handleBlur}
              dateFormat="dd/MM/yyyy"
              placeholderText="Appointment Date Preference 3"
            />

            {errors.date_preference_3 && touched.date_preference_3 && (
              <p id={classes.errors}>{errors.date_preference_3}</p>
            )}

            <UploadCard
              className={classes.upload}
              nameArray={uploadFields}
              handleBlur={handleBlur}
              setFieldValue={setFieldValue}
              errors={errors}
              touched={touched}
            />

            <label htmlFor="amount" className={classes.serviceLabel}>
              Service Charge
            </label>
            <input
              id={classes.styledInput}
              name="amount"
              value={values?.amount}
              max={1850}
              onChange={handleCommissionChange}
              onBlur={handleBlur}
              onWheel={(e) => e.target.blur()}
              placeholder="The Total Amount"
              type="number"
              autoComplete="off"
            />
            {errors.amount && touched.amount && (
              <p id={classes.errors}>{errors.amount}</p>
            )}
            {values?.amount >= 1750 && values?.amount <= 1850 && (
              <p className={classes.commission}>
                Commission Earned: {commissionEarned}
              </p>
            )}

            <div className={classes.buttonDiv}>
              <Button
                btnType="submit"
                btnName={isFormFilled ? "Proceed" : "Please fill the form"}
                disabled={!isFormFilled}
              />
            </div>
          </div>
        </form>
      </section>
      <div style={{ position: "relative" }}>
        <AdvertCard image={mobile} alt="waterAd" sticky={true} />
      </div>
    </>
  );
};
export default Passport;
