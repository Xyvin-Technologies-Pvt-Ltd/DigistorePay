import { useState, useEffect } from "react";
import { Formik, useFormik } from "formik";
import classes from "./AccountView.module.css";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { useNavigate } from "react-router-dom";
import { fetchAccount } from "../../utils/fetchAccount";
import { BsPrinterFill } from "react-icons/bs";
import { FaComputer } from "react-icons/fa6";
import { useSelector } from "react-redux";
import { FaEdit } from "react-icons/fa";
import axios from "axios";
import { toast } from "react-hot-toast";
import { walletAdminSchema } from "../../Validations/wallet_request_form/WalletRequestValidation";
import {
  FaSimCard,
  FaLaptop,
  FaRegIdCard,
  FaMobile,
  FaIdCard,
} from "react-icons/fa";
import { MdAdfScanner, MdInsertPhoto, MdVerified } from "react-icons/md";
import Modal from "../modal/Modal";
import FranchiseEdit from "../edit/franchise/FranchiseEdit";
import StaffEdit from "../edit/staff/StaffEdit";

function AccountView({ data, setData }) {
  const { currentUser } = useSelector((state) => state.user);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [modalAmount, setModalAmount] = useState(false);
  const [isVerified, setIsVerified] = useState(data?.verified ?? false);
  const navigate = useNavigate();

  useEffect(() => {
    setIsVerified(data?.verified ?? false);
  }, [data?.verified]);

  useEffect(() => {
    if (currentUser?.data) {
      currentUser?.data.userType;
    }
  }, [currentUser]);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen((prev) => !prev);
  };
  const handleProfileModalOpen = () => {
    setIsProfileOpen(true);
  };
  const handleProfileModalClose = () => {
    setIsProfileOpen((prev) => !prev);
  };

  const handleAmountModalOpen = () => {
    setModalAmount(true);
  };

  const handleAmountModalClose = () => {
    setModalAmount((prev) => !prev);
  };

  const handleToggle = async () => {
    try {
      const response = await axios.put(`/adminEditRoute/verifyFranchise`, {
        uniqueId: data?.franchiseUniqueId,
        value: !isVerified,
      });

      if (response.status === 200) {
        toast.success("Verification status updated", { id: "verified" });
        setIsVerified((prev) => !prev);
        fetchAccount(data?.franchiseUniqueId, setData);
      } else {
        toast.error("Error updating verification status", { id: "verified" });
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong", {
        id: "verified",
      });
    }
  };

  const formik = useFormik({
    initialValues: {
      amount: 0,
      paymentMethod: "",
    },
    validationSchema: walletAdminSchema,
    onSubmit: async (values) => {
      const amount = { [values?.paymentMethod]: parseFloat(values?.amount) };
      try {
        const response = await axios.put(`adminEditRoute/updateWallet`, {
          uniqueId: data?.franchiseUniqueId,
          amount: JSON.stringify(amount),
        });
        if (response.status === 200) {
          fetchAccount(data?.franchiseUniqueId, setData);
          setModalAmount(false);
          toast.success("Successful", { id: "adminEdit" });
          fetchAccount(data?.franchiseUniqueId, setData);
        } else {
          setModalAmount(false);
          toast.error("Payment failed", { id: "adminEdit" });
        }
      } catch (error) {
        toast.error(error.response?.data?.message || "Something went wrong", {
          id: "adminEdit",
        });
      } finally {
        formik.resetForm();
      }
    },
  });

  return (
    <div className={classes.mainContainer}>
      <div className={classes.subContainer}>
        <div className={classes.imgContainer}>
          <img
            onClick={handleProfileModalOpen}
            className={classes.profileImages}
            src={
              data?.shopPic || data?.profilePic
                ? data.shopPic ?? data?.profilePic
                : "/assets/placeholder.jpg"
            }
          />

          <Modal isOpen={isProfileOpen} onClose={handleProfileModalClose}>
            <div className={classes.customModalContent}>
              <img
                id={classes.modalPic}
                src={
                  data?.shopPic || data?.profilePic
                    ? data.shopPic ?? data?.profilePic
                    : "/assets/placeholder.jpg"
                }
              />
            </div>
          </Modal>
        </div>
        <div className={classes.leftGridContent}>
          {data?.userType === "franchise" &&
            currentUser?.data?.userType === "admin" && (
              <div className={classes.account}>
                <p className={classes.amountView}>
                  <strong>Wallet Balance :</strong>
                  <span
                    id={data?.walletBalance <= 0 ? classes.red : classes.green}
                  >
                    {"   "}
                    {data?.walletBalance}
                  </span>
                </p>
                <FaEdit
                  className={classes.amountEditButton}
                  onClick={handleAmountModalOpen}
                />
              </div>
            )}
          <Modal
            isOpen={modalAmount}
            onClose={handleAmountModalClose}
            title={"Wallet Update"}
          >
            <div className={classes.ModalContent}>
              <form onSubmit={formik.handleSubmit}>
                <div className={classes.amountmain}>
                  <select
                    name="paymentMethod"
                    className={classes.selectMethode}
                    value={formik.values?.paymentMethod}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  >
                    <option value="" hidden className={classes.dropdownItems}>
                      Select payment method
                    </option>
                    <option value="credit" className={classes.dropdownItems}>
                      Credit
                    </option>
                    <option value="debit" className={classes.dropdownItems}>
                      Debit
                    </option>
                  </select>
                  {formik.errors.paymentMethod &&
                    formik.touched.paymentMethod && (
                      <p id={classes.errors}>{formik.errors.paymentMethod}</p>
                    )}
                  <input
                    type="number"
                    name="amount"
                    value={formik.values?.amount}
                    className={classes.amountInputFeild}
                    placeholder="Enter the amount"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    onKeyDown={(e) => {
                      if (e.key === "ArrowUp" || e.key === "ArrowDown") {
                        e.preventDefault();
                      }
                    }}
                  />
                  {formik.errors.amount && formik.touched.amount && (
                    <p id={classes.errors}>{formik.errors.amount}</p>
                  )}
                </div>
                <div className={classes.modalButtons}>
                  <button
                    className={classes.cancel}
                    id={classes.buttonStyle}
                    onClick={() => {
                      setModalAmount(false);
                      formik.resetForm();
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    className={`${classes.confirm} ${
                      formik.isSubmitting ? classes.disabledButton : ""
                    }`}
                    id={classes.buttonStyle}
                    type="submit"
                    disabled={formik.isSubmitting}
                  >
                    {formik.isSubmitting ? "Processing.." : "Submit"}
                  </button>
                </div>
              </form>
            </div>
          </Modal>
          <p>
            <strong>Date Of Birth:</strong> {data?.dateOfBirth?.split("T")[0]}
          </p>

          {data?.userType != "staff" && (
            <p>
              <strong>Pan Center:</strong> {data?.panCenter ? "Yes" : "No"}
            </p>
          )}
          {data?.userType === "staff" ? (
            <>
              <p>
                <strong>Blood Group:</strong> {data?.bloodGroup}
              </p>
              <div className={classes.digitalElementsIcon}>
                <FaLaptop
                  title="Laptop"
                  className={
                    data?.digitalElements?.includes("laptop")
                      ? classes.green
                      : classes.red
                  }
                />

                <FaIdCard
                  title="Visting Card"
                  className={
                    data?.digitalElements?.includes("vistingCard")
                      ? classes.green
                      : classes.red
                  }
                />
                <FaSimCard
                  title="SIM"
                  className={
                    data?.digitalElements?.includes("sim")
                      ? classes.green
                      : classes.red
                  }
                />
                <FaMobile
                  title="Phone"
                  className={
                    data?.digitalElements?.includes("phone")
                      ? classes.green
                      : classes.red
                  }
                />
                <FaRegIdCard
                  title="ID Card"
                  className={
                    data?.digitalElements?.includes("idCard")
                      ? classes.green
                      : classes.red
                  }
                />
                <MdInsertPhoto
                  title="Poster/Broucher"
                  className={
                    data?.digitalElements?.includes("posterOrBroucher")
                      ? classes.green
                      : classes.red
                  }
                />
                {/* others */}
                {/* <MdOutlineDevicesOther
                  className={
                    data?.digitalElements?.includes("other")
                      ? classes.green
                      : classes.red
                  }
                /> */}
              </div>
            </>
          ) : (
            <>
              {data?.panCenter && (
                <div className={classes.digitalElementsIcon}>
                  <BsPrinterFill
                    className={
                      data?.digitalElements?.includes("printer")
                        ? classes.green
                        : classes.red
                    }
                  />
                  <FaComputer
                    className={
                      data?.digitalElements?.includes("computer")
                        ? classes.green
                        : classes.red
                    }
                  />
                  <MdAdfScanner
                    className={
                      data?.digitalElements?.includes("scanner")
                        ? classes.green
                        : classes.red
                    }
                  />
                </div>
              )}
            </>
          )}
        </div>
      </div>

      <div className={classes.subContainer}>
        <div>
          <div className={classes.minicontainer}>
            <span className={classes.verify}>
              {data?.userType === "staff" ? (
                <p className={classes.franchiseName} id={classes.name}>
                  {`${data?.firstName?.toUpperCase()} ${data?.lastName?.toUpperCase()}`}
                </p>
              ) : (
                <>
                  <p className={classes.franchiseName}>
                    {data?.franchiseName?.toUpperCase()}
                  </p>
                </>
              )}

              <span>
                {currentUser?.data.userType === "admin" &&
                data?.userType !== "staff" ? (
                  <div className={classes.toggleswitch}>
                    <input
                      type="checkbox"
                      className={classes.checkbox}
                      name="toggleSwitch"
                      id="toggleSwitch"
                      value={isVerified}
                      // defaultChecked={isVerified}
                      checked={isVerified}
                      onChange={handleToggle}
                    />
                    <label className={classes.label} htmlFor="toggleSwitch">
                      <span className={classes.switch}></span>
                    </label>
                  </div>
                ) : currentUser?.data.userType === "franchise" &&
                  data?.verified ? (
                  <MdVerified id={classes.verifiedMark} />
                ) : null}
              </span>
            </span>

            <>
              <FaEdit className={classes.editIcon} onClick={openModal} />

              {isModalOpen &&
                (data?.userType === "staff" ? (
                  <StaffEdit
                    isModalOpen={isModalOpen}
                    closeModal={closeModal}
                    data={data}
                    currentUser={currentUser}
                    setData={setData}
                  />
                ) : (
                  <FranchiseEdit
                    isModalOpen={isModalOpen}
                    closeModal={closeModal}
                    data={data}
                    currentUser={currentUser}
                    setData={setData}
                  />
                ))}
            </>
          </div>
          {data?.userType === "staff" ? (
            <>
              <p>
                <strong> Employee ID : </strong>
                {data?.employeeId}
              </p>
              <p>
                <strong>Employment : </strong>
                {`${data?.employmentType?.toUpperCase()} - ${data?.employment?.toUpperCase()} `}
              </p>
              <p>
                <strong>Created At : </strong>
                {data?.createdAt?.split("T")[0]}
              </p>
            </>
          ) : (
            <>
              <p className={classes.accountType}>
                {data?.userType?.toUpperCase()}
              </p>
              <p>
                <strong>ID : </strong>
                {data?.franchiseUniqueId}
              </p>
              <p>
                <strong>Created At : </strong>
                {data?.createdAt?.split("T")[0]}
              </p>
            </>
          )}

          <div className={classes.planDiv}>
            {currentUser?.data.userType === "franchise" && (
              <p>
                <strong>User Plan : </strong>
                {data?.userPlan?.toUpperCase()}
              </p>
            )}

            {currentUser?.data.userType === "franchise" &&
              data?.userPlan === "free" && (
                <button
                  className={classes.planBtn}
                  onClick={() => navigate("/plan")}
                >
                  Upgrade
                </button>
              )}
          </div>
        </div>

        <div className={classes.tabContainer}>
          <Tabs>
            <TabList>
              <Tab>Contact</Tab>
              <Tab>Bank</Tab>
              {data?.userType === "staff" && <Tab>Employment</Tab>}

              {currentUser?.data.userType === "admin" &&
                data?.userType === "franchise" && (
                  <>
                    <Tab>Personal</Tab>
                    <Tab>OnBoard</Tab>
                    <Tab>Referral</Tab>
                  </>
                )}
            </TabList>

            <TabPanel>
              <div>
                {data?.userType === "staff" ? (
                  <>
                    <p>
                      <strong> Name : </strong>
                      {`${data?.firstName} ${data?.lastName}`}
                    </p>
                    <p>
                      <strong>Address : </strong>
                      {`${data?.addressLine1 || ""} ${
                        data?.addressLine2 || ""
                      }`}
                    </p>
                  </>
                ) : (
                  <>
                    <p className={classes.ownerName}>
                      <strong>Owner Name : </strong>
                      {data?.ownerName}
                    </p>
                    <p>
                      <strong>Address : </strong>
                      {`${data?.franchiseAddressLine1?.concat(
                        " ",
                        data?.franchiseAddressLine2
                      )}`}
                    </p>
                    <p>
                      <strong>Panchayath : </strong>
                      {data?.panchayath}
                    </p>
                    <p>
                      <strong>Ward : </strong>
                      {data?.ward}
                    </p>
                  </>
                )}

                <p>
                  <strong>Phone Number : </strong>
                  {data?.phoneNumber}
                </p>
                <p>
                  <strong>Email : </strong>
                  {data?.email}
                </p>
                <p>
                  <strong>Gender : </strong>
                  {data?.gender}
                </p>

                {data?.userType !== "staff" &&
                  currentUser?.data.userType === "admin" && (
                    <p>
                      <strong>Post Office: </strong>
                      {data?.postOffice}
                    </p>
                  )}

                <p>
                  <strong>State : </strong>
                  {data?.state}
                </p>

                <p>
                  <strong>District : </strong>
                  {data?.district}
                </p>
                <p>
                  <strong>Pin Code : </strong>
                  {data?.pinCode}
                </p>
                {data?.userType === "staff" && (
                  <>
                    <p>
                      <strong>City : </strong>
                      {data?.city}
                    </p>
                  </>
                )}
              </div>
            </TabPanel>

            <TabPanel>
              <div>
                <p>
                  <strong>Account Number : </strong>
                  {data?.accountNumber}
                </p>
                <p>
                  <strong>Account Name : </strong>
                  {data?.accountName}
                </p>
                <p>
                  <strong>Bank : </strong>
                  {data?.bank}
                </p>
                <p>
                  <strong>Branch Name : </strong>
                  {data?.branchName}
                </p>
                <p>
                  <strong>IFSC Code : </strong> {data?.ifscCode}
                </p>
                {currentUser?.data.userType === "admin" &&
                  data?.userType !== "staff" && (
                    <p>
                      <strong>Passbook Image : </strong>
                      <br />
                      <img
                        className={classes.documentImagesimg}
                        src={data?.bankPassbookPic}
                        alt="passbook"
                      />
                    </p>
                  )}
              </div>
            </TabPanel>
            {data?.userType === "staff" && (
              <>
                <TabPanel>
                  <div>
                    <p>
                      <strong>Employment : </strong>
                      {data?.employment}
                    </p>
                    <p>
                      <strong>Remarks : </strong>
                      {data?.remarks}
                    </p>
                    <p>
                      <strong>Date Of Joining : </strong>
                      {data?.dateOfJoin}
                    </p>
                    <p>
                      <strong>Need Training: </strong>
                      {data?.isTrainingRequired ? "Yes" : "No"}
                    </p>
                    <p>
                      <strong>Number Of Days Of Training: </strong>
                      {data?.totalTrainingDays}
                    </p>
                  </div>
                </TabPanel>
              </>
            )}

            {currentUser?.data.userType === "admin" &&
              data?.userType === "franchise" &&
              data?.userType === "franchise" && (
                <>
                  <TabPanel>
                    <div>
                      <p>
                        <strong>Pan Id: </strong>
                      </p>
                      <p>
                        <img
                          className={classes.documentImagesimg}
                          src={data?.panPic}
                          alt="PAN"
                        />
                      </p>
                      <p>
                        <strong>Aadhaar Id: </strong>
                      </p>
                      <p>
                        <img
                          className={classes.documentImagesimg}
                          src={data?.aadhaarPicFront}
                          alt="Aadhaar Front"
                        />
                      </p>
                      <p>
                        <img
                          className={classes.documentImagesimg}
                          src={data?.aadhaarPicback}
                          alt="Aadhaar Back"
                        />
                      </p>
                    </div>
                  </TabPanel>

                  <TabPanel>
                    <div>
                      <p>
                        <strong>Onboarded By : </strong>
                        {data?.onBoardedBy}
                      </p>
                      <p>
                        <strong>Onboarded Person Id : </strong>
                        {data?.onBoardedPersonId}
                      </p>
                      <p>
                        <strong>OnBoarded Person Name : </strong>
                        {data?.onBoardedPersonName}
                      </p>
                    </div>
                  </TabPanel>

                  <TabPanel>
                    <div>
                      <p>
                        <strong>Referred By: </strong>
                        {data?.referredBy ? "Yes" : "No"}
                      </p>
                      {data?.referredBy && (
                        <>
                          <p>
                            <strong>Referred Franchise Name: </strong>
                            {data.referredFranchiseName || "N/A"}
                          </p>
                          <p>
                            <strong>Referred Franchise Code: </strong>
                            {data.referredFranchiseCode || "N/A"}
                          </p>
                        </>
                      )}
                    </div>
                  </TabPanel>
                </>
              )}
          </Tabs>
        </div>
      </div>
    </div>
  );
}

export default AccountView;
