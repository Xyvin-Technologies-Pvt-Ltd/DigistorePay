import React, { useState } from "react";
import classes from "./Fssai.module.css";
import AdvertCard from "../../../components/advert_card/AdvertCard";
import mobile from "/assets/ad/mobile.jpeg";
import Fssai from "../../fssai_forms/fssai_license/Fssai_license";
import FssaiRegistration from "../../fssai_forms/fssai_registration/FssaiRegistration";

const FSSAI = () => {
  const [selectedService, setSelectedService] = useState("FSSAI");
  const handleServiceChange = (event) => {
    setSelectedService(event.target.value);
  };
  return (
    <>
      <section className={classes.mainContainer}>
        <div className={classes.heading}>
          <p>FSSAI </p>
        </div>
        <div id={classes.styledInput} className={classes.radioContainer}>
          <label>
            <input
              type="radio"
              name="service"
              value="FSSAI"
              checked={selectedService === "FSSAI"}
              onChange={handleServiceChange}
            />
            Fssai License
          </label>
          <label>
            <input
              type="radio"
              name="service"
              value="FSSAI Registration"
              checked={selectedService === "FSSAI Registration"}
              onChange={handleServiceChange}
            />
            Fssai Registration
          </label>
        </div>

        {selectedService === "FSSAI" && <Fssai fssaiType={"fssai"} />}
        {selectedService === "FSSAI Registration" && (
          <FssaiRegistration fssaiType={"fssai Registration"} />
        )}
      </section>

      <div style={{ position: "relative" }}>
        <AdvertCard image={mobile} alt="waterAd" sticky={true} />
      </div>
    </>
  );
};

export default FSSAI;
