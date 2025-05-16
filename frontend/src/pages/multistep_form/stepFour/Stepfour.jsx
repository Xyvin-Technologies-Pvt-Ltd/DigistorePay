import classes from "./StepFour.module.css";
import { fileMimeType } from "../../../data/filemimetype";
import UploadCard from "../../../components/upload_card/UploadCard";

const Stepfour = ({ formik }) => {
  const {
    handleChange,
    handleBlur,
    values,
    errors,
    handleSubmit,
    setFieldValue,
    touched,
  } = formik;

  return (
    <div className={classes.mainContainer}>
      <p className={classes.heading}>Business Details</p>
      <form className={classes.form} onSubmit={handleSubmit}>
        <label htmlFor="accountNumber" className={classes.labelStyle}>
          Account Number
        </label>
        <input
          id="accountNumber"
          className={classes.styledInput}
          name="accountNumber"
          value={values.accountNumber}
          onChange={handleChange}
          onBlur={handleBlur}
          onWheel={(e) => e.target.blur()}
          type="number"
          placeholder="Enter Account Number"
        ></input>
        {errors.accountNumber && touched.accountNumber && (
          <p id={classes.errors}>{errors.accountNumber}</p>
        )}
        <label htmlFor="accountName" className={classes.labelStyle}>
          Account Name
        </label>
        <input
          id="accountName"
          className={classes.styledInput}
          name="accountName"
          value={values.accountName}
          onChange={handleChange}
          onBlur={handleBlur}
          type="text"
          placeholder="Enter Account Name"
        ></input>
        {errors.accountName && touched.accountName && (
          <p id={classes.errors}>{errors.accountName}</p>
        )}
        <label htmlFor="bank" className={classes.labelStyle}>
          Bank
        </label>
        <input
          id="bank"
          className={classes.styledInput}
          name="bank"
          value={values.bank}
          onChange={handleChange}
          onBlur={handleBlur}
          type="text"
          placeholder="Enter bank"
        ></input>
        {errors.bank && touched.bank && (
          <p id={classes.errors}>{errors.bank}</p>
        )}
        <label htmlFor="branchName" className={classes.labelStyle}>
          Branch Name
        </label>
        <input
          id="branchName"
          className={classes.styledInput}
          name="branchName"
          value={values.branchName}
          onChange={handleChange}
          onBlur={handleBlur}
          type="text"
          placeholder="Enter Branch Name"
        ></input>
        {errors.branchName && touched.branchName && (
          <p id={classes.errors}>{errors.branchName}</p>
        )}
        <label htmlFor="ifscCode" className={classes.labelStyle}>
          IFSC Code
        </label>
        <input
          id="ifscCode"
          className={classes.styledInput}
          name="ifscCode"
          value={values.ifscCode}
          onChange={handleChange}
          onBlur={handleBlur}
          type="text"
          placeholder="Enter Ifsc Code"
        ></input>
        {errors.ifscCode && touched.ifscCode && (
          <p id={classes.errors}>{errors.ifscCode}</p>
        )}
        <label htmlFor="aadhaarNumber" className={classes.labelStyle}>
          Aadhaar Number
        </label>
        <input
          id="aadhaarNumber"
          className={classes.styledInput}
          name="aadhaarNumber"
          value={values.aadhaarNumber}
          onChange={handleChange}
          onBlur={handleBlur}
          onWheel={(e) => e.target.blur()}
          type="number"
          placeholder="Enter Aadhaar Number"
        ></input>
        {errors.aadhaarNumber && touched.aadhaarNumber && (
          <p id={classes.errors}>{errors.aadhaarNumber}</p>
        )}
        <label htmlFor="panNumber" className={classes.labelStyle}>
          Pan Number
        </label>
        <input
          id="panNumber"
          className={classes.styledInput}
          name="panNumber"
          value={values.panNumber}
          onChange={handleChange}
          onBlur={handleBlur}
          type="text"
          placeholder="Enter Pan Number"
        ></input>
        {errors.panNumber && touched.panNumber && (
          <p id={classes.errors}>{errors.panNumber}</p>
        )}

        <UploadCard
          handleBlur={handleBlur}
          setFieldValue={setFieldValue}
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
              name: "Shop Photo",
              fieldName: "shopPic",
              allowedMimeTypes: fileMimeType.imagesOnly,
              mandatory: true,
            },
          ]}
        />
      </form>
    </div>
  );
};

export default Stepfour;
