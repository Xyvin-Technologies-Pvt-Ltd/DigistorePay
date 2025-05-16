import { useRef, useEffect } from "react";
import { toast } from "react-hot-toast";
import classes from "./UploadCard.module.css";

const validateFileType = (file, allowedMimeTypes) => {
  return allowedMimeTypes && allowedMimeTypes.includes(file.type);
};

const UploadCard = ({
  nameArray,
  handleBlur,
  setFieldValue,
  fieldName,
  reset,
}) => {
  const fileInputRefs = useRef({});
  useEffect(() => {
    if (reset) {
      Object.values(fileInputRefs.current).forEach((input) => {
        if (input) input.value = "";
      });
      setFieldValue(fieldName, null);
    }
  }, [reset, setFieldValue, fieldName]);

  const handleFileChange = async (event, fieldName, allowedMimeTypes) => {
    const { files } = event.target;
    if (files && files.length > 0) {
      const file = files[0];
      if (validateFileType(file, allowedMimeTypes)) {
        setFieldValue(fieldName, file);
        toast.success("Upload Successful", { id: "imgUpload" });
      } else {
        toast.error(
          `Upload failed. Invalid file type. Supported types: ${allowedMimeTypes.join(
            ", ",
          )}`,
          { id: "imgUpload" },
        );
      }
    } else {
      toast.error("No file selected or something went wrong", {
        id: "imgUpload",
      });
    }
  };

  return (
    <div className={classes.uploadcard}>
      {nameArray.map((item, index) => (
        <div key={index} className={classes.detailSection}>
          <div className={classes.namediv}>
            {item.mandatory ? item.name : `${item.name} (Optional)`}
          </div>
          <div className={classes.description}>{item.description}</div>
          <label className={classes.input}>
            <input
              className={classes.inputFeild}
              name={item.name}
              type="file"
              onChange={(e) =>
                handleFileChange(e, item.fieldName, item.allowedMimeTypes)
              }
              onBlur={handleBlur}
              ref={(el) => (fileInputRefs.current[item.fieldName] = el)}
            />
          </label>
        </div>
      ))}
    </div>
  );
};

export default UploadCard;
