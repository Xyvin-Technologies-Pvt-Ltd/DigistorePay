import { useState } from "react";
import classes from "./Loan.module.css";
import services from "../../../data/loanServices";
import AdvertCard from "../../../components/advert_card/AdvertCard";
import mobile from "/assets/ad/mobile.jpeg";
import PersonalLoan from "../../loan_forms/personal_loan/PersonalLoan";
import HousingLoan from "../../loan_forms/housing_loan/HousingLoan";
import VehicleLoan from "../../loan_forms/vehicle_loan/VehicleLoan";
import LoanAgainstProperty from "../../loan_forms/loan_against_property/LoanAgainstProperty";
import BusinessLoanNew from "../../loan_forms/business_loan_new/BusinessLoanNew";
import BusinessLoanexisting from "../../loan_forms/business_loan_existing/BusinessLoanExisting";

const AccountingAndTax = () => {
  const [selectedService, setSelectedService] = useState("Personal Loan");
  const handleServiceChange = (event) => {
    setSelectedService(event.target.value);
  };

  return (
    <>
      <section className={classes.mainContainer}>
        <div className={classes.heading}>
          <p>Loans </p>
        </div>
        <div className={classes.dropdownContainer}>
          <select
            className={classes.dropdown}
            value={selectedService}
            onChange={handleServiceChange}
            id={classes.styledInput}
          >
            <option value="">Select Service</option>
            {services.map((service) => (
              <option key={service} value={service}>
                {service}
              </option>
            ))}
          </select>
        </div>
        {selectedService === "Personal Loan" && <PersonalLoan />}
        {selectedService === "Housing Loan" && <HousingLoan />}
        {selectedService === "Vehicle Loan" && <VehicleLoan />}
        {selectedService === "Loan Against Property" && <LoanAgainstProperty />}
        {selectedService === "Business Loan New" && <BusinessLoanNew />}
        {selectedService === "Business Loan Existing" && (
          <BusinessLoanexisting />
        )}
      </section>
      <div style={{ position: "relative" }}>
        <AdvertCard image={mobile} alt="waterAd" sticky={true} />
      </div>
    </>
  );
};

export default AccountingAndTax;
