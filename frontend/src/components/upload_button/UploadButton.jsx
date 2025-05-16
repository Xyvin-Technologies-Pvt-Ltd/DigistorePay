import React, { useRef } from "react";
import classes from "./UploadButton.module.css";
import toast from "react-hot-toast";

const validateFileType = (file, allowedMimeTypes = []) => {
  return allowedMimeTypes.includes(file.type);
};

function UploadButton({
  Formik,
  uploadFeild,
  allowedMimeTypes,
  btnName,
  setIsUploaded,
}) {
  const fileInputRef = useRef(null);

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files?.[0];

    if (file && validateFileType(file, allowedMimeTypes)) {
      Formik.setFieldValue(uploadFeild, file);
      toast.success("Upload Successful", { id: "imgUploadSuccess" });
      setIsUploaded(true);
    } else {
      toast.error(
        `Upload failed. Invalid file type. Supported types: ${allowedMimeTypes.join(
          ", "
        )}`,
        { id: "imgUploadSuccess" }
      );
    }
  };

  return (
    <div className={classes.upload_button}>
      <div>
        <input
          type="file"
          name={uploadFeild}
          onBlur={Formik.handleBlur}
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={handleFileChange}
        />
        <button
          type="button"
          className={classes.button}
          onClick={handleButtonClick}
        >
          {btnName}
        </button>
      </div>
    </div>
  );
}

export default UploadButton;
