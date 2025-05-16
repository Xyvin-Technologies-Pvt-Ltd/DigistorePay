import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Button from "../../button/Button";
import { useFormik } from "formik";
import { busFormSchema } from "../../../Validations/service_component_validations/bus_ticket_booking/BusForm";
import classes from "./BusForm.module.css";
import PassengerCard from "../../passenger_card/PassengerCard";
import AdvertCard from "../../../components/advert_card/AdvertCard";

const BusForm = () => {
  const [date, setDate] = useState(new Date());
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [totalPassengers, setTotalPassengers] = useState(0);
  const [passengerList, setPassengerList] = useState([]);

  const onSubmit = async () => {
    console.log("submitted", values);
  };

  const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
    setFieldValue,
    setTouched,
  } = useFormik({
    initialValues: {
      customer_name: "",
      mobile: "",
      email: "",
      boarding: "",
      destination: "",
      preference: "",
      total_passengers: totalPassengers,
      passengers: passengerList,
    },
    initialTouched: {
      passengers: [],
    },
    initialErrors: {
      passengers: [],
    },
    validationSchema: busFormSchema,
    onSubmit,
  });

  return (
    <>
      <section className={classes.mainContainer}>
        <form className={classes.form} onSubmit={handleSubmit}>
          <p className={classes.heading}>Bus Ticket Booking</p>
          <input
            id={classes.styledInput}
            name="customer_name"
            value={values.customer_name}
            onChange={handleChange}
            onBlur={handleBlur}
            type="text"
            placeholder="Enter Customer Name"
          />
          {errors.customer_name && touched.customer_name && (
            <p id={classes.errors}>{errors.customer_name}</p>
          )}

          <input
            id={classes.styledInput}
            name="mobile"
            className={classes.mobile}
            value={values.mobile}
            onChange={handleChange}
            onBlur={handleBlur}
            onWheel={(e) => e.target.blur()}
            type="number"
            placeholder="Enter 10 digit mobile number"
          ></input>
          {errors.mobile && touched.mobile && (
            <p id={classes.errors}>{errors.mobile}</p>
          )}

          <input
            id={classes.styledInput}
            name="email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            type="text"
            placeholder="Enter Email ID"
          />
          {errors.email && touched.email && (
            <p id={classes.errors}>{errors.email}</p>
          )}
          <input
            id={classes.styledInput}
            name="boarding"
            value={values.boarding}
            onChange={handleChange}
            onBlur={handleBlur}
            type="text"
            placeholder="Boarding Station"
          />
          {errors.boarding && touched.boarding && (
            <p id={classes.errors}>{errors.boarding}</p>
          )}
          <input
            id={classes.styledInput}
            name="destination"
            value={values.destination}
            onChange={handleChange}
            onBlur={handleBlur}
            type="text"
            placeholder="Destination"
          />
          {errors.destination && touched.destination && (
            <p id={classes.errors}>{errors.destination}</p>
          )}

          <DatePicker
            id={classes.styledInput}
            className={classes.datePicker}
            selectsStart
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            startDate={startDate}
            minDate={date}
            onKeyDown={(e) => {
              e.preventDefault();
            }}
            placeholderText="Select start date"
          />

          {startDate ? (
            <DatePicker
              id={classes.styledInput}
              className={classes.datePicker}
              selectsEnd
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              endDate={endDate}
              startDate={startDate}
              minDate={startDate}
              // readOnly={true}
              onKeyDown={(e) => {
                e.preventDefault();
              }}
              placeholderText="Select end date (optional)"
            />
          ) : (
            ""
          )}

          <textarea
            id={classes.styledInput}
            value={values.preference}
            name="preference"
            placeholder="Any preference"
            onChange={handleChange}
            onBlur={handleBlur}
            rows="5"
          ></textarea>
          {errors.preference && touched.preference && (
            <p id={classes.errors}>{errors.preference}</p>
          )}

          <PassengerCard
            hardLimit={20}
            totalPassengers={totalPassengers}
            passengerList={passengerList}
            values={values}
            errors={errors}
            touched={touched}
            handleBlur={handleBlur}
            handleChange={handleChange}
            setFieldValue={setFieldValue}
            setTouched={setTouched}
            setTotalPassengers={setTotalPassengers}
            setPassengerList={setPassengerList}
          ></PassengerCard>
          <Button btnName="Proceed" btnType="submit" />
        </form>
      </section>
      <div style={{ position: "relative" }}>
        <AdvertCard image="/assets/ad/mobile.jpeg" alt="busAd" sticky={true} />
      </div>
    </>
  );
};

export default BusForm;
