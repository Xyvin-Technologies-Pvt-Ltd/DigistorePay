import React, { useState, useEffect } from "react";
import classes from "./PassportSubmit.module.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useParams, useLocation } from "react-router-dom";
function PassportSubmit({ Formik }) {
  const [fileData, setFileData] = useState("");
  const { workId } = useParams();
  const { state: work } = useLocation();

  const getFileExtension = (url) => url?.split(".").pop().toLowerCase();
  const DocumentView = (url, title) => {
    return getFileExtension(url) === "pdf" ? (
      <iframe
        src={`https://docs.google.com/viewer?url=${url}&embedded=true`}
        title={title}
        width="280px"
        height="300px"
      ></iframe>
    ) : (
      <div className={classes.imgcontiner}>
        <img className={classes.documentImages} src={url} alt={title} />
      </div>
    );
  };

  useEffect(() => {
    if (Formik.values.passportFile) {
      setFileData(URL.createObjectURL(Formik.values.passportFile));
    }
  }, [Formik.values.passportFile]);
  return (
    <div className={classes.passport_main}>
      <div className={classes.passport_container}>
        <div className={classes.left}>
          {work?.status === "completed" ? (
            DocumentView(work?.passportFile, "passportFile")
          ) : (
            <iframe src={fileData} width="280px" height="300px"></iframe>
          )}
        </div>
        <div className={classes.right}>
          <div className={classes.forms}>
            <div>
              <p>Passport application details</p>
            </div>
            {work?.status === "completed" ? (
              <>
                <div className={classes.info}>
                  <p className={classes.info_details}>
                    <strong>User Name : </strong> {work?.username}
                  </p>
                  <p className={classes.info_details}>
                    <strong>Password : </strong> {work?.password}
                  </p>
                  <p className={classes.info_details}>
                    <strong>Appointment date : </strong>{" "}
                    {new Date(
                      work?.passportAppointmentDate,
                    ).toLocaleDateString()}
                  </p>
                </div>
              </>
            ) : (
              <>
                <input
                  type="text"
                  placeholder="User Name"
                  className={classes.styledInput}
                  value={Formik.values.username}
                  name="username"
                  onBlur={Formik.handleBlur}
                  onChange={Formik.handleChange}
                />

                <input
                  type="text"
                  placeholder="Password"
                  className={classes.styledInput}
                  value={Formik.values.password}
                  name="password"
                  onChange={Formik.handleChange}
                  onBlur={Formik.handleBlur}
                />

                <DatePicker
                  id={classes.DatePicker}
                  className={classes.styledInput}
                  name="passportAppointmentDate"
                  placeholderText="Appointment Date"
                  onBlur={Formik.handleBlur}
                  minDate={new Date()}
                  dateFormat="dd/MM/yyyy"
                  selected={Formik.values.passportAppointmentDate}
                  onChange={(date) =>
                    Formik.setFieldValue("passportAppointmentDate", date)
                  }
                />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PassportSubmit;
