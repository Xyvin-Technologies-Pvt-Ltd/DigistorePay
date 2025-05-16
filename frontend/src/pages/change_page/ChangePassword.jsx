import React, { useState } from "react";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import toast from "react-hot-toast";
import axios from "axios";
import classes from "./ChangePassword.module.css";
import Button from "../../components/button/Button";
import { UpdatePasswordSchema } from "../../Validations/change/ChangePasswordValidation";
import Password from "/assets/Password.png";
function ChangePassword() {
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();
  const onSubmit = async (values) => {
    try {
      const res = await axios.post(`/auth/changePassword`, values);
      if (res.data.errorcode) {
        toast.error(res.data.msg, { id: "password" });
      } else {
        toast.success("The Password has Updated", { id: "password" });
        navigate("/profile/account");
      }
      resetForm();
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong", {
        id: "password",
      });
    }
  };

  const {
    values,
    errors,
    touched,
    handleBlur,
    handleSubmit,
    handleChange,
    setFieldValue,
    resetForm,
    isValid,
    dirty,
  } = useFormik({
    initialValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
    validationSchema: UpdatePasswordSchema,
    onSubmit,
    validateOnChange: true,
    validateOnBlur: true,
  });
  const isFormFilled = dirty && isValid;
  return (
    <div className={classes.container}>
      <div className={classes.content}>
        <div className={classes.row}>
          <div className={classes.imgcoloum}>
            <div className={classes.imgContainer}>
              <img src={Password} alt="Password Change img" />
            </div>
          </div>
          <div className={classes.formcoloum}>
            <div className={classes.formContainer}>
              <div className={classes.heading}>
                <h2>Change your password</h2>
              </div>
              <div>
                <form className={classes.form} onSubmit={handleSubmit}>
                  <div className={classes.inputContainer}>
                    <input
                      type={showOldPassword ? "text" : "password"}
                      name="currentPassword"
                      className={classes.inputFeild}
                      placeholder="Current Password"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.currentPassword}
                      autoComplete="off"
                    />
                    <span
                      className={classes.hide_password}
                      onClick={() => setShowOldPassword(!showOldPassword)}
                    >
                      {showOldPassword ? <FaEye /> : <FaEyeSlash />}
                    </span>
                  </div>
                  {errors.currentPassword && touched.currentPassword && (
                    <p className={classes.errors}>{errors.currentPassword}</p>
                  )}

                  <div className={classes.inputContainer}>
                    <input
                      type={showNewPassword ? "text" : "password"}
                      name="newPassword"
                      className={classes.inputFeild}
                      placeholder="New Password"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.newPassword}
                      autoComplete="off"
                    />
                    <span
                      className={classes.hide_password}
                      onClick={() => setShowNewPassword(!showNewPassword)}
                    >
                      {showNewPassword ? <FaEye /> : <FaEyeSlash />}
                    </span>
                  </div>
                  {errors.newPassword && touched.newPassword && (
                    <p className={classes.errors}>{errors.newPassword}</p>
                  )}

                  <div className={classes.inputContainer}>
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      name="confirmPassword"
                      className={classes.inputFeild}
                      placeholder="Confirm Password"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.confirmPassword}
                      autoComplete="off"
                    />
                    <span
                      className={classes.hide_password}
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                    >
                      {showConfirmPassword ? <FaEye /> : <FaEyeSlash />}
                    </span>
                  </div>
                  {errors.confirmPassword && touched.confirmPassword && (
                    <p className={classes.errors}>{errors.confirmPassword}</p>
                  )}

                  <div className={classes.btnbtnContainer}>
                    <Button
                      btnType="submit"
                      btnName={
                        isFormFilled ? "Change Password" : "Fill the form"
                      }
                      disabled={!isFormFilled}
                    />
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChangePassword;
