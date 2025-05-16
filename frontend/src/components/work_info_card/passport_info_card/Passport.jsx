import React, { useState } from "react";
import classes from "./Passport.module.css";
import Modal from "../../modal/Modal";

const Passport = ({ work }) => {
  const [modalData, setModalData] = useState({
    isOpen: false,
    url: null,
    title: null,
  });
  const handleModalOpen = (url, title) => {
    setModalData((prev) => ({
      isOpen: !prev.isOpen,
      url: prev.isOpen ? null : url,
      title: prev.isOpen ? null : title,
    }));
  };
  const getFileExtension = (url) => url?.split(".").pop().toLowerCase();
  const DocumentView = (url, title) => {
    return getFileExtension(url) === "pdf" ? (
      <iframe
        className="document"
        src={`https://docs.google.com/viewer?url=${url}&embedded=true`}
        title={title}
        width="300px"
      ></iframe>
    ) : (
      <>
        <img
          onClick={() => handleModalOpen(url, title)}
          className={classes.documentImages}
          src={url}
          alt={title}
        />

        <Modal isOpen={modalData.isOpen} onClose={() => handleModalOpen()}>
          <div className={classes.customModalContent}>
            <img
              src={modalData.url}
              alt={modalData.title}
              id={classes.modalPic}
            />
          </div>
        </Modal>
      </>
    );
  };
  return (
    <div>
      <h4 className={classes.heading}>TASK INFORMATION :</h4>
      <div className={classes.basic}>
        <div>
          {work?.oldPassportNumber && (
            <p>
              <strong> OLD PASSPORT NUMBER:</strong> {work?.oldPassportNumber}
            </p>
          )}
          <p>
            <strong>CUSTOMER NAME:</strong> {work?.customerName?.toUpperCase()}
          </p>
          <p>
            <strong>MOBILE NUMBER:</strong> {work?.phoneNumber}
          </p>
          <p>
            <strong>EMAIL:</strong> {work?.email}
          </p>
          <p>
            <strong>EDUCATIONAL QUALIFICATION:</strong>{" "}
            {work?.educationQualification?.toUpperCase()}
          </p>
          <p>
            <strong>MARRIED:</strong> {work?.maritalStatus?.toUpperCase()}
          </p>

          {work?.maritalStatus === "yes" && (
            <p>
              <strong> SPOUSE NAME:</strong> {work?.spouseName?.toUpperCase()}
            </p>
          )}
          <p>
            <strong>BIRTH PLACE:</strong>
            {work?.birthPlace?.toUpperCase()}
          </p>
          <p>
            <strong>IDENTIFICATION MARK 1:</strong>{" "}
            {work?.identificationMark1?.toUpperCase()}
          </p>
          <p>
            <strong> IDENTIFICATION MARK 2:</strong>{" "}
            {work?.identificationMark2?.toUpperCase()}
          </p>
        </div>
        <div>
          <p>
            <strong>POLICE STATION:</strong>{" "}
            {work?.policeStation?.toUpperCase()}
          </p>
          <p>
            <strong>VILLAGE:</strong> {work?.village?.toUpperCase()}
          </p>
          <p>
            <strong>EMERGENCY CONTACT PERSON:</strong>{" "}
            {work?.emergencyContactPerson?.toUpperCase()}
          </p>
          <p>
            <strong>EMERGENCY CONTACT NUMBER:</strong>
            {work?.emergencyContactNumber}
          </p>
          <p>
            <strong> PERSONAL CONTACT ADDRESS: </strong>
            {work?.personalAddress?.toUpperCase()}
          </p>
          <p>
            <strong>EMERGENCY CONTACT ADDRESS:</strong>{" "}
            {work?.emergencyContactAddress?.toUpperCase()}
          </p>
          <p>
            <strong>PASSPORT OFFICE PREFERENCE:</strong>{" "}
            {work?.passportOfficePreference?.toUpperCase()}
          </p>
          <p>
            <strong>APPOINTMENT DATE PREFERENCE 1:</strong>{" "}
            {work?.appointmentDatePreference1?.split("T")[0]}
          </p>
          <p>
            <strong>APPOINTMENT DATE PREFERENCE 2:</strong>{" "}
            {work?.appointmentDatePreference2?.split("T")[0]}
          </p>
          <p>
            <strong>APPOINTMENT DATE PREFERENCE 3:</strong>{" "}
            {work?.appointmentDatePreference3?.split("T")[0]}
          </p>
        </div>
      </div>
      <h4 className={classes.heading}>DOCUMENTS UPLOADED:</h4>
      <div className={classes.basic}>
        <div>
          <p>
            <strong> PROOF OF IDENTITY:</strong>
          </p>
          {DocumentView(work?.proofOfIdentity, "Proof of Identity")}
          <p>
            <strong> PROOF OF DATE OF BIRTH:</strong>
          </p>
          {DocumentView(work?.proofOfDob, "Proof of Date of Birth ")}
        </div>
        <div>
          <p>
            <strong> PROOF OF ADDRESS:</strong>
          </p>
          {DocumentView(work?.proofOfAddress, "Proof of Address ")}
          {work?.oldPassportCopy && (
            <>
              <p>
                <strong> OLD PASSPORT COPY:</strong>{" "}
              </p>
              {DocumentView(work.oldPassportCopy, "Old Passport Copy")}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Passport;
