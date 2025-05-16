import React, { useState } from "react";
import classes from "./PanCard.module.css";
import AdvertCard from "../../../components/advert_card/AdvertCard";
import mobile from "/assets/ad/mobile.jpeg";
import DuplicateOrChangePan from "../../pan_card_forms/duplicate_pancard/DuplicateOrChangePan";
import NewPanCardForm from "../../pan_card_forms/new_pancard/NewPanCardForm";
import MinorPanCard from "../../pan_card_forms/minor_pancard/MinorPanCard";
import NriPanCard from "../../pan_card_forms/nri_pancard/NriPanCard";
import { FaLock } from "react-icons/fa6";
import { useSelector } from "react-redux";

const PanCard = () => {
  const [selectedService, setSelectedService] = useState("New PanCard");
  const { currentUser } = useSelector((state) => state.user);

  const handleServiceChange = (event) => {
    setSelectedService(event.target.value);
  };
  return (
    <>
      {currentUser && currentUser?.data.verified ? (
        <section className={classes.mainContainer}>
          <div className={classes.heading}>
            <p>Pan Card Services </p>
          </div>
          
          <div className={classes.dropdownContainer}>
            <select
              className={classes.dropdown}
              value={selectedService}
              onChange={handleServiceChange}
              id={classes.styledInput}
            >
              <option value="New PanCard">New Pan Card</option>
              <option value="Minor PanCard">Minor Pan Card</option>
              <option value="Duplicate/Change PanCard">
                Duplicate/Change Pan Card
              </option>
              <option value="NRI PanCard">NRI Pan Card</option>
            </select>
          </div>

          {selectedService === "New PanCard" && (
            <NewPanCardForm panType={"newPancard"} />
          )}
          {selectedService === "Duplicate/Change PanCard" && (
            <DuplicateOrChangePan panType={"duplicateOrChangePancard"} />
          )}
          {selectedService === "Minor PanCard" && (
            <MinorPanCard panType={"minorPancard"} />
          )}
          {selectedService === "NRI PanCard" && (
            <NriPanCard panType={"NRIPancard"} />
          )}
        </section>
      ) : (
        <div className={classes.mainContainer}>
          <p id={classes.center} className={classes.heading}>
            Pan Card Application
          </p>
          <div className={classes.warningBlock}>
            <p className={classes.verifyText}>
              Service available only on verified account. <br />
              Contact admin now to get verified.
              <br />
              <span className={classes.lockIcon}>
                <FaLock />
              </span>
            </p>
            <p className={classes.noteText}>
              Time to get verified may vary depending on request volume.
            </p>
          </div>
        </div>
      )}

      <div style={{ position: "relative" }}>
        <AdvertCard image={mobile} alt="waterAd" sticky={true} />
      </div>
    </>
  );
};

export default PanCard;
