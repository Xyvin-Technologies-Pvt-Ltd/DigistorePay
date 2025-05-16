import { useParams, useLocation } from "react-router-dom";
import classes from "./Invoice.module.css";
import { useSelector } from "react-redux";
import { useState } from "react";
import { useFormik } from "formik";
import Button from "../button/Button";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const Invoice = () => {
  const { transactionId } = useParams();
  const { state } = useLocation();
  const date = new Date();
  const { currentUser } = useSelector((state) => state.user);
  const [phone, setPhone] = useState(false);
  const [email, setEmail] = useState(false);
  const [loading, setLoading] = useState(false);

  const onSubmit = async () => {
    setLoading(true);
    const capture = document.querySelector("#receipt");
    capture.style.width = "800px";
    capture.style.height = "auto";
    html2canvas(capture, {
      scale: window.devicePixelRatio,
    }).then((canvas) => {
      const imgData = canvas.toDataURL("img/png", 1.0);
      const doc = new jsPDF();
      doc.internal.scaleFactor = 1;
      const imageProps = doc.getImageProperties(imgData);
      const componentWidth = doc.internal.pageSize.getWidth();
      const componentHeight =
        (imageProps.height * componentWidth) / imageProps.width;
      doc.addImage(imgData, "PNG", 0, 0, componentWidth, componentHeight);
      doc.save(`${transactionId}.pdf`);
      capture.style.width = "auto";
      setLoading(false);
    });
  };

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: {
        payment: "",
        customer: "",
        phone: false,
        email: false,
      },
      // validationSchema: waterBillSchema,
      onSubmit,
    });

  return (
    <section className={classes.layout}>
      <div className={classes.mainContainer}>
        <p className={classes.heading}>Enter Invoice Details</p>
        <form onSubmit={handleSubmit} className={classes.form}>
          <label htmlFor="payment" className={classes.labelStyle}>
            Payment Method
          </label>
          <select
            className={classes.dropdown}
            id={classes.styledInput}
            value={values.payment}
            name="payment"
            onChange={handleChange}
            onBlur={handleBlur}
          >
            <option>Select Payment Method</option>
            <option>Cash</option>
            <option>Upi</option>
          </select>
          {errors.payment && touched.payment && (
            <p id={classes.errors}>{errors.payment}</p>
          )}
          <label htmlFor="customer" className={classes.labelStyle}>
            Issued To
          </label>
          <input
            className={classes.inputWidth}
            id={classes.styledInput}
            value={values.customer}
            name="customer"
            maxLength={75}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Enter Customer Detail"
            type="text"
          />

          {errors.customerNumber && touched.customerNumber && (
            <p id={classes.errors}>{errors.customerNumber}</p>
          )}
          <div className={classes.contactContainer}>
            <p className={classes.contact}>Select Contact Details to Include</p>
            <div>
              <label className={classes.options}>
                <input type="checkbox" onChange={() => setPhone(!phone)} />
                Phone
              </label>
              <label className={classes.options}>
                <input type="checkbox" onChange={() => setEmail(!email)} />
                Email
              </label>
            </div>
          </div>
          <Button
            btnType="submit"
            btnName={loading ? "Downloading" : "Download"}
            disabled={loading}
          ></Button>
        </form>
      </div>
      <div id="receipt" className={classes.receiptContainer}>
        <h1 className={classes.header}>
          Digistore <span className={classes.pay}>Pay</span>
        </h1>
        <div className={classes.details}>
          <div>
            <p className={classes.detail}>
              <strong>Invoice No : </strong>#{transactionId}
            </p>
            <p className={classes.detail}>
              <strong>Date Issued : </strong>
              {`${date.getDate()}` +
                "/" +
                `${date.getMonth()}` +
                "/" +
                `${date.getFullYear()}`}
            </p>
          </div>
          <div>
            <p className={classes.detail}>
              <strong>Issued To : </strong>
              {values.customer.toUpperCase()}
            </p>
          </div>
        </div>
        <div className={classes.invoiceContainer}>
          <h1 className={classes.title}>Invoice</h1>
          <p>
            Received with thanks from{" "}
            <span className={classes.blanks}>
              {values.customer
                ? values.customer.toUpperCase()
                : "{Customer Name}"}
            </span>
            , the sum of Rs.{" "}
            <span className={classes.blanks}>
              {state.amount ? state.amount : "{Amount}"}
            </span>{" "}
            by{" "}
            <span className={classes.blanks}>
              {values.payment
                ? values.payment.toUpperCase()
                : "{Payment Method}"}
            </span>{" "}
            for{" "}
            <span className={classes.blanks}>
              {state.service
                ? state.service.toUpperCase()
                : "{Service Details}"}
            </span>{" "}
            on{" "}
            <span className={classes.blanks}>
              {state.createdAt.split("T")[0]}
            </span>
          </p>
        </div>
        <div className={classes.details}>
          <div>
            <p className={classes.detail}>
              <strong>Issued By : </strong>
              {currentUser?.data.userType === "admin"
                ? "ADMIN"
                : `${currentUser?.data.accountName.toUpperCase()}, (${currentUser.data.franchiseName.toUpperCase()}), ${currentUser.data.franchiseAddressLine1.toUpperCase()}, ${currentUser.data.franchiseAddressLine2.toUpperCase()}`}
            </p>
            <p className={classes.detail}>
              <strong>Payment Method: </strong>
              {values.payment.toUpperCase()}
            </p>
          </div>

          <div>
            {phone && (
              <p className={classes.detail}>
                <strong>Phone: </strong>
                {currentUser?.data.phoneNumber}
              </p>
            )}
            {email && (
              <p className={classes.detail}>
                <strong>Email : </strong>
                {currentUser?.data.email}
              </p>
            )}
          </div>
        </div>
        <p className={classes.thanks}>Thank you for choosing us.</p>
      </div>
    </section>
  );
};

export default Invoice;
