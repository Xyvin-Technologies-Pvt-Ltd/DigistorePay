import React from "react";
import classes from "./TicketBooking.module.css";

const TicketBooking = ({ work }) => {
  return (
    <>
      <p className={classes.heading}>TASK INFORMATION :</p>
      <div className={classes.basic}>
        <div>
          <p>
            <strong>EMAIL:</strong> {work?.email || "N/A"}
          </p>
          <p>
            <strong>PREFERENCE:</strong>{" "}
            {work?.preference?.toUpperCase() || "N/A"}
          </p>
          {work.tableName === "Train Booking" && (
            <>
              <p>
                <strong>COACH TYPE:</strong>{" "}
                {work?.coachType?.toUpperCase() || "N/A"}
              </p>
            </>
          )}
          <p>
            <strong>START DATE:</strong>{" "}
            {new Date(work?.startDate).toLocaleDateString() || "N/A"}
          </p>
          {work.tableName === "Train Booking" &&
            work.ticketType === "twoWay" && (
              <p>
                <strong>END DATE:</strong>{" "}
                {new Date(work?.endDate).toLocaleDateString() || "N/A"}
              </p>
            )}
        </div>
        <div>
          <p>
            <strong>BOARDING:</strong>{" "}
            {work?.boardingStation?.toUpperCase() || "N/A"}
          </p>
          <p>
            <strong>DESTINATION:</strong>{" "}
            {work?.destinationStation?.toUpperCase() || "N/A"}
          </p>
          {work.tableName === "Train Booking" && (
            <>
              <p>
                <strong>BOOKING TYPE:</strong> {work?.bookingType || "N/A"}
              </p>
              <p>
                <strong>TRAIN NUMBER:</strong> {work?.trainNumber || "N/A"}
              </p>
            </>
          )}
        </div>
      </div>
      <p className={classes.heading}>PASSENGER DETAILS</p>
      <div className={classes.details}>
        <p>
          <strong>NAME</strong>
        </p>
        <p>
          <strong>AGE</strong>
        </p>
        <p>
          <strong>GENDER</strong>
        </p>
      </div>
      {work.tableName === "Bus Booking" && (
        <>
          {work.passengerDetails.map((passenger, index) => (
            <div key={index} className={classes.details}>
              <p>{passenger?.name?.toUpperCase()}</p>
              <p>{passenger?.age}</p>
              <p>{passenger?.gender?.toUpperCase()}</p>
            </div>
          ))}
        </>
      )}
      {work.tableName === "Train Booking" && (
        <>
          {work.passengerDetails.map((passenger, index) => (
            <div key={index} className={classes.details}>
              <p>{passenger?.passengerName?.toUpperCase()}</p>
              <p>{passenger?.passengerAge}</p>
              <p>{passenger?.passengerGender?.toUpperCase()}</p>
            </div>
          ))}
        </>
      )}
    </>
  );
};

export default TicketBooking;
