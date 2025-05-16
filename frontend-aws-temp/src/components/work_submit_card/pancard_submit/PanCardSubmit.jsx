import React, { useEffect, useState } from "react";
import classes from "./PanCardSubmit.module.css";
import toast from "react-hot-toast";
import axios from "axios";
import { useFormik } from "formik";
import { useLocation, useNavigate } from "react-router-dom";

function PanCardSubmit({ Formik }) {
  const [fileData, setFileData] = useState("");
  const { state: work } = useLocation();
  const navigate = useNavigate();

  const getFileExtension = (url) => url?.split(".").pop().toLowerCase();
  const DocumentView = (url, title) => {
    return getFileExtension(url) === "pdf" ? (
      <iframe
        src={`https://docs.google.com/viewer?url=${url}&embedded=true`}
        title={title}
        width="300px"
      ></iframe>
    ) : (
      <img className={classes.documentImages} src={url} alt={title} />
    );
  };

  const handleCheckboxChange = async (event) => {
    if (event.target.checked) {
      try {
        const res = await axios.put(`/pancard/staffPanCardVerify`, {
          workId: Formik.values.workId,
        });

        if (res.data.errorcode) {
          toast.error(res.data.msg, { id: "pan" });
        } else {
          toast.success("E-pan confirmation updated", { id: "pan" });
          navigate("/profile/jobs");
        }
      } catch (error) {
        toast.error(error.response?.data?.message || "Something went wrong", {
          id: "pan",
        });
      }
    }
  };

  useEffect(() => {
    if (Formik.values.acknowledgementFile) {
      setFileData(URL.createObjectURL(Formik.values.acknowledgementFile));
    }
  }, [Formik.values.acknowledgementFile]);

  return (
    <div className={classes.pancardsubmit}>
      <div className={classes.pancardContainer}>
        {work?.status === "completed" ? (
          DocumentView(work?.acknowledgementFile, "title")
        ) : (
          <div className={classes.left}>
            <iframe src={fileData} width="300px"></iframe>
          </div>
        )}
        <div className={classes.right}>
          {work?.status === "inQueue" || work?.status === "inProgress" ? (
            <input
              type="text"
              name="acknowledgementNumber"
              value={Formik.values.acknowledgementNumber}
              onChange={Formik.handleChange}
              className={classes.styledInput}
              placeholder="Acknowledgement Number"
            />
          ) : (
            <p>Acknowledgement Number : {work?.acknowledgementNumber}</p>
          )}

          <div className={classes.inputContainer}>
            {work?.status === "completed" && work?.ePan && (
              <p>E -Pan recieved</p>
            )}
            {work?.status === "completed" && work?.ePan === false && (
              <label>
                E -Pan recieved
                <input
                  type="checkbox"
                  className={classes.styledInput1}
                  onChange={handleCheckboxChange}
                />
              </label>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PanCardSubmit;
