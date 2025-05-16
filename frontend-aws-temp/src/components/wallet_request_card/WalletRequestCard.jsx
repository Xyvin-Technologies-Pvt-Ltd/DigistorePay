import React from "react";
import classes from "./WalletRequestCard.module.css";
import axios from "axios";
import { toast } from "react-hot-toast";
import format from "date-fns/format";

const fetchWalletRequests = async (setTopUpRequests) => {
  try {
    const response = await axios.get(
      `/moneyTransferRoute/moneyTransferVerify`,
      {
        params: {
          page: 1,
          pageLimit: 10,
        },
      },
    );

    if (response.error) {
      toast.error(response.error, {
        id: "request",
      });
    } else {
      setTopUpRequests(response.data.datas);
      // toast.success("Wallet Top Up Requests Updated", {
      //   id: "request",
      // });
    }
  } catch (error) {
    toast.error("Error Fetching Wallet Top Up Requests", {
      id: "request",
    });
  }
};

const WalletRequestCard = ({
  id,
  franchise,
  amount,
  transactionId,
  status,
  transactionType,
  fromUpiId,
  toUpiId,
  remark,
  fromAcc,
  toAcc,
  documentPic,
  executiveName,
  executiveId,
  referenceNo,
  date,
  updatedAt,
  createdAt,
  setTopUpRequests,
}) => {
  const action = async ({ status, id, transactionId }) => {
    const data = { status: status, id: id, transactionId: transactionId };

    try {
      const response = await axios.post(
        "/moneyTransferRoute/updatemoneyTransfer",
        data,
      );
      if (response.error) {
        toast.error(response.error, {
          id: "status",
        });
      } else {
        await fetchWalletRequests(setTopUpRequests);
        toast.success("Request Status Updated", {
          id: "status",
        });
      }
    } catch (error) {
      toast.error("Something went wrong!", {
        id: "status",
      });
    }
  };
  return (
    <div className={classes.mainContainer} key={id}>
      <div className={classes.headerSection}>
        <p className={classes.franchiseName}>{franchise.toUpperCase()}</p>
        <p className={classes.planAmount}>{amount}</p>
        {status === "pending" ? (
          <div className={classes.buttonContainer}>
            <div
              id={classes.accept}
              className={classes.button}
              onClick={() =>
                action({
                  status: "approved",
                  id: id,
                  transactionId: transactionId,
                })
              }
            >
              accept
            </div>
            <div
              id={classes.reject}
              className={classes.button}
              onClick={() =>
                action({
                  status: "rejected",
                  id: id,
                  transactionId: transactionId,
                })
              }
            >
              reject
            </div>
          </div>
        ) : (
          <p
            className={
              status === "approved" ? classes.greenText : classes.redText
            }
          >
            {status.toUpperCase()}
          </p>
        )}
      </div>
      <div className={classes.description}>
        <p className={classes.mode}>
          Mode of Payment : <span>{transactionType.toUpperCase()}</span>
        </p>
        {transactionType === "upi" ? (
          <div className={classes.details}>
            <p className={classes.detail}>
              Reference Number :{" "}
              <span className={classes.span}>{referenceNo}</span>
            </p>
            <p className={classes.detail}>
              UPI Sender Id : <span className={classes.span}>{fromUpiId}</span>
            </p>
            <p className={classes.detail}>
              UPI Receiver Id : <span className={classes.span}>{toUpiId}</span>
            </p>

            <p className={classes.detail}>
              Amount : <span className={classes.span}>{amount}</span>
            </p>
            <p className={classes.detail}>
              Date of Payment :{" "}
              <span className={classes.span}>{date.split("T")[0]}</span>
            </p>
            <p className={classes.detail}>
              Requested On :{" "}
              <span className={classes.span}>{createdAt.split("T")[0]}</span>
            </p>
            {status === "approved" ? (
              <p className={classes.detail}>
                Approved On :{" "}
                <span className={classes.span}>{updatedAt.split("T")[0]}</span>
              </p>
            ) : status === "rejected" ? (
              <p className={classes.detail}>
                Declined On :{" "}
                <span className={classes.span}>{updatedAt.split("T")[0]}</span>
              </p>
            ) : null}
          </div>
        ) : transactionType === "executive" ? (
          <div className={classes.details}>
            <p className={classes.detail}>
              Executive Id : <span className={classes.span}>{executiveId}</span>
            </p>
            <p className={classes.detail}>
              Executive Name :{" "}
              <span className={classes.span}>{executiveName}</span>
            </p>

            <p className={classes.detail}>
              Amount : <span className={classes.span}>{amount}</span>
            </p>
            <p className={classes.detail}>
              Requested On :{" "}
              <span className={classes.span}>{createdAt.split("T")[0]}</span>
            </p>
            {status === "approved" ? (
              <p className={classes.detail}>
                Approved On :{" "}
                <span className={classes.span}>{updatedAt.split("T")[0]}</span>
              </p>
            ) : status === "rejected" ? (
              <p className={classes.detail}>
                Declined On :{" "}
                <span className={classes.span}>{updatedAt.split("T")[0]}</span>
              </p>
            ) : null}
          </div>
        ) : (
          <div className={classes.details}>
            <p className={classes.detail}>
              Sender Account : <span className={classes.span}>{fromAcc}</span>
            </p>
            <p className={classes.detail}>
              Receiver Account : <span className={classes.span}>{toAcc}</span>
            </p>
            <p className={classes.detail}>
              Reference Number :{" "}
              <span className={classes.span}>{referenceNo}</span>
            </p>
            <p className={classes.detail}>
              Amount : <span className={classes.span}>{amount}</span>
            </p>
            {remark && (
              <p className={classes.detail}>
                Remark : <span className={classes.span}>{remark}</span>
              </p>
            )}
            <p className={classes.detail}>
              Requested On :{" "}
              <span className={classes.span}>{createdAt.split("T")[0]}</span>
            </p>
            {status === "approved" ? (
              <p className={classes.detail}>
                Approved On :{" "}
                <span className={classes.span}>{updatedAt.split("T")[0]}</span>
              </p>
            ) : status === "rejected" ? (
              <p className={classes.detail}>
                Declined On :{" "}
                <span className={classes.span}>{updatedAt.split("T")[0]}</span>
              </p>
            ) : null}
          </div>
        )}
      </div>
    </div>
  );
};

export default WalletRequestCard;
