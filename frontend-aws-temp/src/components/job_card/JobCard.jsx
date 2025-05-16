import React, { useState, useEffect } from "react";
import classes from "./JobCard.module.css";
import { useSelector } from "react-redux";
import { useFormik } from "formik";
import axios from "axios";
import toast from "react-hot-toast";
import Modal from "../modal/Modal";
import {
  useParams,
  useLocation,
  Navigate,
  useNavigate,
} from "react-router-dom";
import { BsThreeDotsVertical } from "react-icons/bs";
import JobAcceptRejectButton from "../../components/job_accept_reject_button/JobAcceptRejectButton";
import PanCard from "../work_info_card/pancard_info_card/PanCard";
import TicketBooking from "../work_info_card/ticket_booking_info_card/TicketBooking";
import Passport from "../work_info_card/passport_info_card/Passport";
import AccountingService from "../work_info_card/accounting_service_info_card/AccountingService";
import PanCardSubmit from "../work_submit_card/pancard_submit/PanCardSubmit";
import PassportSubmit from "../work_submit_card/passport_submit/PassportSubmit";

const JobCard = () => {
  const { currentUser } = useSelector((state) => state.user);
  const { workId } = useParams();
  const { state: work } = useLocation();
  const [isDropdown, setIsDropdown] = useState(false);
  const [isOnBreak, setIsOnBreak] = useState(false);
  const [page, setPage] = useState(1);
  const pageLimit = 10;
  const [content, setContent] = useState({});
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
  const [selectStaffId, setselectStaffId] = useState("");
  const [isUploaded, setIsUploaded] = useState(false);
  const navigate = useNavigate();

  // dropdown open
  const dropDownOpen = () => {
    setIsDropdown((prev) => !prev);
  };

  // Work break & continue
  const handleTakeBreak = () => {
    setIsOnBreak(true);
  };

  const handleContinue = () => {
    setIsOnBreak(false);
  };

  const handleOkClick = () => {
    if (selectStaffId) {
      handleSelect(workId, selectStaffId);
      setIsAssignModalOpen(false);
    } else {
      toast.error("Please select a staff member to assign.");
    }
  };

  const handleSelect = async (workId, selectStaffId) => {
    try {
      const res = await axios.put(`/adminEditRoute/staffAssign`, {
        workId,
        assignedId: selectStaffId,
      });
      if (res.data.errorcode) {
        toast.error(res.data.msg || "Failed to assign staff", {
          id: "staffAssign",
        });
      } else {
        toast.success("Staff assigned successfully", { id: "staffAssign" });
        navigate("/profile/jobs");
      }
    } catch (error) {
      toast.error(error.message || "Failed to assign staff. Please try again", {
        id: "staffAssign",
      });
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/admin/getAllStaff`, {
          params: {
            page: page,
            pageLimit: pageLimit,
          },
        });
        if (res.data.errorcode) {
          toast.error(error.data.msg || "Failed to fetch staff data", {
            id: "staffFetch",
          });
        } else {
          setContent(res.data.data.rows);
        }
      } catch (error) {
        toast.error(
          error.response?.data?.message ||
            "Something went wrong. Please try again.",
          { id: "staffFetch" }
        );
      }
    };
    fetchData();
  }, [page, pageLimit]);

  // work api

  const Formik = useFormik({
    initialValues: {
      ...work,
      workId: work?.workId,
      acknowledgementNumber: "",
      username: "",
      password: "",

      passportAppointmentDate: null,
      acknowledgementFile: null,
      passportFile: null,
    },
  });

  const handleForm = async () => {
    const formData = new FormData();

    formData.append("workId", work?.workId);
    formData.append("acknowledgementFile", Formik.values.acknowledgementFile);
    formData.append(
      "acknowledgementNumber",
      Formik.values.acknowledgementNumber
    );
    formData.append("username", Formik.values.username);
    formData.append(
      "passportAppointmentDate",
      Formik.values.passportAppointmentDate
    );
    formData.append("password", Formik.values.password);
    formData.append("passportFile", Formik.values.passportFile);

    const url =
      Formik.values?.tableName === "Pan Card"
        ? "/pancard/staffPanCardComplete"
        : Formik.values?.tableName === "Passport"
        ? "/passport/passportUpdateComplete"
        : "";

    try {
      const res = await axios.put(url, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (res.data.errorcode) {
        toast.error(res.data.msg, { id: "workUpdate" });
      } else {
        toast.success("Submitted successfully", { id: "workUpdate" });
        navigate("/profile/jobs");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong", {
        id: "workUpdate",
      });
    }
  };

  return (
    <>
      {currentUser &&
      (currentUser.data.userType === "admin" ||
        currentUser.data.userType === "staff" ||
        currentUser.data.userType === "franchise") ? (
        <div className={classes.mainLayout}>
          <div className={classes.subLayout}>
            <div className={classes.content}>
              <div className={classes.mainContainer}>
                <div className={classes.subContainer}>
                  <div className={classes.headingContainer}>
                    <p className={classes.heading}>{work?.tableName}</p>
                    <div className={classes.buttonIcon}>
                      {(currentUser.data.userType === "admin" ||
                        currentUser.data.userType === "staff") &&
                        (work?.status === "inQueue" ||
                          work?.status === "inProgress") && (
                          <p onClick={dropDownOpen}>
                            <BsThreeDotsVertical />
                          </p>
                        )}
                      {isDropdown && (
                        <div className={classes.dropdownMenu}>
                          {currentUser.data.userType === "admin" && (
                            <>
                              <p
                                className={classes.dropdownButton}
                                onClick={() => setIsAssignModalOpen(true)}
                              >
                                {work?.assignedId ? "Re-assign" : "Assign"}
                              </p>
                              {isAssignModalOpen && (
                                <div className={classes.abc}>
                                  <Modal
                                    isOpen={isAssignModalOpen}
                                    onClose={() => setIsAssignModalOpen(false)}
                                    title={"Assign Staff"}
                                  >
                                    <div className={classes.modal_assign}>
                                      <select
                                        className={classes.dropdownSelect}
                                        id={classes.styledInput}
                                        onChange={(e) =>
                                          setselectStaffId(e.target.value)
                                        }
                                      >
                                        <option>Select Staff</option>
                                        {content
                                          .filter(
                                            (staff) =>
                                              staff.employeeId !==
                                              work?.assignedId
                                          )
                                          .map((staff) => (
                                            <option
                                              key={staff.employeeId}
                                              value={staff.employeeId}
                                            >
                                              {`${staff.firstName} ${staff.lastName}`}
                                            </option>
                                          ))}
                                      </select>
                                      <div className={classes.buttons}>
                                        <button
                                          className={classes.cancelButton}
                                          onClick={() => {
                                            setIsAssignModalOpen(false);
                                            setIsDropdown(false);
                                          }}
                                        >
                                          Cancel
                                        </button>
                                        <button
                                          className={classes.okButton}
                                          onClick={() => {
                                            handleOkClick();
                                            setIsDropdown(false);
                                          }}
                                        >
                                          Assign
                                        </button>
                                      </div>
                                    </div>
                                  </Modal>
                                </div>
                              )}
                            </>
                          )}
                          {currentUser.data.userType === "staff" && (
                            <>
                              {!isOnBreak ? (
                                <p
                                  className={classes.dropdownButton}
                                  onClick={handleTakeBreak}
                                >
                                  Take a Break
                                </p>
                              ) : (
                                <p
                                  className={classes.dropdownButton}
                                  onClick={handleContinue}
                                >
                                  Continue
                                </p>
                              )}
                            </>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className={classes.basic}>
                    <div>
                      <p>
                        <strong>WORK ID : </strong> {workId}
                      </p>
                      <p>
                        <strong>CREATED AT : </strong>{" "}
                        {new Intl.DateTimeFormat("en-US", {
                          year: "numeric",
                          month: "2-digit",
                          day: "2-digit",
                          hour: "2-digit",
                          minute: "2-digit",
                          second: "2-digit",
                        }).format(new Date(work?.createdAt))}
                      </p>
                      <p>
                        <strong>CUSTOMER PHONE :</strong> {work?.phoneNumber}
                      </p>
                      {currentUser?.data?.userType !== "franchise" && (
                        <p>
                          <strong>ALLOCATED TIME : </strong> 5 mins{" "}
                        </p>
                      )}
                      {currentUser.data.userType === "admin" &&
                        work?.assignedOn && (
                          <p>
                            <strong>ASSIGNED ON :</strong>{" "}
                            {new Intl.DateTimeFormat("en-US", {
                              year: "numeric",
                              month: "2-digit",
                              day: "2-digit",
                              hour: "2-digit",
                              minute: "2-digit",
                              second: "2-digit",
                            }).format(new Date(work?.assignedOn))}
                          </p>
                        )}
                    </div>
                    <div>
                      <p>
                        <strong>FRANCHISE NAME :</strong>{" "}
                        {currentUser?.data?.userType.toLowerCase() ===
                        "franchise"
                          ? currentUser?.data?.franchiseName.toUpperCase()
                          : work?.franchiseName?.toUpperCase()}
                      </p>
                      <p>
                        <strong>CUSTOMER NAME :</strong>{" "}
                        {work?.customerName?.toUpperCase()}
                      </p>

                      <p
                        className={classes.status}
                        id={`${
                          work?.status?.toLowerCase() === "completed"
                            ? classes.completed
                            : work?.status?.toLowerCase() === "inprogress"
                            ? classes.inProgress
                            : work?.status?.toLowerCase() === "inqueue"
                            ? classes.inqueue
                            : classes.rejected
                        }`}
                      >
                        <strong>STATUS :</strong>{" "}
                        {work?.status?.toLowerCase() === "completed"
                          ? "COMPLETED"
                          : work?.status?.toLowerCase() === "inprogress"
                          ? "PROCESSING"
                          : work?.status?.toLowerCase() === "inqueue"
                          ? "REQUESTED"
                          : "REJECTED"}
                        {/*  */}
                      </p>
                      {currentUser.data.userType !== "franchise" && (
                        <p>
                          <strong>PRIORITY: </strong>{" "}
                          <span className={classes.priority} id={classes.high}>
                            High
                          </span>
                        </p>
                      )}
                      {currentUser.data.userType === "admin" &&
                        work?.assignedId && (
                          <p>
                            <strong>ASSIGNED TO :</strong>{" "}
                            {work?.assignedId?.toUpperCase()}
                          </p>
                        )}
                    </div>
                  </div>
                </div>
                <div className={classes.subContainer2}>
                  <div>
                    {(work?.tableName === "Bus Booking" ||
                      work?.tableName === "Train Booking") && (
                      <TicketBooking work={work} />
                    )}
                    {work?.tableName === "Pan Card" && <PanCard work={work} />}
                    {work?.tableName === "Passport" && <Passport work={work} />}
                    {(work?.tableName === "GST Registration" ||
                      work?.tableName === "GST Filing" ||
                      work?.tableName === "IncomeTax Filing" ||
                      work?.tableName === "Company Formation" ||
                      work?.tableName === "Financial Statement" ||
                      work?.tableName === "K-Swift" ||
                      work?.tableName === "Partnership Deed") && (
                      <AccountingService work={work} />
                    )}
                  </div>
                </div>
                {(work?.status === "completed" || isUploaded) && (
                  <div className={classes.subContainer4}>
                    <p>
                      <strong>UPLOADED DOCUMENTS :</strong>
                    </p>
                    {work?.tableName === "Pan Card" ? (
                      <PanCardSubmit Formik={Formik} />
                    ) : work?.tableName === "Passport" ? (
                      <PassportSubmit Formik={Formik} />
                    ) : (
                      ""
                    )}
                  </div>
                )}
                {currentUser.data.userType !== "student" && (
                  <div className={classes.subContainer3}>
                    {(work?.status === "inQueue" ||
                      work?.status === "inProgress") &&
                      currentUser.data.userType === "staff" && (
                        <>
                          <hr />
                          <div>
                            <JobAcceptRejectButton
                              Formik={Formik}
                              handleForm={handleForm}
                              setIsUploaded={setIsUploaded}
                            />
                          </div>
                        </>
                      )}
                    {work?.status === "rejected" && (
                      <p>
                        <strong>REASON FOR REJECTION :</strong>{" "}
                        {work?.tableName === "Passport" ? (
                          <span style={{ color: "red" }}>
                            {work?.rejectReason}
                          </span>
                        ) : (
                          <span style={{ color: "red" }}>{work?.reason}</span>
                        )}
                      </p>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Navigate to="/profile" />
      )}
    </>
  );
};

export default JobCard;
