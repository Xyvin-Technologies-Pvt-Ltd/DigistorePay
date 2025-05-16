import React from "react";
import classes from "./EditDetails.module.css";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import Modal from "../../components/modal/Modal";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useFormik } from "formik";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { getIndiaState, getIndiaDistrict } from "india-state-district";
import UploadCard from "../upload_card/UploadCard";
import { fileMimeType } from "../../data/filemimetype";
import {
  staffEditSchema,
  franchiseEditSchema,
} from "../../Validations/account_view/AccountViewValidation";
import { fetchAccount } from "../../utils/fetchAccount";
import Button from "../button/Button";
const EditDetails = ({
  isModalOpen,
  closeModal,
  data,
  currentUser,
  setData,
}) => {
  console.log(data);

  const formik = useFormik({
    initialValues: data,
    enableReinitialize: true,
    validationSchema:
      data?.userType === "franchise" ? franchiseEditSchema : staffEditSchema,

    onSubmit: async (values) => {
      const formData = new FormData();
      for (const key in values) {
        formData.append(key, values[key]);
      }

      try {
        let url = "";

        currentUser?.data.userType === "franchise"
          ? (url = "/franchiseRouter/updateFranchise")
          : currentUser?.data.userType === "admin" &&
            data?.userType === "franchise"
          ? (url = "/adminEditRoute/updateFranchiseDetails")
          : ((currentUser?.data.userType === "admin" &&
              data?.userType === "staff") ||
              currentUser?.data.userType === "staff") &&
            (url = "/adminEditRoute/updateStaffDetails");

        const response = await axios.put(url, formData);

        if (response.data.errorcode) {
          toast.error(response.data.msg, { id: "edit" });
        } else {
          toast.success("Account Updated Successfully", { id: "edit" });
          data?.userType === "franchise" &&
            fetchAccount(data?.franchiseUniqueId, setData);
          closeModal();
        }
      } catch (error) {
        toast.error(error?.response?.data?.message || "Something went wrong", {
          id: "edit",
        });
      }
    },
  });
  const isFormFilled = formik.isValid;

  return (
    <div>
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <div className={classes.customModalContent}>
          <div className={classes.customClose}>
            <h2 className={classes.editTitle}>Update Account Details</h2>
            <form onSubmit={formik.handleSubmit}>
              <Tabs>
                <TabList>
                  {data?.userType === "staff" &&
                    currentUser?.data.userType === "admin" && (
                      <Tab>Employment</Tab>
                    )}
                  {data?.userType !== "staff" && <Tab>Business </Tab>}
                  <Tab>Personal </Tab>
                  <Tab>Address </Tab>

                  {currentUser?.data.userType === "admin" && (
                    <>
                      <Tab>Bank </Tab>
                      {data?.userType !== "staff" && <Tab>Referal</Tab>}
                    </>
                  )}
                </TabList>
                {data.userType === "staff" && (
                  <>
                    <TabPanel>
                      <div className={classes.tabPanel}>
                        <label>Employment: </label>
                        <select
                          className={classes.tabPanelInput}
                          name="employment"
                          value={formik.values?.employment}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                        >
                          <option value="">Select Employment</option>
                          <option value="fullTime">Full Time</option>
                          <option value="partTime">Part Time</option>
                          <option value="trainee">Trainee</option>
                        </select>
                        {formik.errors.employment &&
                          formik.touched.employment && (
                            <p id={classes.errors}>
                              {formik.errors.employment}
                            </p>
                          )}

                        <label>Remarks: </label>
                        <input
                          className={classes.tabPanelInput}
                          type="text"
                          name="remarks"
                          value={formik.values?.remarks}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                        />

                        <label>Date of Joining: </label>
                        <DatePicker
                          className={classes.tabPanelInput}
                          name="dateOfJoin"
                          maxDate={new Date()}
                          dateFormat="dd/MM/yyyy"
                          placeholderText="Date of Joining"
                          selected={
                            formik.values?.dateOfJoin
                              ? new Date(formik.values.dateOfJoin)
                              : null
                          }
                          onChange={(date) =>
                            formik.setFieldValue("dateOfJoin", date)
                          }
                          onBlur={formik.handleBlur}
                          showMonthDropdown
                          showYearDropdown
                          dropdownMode="select"
                        />
                        {formik.errors.dateOfJoin &&
                          formik.touched.dateOfJoin && (
                            <p id={classes.errors}>
                              {formik.errors.dateOfJoin}
                            </p>
                          )}
                        <div className={classes.radioContainer}>
                          <label>Need Training?</label>
                          <label className={classes.radioLabel}>
                            <input
                              className={classes.tabPanelInput}
                              type="radio"
                              name="isTrainingRequired"
                              value={true}
                              checked={
                                formik.values?.isTrainingRequired === true
                              }
                              onChange={() =>
                                formik.setFieldValue("isTrainingRequired", true)
                              }
                            />
                            Yes
                          </label>
                          <label className={classes.radioLabel}>
                            <input
                              className={classes.tabPanelInput}
                              type="radio"
                              name="isTrainingRequired"
                              value={false}
                              checked={
                                formik.values?.isTrainingRequired === false
                              }
                              onChange={() =>
                                formik.setFieldValue(
                                  "isTrainingRequired",
                                  false
                                )
                              }
                            />
                            No
                          </label>
                        </div>
                        {formik.values?.isTrainingRequired && (
                          <>
                            <label> Number of Days of Training: </label>
                            <input
                              className={classes.tabPanelInput}
                              type="number"
                              name="totalTrainingDays"
                              value={formik.values?.totalTrainingDays}
                              onChange={formik.handleChange}
                            />
                          </>
                        )}
                      </div>
                    </TabPanel>
                  </>
                )}

                {data.userType === "franchise" && (
                  <>
                    <TabPanel>
                      <div className={classes.tabPanel}>
                        {currentUser?.data.userType === "admin" && (
                          <>
                            <label>Franchise Name: </label>
                            <input
                              className={classes.tabPanelInput}
                              type="text"
                              name="franchiseName"
                              value={formik.values?.franchiseName}
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                            />
                            {formik.errors.franchiseName &&
                              formik.touched.franchiseName && (
                                <p id={classes.errors}>
                                  {formik.errors.franchiseName}
                                </p>
                              )}
                            <label>Franchise Unique Id: </label>
                            <input
                              className={classes.tabPanelInput}
                              disabled
                              type="text"
                              name="franchiseUniqueId"
                              value={formik.values?.franchiseUniqueId}
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                            />
                            {formik.errors.franchiseUniqueId &&
                              formik.touched.franchiseUniqueId && (
                                <p id={classes.errors}>
                                  {formik.errors.franchiseUniqueId}
                                </p>
                              )}
                            <label>Business Type: </label>
                            <input
                              className={classes.tabPanelInput}
                              type="text"
                              name="businessType"
                              value={formik.values?.businessType}
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                            />
                            {formik.errors.businessType &&
                              formik.touched.businessType && (
                                <p id={classes.errors}>
                                  {formik.errors.businessType}
                                </p>
                              )}
                          </>
                        )}

                        <div className={classes.radioContainer}>
                          <label>
                            Is it possible to convert to Pan Center:{" "}
                          </label>
                          <label className={classes.radioLabel}>
                            <input
                              className={classes.tabPanelInput}
                              type="radio"
                              name="panCenter"
                              value={true}
                              checked={formik.values?.panCenter === true}
                              onChange={() =>
                                formik.setFieldValue("panCenter", true)
                              }
                            />
                            Yes
                          </label>
                          <label className={classes.radioLabel}>
                            <input
                              className={classes.tabPanelInput}
                              type="radio"
                              name="panCenter"
                              value={false}
                              checked={formik.values?.panCenter === false}
                              onChange={() =>
                                formik.setFieldValue("panCenter", false)
                              }
                            />
                            No
                          </label>
                        </div>
                        {formik.values?.panCenter ? (
                          <div>
                            <p>List all the digital equipments you have:</p>
                            <div className={classes.elements}>
                              <label>
                                <input
                                  className={classes.tabPanelInput}
                                  type="checkbox"
                                  value="printer"
                                  checked={formik.values?.digitalElements?.includes(
                                    "printer"
                                  )}
                                  name="digitalElements"
                                  onChange={formik.handleChange}
                                />
                                Printer
                              </label>
                              <label>
                                <input
                                  className={classes.tabPanelInput}
                                  type="checkbox"
                                  value="computer"
                                  checked={formik.values?.digitalElements?.includes(
                                    "computer"
                                  )}
                                  name="digitalElements"
                                  onChange={formik.handleChange}
                                />
                                Computer
                              </label>
                              <label>
                                <input
                                  className={classes.tabPanelInput}
                                  type="checkbox"
                                  value="scanner"
                                  checked={formik.values?.digitalElements?.includes(
                                    "scanner"
                                  )}
                                  name="digitalElements"
                                  onChange={formik.handleChange}
                                />
                                Scanner
                              </label>
                            </div>
                          </div>
                        ) : (
                          ""
                        )}
                      </div>
                      {currentUser?.data.userType === "admin" && (
                        <>
                          <UploadCard
                            handleBlur={formik.handleBlur}
                            setFieldValue={formik.setFieldValue}
                            nameArray={[
                              {
                                name: "Aadhaar Front",
                                fieldName: "aadhaarPicFront",
                                allowedMimeTypes:
                                  fileMimeType.documentsAndImages,
                                mandatory: true,
                              },
                              {
                                name: "Aadhaar Back",
                                fieldName: "aadhaarPicback",
                                allowedMimeTypes:
                                  fileMimeType.documentsAndImages,
                                mandatory: true,
                              },
                              {
                                name: "Pan Card",
                                fieldName: "panPic",
                                allowedMimeTypes:
                                  fileMimeType.documentsAndImages,
                                mandatory: true,
                              },
                              {
                                name: "Bank Passbook",
                                fieldName: "bankPassbookPic",
                                allowedMimeTypes:
                                  fileMimeType.documentsAndImages,
                                mandatory: true,
                              },
                              {
                                name: "Bank Passbook",
                                fieldName: "bankPassbookPic",
                                allowedMimeTypes:
                                  fileMimeType.documentsAndImages,
                                mandatory: true,
                              },
                              {
                                name: "Shop Photo",
                                fieldName: "shopPic",
                                allowedMimeTypes: fileMimeType.imagesOnly,
                                mandatory: true,
                              },
                            ]}
                          />
                        </>
                      )}
                    </TabPanel>
                  </>
                )}

                <TabPanel>
                  <div className={classes.tabPanel}>
                    {data?.userType !== "staff" &&
                      currentUser?.data.userType === "admin" && (
                        <>
                          <label>Owner Name: </label>
                          <input
                            className={classes.tabPanelInput}
                            type="text"
                            name="ownerName"
                            value={formik.values?.ownerName}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                          />
                          {formik.errors.ownerName &&
                            formik.touched.ownerName && (
                              <p id={classes.errors}>
                                {formik.errors.ownerName}
                              </p>
                            )}

                          <label>Aadhaar Number: </label>
                          <input
                            className={classes.tabPanelInput}
                            type="text"
                            name="aadhaarNumber"
                            value={formik.values?.aadhaarNumber}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                          />
                          {formik.errors.aadhaarNumber &&
                            formik.touched.aadhaarNumber && (
                              <p id={classes.errors}>
                                {formik.errors.aadhaarNumber}
                              </p>
                            )}

                          <label>Pan Number: </label>
                          <input
                            className={classes.tabPanelInput}
                            type="text"
                            name="panNumber"
                            value={formik.values?.panNumber}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                          />
                          {formik.errors.panNumber &&
                            formik.touched.panNumber && (
                              <p id={classes.errors}>
                                {formik.errors.panNumber}
                              </p>
                            )}
                        </>
                      )}

                    {data?.userType === "staff" && (
                      <>
                        <label>First Name: </label>
                        <input
                          className={classes.tabPanelInput}
                          type="text"
                          name="firstName"
                          value={formik.values?.firstName}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                        />
                        {formik.errors.firstName &&
                          formik.touched.firstName && (
                            <p id={classes.errors}>{formik.errors.firstName}</p>
                          )}

                        <label>Last Name: </label>
                        <input
                          className={classes.tabPanelInput}
                          type="text"
                          name="lastName"
                          value={formik.values?.lastName}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                        />
                        {formik.errors.lastName && formik.touched.lastName && (
                          <p id={classes.errors}>{formik.errors.lastName}</p>
                        )}

                        <label>Emergency Contact: </label>
                        <input
                          className={classes.tabPanelInput}
                          type="text"
                          name="emergencyContact"
                          value={formik.values?.emergencyContact}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                        />
                        {formik.errors.emergencyContact &&
                          formik.touched.emergencyContact && (
                            <p id={classes.errors}>
                              {formik.errors.emergencyContact}
                            </p>
                          )}

                        <label>Blood Group: </label>
                        <input
                          className={classes.tabPanelInput}
                          type="text"
                          name="bloodGroup"
                          value={formik.values?.bloodGroup}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                        />
                        {formik.errors.bloodGroup &&
                          formik.touched.bloodGroup && (
                            <p id={classes.errors}>
                              {formik.errors.bloodGroup}
                            </p>
                          )}
                      </>
                    )}

                    {/* Common Fields */}
                    {currentUser?.data.userType !== "franchise" && (
                      <>
                        <label>Phone Number: </label>
                        <input
                          className={classes.tabPanelInput}
                          disabled
                          type="text"
                          name="phoneNumber"
                          value={formik.values?.phoneNumber}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                        />
                        {formik.errors.phoneNumber &&
                          formik.touched.phoneNumber && (
                            <p id={classes.errors}>
                              {formik.errors.phoneNumber}
                            </p>
                          )}
                      </>
                    )}

                    <label>Email: </label>
                    <input
                      className={classes.tabPanelInput}
                      type="text"
                      name="email"
                      value={formik.values?.email}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.errors.email && formik.touched.email && (
                      <p id={classes.errors}>{formik.errors.email}</p>
                    )}

                    {currentUser?.data.userType !== "franchise" && (
                      <>
                        <label>Gender: </label>
                        <select
                          className={classes.tabPanelInput}
                          name="gender"
                          value={formik.values?.gender}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                        >
                          <option value="">Select Gender</option>
                          <option key="male" value="male">
                            Male
                          </option>
                          <option key="female" value="female">
                            Female
                          </option>
                        </select>
                        {formik.errors.gender && formik.touched.gender && (
                          <p id={classes.errors}>{formik.errors.gender}</p>
                        )}

                        <label>Date of Birth: </label>
                        <DatePicker
                          className={classes.tabPanelInput}
                          name="dateOfBirth"
                          maxDate={new Date()}
                          dateFormat="dd/MM/yyyy"
                          placeholderText="Date of birth"
                          selected={
                            formik.values?.dateOfBirth
                              ? new Date(formik.values.dateOfBirth)
                              : null
                          }
                          onChange={(date) =>
                            formik.setFieldValue("dateOfBirth", date)
                          }
                          onBlur={formik.handleBlur}
                          showMonthDropdown
                          showYearDropdown
                          dropdownMode="select"
                        />
                        {formik.errors.dateOfBirth &&
                          formik.touched.dateOfBirth && (
                            <p id={classes.errors}>
                              {formik.errors.dateOfBirth}
                            </p>
                          )}
                      </>
                    )}
                  </div>
                </TabPanel>

                <TabPanel>
                  <div className={classes.tabPanel}>
                    {data?.userType !== "staff" ? (
                      <>
                        <label>Franchise Address Line 1: </label>
                        <input
                          className={classes.tabPanelInput}
                          type="text"
                          name="franchiseAddressLine1"
                          value={formik.values?.franchiseAddressLine1}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                        />
                        {formik.errors.franchiseAddressLine1 &&
                          formik.touched.franchiseAddressLine1 && (
                            <p id={classes.errors}>
                              {formik.errors.franchiseAddressLine1}
                            </p>
                          )}

                        <label>Franchise Address Line 2: </label>
                        <input
                          className={classes.tabPanelInput}
                          type="text"
                          name="franchiseAddressLine2"
                          value={formik.values?.franchiseAddressLine2}
                          onChange={formik.handleChange}
                        />
                        {formik.errors.franchiseAddressLine2 &&
                          formik.touched.franchiseAddressLine2 && (
                            <p id={classes.errors}>
                              {formik.errors.franchiseAddressLine2}
                            </p>
                          )}
                      </>
                    ) : (
                      <>
                        <label> Address Line 1: </label>
                        <input
                          className={classes.tabPanelInput}
                          type="text"
                          name="addressLine1"
                          value={formik.values?.addressLine1}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                        />
                        {formik.errors.addressLine1 &&
                          formik.touched.addressLine1 && (
                            <p id={classes.errors}>
                              {formik.errors.addressLine1}
                            </p>
                          )}

                        <label> Address Line 2: </label>
                        <input
                          className={classes.tabPanelInput}
                          type="text"
                          name="addressLine2"
                          value={formik.values?.addressLine2}
                          onChange={formik.handleChange}
                        />
                        {formik.errors.addressLine2 &&
                          formik.touched.addressLine2 && (
                            <p id={classes.errors}>
                              {formik.errors.addressLine2}
                            </p>
                          )}
                      </>
                    )}

                    <label>State: </label>
                    <select
                      className={classes.tabPanelInput}
                      type="text"
                      name="state"
                      value={formik.values?.state}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    >
                      <option className={classes.tabPanelInput}>
                        Select State
                      </option>
                      {getIndiaState().map((state) => {
                        return (
                          <option
                            key={state.code}
                            data-statecode={state.code}
                            value={state.state}
                          >
                            {state.state}
                          </option>
                        );
                      })}
                    </select>
                    {formik.errors.state && formik.touched.state && (
                      <p id={classes.errors}>{formik.errors.state}</p>
                    )}
                    <label>District: </label>
                    <select
                      className={classes.tabPanelInput}
                      type="text"
                      name="district"
                      value={formik.values?.district}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    >
                      <option>Select District</option>
                      {getIndiaDistrict(formik.values.stateCode).map(
                        (district) => {
                          return (
                            <>
                              <option key={district} value={district}>
                                {district}
                              </option>
                            </>
                          );
                        }
                      )}
                    </select>
                    {formik.errors.district && (
                      <p id={classes.errors}>{formik.errors.district}</p>
                    )}
                    {data?.userType !== "staff" && (
                      <>
                        <label>Panchayath: </label>
                        <input
                          className={classes.tabPanelInput}
                          type="text"
                          name="panchayath"
                          value={formik.values?.panchayath}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                        />
                        {formik.errors.panchayath &&
                          formik.touched.panchayath && (
                            <p id={classes.errors}>
                              {formik.errors.panchayath}
                            </p>
                          )}
                        <label>Ward: </label>
                        <input
                          className={classes.tabPanelInput}
                          type="text"
                          name="ward"
                          value={formik.values?.ward}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                        />
                        {formik.errors.ward && formik.touched.ward && (
                          <p id={classes.errors}>{formik.errors.ward}</p>
                        )}

                        <label>Post Office: </label>
                        <input
                          className={classes.tabPanelInput}
                          type="text"
                          name="postOffice"
                          value={formik.values?.postOffice}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                        />
                        {formik.errors.postOffice &&
                          formik.touched.postOffice && (
                            <p id={classes.errors}>
                              {formik.errors.postOffice}
                            </p>
                          )}
                      </>
                    )}

                    <label>Pincode: </label>
                    <input
                      className={classes.tabPanelInput}
                      type="number"
                      name="pinCode"
                      value={formik.values?.pinCode}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.errors.pinCode && formik.touched.pinCode && (
                      <p id={classes.errors}>{formik.errors.pinCode}</p>
                    )}
                    {data?.userType === "staff" && (
                      <>
                        <label>City: </label>
                        <input
                          className={classes.tabPanelInput}
                          type="text"
                          name="city"
                          value={formik.values?.city}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                        />
                        {formik.errors.city && formik.touched.city && (
                          <p id={classes.errors}>{formik.errors.city}</p>
                        )}
                      </>
                    )}
                  </div>
                </TabPanel>
                {currentUser?.data.userType === "admin" && (
                  <>
                    <TabPanel>
                      <div className={classes.tabPanel}>
                        <label>Account Number: </label>
                        <input
                          className={classes.tabPanelInput}
                          type="text"
                          name="accountNumber"
                          value={formik.values?.accountNumber}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                        />
                        {formik.errors.accountNumber &&
                          formik.touched.accountNumber && (
                            <p id={classes.errors}>
                              {formik.errors.accountNumber}
                            </p>
                          )}
                        <label>Account Name: </label>
                        <input
                          className={classes.tabPanelInput}
                          type="text"
                          name="accountName"
                          value={formik.values?.accountName}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                        />
                        {formik.errors.accountName &&
                          formik.touched.accountName && (
                            <p id={classes.errors}>
                              {formik.errors.accountName}
                            </p>
                          )}
                        <label>Bank: </label>
                        <input
                          className={classes.tabPanelInput}
                          type="text"
                          name="bank"
                          value={formik.values?.bank}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                        />
                        {formik.errors.bank && formik.touched.bank && (
                          <p id={classes.errors}>{formik.errors.bank}</p>
                        )}
                        <label>Branch Name: </label>
                        <input
                          className={classes.tabPanelInput}
                          type="text"
                          name="branchName"
                          value={formik.values?.branchName}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                        />
                        {formik.errors.branchName &&
                          formik.touched.branchName && (
                            <p id={classes.errors}>
                              {formik.errors.branchName}
                            </p>
                          )}
                        <label>IFSC Code: </label>
                        <input
                          className={classes.tabPanelInput}
                          type="text"
                          name="ifscCode"
                          value={formik.values?.ifscCode}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                        />
                        {formik.errors.ifscCode && formik.touched.ifscCode && (
                          <p id={classes.errors}>{formik.errors.ifscCode}</p>
                        )}
                      </div>
                    </TabPanel>

                    <TabPanel>
                      <div className={classes.tabPanel}>
                        <div className={classes.radioContainer}>
                          <label>Referral : </label>
                          <label className={classes.radioLabel}>
                            <input
                              className={classes.tabPanelInput}
                              type="radio"
                              name="referredBy"
                              value={true}
                              checked={formik.values?.referredBy === true}
                              onChange={() =>
                                formik.setFieldValue("referredBy", true)
                              }
                            />
                            Yes
                          </label>
                          <label className={classes.radioLabel}>
                            <input
                              className={classes.tabPanelInput}
                              type="radio"
                              name="referredBy"
                              value={false}
                              checked={formik.values?.referredBy === false}
                              onChange={() =>
                                formik.setFieldValue("referredBy", false)
                              }
                            />
                            No
                          </label>
                        </div>
                        {formik.values?.referredBy && (
                          <>
                            <label>Referral Franchise : </label>
                            <input
                              className={classes.tabPanelInput}
                              type="text"
                              name="referredFranchiseName"
                              value={formik.values?.referredFranchiseName}
                              onChange={formik.handleChange}
                            />
                            <label>Referral Code: </label>
                            <input
                              className={classes.tabPanelInput}
                              type="text"
                              name="referredFranchiseCode"
                              value={formik.values?.referredFranchiseCode}
                              onChange={formik.handleChange}
                            />
                          </>
                        )}
                        <label>Onboarded By :</label>
                        <select
                          className={classes.tabPanelInput}
                          name="onBoardedBy"
                          value={formik.values?.onBoardedBy}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                        >
                          <option>Select Onboard Category</option>
                          <option key="itsSelf" value="itsSelf">
                            Self
                          </option>
                          <option key="admin" value="admin">
                            Admin
                          </option>
                          <option key="distributor" value="distributor">
                            Distributor
                          </option>
                          <option key="collegeQuest" value="collegeQuest">
                            College Quest
                          </option>
                        </select>
                        {formik.errors.onBoardedBy &&
                          formik.touched.onBoardedBy && (
                            <p id={classes.errors}>
                              {formik.errors.onBoardedBy}
                            </p>
                          )}
                        {formik.values?.onBoardedBy !== "itsSelf" && (
                          <>
                            <label>Onboarded Person Id :</label>
                            <input
                              className={classes.tabPanelInput}
                              type="text"
                              name="onBoardedPersonId"
                              value={formik.values?.onBoardedPersonId}
                              onChange={formik.handleChange}
                            />
                            <label>Onboarded Person Name : </label>
                            <input
                              className={classes.tabPanelInput}
                              type="text"
                              name="onBoardedPersonName"
                              value={formik.values?.onBoardedPersonName}
                              onChange={formik.handleChange}
                            />
                          </>
                        )}

                        <label>User Plan: </label>
                        <select
                          className={classes.tabPanelInput}
                          name="userPlan"
                          value={formik.values?.userPlan}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                        >
                          <option>Select Plan</option>
                          <option key="free" value="free">
                            Free
                          </option>
                          <option key="paid" value="paid">
                            Paid
                          </option>
                        </select>
                        {formik.errors.userPlan && formik.touched.userPlan && (
                          <p id={classes.errors}>{formik.errors.userPlan}</p>
                        )}
                      </div>
                    </TabPanel>
                  </>
                )}
              </Tabs>
              <div className={classes.modalButtons}>
                {/* <button type="submit" className={classes.saveBtn}>
                  Update Account
                </button> */}

                <Button
                  btnType="submit"
                  btnName={
                    isFormFilled
                      ? "Update Account"
                      : "Please fill the required field"
                  }
                  disabled={!isFormFilled}
                />
              </div>
            </form>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default EditDetails;
