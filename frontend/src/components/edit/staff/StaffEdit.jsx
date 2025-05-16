import React, { useState, useEffect } from "react";
import classes from "./StaffEdit.module.css";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useFormik } from "formik";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Modal from "../../modal/Modal";
import UploadCard from "../../upload_card/UploadCard";
import { getIndiaState, getIndiaDistrict } from "india-state-district";
import { staffEditSchema } from "../../../Validations/account_view/AccountViewValidation";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../../../redux/user/userSlice";
import { fileMimeType } from "../../../data/filemimetype";
const StaffEdit = ({ isModalOpen, closeModal, data, currentUser, setData }) => {
  const [district, setDistrict] = useState([]);
  const [isClicked, setIsClicked] = useState({
    phoneNumber: false,
    email: false,
  });

  const dispatch = useDispatch();
  const FormikinitialValues = {
    ...data,
    loginUser: currentUser?.data.userType,
    stateCode: null,
  };

  const handlefetchStaff = () => {
    dispatch(loginSuccess({ data }));
  };

  const formik = useFormik({
    initialValues: FormikinitialValues,
    enableReinitialize: true,
    validationSchema: staffEditSchema,

    onSubmit: async (values) => {
      const formData = new FormData();
      for (const key in values) {
        formData.append(key, values[key]);
      }
      formData.append("districtOfOperation", []);

      try {
        const response = await axios.put(
          currentUser?.data?.userType === "admin"
            ? `/adminEditRoute/updateStaffDetails`
            : `/staff/updateStaff`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        if (response.data.errorcode) {
          toast.error(response.data.msg, { id: "staffEdit" });
        } else {
          toast.success("Update Successful", { id: "staffEdit" });
          currentUser.data?.userType === "staff" && handlefetchStaff();
          closeModal();
        }
      } catch (error) {
        toast.error(error?.response?.data?.message || "Something went wrong", {
          id: "staffEdit",
        });
      }
    },
  });
  const isFormFilled = formik.isValid && formik.dirty;

  const handleClick = (param) => {
    setIsClicked((prev) => ({
      ...prev,
      [param]: !prev[param],
    }));
  };
  useEffect(() => {
    if (data?.state) {
      const code = getIndiaState().find(
        (item) => item.state.toLowerCase() === data.state.toLowerCase()
      );

      if (code) {
        const district = getIndiaDistrict(code.code);
        setDistrict(district);
      }
    }
  }, [data?.state]);

  const handleStateData = (event) => {
    const selectedStateName = event.target.value;
    const selectedStateCode =
      event.target.options[event.target.selectedIndex].dataset.statecode;
    formik.setFieldValue("state", selectedStateName);
    formik.setFieldValue("stateCode", selectedStateCode);
    const fetchedDistricts = getIndiaDistrict(selectedStateCode);
    setDistrict(fetchedDistricts);
  };

  return (
    <div>
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={"Update Account Details"}
      >
        <div className={classes.customModalContent}>
          <div className={classes.customClose}>
            <form onSubmit={formik.handleSubmit}>
              <Tabs>
                <TabList>
                  <Tab style={{ color: "var(--jetblack)" }}>Address</Tab>
                  {currentUser?.data.userType === "admin" && (
                    <>
                      <Tab style={{ color: "var(--jetblack)" }}>Contact</Tab>
                      <Tab style={{ color: "var(--jetblack)" }}>Bank </Tab>
                      <Tab style={{ color: "var(--jetblack)" }}>Employment</Tab>
                    </>
                  )}
                </TabList>

                <TabPanel>
                  <div className={classes.tabPanel}>
                    <label className={classes.label}> Address Line 1: </label>
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
                        <p id={classes.errors}>{formik.errors.addressLine1}</p>
                      )}

                    <label className={classes.label}> Address Line 2: </label>
                    <input
                      className={classes.tabPanelInput}
                      type="text"
                      name="addressLine2"
                      value={formik.values?.addressLine2}
                      onChange={formik.handleChange}
                    />
                    {formik.errors.addressLine2 &&
                      formik.touched.addressLine2 && (
                        <p id={classes.errors}>{formik.errors.addressLine2}</p>
                      )}

                    <label className={classes.label}>State: </label>
                    <select
                      className={classes.tabPanelInput}
                      type="text"
                      name="state"
                      value={formik.values?.state}
                      onChange={handleStateData}
                      onBlur={formik.handleBlur}
                    >
                      <option
                        className={classes.tabPanelInput}
                        value=""
                        hidden
                        disabled
                      >
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
                    <label className={classes.label}>District: </label>
                    <select
                      className={classes.tabPanelInput}
                      type="text"
                      name="district"
                      value={formik.values?.district}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    >
                      <option value={formik.values?.district} hidden>
                        {formik.values.district || "Select District"}
                      </option>
                      {district.map((district, index) => {
                        return (
                          <option key={index} value={district}>
                            {district}
                          </option>
                        );
                      })}
                    </select>
                    {formik.errors.district && (
                      <p id={classes.errors}>{formik.errors.district}</p>
                    )}

                    <label className={classes.label}>Pincode: </label>
                    <input
                      className={classes.tabPanelInput}
                      type="number"
                      name="pinCode"
                      value={formik.values?.pinCode}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      onKeyDown={(e) => {
                        if (e.key === "ArrowUp" || e.key === "ArrowDown") {
                          e.preventDefault();
                        }
                      }}
                    />
                    {formik.errors.pinCode && formik.touched.pinCode && (
                      <p id={classes.errors}>{formik.errors.pinCode}</p>
                    )}

                    <label className={classes.label}>City: </label>
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
                  </div>
                </TabPanel>
                {currentUser?.data?.userType === "admin" && (
                  <>
                    <TabPanel>
                      <div className={classes.tabPanel}>
                        <label className={classes.label}>First Name: </label>
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

                        <label className={classes.label}>Last Name: </label>
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
                        {currentUser.data?.userType === "admin" && (
                          <>
                            <label className={classes.label}>
                              Phone Number:{" "}
                            </label>
                            <input
                              className={classes.tabPanelInput}
                              readOnly
                              type="text"
                              name="phoneNumber"
                              value={formik.values?.phoneNumber}
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              onClick={() => handleClick("phoneNumber")}
                            />
                            {isClicked.phoneNumber && (
                              <p id={classes.note}>
                                This feild is not allowded to edit
                              </p>
                            )}

                            <label className={classes.label}>Email: </label>
                            <input
                              className={classes.tabPanelInput}
                              readOnly
                              type="text"
                              name="email"
                              value={formik.values?.email}
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              onClick={() => handleClick("email")}
                            />
                            {isClicked.email && (
                              <p id={classes.note}>
                                This feild is not allowded to edit
                              </p>
                            )}

                            <label className={classes.label}>
                              Emergency Contact:{" "}
                            </label>
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
                          </>
                        )}

                        <label className={classes.label}>Blood Group: </label>
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

                        <label className={classes.label}>Gender: </label>
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

                        <label className={classes.label}>Date of Birth: </label>
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
                      </div>
                    </TabPanel>

                    <TabPanel>
                      <div className={classes.tabPanel}>
                        <label className={classes.label}>
                          Account Number:{" "}
                        </label>
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
                        <label className={classes.label}>Account Name: </label>
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
                        <label className={classes.label}>Bank: </label>
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
                        <label className={classes.label}>Branch Name: </label>
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
                        <label className={classes.label}>IFSC Code: </label>
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
                        <label className={classes.label}>Employment: </label>
                        <select
                          className={classes.tabPanelInput}
                          name="employment"
                          value={formik.values?.employment}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                        >
                          <option value="" hidden>
                            Select Employment
                          </option>
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

                        <label className={classes.label}>Remarks: </label>
                        <input
                          className={classes.tabPanelInput}
                          type="text"
                          name="remarks"
                          value={formik.values?.remarks}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                        />

                        <label className={classes.label}>
                          Date of Joining:{" "}
                        </label>
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
                          <label className={classes.label}>
                            Need Training?
                          </label>
                          <label
                            id={classes.label}
                            className={classes.radioLabel}
                          >
                            <input
                              className={classes.tabPanelInput}
                              type="radio"
                              name="isTrainingRequired"
                              // value={true}
                              onBlur={formik.handleBlur}
                              checked={
                                formik.values?.isTrainingRequired === true
                              }
                              onChange={() =>
                                formik.setFieldValue("isTrainingRequired", true)
                              }
                            />
                            Yes
                          </label>
                          <label
                            id={classes.label}
                            className={classes.radioLabel}
                          >
                            <input
                              className={classes.tabPanelInput}
                              type="radio"
                              name="isTrainingRequired"
                              // value={false}
                              onBlur={formik.handleBlur}
                              checked={
                                formik.values?.isTrainingRequired === false
                              }
                              onChange={() => {
                                formik.setFieldValue(
                                  "isTrainingRequired",
                                  false
                                );
                                formik.setFieldValue("totalTrainingDays", 0);
                              }}
                            />
                            No
                          </label>
                        </div>
                        {formik.values?.isTrainingRequired && (
                          <>
                            <label className={classes.label}>
                              {" "}
                              Number of Days of Training:{" "}
                            </label>
                            <input
                              className={classes.tabPanelInput}
                              type="number"
                              name="totalTrainingDays"
                              value={formik.values?.totalTrainingDays}
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              onKeyDown={(e) => {
                                if (
                                  e.key === "ArrowUp" ||
                                  e.key === "ArrowDown"
                                ) {
                                  e.preventDefault();
                                }
                              }}
                            />
                          </>
                        )}
                        <div id={classes.label}>
                          <UploadCard
                            handleBlur={formik.handleBlur}
                            setFieldValue={formik.setFieldValue}
                            nameArray={[
                              {
                                name: "Profile Photo",
                                fieldName: "profilePic",
                                allowedMimeTypes: fileMimeType.imagesOnly,
                                mandatory: true,
                              },
                            ]}
                          />
                        </div>
                      </div>
                    </TabPanel>
                  </>
                )}
              </Tabs>

              <div className={classes.modalButtons}>
                <button
                  disabled={!isFormFilled}
                  type="submit"
                  className={`${classes.buttonStyles} ${
                    isFormFilled ? classes.active : classes.blocked
                  }`}
                >
                  {isFormFilled
                    ? "Update Account"
                    : "Please fill the required field"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default StaffEdit;
