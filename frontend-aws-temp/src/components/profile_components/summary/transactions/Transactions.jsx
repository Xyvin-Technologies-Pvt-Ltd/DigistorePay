import { useEffect, useState } from "react";
import classes from "./Transactions.module.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import toast from "react-hot-toast";
const Transactions = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [transaction, setTransaction] = useState([]);

  useEffect(() => {
    const TranscationHistory = async () => {
      try {
        const response =
          currentUser && currentUser?.data.userType === "admin"
            ? await axios.get(`transationHistory/transationHistoryAdmin`, {
                params: {
                  page: 1,
                  pageLimit: 5,
                },
              })
            : await axios.get(
                `/transationHistory/transactionHistoryFranchise`,
                {
                  params: {
                    page: 1,
                    pageLimit: 5,
                  },
                }
              );

        const data = response.data.data;

        setTransaction(data || []);
        if (response.error) {
          toast.error(response.error, {
            id: "transaction",
          });
        }
        // else {
        //   toast.success("Transactions Updated", {
        //     id: "transactions",
        //   });
        // }
      } catch (error) {
        toast.error("Error fetching transactions", {
          id: "transactions",
        });
      }
    };

    TranscationHistory();
  }, []);

  return (
    <>
      <div className={classes.container}>
        <div className={classes.headernav}>
          <p className={classes.head}>Transaction History</p>
          <Link className={classes.link} to="/profile/transactions">
            <p className={classes.button}>See All</p>
          </Link>
        </div>
        <p className={classes.subhead}>Latest 5 transactions</p>
        <div className={classes.collections}>
          {transaction.length !== 0 ? (
            transaction.map((transaction) => {
              return (
                <div
                  className={
                    currentUser?.data.userType === "admin"
                      ? classes["card"]
                      : classes["carduser"]
                  }
                  key={transaction.id}
                >
                  {currentUser && currentUser?.data.userType === "admin" && (
                    <p
                      className={classes.truncatedText}
                      id={classes.name}
                      title={transaction.userName}
                    >
                      {transaction.userName}
                    </p>
                  )}
                  <p
                    className={classes.truncatedText}
                    id={
                      currentUser && currentUser?.data.userType === "admin"
                        ? classes.service
                        : " "
                    }
                  >
                    {transaction.service}
                  </p>
                  {currentUser &&
                    currentUser?.data.userType === "franchise" && (
                      <p
                        id={
                          transaction.status === "success"
                            ? classes.success
                            : transaction.status === "fail"
                            ? classes.failure
                            : classes.pending
                        }
                        className={classes.status}
                      >
                        {transaction.status.toUpperCase()}
                      </p>
                    )}
                  <p
                    id={
                      currentUser && (currentUser?.data.userType === "admin" ||currentUser?.data.userType === "franchise")
                        ? transaction.status === "success"
                          ? classes.success
                          : transaction.status === "pending"
                          ? classes.pending
                          : classes.failure
                        : ""
                    }
                    className={classes.amount}
                  >
                    {transaction.amount}
                  </p>
                </div>
              );
            })
          ) : (
            <p style={{ textAlign: "center", color: "grey" }}>
              Make Your First Transaction!
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default Transactions;
