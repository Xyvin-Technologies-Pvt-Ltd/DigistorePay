import { useFormik } from "formik";
import { loanSchema } from "../../../Validations/service_component_validations/loan/loanValidation";
import { fileMimeType } from "../../../data/filemimetype";
import UploadCard from "../../upload_card/UploadCard";
import Button from "../../button/Button";
import classes from "./BusinessLoanNew.module.css";

const BusinessLoanNew = () => {
  const onSubmit = (values) => {
    console.log("Form Submitted:", values);
  };

  const {
    values,
    errors,
    touched,
    handleBlur,
    handleSubmit,
    handleChange,
    setFieldValue,
    resetForm,
    isValid,
    dirty,
  } = useFormik({
    initialValues: {
      customerName: "",
      mobile: "",
      email: "",
      cibil: "",
      cibilCheck: "",
      aadharFront: null,
      aadharBack: null,
      panCard: null,
      cibilReportSelection: "",
      cibilReport: null,
      form: null,
    },
    validationSchema: loanSchema,
    onSubmit,
  });

  const isFormFilled = dirty && isValid;

  return (
    <form className={classes.form} onSubmit={handleSubmit}>
      <div className={classes.radioGroup}>
        <p className={classes.heading}>Select Category</p>
        <label>
          <input
            type="radio"
            name="typeofLoan"
            value="secured"
            checked={values.typeofLoan === "secured"}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          Secured
        </label>
        <label>
          <input
            type="radio"
            name="typeofLoan"
            value="unsecured"
            checked={values.typeofLoan === "unsecured"}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          Unsecured
        </label>
        {errors.typeofLoan && touched.typeofLoan && (
          <p className={classes.errors}>{errors.typeofLoan}</p>
        )}
      </div>

      {values.typeofLoan === "secured" && (
        <>
          <input
            id={classes.styledInput}
            name="customerName"
            value={values.customerName}
            onChange={handleChange}
            onBlur={handleBlur}
            type="text"
            placeholder="Enter Customer Name"
          />
          {errors.customerName && touched.customerName && (
            <p id={classes.errors}>{errors.customerName}</p>
          )}

          <input
            id={classes.styledInput}
            name="mobile"
            value={values.mobile}
            onChange={handleChange}
            onBlur={handleBlur}
            type="number"
            placeholder="Enter Mobile Number"
          />
          {errors.mobile && touched.mobile && (
            <p id={classes.errors}>{errors.mobile}</p>
          )}

          <input
            id={classes.styledInput}
            name="email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            type="email"
            placeholder="Enter Email ID"
          />
          {errors.email && touched.email && (
            <p id={classes.errors}>{errors.email}</p>
          )}

          <div className={classes.checkboxGroup}>
            <p className={classes.heading}>Do you know your Cibil Score?</p>
            <label>
              <input
                type="radio"
                name="cibilCheck"
                value="yes"
                checked={values.cibilCheck === "yes"}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              Yes
            </label>
            <label>
              <input
                type="radio"
                name="cibilCheck"
                value="no"
                checked={values.cibilCheck === "no"}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              No
            </label>
            {errors.cibilCheck && touched.cibilCheck && (
              <p id={classes.errors}>{errors.cibilCheck}</p>
            )}
          </div>

          {values.cibilCheck === "yes" && (
            <>
              <input
                id={classes.styledInput}
                name="cibil"
                value={values.cibil}
                onChange={handleChange}
                onBlur={handleBlur}
                type="number"
                placeholder="Enter Cibil Score"
              />
              {errors.cibil && touched.cibil && (
                <p id={classes.errors}>{errors.cibil}</p>
              )}
            </>
          )}

          {values.cibilCheck === "no" && (
            <>
              <UploadCard
                nameArray={[
                  {
                    name: "Aadhar Front",
                    fieldName: "aadharFront",
                    allowedMimeTypes: fileMimeType.documentsAndImages,
                    mandatory: true,
                  },
                ]}
                handleBlur={handleBlur}
                setFieldValue={setFieldValue}
              />
              {errors.aadharFront && touched.aadharFront && (
                <p id={classes.errors}>{errors.aadharFront}</p>
              )}
              <UploadCard
                nameArray={[
                  {
                    name: "Aadhar Back",
                    fieldName: "aadharBack",
                    allowedMimeTypes: fileMimeType.documentsAndImages,
                    mandatory: true,
                  },
                ]}
                handleBlur={handleBlur}
                setFieldValue={setFieldValue}
              />
              {errors.aadharBack && touched.aadharBack && (
                <p id={classes.errors}>{errors.aadharBack}</p>
              )}
              <UploadCard
                nameArray={[
                  {
                    name: "Pan Card",
                    fieldName: "panCard",
                    allowedMimeTypes: fileMimeType.documentsAndImages,
                    mandatory: true,
                  },
                ]}
                handleBlur={handleBlur}
                setFieldValue={setFieldValue}
              />
              {errors.panCard && touched.panCard && (
                <p id={classes.errors}>{errors.panCard}</p>
              )}
            </>
          )}

          <div className={classes.checkboxGroup}>
            <p className={classes.heading}>Do you have a Cibil Report?</p>
            <label>
              <input
                type="radio"
                name="cibilReportSelection"
                value="yes"
                checked={values.cibilReportSelection === "yes"}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              Yes
            </label>
            <label>
              <input
                type="radio"
                name="cibilReportSelection"
                value="no"
                checked={values.cibilReportSelection === "no"}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              No
            </label>
            {errors.cibilReportSelection && touched.cibilReportSelection && (
              <p id={classes.errors}>{errors.cibilReportSelection}</p>
            )}
          </div>

          {values.cibilReportSelection === "yes" && (
            <>
              <UploadCard
                nameArray={[
                  {
                    name: "Cibil Report",
                    fieldName: "cibilReport",
                    allowedMimeTypes: fileMimeType.documentsOnly,
                    mandatory: true,
                  },
                ]}
                handleBlur={handleBlur}
                setFieldValue={setFieldValue}
              />
            </>
          )}
          {errors.cibilReport && touched.cibilReport && (
            <p id={classes.errors}>{errors.cibilReport}</p>
          )}

          {values.cibilReportSelection === "no" && (
            <>
              <UploadCard
                nameArray={[
                  {
                    name: "Form",
                    fieldName: "form",
                    allowedMimeTypes: fileMimeType.documentsAndImages,
                    mandatory: true,
                  },
                ]}
                handleBlur={handleBlur}
                setFieldValue={setFieldValue}
              />
              {errors.form && touched.form && (
                <p className={classes.errors}>{errors.form}</p>
              )}
            </>
          )}
        </>
      )}

      {values.typeofLoan === "unsecured" && (
        <>
          <input
            id={classes.styledInput}
            name="customerName"
            value={values.customerName}
            onChange={handleChange}
            onBlur={handleBlur}
            type="text"
            placeholder="Enter Customer Name"
          />
          {errors.customerName && touched.customerName && (
            <p id={classes.errors}>{errors.customerName}</p>
          )}

          <input
            id={classes.styledInput}
            name="mobile"
            value={values.mobile}
            onChange={handleChange}
            onBlur={handleBlur}
            type="tel"
            placeholder="Enter Mobile Number"
          />
          {errors.mobile && touched.mobile && (
            <p id={classes.errors}>{errors.mobile}</p>
          )}

          <input
            id={classes.styledInput}
            name="email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            type="email"
            placeholder="Enter Email ID"
          />
          {errors.email && touched.email && (
            <p id={classes.errors}>{errors.email}</p>
          )}

          <div className={classes.radioGroup}>
            <p className={classes.heading}>Do you know your Cibil Score?</p>
            <label>
              <input
                type="radio"
                name="cibilCheck"
                value="yes"
                checked={values.cibilCheck === "yes"}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              Yes
            </label>
            <label>
              <input
                type="radio"
                name="cibilCheck"
                value="no"
                checked={values.cibilCheck === "no"}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              No
            </label>
            {errors.cibilCheck && touched.cibilCheck && (
              <p className={classes.errors}>{errors.cibilCheck}</p>
            )}
          </div>

          {values.cibilCheck === "yes" && (
            <>
              <input
                id={classes.styledInput}
                name="cibil"
                value={values.cibil}
                onChange={handleChange}
                onBlur={handleBlur}
                type="number"
                placeholder="Enter Cibil Score"
              />
              {errors.cibil && touched.cibil && (
                <p id={classes.errors}>{errors.cibil}</p>
              )}
            </>
          )}

          {values.cibilCheck === "no" && (
            <>
              <UploadCard
                nameArray={[
                  {
                    name: "Aadhar Front",
                    fieldName: "aadharFront",
                    allowedMimeTypes: fileMimeType.documentsAndImages,
                    mandatory: true,
                  },
                  {
                    name: "Aadhar Back",
                    fieldName: "aadharBack",
                    allowedMimeTypes: fileMimeType.documentsAndImages,
                    mandatory: true,
                  },
                  {
                    name: "Pan Card",
                    fieldName: "panCard",
                    allowedMimeTypes: fileMimeType.documentsAndImages,
                    mandatory: true,
                  },
                ]}
              />
            </>
          )}

          <div className={classes.radioGroup}>
            <p className={classes.heading}>Do you have a Cibil Report?</p>
            <label>
              <input
                type="radio"
                name="cibilReportSelection"
                value="yes"
                checked={values.cibilReportSelection === "yes"}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              Yes
            </label>
            <label>
              <input
                type="radio"
                name="cibilReportSelection"
                value="no"
                checked={values.cibilReportSelection === "no"}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              No
            </label>
            {errors.cibilReportSelection && touched.cibilReportSelection && (
              <p className={classes.errors}>{errors.cibilReportSelection}</p>
            )}
          </div>

          {values.cibilReportSelection === "yes" && (
            <>
              <UploadCard
                nameArray={[
                  {
                    name: "Cibil Report",
                    fieldName: "cibilReport",
                    allowedMimeTypes: fileMimeType.documentsOnly,
                    mandatory: true,
                  },
                ]}
              />
            </>
          )}
          {values.cibilReportSelection === "no" && (
            <>
              <UploadCard
                nameArray={[
                  {
                    name: "Form",
                    fieldName: "form",
                    allowedMimeTypes: fileMimeType.documentsAndImages,
                    mandatory: true,
                  },
                ]}
              />
            </>
          )}
        </>
      )}

      <Button
        btnType="submit"
        btnName={isFormFilled ? "Submit" : "Please fill the form"}
        disabled={!isFormFilled}
      />
    </form>
  );
};

export default BusinessLoanNew;
