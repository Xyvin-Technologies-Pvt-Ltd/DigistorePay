import React, { useState, useEffect } from "react";
import { MdArrowBackIos, MdArrowForwardIos } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import SearchBar from "../../components/search_bar/SearchBar";
import Filter from "../../components/filter/Filter";
import Sort from "../../components/sort/Sort";
import axios from "axios";
import toast from "react-hot-toast";
import classes from "./JobList.module.css";
import { useSelector } from "react-redux";
import { BsPersonFillCheck } from "react-icons/bs";
import { AiFillSafetyCertificate } from "react-icons/ai";

const JobList = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [content, setContent] = useState([]);
  const [page, setPage] = useState(1);
  const pageLimit = 10;
  const [totalItems, setTotalItems] = useState();
  const [totalPages, setTotalPages] = useState();

  const [selectedSearchField, setSelectedSearchField] = useState("");
  const [searchInputs, setSearchInputs] = useState([
    {
      name: "searchValue",
      placeholder: "Enter your value to search",
      value: "",
    },
  ]);
  const [sortField, setSortField] = useState("updatedAt");
  const [sortOrder, setSortOrder] = useState("desc");
  const [sortLabel, setSortLabel] = useState("Date: Latest");

  const [filterField, setFilterField] = useState();
  const [filterValue, setFilterValue] = useState();

  const navigate = useNavigate();

  const assignedId = currentUser?.data?.employeeId;

  const handleInputChange = (e) => {
    const { value } = e.target;
    setSearchInputs((prevInputs) =>
      prevInputs.map((input) =>
        input.name === "searchValue" ? { ...input, value } : input
      )
    );
  };

  const changeWorkStatus = async (workId) => {
    try {
      await axios.put("/workStatusRoute/workStatus", { workId });
    } catch (error) {
      toast.error("Something went wrong. Please try again.", { id: "jobList" });
    }
  };

  const searchQuery =
    searchInputs.find((input) => input.name === "searchValue")?.value || "";

  const fetchData = async () => {
    const url =
      currentUser?.data.userType === "staff"
        ? "/fetchServicesRouter/getAllWorksByStaffId"
        : currentUser?.data.userType === "franchise"
        ? "/fetchServicesRouter/getAllWorksByFranchise"
        : "/fetchServicesRouter/getAllWorks";

    try {
      const res = await axios.get(url, {
        params: {
          page: page,
          pageLimit: pageLimit,
          filter: JSON.stringify({
            [filterField]: filterValue,
          }),
          search: searchQuery,
          sortBy: sortField,
          sortOrder: sortOrder,
        },
      });
      if (res.data.errorcode) {
        toast.error(res.data.msg || "Failed to fetch work history", {
          id: "jobList",
        });
      } else {
        setContent(res.data.data);
        setTotalItems(res.data.totalItems);
        setTotalPages(res.data.totalPages);
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Something went wrong. Please try again.",
        { id: "jobList" }
      );
    }
  };

  useEffect(() => {
    fetchData();
  }, [
    page,
    pageLimit,
    filterField,
    filterValue,
    sortField,
    sortOrder,
    assignedId,
  ]);

  const handleSearch = () => {
    fetchData();
  };

  // sort
  const sortOptions = [
    { field: "createdAt", order: "desc", label: "Date: Latest" },
    { field: "createdAt", order: "asc", label: "Date: Earliest" },
  ];

  const handleSortChange = (field, order, label) => {
    setSortField(field);
    setSortOrder(order);
    setSortLabel(label);
  };

  // filter
  const handleFilterApply = (filterType, selectedOptions) => {
    setFilterField(filterType);
    setFilterValue(selectedOptions);
  };

  // pagenation
  const handleNextPage = () => {
    if (page < totalPages) setPage(page + 1);
  };

  const handlePreviousPage = () => {
    if (page > 1) setPage(page - 1);
  };

  const startItem = (page - 1) * pageLimit + 1;
  const endItem = Math.min(page * pageLimit, totalItems);

  let details = (
    <p>{`Showing ${startItem} to ${endItem} of ${totalItems} works`}</p>
  );

  return (
    <div className={classes.mainLayout}>
      <div className={classes.heading}>
        <p>Work History</p>
      </div>
      <div className={classes.searchBarContainer}>
        <SearchBar
          className={classes.searchBar}
          onInputChange={handleInputChange}
          inputs={searchInputs}
          searchFields={[
            { value: "service", label: "Service" },
            { value: "staff", label: "Staff" },
          ]}
          selectedSearchField={selectedSearchField}
          onSearchFieldChange={(e) => setSelectedSearchField(e.target.value)}
          onSearchClick={handleSearch}
        />
      </div>
      <div className={classes.filter}>
        {/* <Filter
          type="priority"
          title="Priority"
          options={[
            { value: "low", label: "Low" },
            { value: "medium", label: "Medium" },
            { value: "high", label: "High" },
          ]}
        /> */}
        <Filter
          type="status"
          title="Status"
          options={[
            { value: "inQueue", label: "Requested" },
            { value: "inProgress", label: "Processing" },
            { value: "completed", label: "Completed" },
            { value: "rejected", label: "Rejected" },
          ]}
          onApply={(selectedOptions) =>
            handleFilterApply("status", selectedOptions)
          }
        />
        <Filter
          type="tableName"
          title="Services"
          options={[
            { value: "Pan Card", label: "Pancard" },
            { value: "Passport", label: "Passport" },
            // { value: "K-Swift", label: "K-Swift" },
            // { value: "Bus Booking", label: "Bus Ticket Booking" },
            // { value: "Train Booking", label: "Train Ticket Booking" },
            // { value: "Vehicle Insurance", label: "Vehicle Insurance" },
            // { value: "Packing Licence", label: "Packing Licence" },
            // { value: "Company Formation", label: "Company Formation" },
            // {
            //   value: "Partnership Deed",
            //   label: "Partnership Deed Preparation",
            // },
            // { value: "FSSAI Licence", label: "FSSAI Licemce" },
            // { value: "FSSAI Registration", label: "FSSAI Registration" },
            // { value: "Udyam Registration", label: "Udyam Registration" },
            // { value: "Financial Statement", label: "Financial Statement" },
            // { value: "GST Registration", label: "GST Registration" },
            // { value: "GST Filing", label: "GST Filing" },
            // { value: "IncomeTax Filing", label: "Inome Tax Filing" },
          ]}
          onApply={(selectedOptions) =>
            handleFilterApply("tableName", selectedOptions)
          }
        />
      </div>
      <div className={classes.sort}>
        <Sort
          sortOptions={sortOptions}
          currentSortField={sortField}
          currentSortOrder={sortOrder}
          currentSortLabel={sortLabel}
          onSortChange={handleSortChange}
        />
      </div>
      {content && content.length > 0 ? (
        <>
          <div className={classes.JobListContainer}>
            {content.map((work, index) => (
              <div key={index} className={classes.JobListMain}>
                <div className={classes.JobList}>
                  <p className={classes.serviceName}>
                    <span
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        if (
                          currentUser &&
                          currentUser?.data?.userType === "staff" &&
                          work?.status?.toLowerCase() === "inqueue"
                        ) {
                          changeWorkStatus(work?.workId);
                        }
                        navigate(`/job/${work.workId}`, { state: work });
                      }}
                    >
                      {work?.tableName}
                    </span>
                  </p>
                  <p className={classes.name}>
                    {(work?.status?.toLowerCase() === "inqueue" ||
                      work?.status?.toLowerCase() === "inprogress") &&
                    work?.assignedId ? (
                      <span style={{ color: "green" }}>
                        <BsPersonFillCheck /> Assigned
                      </span>
                    ) : work?.tableName?.toLowerCase() === "pan card" &&
                      work?.status?.toLowerCase() === "completed" &&
                      work?.ePan ? (
                      <span style={{ color: "green" }}>
                        <AiFillSafetyCertificate /> E-PAN
                      </span>
                    ) : (
                      ""
                    )}
                  </p>

                  <p
                    className={classes.status}
                    id={`${
                      work?.status?.toLowerCase() === "completed"
                        ? classes.completed
                        : work?.status?.toLowerCase() === "inprogress"
                        ? classes.inProgress
                        : work?.status?.toLowerCase() === "inqueue"
                        ? classes.inqueue
                        : classes.rejected
                    }`}
                  >
                    {work?.status?.toLowerCase() === "completed"
                      ? "Completed"
                      : work?.status?.toLowerCase() === "inprogress"
                      ? "Processing"
                      : work?.status?.toLowerCase() === "inqueue"
                      ? "Requested"
                      : "Rejected"}
                  </p>
                </div>
                {currentUser &&
                  (currentUser?.data.userType === "admin" ||
                    currentUser?.data.userType === "staff") && (
                    <div className={classes.JobList}>
                      <p className={classes.time}>5 min</p>
                      {<p className={classes.name}>{work.franchiseName}</p>}
                      <p
                        className={classes.priority}
                        id={classes.high}
                        // id={`${
                        //   work.priority === "high"
                        //     ? classes.high
                        //     : work.priority === "medium"
                        //     ? classes.medium
                        //     : work.priority === "low"
                        //     ? classes.low
                        //     : "defaultId"
                        // }`}
                      >
                        High
                        {/* {work.priority} */}
                      </p>
                    </div>
                  )}
              </div>
            ))}
          </div>
          <div className={classes.footer}>
            <div className={classes.footerItems}>
              <div>{details}</div>
            </div>
            <div className={classes.footerItems}>
              <div className={classes.pageBtn} onClick={handlePreviousPage}>
                <MdArrowBackIos className={classes.symbols} />
              </div>
              <div className={classes.pagenation}>
                <p>{page}</p>
              </div>
              <div className={classes.pageBtn} onClick={handleNextPage}>
                <MdArrowForwardIos className={classes.symbols} />
              </div>
            </div>
          </div>
        </>
      ) : (
        <p className={classes.noHistory}>No work history found</p>
      )}
    </div>
  );
};

export default JobList;
