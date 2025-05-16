import { useFormik } from "formik";
import { incomeTaxReturnSchema } from "../../../Validations/service_component_validations/tax_filing/taxFilingValidation";
import { toast } from "react-hot-toast";
import { fileMimeType } from "../../../data/filemimetype";
import UploadCard from "../../upload_card/UploadCard";
import Button from "../../button/Button";
import axios from "axios";
import classes from "./IncomeTaxReturn.module.css";

const onSubmit = async (values) => {
  const formData = new FormData();

  formData.append("customerName", values.business_name);
  formData.append("email", values.email);
  formData.append("phoneNumber", values.mobile);
  formData.append("panNumber", values.pan_number);
  formData.append("incomeTaxPassword", values.password);
  formData.append("typeofTransaction", values.category);
  formData.append("form16", values.form_16);
  formData.append("pfAmount", values.pf_amount);
  formData.append("healthInsuranceAmount", values.health_insurance);
  formData.append("npsNumber", values.nps);
  formData.append("lifeInsuranceAmount", values.life_insurance);
  formData.append("rentPaid", values.rent_paid);
  formData.append("tuitionFees", values.tuition_fees);
  formData.append(
    "housingLoanBankStatement",
    values.housing_loan_bank_statement
  );
  formData.append("salarySlip", values.salary_slip);
  formData.append("electricVehiclePurchase", values.electric_vehicle_purchase);
  formData.append("gstUsername", values.gst_username);
  formData.append("gstPassword", values.gst_password);
  formData.append("bankStatement", values.bank_statement);
  formData.append("businessLoanStatement", values.business_loan_statement);
  formData.append("aadhaarFront", values.aadhaarFront);
  formData.append("aadhaarBack", values.aadhaarBack);
  formData.append("accountName", values.account_name);
  formData.append("accountNumber", values.account_number);
  formData.append("ifscCode", values.ifsc);
  formData.append("branchName", values.branchnamee);
  formData.append("securities", values.securities_type);
  formData.append("typeofCapitalGain", values.capital_gain_type);
  formData.append("saleDate", values.sale_date);
  formData.append("saleAmount", values.sale_amount);
  formData.append("companyName", values.company_name);
  formData.append("purchaseDate", values.purchase_date);
  formData.append("purchaseAmount", values.purchase_amount);
  formData.append("before2018", values.before_2018);
  formData.append("isinNumber", values.isin_number);
  formData.append("saleDeed", values.sale_deed);
  formData.append("purchaseDeed", values.purchase_deed);

  try {
    const res = await axios.post("incomeTax/incomeTaxFiling", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    if (res.data.errorcode) {
      toast.error(res.data.msg, { id: "incomeTax" });
    } else {
      toast.success("Tax and Accounting Application Submitted", {
        id: "incomeTax",
      });
      resetForm();
    }
  } catch (error) {
    toast.error(error.response?.data?.message || "Something went wrong", {
      id: "incomeTax",
    });
  }
};

const IncomeTaxReturn = () => {
  const {
    values,
    errors,
    touched,
    handleBlur,
    handleSubmit,
    handleChange,
    resetForm,
    isValid,
    dirty,
    setFieldValue,
  } = useFormik({
    initialValues: {
      business_name: "",
      mobile: "",
      email: "",
      pan_number: "",
      password: "",
      category: "",
      gst_username: "",
      gst_password: "",
      bank_statement: null,
      business_loan_statement: null,
      aadhaarFront: null,
      aadhaarBack: null,
      account_name: "",
      account_number: "",
      ifsc: "",
      branchnamee: "",
      form_16: null,
      pf_amount: "",
      health_insurance: "",
      nps: "",
      life_insurance: "",
      rent_paid: "",
      tuition_fees: "",
      housing_loan_bank_statement: null,
      salary_slip: null,
      electric_vehicle_purchase: null,
      capital_gain_type: "",
      securities_type: "",
      company_shares: "",
      mutual_fund: "",
      sale_date: "",
      sale_amount: "",
      company_name: "",
      purchase_company_name: "",
      purchase_date: "",
      purchase_amount: "",
      before_2018: "",
      isin_number: "",
      sale_deed: null,
      purchase_deed: null,
    },
    validationSchema: incomeTaxReturnSchema,
    onSubmit,
  });
  const isFormFilled = dirty && isValid;
  return (
    <form className={classes.form} onSubmit={handleSubmit}>
      <input
        id={classes.styledInput}
        name="business_name"
        value={values.business_name}
        onChange={handleChange}
        onBlur={handleBlur}
        type="text"
        placeholder="Enter Customer Name"
      />
      {errors.business_name && touched.business_name && (
        <p className={classes.errors}>{errors.business_name}</p>
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
        <p className={classes.errors}>{errors.email}</p>
      )}

      <input
        id={classes.styledInput}
        name="mobile"
        value={values.mobile}
        onChange={handleChange}
        onBlur={handleBlur}
        type="number"
        placeholder="Enter Mobile Number"
        onWheel={(e) => e.target.blur()}
      />
      {errors.mobile && touched.mobile && (
        <p className={classes.errors}>{errors.mobile}</p>
      )}

      <input
        id={classes.styledInput}
        name="pan_number"
        value={values.pan_number}
        onChange={handleChange}
        onBlur={handleBlur}
        type="text"
        placeholder="Enter PAN Number"
      />
      {errors.pan_number && touched.pan_number && (
        <p className={classes.errors}>{errors.pan_number}</p>
      )}

      <input
        id={classes.styledInput}
        name="password"
        value={values.password}
        onChange={handleChange}
        onBlur={handleBlur}
        type="password"
        placeholder="Enter Income Tax Password"
      />
      {errors.password && touched.password && (
        <p className={classes.errors}>{errors.password}</p>
      )}

      <div className={classes.dropdownGroup}>
        <p className={classes.heading}>Types of ITR:</p>
        <select
          id={classes.styledInput}
          name="category"
          value={values.category}
          onChange={handleChange}
          onBlur={handleBlur}
        >
          <option value="">Select Category</option>
          <option value="business">Business</option>
          <option value="salaried">Salaried</option>
          <option value="capitalGain">Capital Gain</option>
        </select>
        {errors.category && touched.category && (
          <p className={classes.errors}>{errors.category}</p>
        )}
      </div>

      {values.category === "business" && (
        <>
          <input
            id={classes.styledInput}
            name="gst_username"
            value={values.gst_username}
            onChange={handleChange}
            onBlur={handleBlur}
            type="text"
            placeholder="Enter GST Username"
          />
          {errors.gst_username && touched.gst_username && (
            <p className={classes.errors}>{errors.gst_username}</p>
          )}

          <input
            id={classes.styledInput}
            name="gst_password"
            value={values.gst_password}
            onChange={handleChange}
            onBlur={handleBlur}
            type="password"
            placeholder="Enter GST Password"
          />
          {errors.gst_password && touched.gst_password && (
            <p className={classes.errors}>{errors.gst_password}</p>
          )}

          <UploadCard
            nameArray={[
              {
                name: "Bank Statement",
                fieldName: "bank_statement",
                allowedMimeTypes: fileMimeType.documentsOnly,
                mandatory: true,
              },
              {
                name: "Business Loan Statement",
                fieldName: "business_loan_statement",
                allowedMimeTypes: fileMimeType.documentsOnly,
                mandatory: true,
              },
              {
                name: "Aadhaar Front",
                fieldName: "aadhaarFront",
                allowedMimeTypes: fileMimeType.documentsAndImages,
                mandatory: true,
              },
              {
                name: "Aadhaar Back",
                fieldName: "aadhaarBack",
                allowedMimeTypes: fileMimeType.documentsAndImages,
                mandatory: true,
              },
            ]}
            handleBlur={handleBlur}
            setFieldValue={setFieldValue}
          />

          <input
            id={classes.styledInput}
            name="account_name"
            value={values.account_name}
            onChange={handleChange}
            onBlur={handleBlur}
            type="text"
            placeholder="Enter Account Name"
          />
          {errors.account_name && touched.account_name && (
            <p className={classes.errors}>{errors.account_name}</p>
          )}

          <input
            id={classes.styledInput}
            name="account_number"
            value={values.account_number}
            onChange={handleChange}
            onBlur={handleBlur}
            type="text"
            placeholder="Enter Account Number"
            onWheel={(e) => e.target.blur()}
          />
          {errors.account_number && touched.account_number && (
            <p className={classes.errors}>{errors.account_number}</p>
          )}

          <input
            id={classes.styledInput}
            name="ifsc"
            value={values.ifsc}
            onChange={handleChange}
            onBlur={handleBlur}
            type="text"
            placeholder="Enter IFSC Code"
          />
          {errors.ifsc && touched.ifsc && (
            <p className={classes.errors}>{errors.ifsc}</p>
          )}

          <input
            id={classes.styledInput}
            name="branchnamee"
            value={values.branchnamee}
            onChange={handleChange}
            onBlur={handleBlur}
            type="text"
            placeholder="Enter Branch Name"
          />
          {errors.branchnamee && touched.branchnamee && (
            <p className={classes.errors}>{errors.branchnamee}</p>
          )}
        </>
      )}

      {values.category === "salaried" && (
        <>
          <UploadCard
            nameArray={[
              {
                name: "Form 16",
                fieldName: "form_16",
                allowedMimeTypes: fileMimeType.documentsOnly,
                mandatory: true,
              },
            ]}
            handleBlur={handleBlur}
            setFieldValue={setFieldValue}
          />

          <div className={classes.heading}>Deductions</div>
          <input
            id={classes.styledInput}
            name="pf_amount"
            value={values.pf_amount}
            onChange={handleChange}
            onBlur={handleBlur}
            type="text"
            placeholder="Enter PF Amount"
            onWheel={(e) => e.target.blur()}
          />
          {errors.pf_amount && touched.pf_amount && (
            <p className={classes.errors}>{errors.pf_amount}</p>
          )}

          <input
            id={classes.styledInput}
            name="health_insurance"
            value={values.health_insurance}
            onChange={handleChange}
            onBlur={handleBlur}
            type="number"
            placeholder="Enter Health Insurance Amount"
            onWheel={(e) => e.target.blur()}
          />
          {errors.health_insurance && touched.health_insurance && (
            <p className={classes.errors}>{errors.health_insurance}</p>
          )}

          <input
            id={classes.styledInput}
            name="nps"
            value={values.nps}
            onChange={handleChange}
            onBlur={handleBlur}
            type="number"
            placeholder="Enter NPS Amount"
            onWheel={(e) => e.target.blur()}
          />
          {errors.nps && touched.nps && (
            <p className={classes.errors}>{errors.nps}</p>
          )}

          <input
            id={classes.styledInput}
            name="life_insurance"
            value={values.life_insurance}
            onChange={handleChange}
            onBlur={handleBlur}
            type="number"
            placeholder="Enter Life Insurance Amount"
            onWheel={(e) => e.target.blur()}
          />
          {errors.life_insurance && touched.life_insurance && (
            <p className={classes.errors}>{errors.life_insurance}</p>
          )}

          <input
            id={classes.styledInput}
            name="rent_paid"
            value={values.rent_paid}
            onChange={handleChange}
            onBlur={handleBlur}
            type="number"
            placeholder="Enter Rent Paid"
            onWheel={(e) => e.target.blur()}
          />
          {errors.rent_paid && touched.rent_paid && (
            <p className={classes.errors}>{errors.rent_paid}</p>
          )}

          <input
            id={classes.styledInput}
            name="tuition_fees"
            value={values.tuition_fees}
            onChange={handleChange}
            onBlur={handleBlur}
            type="number"
            placeholder="Enter Tuition Fees"
            onWheel={(e) => e.target.blur()}
          />
          {errors.tuition_fees && touched.tuition_fees && (
            <p className={classes.errors}>{errors.tuition_fees}</p>
          )}

          <UploadCard
            nameArray={[
              {
                name: "Housing Loan Bank Statement",
                fieldName: "housing_loan_bank_statement",
                allowedMimeTypes: fileMimeType.documentsOnly,
                mandatory: true,
              },
              {
                name: "Salary Slip",
                fieldName: "salary_slip",
                allowedMimeTypes: fileMimeType.documentsOnly,
                mandatory: true,
              },
              {
                name: "Electric Vehicle Purchase",
                fieldName: "electric_vehicle_purchase",
                allowedMimeTypes: fileMimeType.documentsOnly,
                mandatory: true,
              },
            ]}
            handleBlur={handleBlur}
            setFieldValue={setFieldValue}
          />
        </>
      )}

      {values.category === "capitalGain" && (
        <>
          <div className={classes.heading}>Capital Gain</div>
          <select
            id={classes.styledInput}
            name="capital_gain_type"
            value={values.capital_gain_type}
            onChange={handleChange}
            onBlur={handleBlur}
          >
            <option value="">Select Capital Gain Type</option>
            <option value="securities">Securities</option>
            <option value="property">Property</option>
          </select>
          {errors.capital_gain_type && touched.capital_gain_type && (
            <p className={classes.errors}>{errors.capital_gain_type}</p>
          )}

          {values.capital_gain_type === "securities" && (
            <>
              <select
                id={classes.styledInput}
                name="securities_type"
                value={values.securities_type}
                onChange={handleChange}
                onBlur={handleBlur}
              >
                <option value="">Select Securities Type</option>
                <option value="companyShares">Company Shares</option>
                <option value="mutualFunds">Mutual Fund</option>
              </select>
              {errors.securities_type && touched.securities_type && (
                <p className={classes.errors}>{errors.securities_type}</p>
              )}

              {values.securities_type && (
                <>
                  <input
                    id={classes.styledInput}
                    name="sale_date"
                    value={values.sale_date}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    type="date"
                    placeholder="Enter Sale Date"
                  />
                  {errors.sale_date && touched.sale_date && (
                    <p className={classes.errors}>{errors.sale_date}</p>
                  )}

                  <input
                    id={classes.styledInput}
                    name="sale_amount"
                    value={values.sale_amount}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    type="number"
                    placeholder="Enter Sale Amount"
                    onWheel={(e) => e.target.blur()}
                  />
                  {errors.sale_amount && touched.sale_amount && (
                    <p className={classes.errors}>{errors.sale_amount}</p>
                  )}

                  <input
                    id={classes.styledInput}
                    name="company_name"
                    value={values.company_name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    type="text"
                    placeholder="Enter Company Name"
                  />
                  {errors.company_name && touched.company_name && (
                    <p className={classes.errors}>{errors.company_name}</p>
                  )}

                  <div className={classes.heading}>Purchase Details</div>
                  <input
                    id={classes.styledInput}
                    name="purchase_company_name"
                    value={values.purchase_company_name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    type="text"
                    placeholder="Enter Purchase Company Name"
                  />
                  {errors.purchase_company_name &&
                    touched.purchase_company_name && (
                      <p className={classes.errors}>
                        {errors.purchase_company_name}
                      </p>
                    )}

                  <input
                    id={classes.styledInput}
                    name="purchase_date"
                    value={values.purchase_date}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    type="date"
                    placeholder="Enter Purchase Date"
                  />
                  {errors.purchase_date && touched.purchase_date && (
                    <p className={classes.errors}>{errors.purchase_date}</p>
                  )}

                  <input
                    id={classes.styledInput}
                    name="purchase_amount"
                    value={values.purchase_amount}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    type="number"
                    placeholder="Enter Purchase Amount"
                    onWheel={(e) => e.target.blur()}
                  />
                  {errors.purchase_amount && touched.purchase_amount && (
                    <p className={classes.errors}>{errors.purchase_amount}</p>
                  )}

                  <select
                    id={classes.styledInput}
                    name="before_2018"
                    value={values.before_2018}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  >
                    <option value="">If before 2018?</option>
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                  </select>
                  {errors.before_2018 && touched.before_2018 && (
                    <p className={classes.errors}>{errors.before_2018}</p>
                  )}

                  <input
                    id={classes.styledInput}
                    name="isin_number"
                    value={values.isin_number}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    type="text"
                    placeholder="Enter ISIN Number"
                  />
                  {errors.isin_number && touched.isin_number && (
                    <p className={classes.errors}>{errors.isin_number}</p>
                  )}
                </>
              )}
            </>
          )}

          {values.capital_gain_type === "property" && (
            <>
              <UploadCard
                nameArray={[
                  {
                    name: "Sale Deed",
                    fieldName: "sale_deed",
                    allowedMimeTypes: fileMimeType.documentsAndImages,
                    mandatory: true,
                  },
                  {
                    name: "Purchase Deed",
                    fieldName: "purchase_deed",
                    allowedMimeTypes: fileMimeType.documentsAndImages,
                    mandatory: true,
                  },
                ]}
                handleBlur={handleBlur}
                setFieldValue={setFieldValue}
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

export default IncomeTaxReturn;
