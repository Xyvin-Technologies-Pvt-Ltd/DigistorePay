import Button from "../../../button/Button";
import classes from "./Balance.module.css";
import Modal from "../../../modal/Modal";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FaSyncAlt } from "react-icons/fa";
import { FaWallet } from "react-icons/fa6";
import WalletRequest from "../../../wallet_request/WalletRequest";
import { fetchWalletBalance } from "../../../../utils/fetchWallet";

const Balance = () => {
  const { currentUser } = useSelector((state) => state.user);
  const { wallet } = useSelector((state) => state.wallet);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  const dispatch = useDispatch();

  return (
    <>
      <div className={classes.container}>
        {currentUser.data.userType === "admin" ? (
          <div>
            <div className={classes.header}>
              <p className={classes.content}>Monthly Income</p>
            </div>

            <p id={classes.amount} className={classes.content}>
              ₹ 78544
            </p>
          </div>
        ) : (
          <div>
            <div className={classes.header}>
              <p className={classes.content}>Wallet Balance</p>
              <FaSyncAlt
                className={classes.sync}
                onClick={() => fetchWalletBalance(dispatch, currentUser)}
              />
            </div>

            {wallet !== null ? (
              <p id={classes.amount} className={classes.content}>
                <FaWallet style={{ color: "var(--honoblue)" }} />{" "}
                {parseFloat(wallet.balance).toFixed(2)}
              </p>
            ) : (
              <p id={classes.amount} className={classes.content}>
                <FaWallet style={{ color: "var(--honoblue)" }} /> Loading...
              </p>
            )}
          </div>
        )}

        {(currentUser.data.userPlan ||
          currentUser.data.userType === "admin") && (
          <div className={classes.accountType}>
            <p className={classes.text}>Account Type</p>
            <p className={classes.type}>
              {currentUser.data.userType === "admin"
                ? "LIFETIME"
                : currentUser.data.userPlan.toUpperCase()}
            </p>
          </div>
        )}
        {currentUser.data.userType === "admin" ? (
          <Link className={classes.link} to="/profile/transactions">
            <Button clickEvent={openModal} btnName="View Accounts" />
          </Link>
        ) : (
          <div className={classes.btn}>
            <Button clickEvent={openModal} btnName="Top Up" />
          </div>
        )}
      </div>
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <WalletRequest onClose={closeModal} />
      </Modal>
    </>
  );
};

export default Balance;
