import React, { useState } from "react";
import classes from "./PanCard.module.css";
import Modal from "../../modal/Modal";

const PanCard = ({ work }) => {
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
      <p className={classes.heading}>TASK INFORMATION :</p>
      <div className={classes.basic}>
        <p>
          <strong>PAN TYPE:</strong> {work?.panType.toUpperCase()}
        </p>
        <p>
          <strong>CUSTOMER NAME:</strong> {work?.customerName.toUpperCase()}
        </p>
        <p>
          <strong>EMAIL ID:</strong> {work?.email}
        </p>
        <p>
          <strong>PHONE NUMBER:</strong> {work?.phoneNumber}
        </p>
        <p>
          <strong>FATHER'S NAME:</strong> {work?.fatherName.toUpperCase()}
        </p>

        {(work?.panType?.toLowerCase() === "newpancard" ||
          work?.panType?.toLowerCase() === "minorpancard" ||
          work?.panType?.toLowerCase() === "duplicateorchangepancard") && (
          <p>
            <strong>AADHAAR NUMBER:</strong> {work?.aadhaarNumber}
          </p>
        )}
        {work?.panType?.toLowerCase() === "minorpancard" ? (
          <>
            <p>
              <strong>REPRESENTATIVE NAME:</strong>{" "}
              {work?.representativeName.toUpperCase()}
            </p>
            <p>
              <strong>REPRESENTATIVE RELATION:</strong>{" "}
              {work?.representativeRelation.toUpperCase()}
            </p>
          </>
        ) : work?.panType?.toLowerCase() === "duplicateorchangepancard" ? (
          <>
            <p>
              <strong>PAN NUMBER:</strong> {work?.panNumber}
            </p>
            <p>
              <strong>CHOOSE YOUR SERVICE:</strong>{" "}
              {work?.isDuplicateOrChangePan.toUpperCase()}
            </p>
            {work?.isDuplicateOrChangePan?.toLowerCase() === "duplicate" && (
              <p>
                <strong>REASON FOR DUPLICATE:</strong>{" "}
                {work?.reasonForDuplicate.toUpperCase()}
              </p>
            )}
            {work?.isDuplicateOrChangePan?.toLowerCase() === "change" && (
              <>
                <p>
                  <strong>NEW NAME:</strong> {work?.nameChange.toUpperCase()}
                </p>
                <p>
                  <strong>NEW ADDRESS:</strong>{" "}
                  {work?.addressChange.toUpperCase()}
                </p>
                <p>
                  <strong>UPDATED DATE OF BIRTH:</strong> {work?.dobChange}
                </p>
                <p>
                  <strong>UPDATED FATHER'S NAME:</strong>{" "}
                  {work?.changeFatherName.toUpperCase()}
                </p>
              </>
            )}
          </>
        ) : work?.panType?.toLowerCase() === "nripancard" ? (
          <p>
            <strong>ABROAD ADDRESS:</strong> {work?.abroadAddress.toUpperCase()}
          </p>
        ) : null}
      </div>

      <div>
        <p className={classes.heading}>DOCUMENTS SUBMITTED</p>
        <div className={classes.basic}>
          <>
            <div>
              <p>
                <strong>PROOF OF BIRTH: </strong>
              </p>
              {DocumentView(work?.proofOfDOB, "Proof Of DOB")}
            </div>
            <div>
              <p>
                <strong>PROOF OF ADDRESS: </strong>
              </p>
              {DocumentView(work?.proofOfAddress, "Proof Of Address")}
            </div>

            {(work?.panType?.toLowerCase() === "newpancard" ||
              work?.panType?.toLowerCase() === "duplicateorchangepancard") && (
              <>
                <div>
                  <p>
                    <strong>AADHAAR FRONT: </strong>
                  </p>
                  {DocumentView(work?.aadhaarFront, "Aadhaar Front")}
                </div>
                <div>
                  <p>
                    <strong>AADHAAR BACK: </strong>
                  </p>
                  {DocumentView(work?.aadhaarBack, "Aadhaar Back")}
                </div>
              </>
            )}

            {(work?.panType?.toLowerCase() === "minorpancard" ||
              work?.panType?.toLowerCase() === "nripancard") && (
              <>
                <div>
                  <p>
                    <strong>PROOF OF IDENTITY: </strong>
                  </p>
                  {DocumentView(work?.proofOfIdentity, "Proof of Identity")}
                </div>
              </>
            )}
          </>

          <>
            {(work?.panType?.toLowerCase() === "newpancard" ||
              work?.panType?.toLowerCase() === "duplicateorchangepancard" ||
              work?.panType?.toLowerCase() === "nripancard") && (
              <>
                <div>
                  <p>
                    <strong>PHOTO:</strong>{" "}
                  </p>
                  <p>
                    {/* <img
                      className={classes.documentImages}
                      src={work?.photo}
                      alt="Photo"
                    /> */}
                    {DocumentView(work?.photo, "Photo")}
                  </p>
                </div>
                <div>
                  <p>
                    <strong>SIGNATURE:</strong>{" "}
                  </p>
                  <p>
                    {/* <img
                      className={classes.documentImages}
                      src={work?.signature}
                      alt="Signature"
                    /> */}
                    {DocumentView(work?.signature, "signature")}
                  </p>
                </div>
              </>
            )}

            {work?.panType?.toLowerCase() === "minorpancard" && (
              <>
                <div>
                  <p>
                    <strong>REPRESENTATIVE AADHAAR FRONT: </strong>
                  </p>
                  {DocumentView(
                    work?.representativeAadhaarFront,
                    "Representative Aadhaar Front"
                  )}
                </div>
                <div>
                  <p>
                    <strong>REPRESENTATIVE AADHAAR BACK: </strong>
                  </p>
                  {DocumentView(
                    work?.representativeAadhaarBack,
                    "Representative Aadhaar Back"
                  )}
                </div>
                <div>
                  <p>
                    <strong>REPRESENTATIVE SIGNATURE:</strong>{" "}
                  </p>
                  <p>
                    <img
                      className={classes.documentImages}
                      src={work?.representativeSignature}
                      alt="Representative Signature"
                    />
                  </p>
                </div>
              </>
            )}
          </>
        </div>
      </div>
    </div>
  );
};

export default PanCard;
