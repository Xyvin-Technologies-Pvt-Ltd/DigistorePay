import { useState } from "react";
import services from "../../../data/taxservices";
import classes from "./Taxfiling.module.css";
import AdvertCard from "../../../components/advert_card/AdvertCard";
import mobile from "/assets/ad/mobile.jpeg";
import GstRegistration from "../../tax_filing_forms/gst_registration/GstRegistration";
import GstFiling from "../../tax_filing_forms/gst_filing/GstFiling";
import IncomeTaxReturn from "../../tax_filing_forms/income_tax_return/IncomeTaxReturn";
import PreparationofFinancialStatement from "../../tax_filing_forms/preparation_of_financial_statement/PreparationofFinancialStatement";
import CompanyFormation from "../../tax_filing_forms/company_formation/CompanyFormation";
import PartnershipDeedPreparation from "../../tax_filing_forms/partnership_deed_preparation/PartnershipDeedPreparation";
import KSwift from "../../tax_filing_forms/kswift/KSwift";

const AccountingAndTax = () => {
  const [selectedService, setSelectedService] = useState("GST Registration");

  const handleServiceChange = (event) => {
    setSelectedService(event.target.value);
  };

  return (
    <>
      <section className={classes.mainContainer}>
        <div className={classes.heading}>
          <p>Accounting and Tax Services </p>
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
        {selectedService === "GST Registration" && <GstRegistration />}
        {selectedService === "GST Filing" && <GstFiling />}
        {selectedService === "Income Tax Return Filing" && <IncomeTaxReturn />}
        {selectedService === "Preparation of Financial Statements" && (
          <PreparationofFinancialStatement />
        )}
        {selectedService === "Company Formation" && <CompanyFormation />}
        {selectedService === "Partnership Deed Preparation" && (
          <PartnershipDeedPreparation />
        )}
        {selectedService === "K-Swift" && <KSwift />}
      </section>
      <div style={{ position: "relative" }}>
        <AdvertCard image={mobile} alt="waterAd" sticky={true} />
      </div>
    </>
  );
};

export default AccountingAndTax;
