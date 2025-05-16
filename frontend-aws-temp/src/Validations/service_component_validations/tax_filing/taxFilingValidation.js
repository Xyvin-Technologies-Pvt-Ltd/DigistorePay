import * as yup from "yup";

const alphabetSeries = /^[a-zA-Z\s]+$/;
const phoneRegex = /^[6-9]{1}[0-9]{9}$/;
// new addhar validation regex
const panNumber = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
const adhaarNumber = /\b[2-9][0-9]{3}[0-9]{4}[0-9]{4}\b/;
const pinCode = /^[1-9]{1}[0-9]{2}[0-9]{3}$/;
//  const pan_numberRegex = "[A-Z]{5}[0-9]{4}[A-Z]{1}";
//  const passwordRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
export const incomeTaxReturnSchema = yup.object().shape({
  business_name: yup
    .string()
    .min(3, "Atleast 3 characters needed")
    .matches(alphabetSeries, "Please Enter a valid name")
    .required("Please enter a name"),
  email: yup
    .string()
    .email("Please enter a valid email")
    .required("Email is required"),
  mobile: yup
    .string()
    .matches(phoneRegex, "Please enter a valid mobile number")
    .required("Mobile number is required"),
  // pan_number: yup
  // .string()
  // .matches(pan_numberRegex, "Please enter a valid pan card number")
  // .required("Please enter your PAN Card number"),
  // password: yup
  // .string()
  // .matches(passwordRegex, "Please enter a valid password")
  // .required("Please enter your password"),
  // category: yup
  // .string()
  // .oneOf([yup.ref("business","salaried","capital_gain")], "Required")
  // .required("Category is required"),

  // Business Category fields
  // gst_username: yup.string().when('category', {
  // is: 'business',
  // then: yup.string().required('GST Username is required'),
  // otherwise: yup.string().nullable(),
  // }),
  // gst_password: yup.string().when("category", {
  //         is: "business",
  //         then: yup.string().matches(passwordRegex, "Please enter a valid password").required("GST Password is required"),
  //       }),
  //   category: yup
  //     .string()
  //     .oneOf(["business", "salaried", "capital_gain"], "Invalid category")
  //     .required("Category is required"),

  //   // Business category fields
  //   gst_username: yup.string().when("category", {
  //     is: "business",
  //     then: yup.string().required("GST Username is required"),
  //   }),
  //   gst_password: yup.string().when("category", {
  //     is: "business",
  //     then: yup.string().required("GST Password is required"),
  //   }),
  //   bank_statement: yup.mixed().when("category", {
  //     is: "business",
  //     then: yup.mixed().required("Bank Statement is required"),
  //   }),
  //   business_loan_statement: yup.mixed().when("category", {
  //     is: "business",
  //     then: yup.mixed().required("Business Loan Statement is required"),
  //   }),
  //   aadhaar: yup.mixed().when("category", {
  //     is: "business",
  //     then: yup.mixed().required("Aadhaar is required").matches(adhaarNumber, "Please enter valid aadhaar number"),
  //   }),
  //   account_name: yup.string().when("category", {
  //     is: "business",
  //     then: yup.string().required("Account Name is required"),
  //   }),
  //   account_number: yup.string().when("category", {
  //     is: "business",
  //     then: yup.string().required("Account Number is required"),
  //   }),
  //   ifsc: yup.string().when("category", {
  //     is: "business",
  //     then: yup.string().required("IFSC Code is required"),
  //   }),
  //   branchnamee: yup.string().when("category", {
  //     is: "business",
  //     then: yup.string().required("Branch is required"),
  //   }),

  //   // Salaried category fields
  //   form_16: yup.mixed().when("category", {
  //     is: "salaried",
  //     then: yup.mixed().required("Form 16 is required"),
  //   }),
  //   pf_amount: yup.string().when("category", {
  //     is: "salaried",
  //     then: yup.string().required("PF Amount is required"),
  //   }),
  //   health_insurance: yup.string().when("category", {
  //     is: "salaried",
  //     then: yup.string().required("Health Insurance Amount is required"),
  //   }),
  //   nps: yup.string().when("category", {
  //     is: "salaried",
  //     then: yup.string().required("NPS Amount is required"),
  //   }),
  //   life_insurance: yup.string().when("category", {
  //     is: "salaried",
  //     then: yup.string().required("Life Insurance Amount is required"),
  //   }),
  //   rent_paid: yup.string().when("category", {
  //     is: "salaried",
  //     then: yup.string().required("Rent Paid is required"),
  //   }),
  //   tuition_fees: yup.string().when("category", {
  //     is: "salaried",
  //     then: yup.string().required("Tuition Fees is required"),
  //   }),
  //   housing_loan_bank_statement: yup.mixed().when("category", {
  //     is: "salaried",
  //     then: yup.mixed().nullable(),
  //   }),
  //   salary_slip: yup.mixed().when("category", {
  //     is: "salaried",
  //     then: yup.mixed().nullable(),
  //   }),
  //   electric_vehicle_purchase: yup.string().when("category", {
  //     is: "salaried",
  //     then: yup.string().required("Electric Vehicle Purchase Amount is required"),
  //   }),

  //   // Capital gain category fields
  //   capital_gain_type: yup.string().when("category", {
  //     is: "capital_gain",
  //     then: yup.string().oneOf(["securities", "property"]).required("Capital Gain Type is required"),
  //   }),
  //   securities_type: yup.string().when("capital_gain_type", {
  //     is: "securities",
  //     then: yup.string().oneOf(["company_shares", "mutual_fund"]).required("Securities Type is required"),
  //   }),
  //   sale_date: yup.string().when("capital_gain_type", {
  //     is: "securities",
  //     then: yup.string().required("Sale Date is required"),
  //   }),
  //   sale_amount: yup.string().when("capital_gain_type", {
  //     is: "securities",
  //     then: yup.string().required("Sale Amount is required"),
  //   }),
  //   company_name: yup.string().when("capital_gain_type", {
  //     is: "securities",
  //     then: yup.string().required("Company Name is required"),
  //   }),
  //   purchase_company_name: yup.string().when("capital_gain_type", {
  //     is: "securities",
  //     then: yup.string().required("Purchase Company Name is required"),
  //   }),
  //   purchase_date: yup.string().when("capital_gain_type", {
  //     is: "securities",
  //     then: yup.string().required("Purchase Date is required"),
  //   }),
  //   purchase_amount: yup.string().when("capital_gain_type", {
  //     is: "securities",
  //     then: yup.string().required("Purchase Amount is required"),
  //   }),
  //   before_2018: yup.string().when("capital_gain_type", {
  //     is: "securities",
  //     then: yup.string().oneOf(["yes", "no"]).required("Purchase Date before 2018 is required"),
  //   }),
  //   isin_number: yup.string().when("capital_gain_type", {
  //     is: "securities",
  //     then: yup.string().required("ISIN Number is required"),
  //   }),
  //   sale_deed: yup.mixed().when("capital_gain_type", {
  //     is: "property",
  //     then: yup.mixed().required("Sale Deed is required"),
  //   }),
  //   purchase_deed: yup.mixed().when("capital_gain_type", {
  //     is: "property",
  //     then: yup.mixed().required("Purchase Deed is required"),
  //   }),
});

export const gstRegistrationSchema = yup.object().shape({
  customerName: yup
    .string()
    .min(3, "Atleast 3 characters needed")
    .matches(alphabetSeries, "Please Enter a valid name")
    .required("Please enter a name"),
  customerEmail: yup
    .string()
    .email("Please enter a valid email")
    .required("Email is required"),
  mobile: yup
    .string()
    .matches(phoneRegex, "Please enter a valid mobile number")
    .required("Mobile number is required"),
  //   businessName: yup.string().required("Business Name is required"),
  //   businessAddress1: yup.string().required("Address Line 1 is required"),
  //   businessAddress2: yup.string().required("Address Line 2 is required"),
  //   pincode: yup
  //     .number()
  //     .typeError("Pincode must be a number")
  //     .required("Pincode is required"),
  //   building: yup.string().required("Please select an option"),
  //   latitude: yup
  //     .number()
  //     .typeError("Latitude must be a number")
  //     .required("Shop Latitude is required"),
  //   longitude: yup
  //     .number()
  //     .typeError("Longitude must be a number")
  //     .required("Shop Longitude is required"),
  //   businessType: yup.string().required("Please select a type of business"),
});

export const gstFilingSchema = yup.object().shape({
  customerName: yup
    .string()
    .min(3, "Atleast 3 characters needed")
    .matches(alphabetSeries, "Please Enter a valid name")
    .required("Please enter a name"),
  email: yup
    .string()
    .email("Please enter a valid email")
    .required("Email is required"),
  mobile: yup
    .string()
    .matches(phoneRegex, "Please enter a valid mobile number")
    .required("Mobile number is required"),
  //   gst_number: yup.string().required("GST number is required"),
  //   file: yup.mixed().required("File is required"),
});

export const preparationOfFinancialStatementSchema = yup.object().shape({
  customerName: yup
    .string()
    .min(3, "Atleast 3 characters needed")
    .matches(alphabetSeries, "Please Enter a valid name")
    .required("Please enter a name"),
  email: yup
    .string()
    .email("Please enter a valid email")
    .required("Email is required"),
  mobile: yup
    .string()
    .matches(phoneRegex, "Please enter a valid mobile number")
    .required("Mobile number is required"),
  //   statement_type: yup.string().required("Statement type is required"),
  //   file: yup.mixed().required("File is required"),
});

export const companyFormationSchema = yup.object().shape({
  customerName: yup
    .string()
    .min(3, "Atleast 3 characters needed")
    .matches(alphabetSeries, "Please Enter a valid name")
    .required("Please enter a name"),
  email: yup
    .string()
    .email("Please enter a valid email")
    .required("Email is required"),
  mobileNumber: yup
    .string()
    .matches(phoneRegex, "Please enter a valid mobile number")
    .required("Mobile number is required"),
  //   company_name: yup.string().required("Company name is required"),
  //   registration_number: yup.string().required("Registration number is required"),
  //   file: yup.mixed().required("File is required"),
});

export const partnershipDeedPreparationSchema = yup.object().shape({
  customer_name: yup
    .string()
    .min(3, "Atleast 3 characters needed")
    .matches(alphabetSeries, "Please Enter a valid name")
    .required("Please enter a name"),
  email: yup
    .string()
    .email("Please enter a valid email")
    .required("Email is required"),
  mobile: yup
    .string()
    .matches(phoneRegex, "Please enter a valid mobile number")
    .required("Mobile number is required"),
  //   partner_name: yup.string().required("Partner name is required"),
  //   deed_number: yup.string().required("Deed number is required"),
  //   file: yup.mixed().required("File is required"),
});

export const packingLicenseSchema = yup.object().shape({
  customerName: yup
    .string()
    .min(3, "Atleast 3 characters needed")
    .matches(alphabetSeries, "Please Enter a valid name")
    .required("Please enter a name"),
  email: yup
    .string()
    .email("Please enter a valid email")
    .required("Email is required"),
  phoneNumber: yup
    .string()
    .matches(phoneRegex, "Please enter a valid mobile number")
    .required("Mobile number is required"),
  panNumber: yup
    .string()
    .length(10)
    .matches(panNumber, "Please enter valid Pan number")
    .required("Please enter PAN number"),
  businessName: yup
    .string()
    .min(3, "Atleast 3 characters needed")
    .matches(alphabetSeries, "Please Enter a valid business name")
    .required("Please enter a business name"),
  businessAddressLine1: yup.string().required("Please enter address line 1"),
  pinCode: yup
    .string()
    .matches(pinCode, "Please enter valid pin code")
    .required("Please enter pin code"),
listOfProducts: yup.string().required("Please enter the list of products"),
});

export const udayamRegistrationSchema = yup.object().shape({
  customerName: yup
    .string()
    .min(3, "Atleast 3 characters needed")
    .matches(alphabetSeries, "Please Enter a valid name")
    .required("Please enter a name"),
  email: yup
    .string()
    .email("Please enter a valid email")
    .required("Email is required"),
  mobile: yup
    .string()
    .matches(phoneRegex, "Please enter a valid mobile number")
    .required("Mobile number is required"),
  //   owner_name: yup.string().required("Owner name is required"),
  //   registration_number: yup.string().required("Registration number is required"),
  //   file: yup.mixed().required("File is required"),
});

export const kswiftSchema = yup.object().shape({
  customerName: yup
    .string()
    .min(3, "Atleast 3 characters needed")
    .matches(alphabetSeries, "Please Enter a valid name")
    .required("Please enter a name"),
  email: yup
    .string()
    .email("Please enter a valid email")
    .required("Email is required"),
  mobile: yup
    .string()
    .matches(phoneRegex, "Please enter a valid mobile number")
    .required("Mobile number is required"),
  //   kswift_number: yup.string().required("KSwift number is required"),
  //   file: yup.mixed().required("File is required"),
});

export const fssaiSchema = yup.object().shape({
  customerName: yup
    .string()
    .min(3, "Atleast 3 characters needed")
    .matches(alphabetSeries, "Please Enter a valid name")
    .required("Please enter a name"),
  email: yup
    .string()
    .email("Please enter a valid email")
    .required("Email is required"),
  mobile: yup
    .string()
    .matches(phoneRegex, "Please enter a valid mobile number")
    .required("Mobile number is required"),
  //   fssai_number: yup.string().required("FSSAI number is required"),
  //   file: yup.mixed().required("File is required"),
});

export const fssaiRegistrationSchema = yup.object().shape({
  customerName: yup
    .string()
    .min(3, "Atleast 3 characters needed")
    .matches(alphabetSeries, "Please Enter a valid name")
    .required("Please enter a name"),
  email: yup
    .string()
    .email("Please enter a valid email")
    .required("Email is required"),
  mobile: yup
    .string()
    .matches(phoneRegex, "Please enter a valid mobile number")
    .required("Mobile number is required"),
  //   fssai_number: yup.string().required("FSSAI number is required"),
  //   file: yup.mixed().required("File is required"),
});
