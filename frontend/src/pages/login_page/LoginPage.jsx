import React from "react";
import classes from "./LoginPage.module.css";
import Form from "../../components/form/Form";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import Footer from "../../components/footer/Footer";

const LoginPage = () => {
  const { currentUser } = useSelector((state) => state.user);

  return currentUser ? (
    currentUser.data.userType === "franchise" ? (
      <Navigate to="/services" />
    ) : (
      <Navigate to="/profile" />
    )
  ) : (
    <>
      <section className={classes.container}>
        <div
          className={classes.imageContainer}
          style={{ position: "relative" }}
        >
          <p
            style={{
              position: "absolute",
              color: "white",
              fontWeight: "bold",
              fontSize: "3rem",
              textAlign: "center",
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%)",
              margin: "0",
              textShadow: "2px 2px var(--honoblue)",
            }}
          >
            One App For All Your Customer Service Needs. Start Earning Now!
          </p>
          <img className={classes.responsiveImage} src="/assets/signup.jpg" />
        </div>
        <div className={classes.formContainer}>
          <Form></Form>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default LoginPage;
