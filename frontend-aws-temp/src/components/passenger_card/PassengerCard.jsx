import React, { useEffect } from "react";
import classes from "./PassengerCard.module.css";

const PassengerCard = ({
  hardLimit,
  totalPassengers,
  setTotalPassengers,
  passengerList,
  setPassengerList,
  values,
  errors,
  touched,
  handleBlur,
  handleChange,
  setFieldValue,
  setTouched,
}) => {
  useEffect(() => {
    let passengerTouched = [];
    passengerList.map(() => {
      passengerTouched = [
        ...touched.passengers,
        {
          name: false,
          age: false,
          gender: false,
        },
      ];
    });
    setFieldValue("passengers", passengerList, true);
    setFieldValue("total_passengers", totalPassengers, true);
    setTouched({ ...touched, passengers: passengerTouched }, true);
  }, [passengerList, totalPassengers]);

  const passDetailsTemplate = [
    {
      name: "",
      age: "",
      gender: "",
    },
  ];

  const addPassenger = () => {
    if (totalPassengers < hardLimit) {
      setPassengerList((prev) => [
        ...values.passengers,
        ...passDetailsTemplate,
      ]);
      setTotalPassengers(totalPassengers + 1);
    }
  };

  const deletePassenger = (id) => {
    if (totalPassengers > 0) {
      let newList = values.passengers.filter((_, index) => {
        return index !== id;
      });
      setPassengerList(newList);
      setTotalPassengers(totalPassengers - 1);
    }
  };

  return (
    <div>
      <div className={classes.detailSection}>
        <p className={classes.detailHeadText}>Passenger Details</p>
        <p
          className={
            totalPassengers < hardLimit
              ? classes.addNewButton
              : classes.disabledButton
          }
          onClick={addPassenger}
        >
          {totalPassengers < hardLimit ? "Add Details" : "Max Limit"}
        </p>
      </div>

      {values?.total_passengers > 0 && values?.total_passengers <= hardLimit
        ? passengerList.map((_, index) => {
            return (
              <div key={index}>
                <div className={classes.detailSection}>
                  <p className={classes.heading}>
                    Passenger {index + 1} Details
                  </p>
                  <p
                    className={classes.deleteBtn}
                    onClick={() => deletePassenger(index)}
                  >
                    Delete
                  </p>
                </div>
                <input
                  id={classes.styledInput}
                  name={`passengers[${index}].name`}
                  value={
                    values.passengers[index]
                      ? values.passengers[index].name
                      : ""
                  }
                  onChange={handleChange}
                  onBlur={handleBlur}
                  type="text"
                  placeholder={`Enter Passenger ${index + 1} Name`}
                ></input>
                {touched.passengers && errors.passengers
                  ? errors?.passengers[index]?.name &&
                    touched?.passengers[index]?.name && (
                      <p id={classes.errors}>
                        {errors?.passengers[index]?.name}
                      </p>
                    )
                  : null}

                <input
                  id={classes.styledInput}
                  name={`passengers[${index}].age`}
                  value={
                    values.passengers[index] ? values.passengers[index].age : ""
                  }
                  min={0}
                  max={125}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  onWheel={(e) => e.target.blur()}
                  type="number"
                  placeholder={`Enter Passenger ${index + 1} Age`}
                ></input>
                {touched.passengers && errors.passengers
                  ? errors?.passengers[index]?.age &&
                    touched?.passengers[index]?.age && (
                      <p id={classes.errors}>
                        {errors?.passengers[index]?.age}
                      </p>
                    )
                  : null}

                <select
                  className={classes.styledropdown}
                  name={`passengers[${index}].gender`}
                  value={
                    values.passengers[index]
                      ? values.passengers[index].gender
                      : ""
                  }
                  onChange={handleChange}
                  onBlur={handleBlur}
                >
                  <option value="" label="Select Gender" />
                  <option value="Male" label="Male" />
                  <option value="Female" label="Female" />
                  <option value="Other" label="Other" />
                </select>
                {touched.passengers && errors.passengers
                  ? errors?.passengers[index]?.gender &&
                    touched?.passengers[index]?.gender && (
                      <p id={classes.errors}>
                        {errors?.passengers[index]?.gender}
                      </p>
                    )
                  : null}
              </div>
            );
          })
        : null}
      {values.total_passengers > 0 && values.total_passengers < hardLimit ? (
        <div className={classes.addMore}>
          <p className={classes.addNewButton} onClick={addPassenger}>
            Add More
          </p>
        </div>
      ) : null}
    </div>
  );
};

export default PassengerCard;
