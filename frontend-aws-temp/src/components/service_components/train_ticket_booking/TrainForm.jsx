import { useState } from "react";
import Button from "../../button/Button";
import classes from "./TrainForm.module.css";
import { useFormik } from "formik";
import { trainFormSchema } from "../../../Validations/service_component_validations/train_ticket_booking/TrainFormValidation";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import PassengerCard from "../../passenger_card/PassengerCard";
import mobile from "/assets/ad/mobile.jpeg";
import AdvertCard from "../../../components/advert_card/AdvertCard";
import axios from "axios";
import toast from "react-hot-toast";
const TrainForm = () => {
  const [date, setDate] = useState(new Date());
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [totalPassengers, setTotalPassengers] = useState(0);
  const [passengerList, setPassengerList] = useState([]);
  const [ticketType, setTicketType] = useState("oneWay");

  const onSubmit = async (values) => {
    const inputData = {
      customerName: values.customer_name,
      phoneNumber: values.mobile,
      email: values.email,
      boardingStation: values.boarding,
      destinationStation: values.destination,
      trainNumber: values.train_number,
      startDate: startDate ? startDate.toISOString() : null,
      endDate:
        ticketType === "twoWay" && endDate ? endDate.toISOString() : null,
      preference: values.preference,
      passengerDetails: values.passengers.map((passenger) => ({
        passengerName: passenger.name,
        passengerAge: passenger.age,
        passengerGender: passenger.gender,
      })),
      status: "inQueue",
    };
    try {
      const response = await axios.post("/train/trainbooking", inputData);
      if (response.data.errorcode) {
        toast.error(response.data.msg, {
          id: "trainBooking",
        });
      } else {
        toast.success("Train Booking Successfully Completed", {
          id: "trainBooking",
        });
      }
      resetForm();
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
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
    isValid,
    dirty,
    resetForm,
  } = useFormik({
    initialValues: {
      customer_name: "",
      mobile: "",
      email: "",
      boarding: "",
      destination: "",
      train_number: "",
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
    validationSchema: trainFormSchema,
    onSubmit,
  });

  const isFormFilled = dirty && isValid;

  return (
    <>
      <section className={classes.mainContainer}>
        <form className={classes.form} onSubmit={handleSubmit}>
          <p className={classes.heading}>Train Ticket Booking</p>
          <div id={classes.styledInput} className={classes.radioContainer}>
            <label>
              <input
                type="radio"
                name="trainTicket"
                value="oneWay"
                checked={ticketType === "oneWay"}
                onChange={() => setTicketType("oneWay")}
              />
              One Way
            </label>
            <label>
              <input
                type="radio"
                name="trainTicket"
                value="twoWay"
                checked={ticketType === "twoWay"}
                onChange={() => setTicketType("twoWay")}
              />
              Two Way
            </label>
          </div>

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

          <select
            id={classes.styledInput}
            className={classes.dropdown}
            value={values.circle}
            onChange={handleChange}
            onBlur={handleBlur}
            name="coach"
          >
            <option>Select your coach type</option>
            <option>Sleeper Class</option>
            <option>First Class AC</option>
            <option>General</option>
          </select>

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
          <input
            id={classes.styledInput}
            name="train_number"
            value={values.train_number}
            onChange={handleChange}
            onBlur={handleBlur}
            type="text"
            placeholder="Train Number (Optional)"
          />
          {errors.train_number && touched.train_number && (
            <p id={classes.errors}>{errors.train_number}</p>
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

          {ticketType === "twoWay" && (
            <DatePicker
              id={classes.styledInput}
              className={classes.datePicker}
              selectsEnd
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              startDate={startDate}
              endDate={endDate}
              minDate={startDate}
              disabled={!startDate}
              onKeyDown={(e) => {
                e.preventDefault();
              }}
              placeholderText="Select return date"
            />
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

          <a
            href="https://www.railyatri.in/train-ticket?utm_source=ttb_pf_max&pt_source=googleads&pt_medium=cpc&pt_campaign=&gad_source=1&gclid=Cj0KCQjwmt24BhDPARIsAJFYKk2v-Mn5Jh6TONJSPOBF2JiQc9CHdZ8T4Qnrh038BQdzor2I4HjdusgaAppFEALw_wcB"
            target="_blank"
            rel="noopener noreferrer"
            className={classes.checkAvailability}
          >
            <p>Check Availability</p>
          </a>

          <PassengerCard
            hardLimit={5}
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
          <Button
            btnName={isFormFilled ? "Proceed" : "Please fill the form"}
            btnType="submit"
            disabled={!isFormFilled}
          />
        </form>
      </section>
      <div style={{ position: "relative" }}>
        <AdvertCard image={mobile} alt="trainAd" sticky={true} />
      </div>
    </>
  );
};

export default TrainForm;
