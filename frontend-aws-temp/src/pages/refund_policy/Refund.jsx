import React from "react";
import classes from "./Refund.module.css";
import { Link } from "react-router-dom";
import Footer from "../../components/footer/Footer";

const Refund = () => {
  return (
    <>
      <div className={classes.mainLayout}>
        <div className={classes.subLayout}>
          <div className={classes.content}>
            <div className={classes.detailedcontent}>
              <h1 className={classes.headerText}>
                REFUND POLICY - DIGISTORE
                <span className={classes.headerTextSpan}> PAY</span> APPLICATION
              </h1>
              <p id={classes.justify}>
                This document is published in accordance with the provisions of
                Rule 3(1) of the Information Technology (Intermediaries
                Guidelines) Rules, 2011, which require the publishing of the
                rules and regulations governing the use and access of
                <Link className={classes.link}> www.digistorepay.com </Link>
                and the DigistorePay Services (defined below), or any other
                portal as may be launched by DiGi Suvidha India Private Limited
                ('DigistorePay website').
                <br />
                In addition to acceptance of the Customer Credit & Allied Terms,
                Merchant Terms, DigistorePay Application Terms of Use & Privacy
                Policy including amendments thereto that may be made from time
                to time (“Policies”), all the events of refund, exchange,
                cancellation, return, etc., of the Product or Services accessed
                by the DigistorePay User through the DigistorePay App, shall be
                governed by the present Cancellation & Refund Policy
                (hereinafter referred to as the “Policy”), and the User is
                advised to read and agree to the terms hereof before purchasing
                the products/services through the DigistorePay App. All terms
                and conditions of the Customer Credit & Allied Terms, Merchant
                Terms, DigistorePay Application Terms of Use & Privacy Policy
                are incorporated by reference in this Policy and shall be deemed
                to be a part of this Policy. The Policy is as under:
              </p>
              <ol>
                <li>
                  <h4>General</h4>
                  <ol type="a" id={classes.justify}>
                    <li>
                      Access of DigistorePay App by the DigistorePay User shall
                      be considered as deemed acceptance of this Policy by the
                      User. This Policy envisages the general terms of
                      cancellation and refund as per the prevalent practices;
                      however, the manufacturer’s or merchant’s or seller’s
                      policies in this regard shall be final and binding on the
                      DigistorePay User.
                    </li>
                    <li>
                      Products/Services may be subject to their respective
                      cancellation, return, refund & exchange policy mentioned
                      at the time of order and be governed by the terms of the
                      merchant or manufacturer or seller. You are requested to
                      read the refund, exchange, return & cancellation policy of
                      each product/service before placing the order on the
                      DigistorePay Application.
                    </li>
                    <li>
                      The product intended to be returned shall be unused and
                      preserved in its original condition along with tags and
                      original packaging.
                    </li>
                  </ol>
                </li>
                <li id={classes.justify}>
                  <h4>
                    Cancellation & Refund (Debit/Credit Card/Netbanking/Cash on
                    Delivery)
                  </h4>
                  <p>
                    The following Policy will be applicable to Customers
                    transacting through Debit/Credit Card/Netbanking/Cash on
                    Delivery (“Transaction/Transaction Price”):
                  </p>
                </li>
                <ol type="a" id={classes.justify}>
                  <li>
                    You, as a DigistorePay User, will be entitled to claim a
                    refund of the Transaction Price (as your sole and exclusive
                    remedy) in case you do not receive the delivery within the
                    time period provided at the time of placing the order. In
                    case you do not raise a refund claim using DigistorePay App
                    features within the stipulated time, you will be ineligible
                    for a refund and/or exchange and/or return.
                  </li>
                  <li>
                    You, as a DigistorePay User, understand that the Payment
                    Facility may not be available in full or in part for certain
                    categories of products and/or services and/or Transactions
                    as mentioned in the Policies, and hence you may not be
                    entitled to a refund in respect of the Transactions for
                    those products and/or services. DigistorePay User is advised
                    to read the cancellation and refund policy of their
                    respective Product/Services before placing an order on the
                    DigistorePay App.
                  </li>
                  <li>
                    Except for Cash On Delivery transactions, refunds, if any,
                    shall be made into the bank account of the DigistorePay User
                    only or through any other method available on the Platform,
                    as chosen by you
                  </li>
                  <li>
                    For Cash on Delivery transactions, refunds, if any, shall be
                    made into the bank account of the DigistorePay User only, so
                    provided by him/her at the time of confirming the
                    cancellation & refund request on the DigistorePay App.
                    DigistorePay strongly advises the DigistorePay Users to
                    avoid the cash on delivery option if the DigistorePay User
                    does not have a bank account to avoid any delay or failure
                    in refund of the Transaction Price in the event of
                    cancellation. DigistorePay categorically disclaims any
                    liability regarding the claim of damages, interest, etc.,
                    from the DigistorePay User in this regard.
                  </li>
                  <li>
                    Refunds shall be made in Indian Rupees only and shall be
                    equivalent to the Transaction Price received in Indian
                    Rupees.
                  </li>
                  <li>
                    For electronic payments, refunds shall be made through a
                    payment facility using NEFT/RTGS or any other online
                    banking/electronic funds transfer system approved by the
                    Reserve Bank of India (RBI).
                  </li>
                  <li>
                    Refunds may be supported for select banks. Where a bank is
                    not supported for processing refunds, you will be required
                    to share alternate bank account details with us for
                    processing the refund.
                  </li>
                </ol>
                <li>
                  <h4> Cancellation & Refund (Loan/Credit Facility)</h4>
                </li>
                <p>
                  The following Policy will be applicable to Customers
                  transacting on the DigistorePay App using the Loan/Credit
                  Facility through the Partner Merchant’s Debit/Credit
                  Card/Netbanking/Cash on Delivery (“Transaction/Transaction
                  Price”):
                </p>
                <ol type="a" id={classes.justify}>
                  <li>
                    You, as a DigistorePay User, will be entitled to claim a
                    refund of the Transaction Price (as your sole and exclusive
                    remedy) in case you do not receive the delivery within the
                    time period provided at the time of placing the order. In
                    case you do not raise a refund claim using DigistorePay App
                    features within the stipulated time, you will be ineligible
                    for a refund and/or exchange and/or return.
                  </li>
                  <li>
                    You, as a DigistorePay User, understand that the Payment
                    Facility may not be available in full or in part for certain
                    categories of products and/or services and/or Transactions
                    as mentioned in the Policies, and hence you may not be
                    entitled to a refund in respect of the Transactions for
                    those products and/or services. DigistorePay User is advised
                    to read the cancellation and refund policy of their
                    respective Product/Services before placing an order on the
                    DigistorePay App.
                  </li>
                  <li>
                    In the event of a request for Cancellation & Refund
                    concerning the Transactions done by availing of the
                    Loan/Credit Facility through the DigistorePay App, the
                    DigistorePay User shall pay, settle, and close the Loan with
                    the Partner Merchant Bank by paying the full amount of the
                    Product/Services.
                  </li>
                  <li>
                    All/Any return of the Product/s purchased via the
                    DigistorePay App or by using the DigistorePay services shall
                    be directly initiated or applied with the
                    Merchant/Manufacturer from whom the Product was purchased,
                    notwithstanding whether such Merchant is the Manufacturer of
                    the said product or not, and such returns shall be processed
                    as per the Terms and Conditions and/or the Return Policy of
                    such Merchants/Manufacturer. The Consumer/DigistorePay User
                    shall keep DigistorePay indemnified from the consequences or
                    effects of such return and shall be obliged to pay the
                    acknowledged EMI until the refund has been deposited with
                    DigistorePay/Partner Merchant Bank and an NOC obtained with
                    regards to the Loan Closure. The Consumer/DigistorePay User
                    agrees and accepts that interest shall be charged on the
                    days/months the Loan was availed until the Loan Closure.
                  </li>
                  <li>
                    The Merchant, upon request for Return by the
                    Consumer/DigistorePay User, will facilitate the Return of
                    the Product as per the Return Policy of the
                    Merchant/Manufacturer. In the event of acceptance of Return,
                    the Merchant/Manufacturer shall, at the first instance,
                    inform DigistorePay and initiate the refund process. The
                    Merchant/Manufacturer confirms to keep DigistorePay
                    indemnified against any/all repercussions arising out of a
                    delay in such refund to DigistorePay.
                  </li>
                </ol>
                <li id={classes.justify}>
                  <h4>
                    Exchange shall be subject to respective Merchant Policies.
                    The DigistorePay User shall keep DigistorePay indemnified in
                    this regard at all times.
                  </h4>
                </li>
                <li id={classes.justify}>
                  <h4>
                    Refunds shall be conditional and shall be with recourse
                    available to DigistorePay in case of any misuse by the
                    DigistorePay User.
                  </h4>
                </li>
                <li id={classes.justify}>
                  <h4>
                    The Merchant/Seller/DigistorePay may also request you for
                    additional documents for verification.
                  </h4>
                </li>
                <li>
                  <h4>
                    Refunds shall be subject to Buyer complying with Policies.
                  </h4>
                </li>
                <p id={classes.justify}>
                  The DigistorePay User acknowledges that they have read this
                  Policy and agree to all its terms and conditions. The User
                  shall also independently evaluate the desirability of
                  purchasing the Product and is not relying on any
                  representation, guarantee, or statement(s) other than as set
                  out in this Refund Policy or Terms of Use.
                </p>
              </ol>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Refund;
