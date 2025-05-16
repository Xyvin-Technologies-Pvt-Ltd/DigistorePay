import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import classes from "./JobHistory.module.css";
import axios from "axios";
import toast from "react-hot-toast";

function JobHistory() {
  const { currentUser } = useSelector((state) => state.user);
  const [jobs, setJobs] = useState([]);
  const [page, setPage] = useState(1);
  const pageLimit = 5;

  const assignedId = currentUser?.data?.employeeId;

  useEffect(() => {
    const fetchJobHistory = async () => {
      const url =
        currentUser?.data.userType === "staff"
          ? "/fetchServicesRouter/getAllWorksByStaffId"
          : "/fetchServicesRouter/getAllWorks";

      try {
        const response = await axios.get(url, {
          params: {
            page: page,
            pageLimit: pageLimit,
            assignedId: assignedId,
          },
        });
        if (response.data.errorcode) {
          toast.error(error.data.msg || "Failed to fetch work history", {
            id: "jobHistory",
          });
        } else {
          setJobs(response.data.data);
        }
      } catch (error) {
        console.error(error);
        toast.error("Failed to fetch job history from the server", {
          id: "jobHistoryError",
        });
      }
    };
    fetchJobHistory();
  }, [page, pageLimit]);

  return (
    <div className={classes.container}>
      <div className={classes.headContainer}>
        <h3 className={classes.head}>Work History</h3>
        <Link className={classes.link} to="/profile/jobs">
          <p className={classes.button}>See All</p>
        </Link>
      </div>
      <p className={classes.subhead}>Latest 5 works</p>
      <div className={classes.collections}>
        {jobs.length !== 0 ? (
          jobs?.map((job) => {
            return (
              <div
                className={
                  currentUser?.data?.userType === "admin"
                    ? classes["card"]
                    : classes["card2"]
                }
                key={job?.workId}
              >
                <p className={classes.name}>
                  <strong>{job?.tableName}</strong>
                </p>
                {((currentUser && currentUser?.data?.userType === "admin") ||
                  (currentUser && currentUser?.data?.userType === "staff")) && (
                  <p className={classes.priority}>
                    <strong>{job?.priority}</strong>
                  </p>
                )}
                <p
                  className={classes.status}
                  id={`${
                    job?.status?.toLowerCase() === "completed"
                      ? classes.complete
                      : job?.status?.toLowerCase() === "inprogress"
                      ? classes.inprogress
                      : job?.status?.toLowerCase() === "inqueue"
                      ? classes.inqueue
                      : classes.rejected
                  }`}
                >
                  {job?.status?.toLowerCase() === "completed"
                    ? "Completed"
                    : job?.status?.toLowerCase() === "inprogress"
                    ? "Processing"
                    : job?.status?.toLowerCase() === "inqueue"
                    ? "Requested"
                    : "Rejected"}
                </p>
              </div>
            );
          })
        ) : (
          <p style={{ textAlign: "center", color: "grey" }}>
            Post Your First Offline Work Request!
          </p>
        )}
      </div>
    </div>
  );
}

export default JobHistory;
