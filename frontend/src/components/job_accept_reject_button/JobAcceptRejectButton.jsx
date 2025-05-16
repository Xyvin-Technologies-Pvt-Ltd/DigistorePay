import React, { useState, useEffect } from "react";
import Modal from "../modal/Modal.jsx";
import classes from "./JobAcceptRejectButton.module.css";
import UploadButton from "../upload_button/UploadButton.jsx";
import { fileMimeType } from "../../data/filemimetype.jsx";
import toast from "react-hot-toast";
import axios from "axios";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useNavigate, useLocation } from "react-router-dom";
const JobAcceptRejectButton = ({ Formik, handleForm, setIsUploaded }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [uploadFeild, setUploadFeild] = useState();

  const navigate = useNavigate();
  const { state: work } = useLocation();

  const {
    values,
    resetForm,
    handleChange,
    handleBlur,
    touched,
    errors,
    handleSubmit,
  } = useFormik({
    initialValues: {
      reason: "",
      rejectReason: "",
    },
    validationSchema: Yup.object({
      reason: Yup.string().required("Reason is required"),
    }),
    onSubmit: async (values) => {
      const RejectApiUrl =
        Formik.values?.tableName === "Pan Card"
          ? "/pancard/staffPanCardReject"
          : Formik.values?.tableName === "Passport"
          ? "/passport/passportUpdateReject"
          : "";
      const formData = new FormData();
      formData.append("workId", work.workId);
      formData.append("reason", values.reason);
      formData.append("rejectReason", values.reason);
      try {
        const res = await axios.put(RejectApiUrl, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        if (res.data.errorcode) {
          toast.error(res.data.msg, { id: "workDetails" });
        } else {

          toast.success("Submitted Succesfully", { id: "rejectReason" });
          resetForm();
          setIsModalOpen(false);
          navigate("/profile/jobs");
        }
      } catch (error) {
        toast.error(error.response?.data?.message || "Something went wrong", {
          id: "workDetails",
        });
      }
    },
  });

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    resetForm();
  };

  // set which service is you doing....

  useEffect(() => {
    Formik.values.tableName === "Pan Card"
      ? setUploadFeild("acknowledgementFile")
      : Formik.values.tableName === "Passport"
      ? setUploadFeild("passportFile")
      : "";
  }, [Formik.values.tableName]);

  return (
    <>
      <div className={classes.buttonLayout}>
        <div className={classes.button}>
          <UploadButton
            uploadFeild={uploadFeild}
            Formik={Formik}
            allowedMimeTypes={fileMimeType.documentsAndImages}
            btnName="Upload"
            setIsUploaded={setIsUploaded}
          />
          <button
            type="submit"
            className={classes.buttonResolve}
            onClick={handleForm}
          >
            RESOLVE
          </button>
          <form onSubmit={handleSubmit}>
            <button className={classes.buttonReject} onClick={handleOpenModal}>
              REJECT
            </button>
            {isModalOpen && (
              <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
                <div className={classes.modal}>
                  <p className={classes.modalHeading}>
                    Specify the reason for rejection
                  </p>
                  <div className={classes.modalSub}>
                    <textarea
                      className={classes.textArea}
                      placeholder="Add Remark"
                      name="reason"
                      value={values.reason}
                      rows={5}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    ></textarea>
                    {/* {touched.reason && errors.reason && (
                      <p className={classes.error}>{errors.reason}</p>
                    )} */}
                    <div className={classes.modalButton}>
                      <button
                        type="button"
                        className={classes.modalButtonCancel}
                        onClick={handleCloseModal}
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        disabled={!values.reason}
                        className={`${classes.modalButtonSave} ${
                          !values.reason ? classes.disabledButton : ""
                        }`}
                      >
                        Submit
                      </button>
                    </div>
                  </div>
                </div>
              </Modal>
            )}
          </form>
        </div>
      </div>
    </>
  );
};

export default JobAcceptRejectButton;
