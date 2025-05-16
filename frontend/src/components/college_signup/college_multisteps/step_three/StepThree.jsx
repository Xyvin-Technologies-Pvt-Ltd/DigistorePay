import { useState } from "react";
import Button from "../../../button/Button";
import axios from "axios";
import toast from "react-hot-toast";
import classes from "./StepThree.module.css";
import { useNavigate } from "react-router-dom";

const StepThree = ({ formik }) => {
  const [loading, setLoading] = useState(false);
  const { values } = formik;

  const {
    collegeName,
    collegeId,
    mobileNumber,
    email,
    password,
    district,
    facultyName,
    teamId,
    captainName,
    onBoardedBy,
    onBoardedPersonId,
    onBoardedPersonName,
  } = values;

  const navigate = useNavigate();

  const createStudent = async () => {
    try {
      setLoading(true);
      const res = await axios.post("/studentRouter/registerStudent", values);

      if (res.data.error) {
        setLoading(false);
        toast.error(res.data.message, {
          id: "student",
        });
      } else {
        setLoading(false);
        navigate("/login");
        toast.success("Student created", {
          id: "student",
        });
      }
    } catch (error) {
      setLoading(false);
      toast.error(error?.response?.data?.message, {
        id: "student",
      });
    }
  };

  return (
    <div className={classes.mainContainer}>
      <p className={classes.heading}>Confirm Your Details</p>
      <div>
        <p id={classes.styledInput}>
          <strong>College Name:</strong> {collegeName.toUpperCase()}
        </p>
        <p id={classes.styledInput}>
          <strong>College Id:</strong> {collegeId.toUpperCase()}
        </p>
        <p id={classes.styledInput}>
          <strong>Mobile Number:</strong> {mobileNumber}
        </p>
        <p id={classes.styledInput}>
          <strong>Email:</strong> {email}
        </p>
        <p id={classes.styledInput}>
          <strong>Password:</strong> {password}
        </p>
        <p id={classes.styledInput}>
          <strong>Faculty Name:</strong> {facultyName.toUpperCase()}
        </p>
        <p id={classes.styledInput}>
          <strong>Team Id:</strong> {teamId.toUpperCase()}
        </p>
        <p id={classes.styledInput}>
          <strong>Captain Name:</strong> {captainName.toUpperCase()}
        </p>
        <p id={classes.styledInput}>
          <strong>District:</strong> {district.toUpperCase()}
        </p>
        <p id={classes.styledInput}>
          <strong>Onboarded By:</strong> {onBoardedBy.toUpperCase()}
        </p>

        <p id={classes.styledInput}>
          <strong>Onboarded Person Id:</strong>{" "}
          {onBoardedPersonId.toUpperCase()}
        </p>
        <p id={classes.styledInput}>
          <strong>Onboarded Person Name:</strong>{" "}
          {onBoardedPersonName.toUpperCase()}
        </p>

        <div className={classes.btn}>
          <Button
            clickEvent={() => createStudent()}
            btnName={loading ? "Creating..." : "Confirm"}
            btnType="submit"
          />
        </div>
      </div>
    </div>
  );
};

export default StepThree;
