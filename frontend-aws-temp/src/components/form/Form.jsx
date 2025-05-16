import React, { useState } from "react";
import Button from "../button/Button";
import { FaUserAlt, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import classes from "./Form.module.css";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { userSchema } from "../../Validations/login/LoginValidation";
import axios from "axios";
import { toast } from "react-hot-toast";
import {
  loginStart,
  loginSuccess,
  loginFailure,
} from "../../redux/user/userSlice";
import { useDispatch, useSelector } from "react-redux";

const Form = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { loading } = useSelector((state) => state.user);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onSubmit = async () => {
    const data =
      values.isEmailValue === false
        ? {
            phoneNumber: parseInt(values.username, 10),
            password: values.password,
          }
        : { phoneNumber: values.username, password: values.password };
    try {
      dispatch(loginStart());
      const res = await axios.post("/auth/login", data);
      if (res.error) {
        dispatch(loginFailure(res.error));
        toast.error(res.error, {
          id: "login",
        });
      } else {
        dispatch(loginSuccess(res.data));
        setFieldValue({ username: "", password: "", isEmailValue: false });
        // toast.success("Login Successful", {
        //   id: "login",
        // });
        navigate("/profile/summary");
      }
    } catch (error) {
      dispatch(loginFailure(error));
      if (error.response.data) {
        toast.error(error?.response?.data?.message, {
          id: "login",
        });
      } else {
        toast.error("Something went wrong", {
          id: "login",
        });
      }
    }
  };

  const onChangeEmailOrPhone = (event) => {
    setFieldValue("username", event.target.value, true);
    let email = event.target.value.includes("@");
    if (email) {
      setFieldValue("isEmailValue", true);
    } else {
      setFieldValue("isEmailValue", false);
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
  } = useFormik({
    initialValues: {
      username: "",
      password: "",
      isEmailValue: false,
    },
    validationSchema: userSchema,
    onSubmit,
  });

  return (
    <form className={classes.form} onSubmit={handleSubmit}>
      <div className={classes.header}>
        <p className={classes.lineone}>Welcome Back!</p>
      </div>

      <div className={classes.inputs}>
        <div>
          <label>Username</label>
          <div className={classes.input}>
            <span style={{ color: "var(--honoblue)" }}>
              <FaUserAlt />
            </span>
            <input
              id="username"
              value={values.username}
              onChange={onChangeEmailOrPhone}
              onBlur={handleBlur}
              type="text"
              placeholder="Enter phone number"
            />
          </div>
        </div>

        {errors.username && touched.username && <p>{errors.username}</p>}
        <div>
          <label>Password</label>
          <div className={classes.input}>
            <span style={{ color: "var(--honoblue)" }}>
              <FaLock />
            </span>
            <input
              id="password"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              type={showPassword ? "text" : "password"}
              placeholder="Enter password"
            />
            <span
              className={classes.hide_password}
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
        </div>

        {errors.password && touched.password && <p>{errors.password}</p>}
        <div onClick={() => navigate("/forgot")} className={classes.forgot}>
          <a style={{ fontWeight: "bold" }}>Forgot Password?</a>
        </div>
      </div>

      <div className={classes.btnContainer}>
        <Button
          btnType="submit"
          btnName={loading ? "Please Wait..." : "Log In"}
          // disabled={loading}
        ></Button>
      </div>
    </form>
  );
};

export default Form;
