import React from "react";
import { useState, useEffect } from "react";
import classes from "./Calculator.module.css";
import Result from "../../components/calculator/resultDisplay/Result";
import InputReciver from "../../components/calculator/inputReciver/InputReciver";
function Calculator() {
  const [account, setAccount] = useState(0);
  const [pan, setPan] = useState(0);
  const [bill, setBill] = useState(0);
  const [ticket, setTicket] = useState(0);
  const [insurance, setInsurance] = useState(0);
  const [loan, setLoan] = useState(0);
  const [money, setMoney] = useState(0);
  const [sign, setSign] = useState(0);
  const [job, setJob] = useState(0);
  const [estate, setEstate] = useState(0);
  const [edu, setEdu] = useState(0);
  const [total, setTotal] = useState(0);
  useEffect(() => {
    setTotal(
      parseInt(account) +
        parseInt(pan) +
        parseInt(bill) +
        parseInt(ticket) +
        parseInt(insurance) +
        parseInt(loan) +
        parseInt(money) +
        parseInt(sign) +
        parseInt(job) +
        parseInt(estate) +
        parseInt(edu),
    );
  }, [
    account,
    pan,
    bill,
    ticket,
    insurance,
    loan,
    money,
    sign,
    job,
    estate,
    edu,
  ]);
  return (
    <div className={classes.mainLayout}>
      <p className={classes.headerText}>revenue Calculator</p>
      <div className={classes.service_container}>
        <div className={classes.content}>
          <div className={classes.structor}>
            <div className={classes.left}>
              <Result
                account={account}
                pan={pan}
                bill={bill}
                ticket={ticket}
                insurance={insurance}
                loan={loan}
                money={money}
                sign={sign}
                job={job}
                estate={estate}
                edu={edu}
                total={total}
              />
            </div>
            <div className={classes.right}>
              <p className={classes.sectiontitle}>Services</p>
              <div className={classes.container}>
                <InputReciver
                  service="Accounting Services"
                  commision="600"
                  onChange={(e) => {
                    if (e.target.value >= 0) {
                      setAccount(e.target.value * 600);
                    }
                    if (e.target.value.length === 0) {
                      setAccount(0);
                    }
                  }}
                />
                <InputReciver
                  service="Pan Card"
                  commision="130"
                  onChange={(e) => {
                    if (e.target.value >= 0) {
                      setPan(e.target.value * 130);
                    }
                    if (e.target.value.length === 0) {
                      setPan(0);
                    }
                  }}
                />
                <InputReciver
                  service="All Loans"
                  commision="2000"
                  onChange={(e) => {
                    if (e.target.value >= 0) {
                      setLoan(e.target.value * 2000);
                    }
                    if (e.target.value.length === 0) {
                      setLoan(0);
                    }
                  }}
                />
                <InputReciver
                  service="Bill Payments"
                  commision="10"
                  onChange={(e) => {
                    if (e.target.value >= 0) {
                      setBill(e.target.value * 10);
                    }
                    if (e.target.value.length === 0) {
                      setBill(0);
                    }
                  }}
                />
                <InputReciver
                  service="Money Transfer"
                  commision="50"
                  onChange={(e) => {
                    if (e.target.value >= 0) {
                      setMoney(e.target.value * 50);
                    }
                    if (e.target.value.length === 0) {
                      setMoney(0);
                    }
                  }}
                />
                <InputReciver
                  service="Ticket Booking"
                  commision="60"
                  onChange={(e) => {
                    if (e.target.value >= 0) {
                      setTicket(e.target.value * 60);
                    }
                    if (e.target.value.length === 0) {
                      setTicket(0);
                    }
                  }}
                />
                <InputReciver
                  service="Digital Signature"
                  commision="750"
                  onChange={(e) => {
                    if (e.target.value >= 0) {
                      setSign(e.target.value * 750);
                    }
                    if (e.target.value.length === 0) {
                      setSign(0);
                    }
                  }}
                />
                <InputReciver
                  service="All Insurance"
                  commision="100"
                  onChange={(e) => {
                    if (e.target.value >= 0) {
                      setInsurance(e.target.value * 100);
                    }
                    if (e.target.value.length === 0) {
                      setInsurance(0);
                    }
                  }}
                />
                <InputReciver
                  service="Job Portal"
                  commision="40"
                  onChange={(e) => {
                    if (e.target.value >= 0) {
                      setJob(e.target.value * 40);
                    }
                    if (e.target.value.length === 0) {
                      setJob(0);
                    }
                  }}
                />
                <InputReciver
                  service="Real Estate"
                  commision="10000"
                  onChange={(e) => {
                    if (e.target.value >= 0) {
                      setEstate(e.target.value * 10000);
                    }
                    if (e.target.value.length === 0) {
                      setEstate(0);
                    }
                  }}
                />
                <InputReciver
                  service="Education Consultancy"
                  commision="10000"
                  onChange={(e) => {
                    if (e.target.value >= 0) {
                      setEdu(e.target.value * 10000);
                    }
                    if (e.target.value.length === 0) {
                      setEdu(0);
                    }
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Calculator;
