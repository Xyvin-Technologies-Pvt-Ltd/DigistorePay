import React, { useState, useEffect } from "react";
import classes from "./Navbar.module.css";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { FaWallet } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { fetchWalletBalance } from "../../utils/fetchWallet";
import { logOut } from "../../utils/logOut";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { ImCross } from "react-icons/im";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoSettings } from "react-icons/io5";
import { GrAndroid } from "react-icons/gr";
import { IoQrCode } from "react-icons/io5";
import { useFormik } from "formik";
import Modal from "../modal/Modal";
import Button from "../../components/button/Button";
import axios from "axios";
import toast from "react-hot-toast";

const Navbar = () => {
  const mode = import.meta.env.VITE_ENV;
  const [navbar, setNavbar] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const { currentUser } = useSelector((state) => state.user);
  const { wallet } = useSelector((state) => state.wallet);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpen2, setIsModalOpen2] = useState(false);

  function navActive() {
    if (window.scrollY >= 80) {
      setNavbar(true);
    } else {
      setNavbar(false);
    }
  }

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen((prev) => !prev);
  };

  const openModal2 = () => {
    setIsModalOpen2(true);
  };

  const closeModal2 = () => {
    setIsModalOpen2((prev) => !prev);
  };

  const onSubmit = async (values) => {
    const inputData = {
      transactionType: values.transactionType,
      fromUpiId: values.fromUpiId,
      amount: values.amount,
      date: values.date,
      toUpiId: values.toUpiId,
    };
    try {
      const response = await axios.post(
        "/moneyTransferRoute/moneyTransferDetails",
        inputData
      );
      if (response.error) {
        toast.error(response.error.msg, { id: "upiPayment" });
      } else {
        setIsModalOpen(true);
        setIsModalOpen2(false);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong", {
        id: "upiPayment",
      });
    }
  };

  const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
    isValid,
    dirty,
  } = useFormik({
    initialValues: {
      transactionType: "upi",
      fromUpiId: "",
      amount: "",
      date: Date.now(),
      toUpiId: "digisuvidha@icici",
    },
    onSubmit,
  });

  useEffect(() => {
    window.addEventListener("scroll", navActive);
    return () => {
      window.removeEventListener("scroll", navActive);
    };
  }, []);

  let location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    fetchWalletBalance(dispatch, currentUser);
  }, [currentUser]);

  const toggleSettingsMenu = () => {
    setShowSettings(!showSettings);
  };

  return (
    <>
      <nav id={navbar ? classes.active : ""} className={classes.main}>
        <div className={classes.li}>
          <img
            className={classes.icon}
            src="/icon.png"
            width={35}
            height={35}
            alt="icon"
          />
          <Link to={currentUser ? "/profile" : "/"}>
            <p style={{ color: "black" }}>
              Digistore <span id={classes.black}>Pay</span>
            </p>
          </Link>
        </div>

        {/* {mode !== "production" && (
          <div className={classes.branch_badge}>{mode}</div>
        )} */}

        {/* option based on condition or page */}
        <div className={classes.li}>
          {!currentUser && location.pathname === "/" && (
            <Link to="/collegefest" id={classes.desktopNav}>
              <span className={classes.menuLink}>Rural Quest</span>
            </Link>
          )}
          {currentUser?.data?.userType === "student" && (
            <a
              className={classes.downIconLink}
              href="https://play.google.com/store/apps/details?id=io.ionic.digistorepay"
              target="_blank"
            >
              <GrAndroid style={{ color: "green" }} />
            </a>
          )}
          {!currentUser && location.pathname === "/signup" ? (
            <p>
              Already a Member?{" "}
              <Link to="/login">
                <span style={{ color: "var(--honoblue)" }}>Login In</span>
              </Link>
            </p>
          ) : (!currentUser && location.pathname === "/login") ||
            (!currentUser && location.pathname === "/forgot") ? (
            <p>
              New User?{" "}
              <Link to="/signup">
                <span style={{ color: "var(--honoblue)" }}>Sign Up</span>
              </Link>
            </p>
          ) : currentUser ? (
            <div className={classes.menuLinks}>
              <span className={classes.hidemenu}>
                <Link to="/profile" id={classes.desktopNav}>
                  <span
                    id={
                      location.pathname.startsWith("/profile/")
                        ? classes.activeLink
                        : ""
                    }
                    className={classes.menuLink}
                  >
                    Dashboard
                  </span>
                </Link>
                {currentUser?.data.userType === "franchise" && (
                  <Link to="/services" id={classes.desktopNav}>
                    <span
                      id={
                        location.pathname.startsWith("/services/")
                          ? classes.activeLink
                          : ""
                      }
                      className={classes.menuLink}
                    >
                      Services
                    </span>
                  </Link>
                )}

                {(currentUser?.data.userType === "admin" ||
                  currentUser?.data.userType === "distributor" ||
                  currentUser?.data.userType === "student" ||
                  currentUser?.data.userType === "filedExecutive") && (
                  <Link to="/onboard" id={classes.desktopNav}>
                    <span
                      id={
                        location.pathname.startsWith("/onboard/")
                          ? classes.activeLink
                          : ""
                      }
                      className={classes.menuLink}
                    >
                      Onboard
                    </span>
                  </Link>
                )}
                {(currentUser?.data.userType === "admin" ||
                  currentUser?.data.userType === "staff") && (
                  <Link to="/management" id={classes.desktopNav}>
                    <span
                      id={
                        location.pathname.startsWith("/management/")
                          ? classes.activeLink
                          : ""
                      }
                      className={classes.menuLink}
                    >
                      Manage
                    </span>
                  </Link>
                )}
              </span>
              {wallet &&
                (currentUser?.data.userType === "franchise" ? (
                  <>
                    <span
                      onClick={openModal}
                      className={classes.menuLink}
                      id={classes.walletQr}
                    >
                      {/* <IoQrCode /> */}
                    </span>
                    <span
                      onClick={openModal2}
                      className={classes.menuLink}
                      id={classes.walletQr}
                    >
                      <FaWallet />{" "}
                      {wallet !== null
                        ? parseFloat(wallet.balance).toFixed(2)
                        : "loading"}
                    </span>
                  </>
                ) : (
                  <Link to="/profile/wallet">
                    <span
                      id={
                        location.pathname === "/profile/wallet"
                          ? classes.activeLink
                          : ""
                      }
                      className={classes.menuLink}
                    >
                      <FaWallet
                        style={
                          location.pathname === "/profile/wallet"
                            ? { color: "var(--honoblue)" }
                            : { color: "var(--jetblack)" }
                        }
                      />{" "}
                      {wallet !== null
                        ? parseFloat(wallet.balance).toFixed(2)
                        : "loading"}
                    </span>
                  </Link>
                ))}
              {isModalOpen2 && (
                <Modal
                  isOpen={isModalOpen2}
                  onClose={closeModal2}
                  title={"DigistorePay"}
                >
                  <div className={classes.customModalContent}>
                    <form
                      className={classes.modalInput}
                      onSubmit={handleSubmit}
                    >
                      <input
                        className={classes.styledInput}
                        type="text"
                        name="fromUpiId"
                        value={values.fromUpiId}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        placeholder="Enter UPI ID"
                      ></input>
                      <input
                        className={classes.styledInput}
                        type="number"
                        name="amount"
                        value={values.amount}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        onWheel={(e) => e.target.blur()}
                        placeholder="Enter the Amount"
                      ></input>
                      <Button btnName={"Proceed"} btnType="submit" />
                    </form>
                  </div>
                </Modal>
              )}
              {isModalOpen && (
                <Modal
                  isOpen={isModalOpen}
                  onClose={closeModal}
                  title={"DigistorePay"}
                >
                  <div className={classes.customModalContent}>
                    <p className={classes.para}>
                      Scan the QR code using your UPI apps
                    </p>
                    <div className={classes.logoContainer}>
                      <img
                        className={classes.logoimg}
                        src="/images/navbar/google-pay.png"
                        alt="googolepay"
                      />
                      <img
                        className={classes.logoimg}
                        src="/images/navbar/paytm-icon.png"
                        alt="paytm"
                      />
                      <img
                        className={classes.logoimg}
                        id={classes.phonepe}
                        src="/images/navbar/phonepe-icon.png"
                        alt="phonepe"
                      />
                      <img
                        className={classes.logoimg}
                        src="/images/navbar/bhim-app-icon.png"
                        alt="bhim"
                      />
                      <img
                        className={classes.logoimg}
                        id={classes.amazonpay}
                        src="/images/navbar/amazon-pay-icon.png"
                        alt="amazonpay"
                      />
                    </div>
                    <div className={classes.qrContainer}>
                      <img
                        className={classes.qrimg}
                        src="/images/navbar/collectionqr.png"
                        alt="qr"
                      />
                    </div>
                    <p className={classes.para}>
                      Your virtual account detail for instant wallet payment
                    </p>

                    <h5 className={classes.para} id={classes.bankdetails}>
                      BANK : ICICI
                    </h5>
                    <h5 className={classes.para} id={classes.bankdetails}>
                      IFSC CODE : ICIC0000103
                    </h5>
                    <h5 className={classes.para} id={classes.bankdetails}>
                      VIRTUAL ACCOUNT : LP18606172833{" "}
                    </h5>
                    <h4 className={classes.para}>DIGI SUVIDHA</h4>
                  </div>
                </Modal>
              )}

              <div className={classes.settings} onClick={toggleSettingsMenu}>
                <span className={classes.butnhide}>
                  {showSettings ? (
                    <span className={classes.menuLink}>
                      <ImCross className={classes.gearIcon} />
                    </span>
                  ) : (
                    <span className={classes.menuLink}>
                      <GiHamburgerMenu className={classes.gearIcon} />
                    </span>
                  )}
                </span>
                <span className={classes.settingshide}>
                  <span className={classes.menuLink}>
                    <IoSettings
                      className={`${classes.gearIcon} ${
                        showSettings ? classes.rotate : ""
                      }`}
                    />
                  </span>
                </span>
              </div>
            </div>
          ) : null}
        </div>
      </nav>

      {showSettings && (
        <div className={classes.settingsMenu}>
          {currentUser &&
            currentUser?.data.userType !== "student" &&
            currentUser?.data.userType !== "admin" && (
              <Link
                to="/profile/account"
                className={classes.link}
                onClick={() => setShowSettings(false)}
              >
                <span className={classes.menuLink}>View Profile</span>
              </Link>
            )}
          {currentUser && currentUser?.data?.userType === "admin" && (
            <Link
              to="/profile/activity"
              className={classes.link}
              onClick={() => setShowSettings(false)}
            >
              <span className={classes.menuLink}>View Activity</span>
            </Link>
          )}
          {currentUser && currentUser?.data.userType === "franchise" && (
            <Link
              to="/profile/wallet"
              className={classes.link}
              onClick={() => setShowSettings(false)}
            >
              <span className={classes.menuLink}>View Wallet</span>
            </Link>
          )}
          <Link
            to="/reset_password"
            className={classes.link}
            onClick={() => setShowSettings(false)}
          >
            <span className={classes.menuLink}>Reset Password</span>
          </Link>
          {/* {currentUser && currentUser?.data.userType === "franchise" && (
            <Link
              to="/plan"
              className={classes.link}
              onClick={() => setShowSettings(false)}
            >
              <span className={classes.menuLink}>Upgrade Plan </span>
            </Link>
          )} */}
          <Link
            to="/calculator"
            className={classes.link}
            onClick={() => setShowSettings(false)}
          >
            <span className={classes.menuLink}>Calculator</span>
          </Link>
          <div
            id={classes.logout}
            className={classes.link}
            onClick={async () => {
              setShowSettings(false);
              await logOut(dispatch);
            }}
          >
            <span className={classes.logout}>
              <RiLogoutCircleRLine style={{ color: "red" }} /> Logout
            </span>
          </div>
        </div>
      )}

      {showSettings && (
        <div id={navbar ? classes.active : ""} className={classes.mobileNav}>
          <Link
            to="/profile"
            className={classes.link}
            onClick={() => setShowSettings(false)}
          >
            <span
              id={
                location.pathname.startsWith("/profile/")
                  ? classes.activeLink
                  : ""
              }
              className={classes.menuLink}
            >
              Dashboard
            </span>
          </Link>
          {currentUser?.data.userType === "franchise" && (
            <Link
              to="/services"
              className={classes.link}
              onClick={() => setShowSettings(false)}
            >
              <span
                id={
                  location.pathname.startsWith("/services/")
                    ? classes.activeLink
                    : ""
                }
                className={classes.menuLink}
              >
                Services
              </span>
            </Link>
          )}
          {(currentUser?.data.userType === "admin" ||
            currentUser?.data.userType === "distributor" ||
            currentUser?.data.userType === "student" ||
            currentUser?.data.userType === "filedExecutive") && (
            <Link
              to="/onboard"
              className={classes.link}
              onClick={() => setShowSettings(false)}
            >
              <span
                id={
                  location.pathname.startsWith("/onboard/")
                    ? classes.activeLink
                    : ""
                }
                className={classes.menuLink}
              >
                OnBoard
              </span>
            </Link>
          )}
          {(currentUser?.data.userType === "admin" ||
            currentUser?.data.userType === "staff") && (
            <Link
              to="/management"
              className={classes.link}
              onClick={() => setShowSettings(!showSettings)}
            >
              <span
                id={
                  location.pathname.startsWith("/management/")
                    ? classes.activeLink
                    : ""
                }
                className={classes.menuLink}
              >
                Manage
              </span>
            </Link>
          )}
          {currentUser && currentUser?.data?.userType === "franchise" && (
            <Link
              to="/profile/wallet"
              className={classes.link}
              onClick={() => setShowSettings(false)}
            >
              <span className={classes.menuLink}>Wallet</span>
            </Link>
          )}
          {currentUser &&
            currentUser?.data?.userType !== "student" &&
            currentUser?.data?.userType !== "admin" && (
              <Link
                to="/profile/account"
                className={classes.link}
                onClick={() => setShowSettings(false)}
              >
                <span className={classes.menuLink}>View Profile</span>
              </Link>
            )}
          {currentUser && currentUser?.data?.userType === "admin" && (
            <Link
              to="/profile/account"
              className={classes.link}
              onClick={() => setShowSettings(false)}
            >
              <span className={classes.menuLink}>View Activity</span>
            </Link>
          )}
          {/* {currentUser && currentUser?.data.userType === "franchise" && (
            <Link
              to="/plan"
              className={classes.link}
              onClick={() => setShowSettings(false)}
            >
              <span className={classes.menuLink}>Upgrade Plan</span>
            </Link>
          )} */}
          <Link
            to="/reset_password"
            className={classes.link}
            onClick={() => setShowSettings(false)}
          >
            <span
              id={
                location.pathname === "/reset_password"
                  ? classes.activeLink
                  : ""
              }
              className={classes.menuLink}
            >
              Reset Password
            </span>
          </Link>
          {currentUser && currentUser?.data?.userType === "franchise" && (
            <Link
              to="/calculator"
              className={classes.link}
              onClick={() => setShowSettings(false)}
            >
              <span
                id={
                  location.pathname === "/calculator" ? classes.activeLink : ""
                }
                className={classes.menuLink}
              >
                Calculator
              </span>
            </Link>
          )}
          <div
            className={classes.link}
            onClick={async () => {
              setShowSettings(false);
              await logOut(dispatch);
            }}
          >
            <span className={classes.logout}>
              <RiLogoutCircleRLine style={{ color: "red" }} /> Logout
            </span>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
