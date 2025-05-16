import React from "react";
import classes from "./FranchiseEdit.module.css";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useFormik } from "formik";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { getIndiaState, getIndiaDistrict } from "india-state-district";
import UploadCard from "../../upload_card/UploadCard";
import { fetchAccount } from "../../../utils/fetchAccount";
import Modal from "../../modal/Modal";
import { franchiseEditSchema } from "../../../Validations/account_view/AccountViewValidation";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../../../redux/user/userSlice";
import { fileMimeType } from "../../../data/filemimetype";
const FranchiseEdit = ({
  isModalOpen,
  closeModal,
  data,
  currentUser,
  setData,
}) => {
  const [district, setDistrict] = useState([]);
  const [isClicked, setIsClicked] = useState({
    phoneNumber: false,
    email: false,
    franchiseUniqueId: false,
  });
  const dispatch = useDispatch();
  const FormikinitialValues = {
    ...data,
    loginUser: currentUser?.data.userType,
    stateCode: null,
  };

  const handlefetchFranchise = () => {
    dispatch(loginSuccess({ data }));
  };

  const formik = useFormik({
    initialValues: FormikinitialValues,
    enableReinitialize: true,
    validationSchema: franchiseEditSchema,

    onSubmit: async (values) => {
      const formData = new FormData();
      for (const key in values) {
        formData.append(key, values[key]);
      }

      try {
        const response = await axios.put(
          currentUser?.data?.userType === "franchise"
            ? `/franchiseRouter/updateFranchise`
            : `/adminEditRoute/updateFranchiseDetails`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        if (response.data.errorcode) {
          toast.error(response.data.msg, { id: "accountUpdate" });
        } else {
          toast.success("Account Updated Successfully", {
            id: "accountUpdate",
          });
          fetchAccount(data?.franchiseUniqueId, setData);
          currentUser?.data.userType === "franchise" && handlefetchFranchise();
          closeModal();
        }
      } catch (error) {
        console.log("error catch", error);

        toast.error(error?.response?.data?.message || "Something went wrong", {
          id: "accountUpdate",
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
                  <Tab style={{ color: "var(--jetblack)" }}>Business </Tab>
                  <Tab style={{ color: "var(--jetblack)" }}>Address </Tab>
                  {currentUser?.data.userType === "admin" && (
                    <>
                      <Tab style={{ color: "var(--jetblack)" }}>Personal </Tab>
                      <Tab style={{ color: "var(--jetblack)" }}>Bank </Tab>
                      <Tab style={{ color: "var(--jetblack)" }}>Referal</Tab>
                    </>
                  )}
                </TabList>

                <TabPanel>
                  <div className={classes.tabPanel}>
                    {currentUser?.data.userType === "admin" && (
                      <>
                        <label className={classes.label}>
                          Franchise Name:{" "}
                        </label>
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
                        <label className={classes.label}>
                          Franchise Unique Id:{" "}
                        </label>
                        <input
                          className={classes.tabPanelInput}
                          readOnly
                          // disabled
                          type="text"
                          name="franchiseUniqueId"
                          value={formik.values?.franchiseUniqueId}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          onClick={() => handleClick("franchiseUniqueId")}
                        />
                        {isClicked.franchiseUniqueId && (
                          <p id={classes.note}>Cannot edit this feild</p>
                        )}
                        <label className={classes.label}>Business Type: </label>
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
                      <label className={classes.label}>
                        Is it possible to convert to Pan Center:{" "}
                      </label>
                      <label id={classes.label} className={classes.radioLabel}>
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
                      <label id={classes.label} className={classes.radioLabel}>
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
                    {formik.errors.panCenter && formik.touched.panCenter && (
                      <p id={classes.errors}>{formik.errors.panCenter}</p>
                    )}
                    {formik.values?.panCenter ? (
                      <div>
                        <p id={classes.label}>
                          List all the digital equipments you have:
                        </p>
                        <div className={classes.elements}>
                          <label className={classes.label}>
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
                          <label id={classes.label}>
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
                          <label id={classes.label}>
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
                  {formik.errors.digitalElements &&
                    formik.touched.digitalElements && (
                      <p id={classes.errors}>{formik.errors.digitalElements}</p>
                    )}
                  {currentUser?.data.userType === "admin" && (
                    <>
                      <div id={classes.label}>
                        <UploadCard
                          handleBlur={formik.handleBlur}
                          setFieldValue={formik.setFieldValue}
                          nameArray={[
                            {
                              name: "Aadhaar Front",
                              fieldName: "aadhaarPicFront",
                              allowedMimeTypes: fileMimeType.documentsAndImages,
                              mandatory: true,
                            },
                            {
                              name: "Aadhaar Back",
                              fieldName: "aadhaarPicback",
                              allowedMimeTypes: fileMimeType.documentsAndImages,
                              mandatory: true,
                            },
                            {
                              name: "Pan Card",
                              fieldName: "panPic",
                              allowedMimeTypes: fileMimeType.documentsAndImages,
                              mandatory: true,
                            },
                            {
                              name: "Bank Passbook",
                              fieldName: "bankPassbookPic",
                              allowedMimeTypes: fileMimeType.documentsAndImages,
                              mandatory: true,
                            },
                            {
                              name: "Bank Passbook",
                              fieldName: "bankPassbookPic",
                              allowedMimeTypes: fileMimeType.documentsAndImages,
                              mandatory: true,
                            },
                            {
                              name: "Shop Photo",
                              fieldName: "shopPic",
                              allowedMimeTypes: fileMimeType.documentsAndImages,
                              mandatory: true,
                            },
                          ]}
                        />
                      </div>
                    </>
                  )}
                </TabPanel>

                <TabPanel>
                  <div className={classes.tabPanel}>
                    <label id={classes.label}>Franchise Address Line 1: </label>
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

                    <label id={classes.label}>Franchise Address Line 2: </label>
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

                    <label id={classes.label}>State: </label>
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
                    <label id={classes.label}>District: </label>
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

                    <label id={classes.label}>Panchayath: </label>
                    <input
                      className={classes.tabPanelInput}
                      type="text"
                      name="panchayath"
                      value={formik.values?.panchayath}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.errors.panchayath && formik.touched.panchayath && (
                      <p id={classes.errors}>{formik.errors.panchayath}</p>
                    )}
                    <label id={classes.label}>Ward: </label>
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

                    <label id={classes.label}>Post Office: </label>
                    <input
                      className={classes.tabPanelInput}
                      type="text"
                      name="postOffice"
                      value={formik.values?.postOffice}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.errors.postOffice && formik.touched.postOffice && (
                      <p id={classes.errors}>{formik.errors.postOffice}</p>
                    )}

                    <label id={classes.label}>Pincode: </label>
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
                  </div>
                </TabPanel>

                {currentUser?.data.userType === "admin" && (
                  <>
                    <TabPanel>
                      <div className={classes.tabPanel}>
                        <label id={classes.label}>Owner Name: </label>
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
                            <p id={classes.errors}>{formik.errors.ownerName}</p>
                          )}
                        <label id={classes.label}>Phone Number: </label>
                        <input
                          className={classes.tabPanelInput}
                          // disabled
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
                        <label id={classes.label}>Email: </label>
                        <input
                          className={classes.tabPanelInput}
                          type="text"
                          name="email"
                          readOnly
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

                        <label id={classes.label}>Aadhaar Number: </label>
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

                        <label id={classes.label}>Pan Number: </label>
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
                            <p id={classes.errors}>{formik.errors.panNumber}</p>
                          )}

                        <label id={classes.label}>Gender: </label>
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

                        <label id={classes.label}>Date of Birth: </label>
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
                        <label id={classes.label}>Account Number: </label>
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
                        <label id={classes.label}>Account Name: </label>
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
                        <label id={classes.label}>Bank: </label>
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
                        <label id={classes.label}>Branch Name: </label>
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
                        <label id={classes.label}>IFSC Code: </label>
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
                          <label id={classes.label}>Referral : </label>
                          <label
                            id={classes.label}
                            className={classes.radioLabel}
                          >
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
                          <label
                            id={classes.label}
                            className={classes.radioLabel}
                          >
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
                            <label id={classes.label}>
                              Referral Franchise :{" "}
                            </label>
                            <input
                              className={classes.tabPanelInput}
                              type="text"
                              name="referredFranchiseName"
                              value={formik.values?.referredFranchiseName}
                              onChange={formik.handleChange}
                            />
                            <label id={classes.label}>Referral Code: </label>
                            <input
                              className={classes.tabPanelInput}
                              type="text"
                              name="referredFranchiseCode"
                              value={formik.values?.referredFranchiseCode}
                              onChange={formik.handleChange}
                            />
                          </>
                        )}
                        <label id={classes.label}>Onboarded By :</label>
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
                            <label id={classes.label}>
                              Onboarded Person Id :
                            </label>
                            <input
                              className={classes.tabPanelInput}
                              type="text"
                              name="onBoardedPersonId"
                              value={formik.values?.onBoardedPersonId}
                              onChange={formik.handleChange}
                            />
                            <label id={classes.label}>
                              Onboarded Person Name :{" "}
                            </label>
                            <input
                              className={classes.tabPanelInput}
                              type="text"
                              name="onBoardedPersonName"
                              value={formik.values?.onBoardedPersonName}
                              onChange={formik.handleChange}
                            />
                          </>
                        )}

                        <label id={classes.label}>User Plan: </label>
                        <select
                          className={classes.tabPanelInput}
                          name="userPlan"
                          value={formik.values?.userPlan}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                        >
                          <option hidden>Select Plan</option>
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

export default FranchiseEdit;
