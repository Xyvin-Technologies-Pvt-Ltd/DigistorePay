import React from "react";
import classes from "./TransactionHistory.module.css";
import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FaFilePdf } from "react-icons/fa6";
import SearchBar from "../../components/search_bar/SearchBar";
import Filter from "../../components/filter/Filter";
import Sort from "../../components/sort/Sort";
import { MdArrowForwardIos, MdArrowBackIos } from "react-icons/md";
import { MdFileDownload } from "react-icons/md";
import Modal from "../../components/modal/Modal";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { JsonToExcel } from "react-json-to-excel";

const TransactionHistory = () => {
  const [transactions, setTransactions] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const [selectedSearchField, setSelectedSearchField] = useState("");
  const [searchInputs, setSearchInputs] = useState([
    {
      name: "searchValue",
      placeholder: "Enter your value to search",
      value: "",
    },
  ]);
  const [filterField, setFilterField] = useState();
  const [filterValue, setFilterValue] = useState();

  const [sortField, setSortField] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState("desc");
  const [sortLabel, setSortLabel] = useState("Date: Latest");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalItems, setTotalItems] = useState(0); // Add this state
  const [totalPages, setTotalPages] = useState(0); // Initialize to 0
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen((prev) => !prev);
  };

  const fetchTransactions = async () => {
    try {
      const searchInput = searchInputs.find(
        (input) => input.name === "searchValue"
      );
      const searchValue = searchInput ? searchInput.value : "";

      const response =
        currentUser && currentUser?.data.userType === "admin"
          ? await axios.get("/transationHistory/transationHistoryAdmin", {
              params: {
                page: page,
                pageLimit: pageSize,
                search: JSON.stringify({
                  field: selectedSearchField,
                  value: searchValue,
                }),
                sort: JSON.stringify({
                  field: sortField,
                  order: sortOrder,
                }),
                filter: JSON.stringify({
                  field: filterField,
                  filterBy: filterValue,
                }),
                startDate: startDate,
                endDate: endDate,
              },
            })
          : await axios.get("/transationHistory/transactionHistoryFranchise", {
              params: {
                page: page,
                pageLimit: pageSize,
                search: JSON.stringify({
                  field: selectedSearchField,
                  value: searchValue,
                }),
                sort: JSON.stringify({
                  field: sortField,
                  order: sortOrder,
                }),
                filter: JSON.stringify({
                  field: filterField,
                  filterBy: filterValue,
                }),
              },
            });

      if (response.data.data.rows) {
        setTransactions(response.data.data.rows);
        setTotalItems(response.data.totalItems);
        setTotalPages(response.data.totalPages);
      } else {
        setTransactions(response.data.data);
        setTotalItems(response.data.totalItems);
        setTotalPages(response.data.totalPages);
      }

      if (response.error) {
        toast.error(response.error, {
          id: "transactions",
        });
      }
    } catch (error) {
      toast.error("Error fetching transactions", {
        id: "transactions",
      });
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, [
    sortField,
    sortOrder,
    page,
    pageSize,
    filterField,
    filterValue,
    startDate,
    endDate,
  ]);

  useEffect(() => {
    // Reset the page to 1 if any criteria change
    setPage(1);
  }, [
    sortField,
    sortOrder,
    pageSize,
    filterField,
    filterValue,
    startDate,
    endDate,
  ]);

  const handleInputChange = (e) => {
    const { value } = e.target;
    setSearchInputs((prevInputs) =>
      prevInputs.map((input) =>
        input.name === "searchValue" ? { ...input, value } : input
      )
    );
  };

  const handleSearch = () => {
    fetchTransactions();
  };

  const handleSortChange = (field, order, label) => {
    setSortField(field);
    setSortOrder(order);
    setSortLabel(label);
  };

  const handleFilterApply = (filterType, selectedOptions) => {
    setFilterField(filterType);
    setFilterValue(selectedOptions);
  };

  const handleNextPage = () => {
    if (page < totalPages) setPage(page + 1);
  };

  const handlePreviousPage = () => {
    if (page > 1) setPage(page - 1);
  };

  const sortOptions = [
    { field: "createdAt", order: "desc", label: "Date: Latest" },
    { field: "createdAt", order: "asc", label: "Date: Earliest" },
    { field: "amount", order: "desc", label: "Highest Amount" },
    { field: "amount", order: "asc", label: "Lowest Amount" },
    { field: "userName", order: "asc", label: "A-Z" },
    { field: "userName", order: "desc", label: "Z-A" },
  ];

  let details = (
    <p>{`Showing ${(page - 1) * pageSize + 1} to ${Math.min(
      page * pageSize,
      totalItems
    )} of ${totalItems} transactions`}</p>
  );
  const handleConfirm = () => {
    setStartDate(null);
    setEndDate(null);
    closeModal();
  };

  return (
    <div className={classes.mainContainer}>
      <div className={classes.heading}>
        <p className={classes.headingTransaction}> Transaction History</p>
        <MdFileDownload className={classes.downloadIcon} onClick={openModal} />
      </div>
      {isModalOpen && (
        <Modal isOpen={openModal} onClose={handleConfirm}>
          <div className={classes.modalContent}>
            <h3 className={classes.modalHeading}>Select Date Range</h3>
            <div className={classes.dateContainer}>
              <DatePicker
                id={classes.styledInput}
                className={classes.DatePicker}
                name="date_1"
                selected={startDate}
                onChange={(date) => {
                  setStartDate(date);
                }}
                dateFormat="dd/MM/yyyy"
                placeholderText="Start Date"
              />
              <DatePicker
                id={classes.styledInput}
                className={classes.DatePicker}
                name="date_2"
                selected={endDate}
                onChange={(date) => {
                  setEndDate(date);
                }}
                dateFormat="dd/MM/yyyy"
                placeholderText="End Date"
              />
            </div>
            <div className={classes.modalButtons}>
              <div onClick={handleConfirm}>
                <JsonToExcel
                  title="Confirm"
                  fileName="transaction-data"
                  btnClassName={
                    transactions
                      ? `${classes.confirmButtonEnable}`
                      : `${classes.confirmButtonDiable}`
                  }
                  data={transactions}
                />
              </div>
            </div>
          </div>
        </Modal>
      )}

      <div>
        <div className={classes.searchBarContainer}>
          <SearchBar
            inputs={searchInputs}
            onInputChange={handleInputChange}
            searchFields={[
              { value: "userName", label: "Username" },
              { value: "transactionId", label: "Transaction ID" },
              { value: "service", label: "Service" },
              { value: "uniqueId", label: "Unique ID" },
            ]}
            selectedSearchField={selectedSearchField}
            onSearchFieldChange={(e) => setSelectedSearchField(e.target.value)}
            onSearchClick={handleSearch}
          />
        </div>
        <div className={classes.filterContainer}>
          <div className={classes.filter}>
            <Filter
              type="service"
              title="Service"
              options={[
                { value: "recharge", label: "Recharge" },
                { value: "dth", label: "DTH" },
                { value: "landline", label: "Landline" },
                { value: "electricity", label: "Electricity" },
                { value: "water", label: "Water" },
                { value: "fastag", label: "FasTag" },
                // { value: "train", label: "Train" },
                { value: "dmt", label: "DMT" },
                { value: "pancard", label: "Pancard" },
                { value: "passport", label: "Passport" },
                // { value: "accounting", label: "Accounting" },
                // { value: "insurance", label: "Insurance" },
                // { value: "loan", label: "Loan" },
              ]}
              onApply={(selectedOptions) =>
                handleFilterApply("service", selectedOptions)
              }
            />
            <Filter
              type="status"
              title="Status"
              options={[
                { value: "success", label: "Success" },
                { value: "fail", label: "Fail" },
              ]}
              onApply={(selectedOptions) =>
                handleFilterApply("status", selectedOptions)
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
        </div>

        {transactions && transactions.length !== 0 ? (
          transactions.map((transaction) => {
            return (
              <div key={transaction.id}>
                <div className={classes.headerSection}>
                  <p className={classes.planAmount}>
                    {" "}
                    Transaction ID : {transaction.transactionId}
                  </p>
                  {transaction.status === "success" && (
                    <FaFilePdf
                      className={classes.invoice}
                      onClick={() =>
                        navigate(`/transactions/${transaction.transactionId}`, {
                          state: transaction,
                        })
                      }
                    />
                  )}
                </div>

                <div className={classes.description}>
                  <p>
                    <strong>Service :</strong> {transaction.service}
                  </p>
                  <p>
                    <strong>Created At :</strong>{" "}
                    {new Intl.DateTimeFormat("en-US", {
                      year: "numeric",
                      month: "2-digit",
                      day: "2-digit",
                      hour: "2-digit",
                      minute: "2-digit",
                      second: "2-digit",
                    }).format(new Date(transaction.createdAt))}
                  </p>
                  <p>
                    <strong>Status :</strong>{" "}
                    <span
                      className={
                        transaction.status === "success"
                          ? classes.success
                          : transaction.status === "fail"
                          ? classes.failure
                          : classes.pending
                      }
                    >
                      {transaction.status.toUpperCase()}
                    </span>{" "}
                  </p>
                  {transaction.serviceProvider && (
                    <p>
                      <strong>Service Provider :</strong>{" "}
                      {transaction.serviceProvider}
                    </p>
                  )}
                  {transaction.serviceNumber && (
                    <p>
                      <strong>Service Number :</strong>{" "}
                      {transaction.serviceNumber}
                    </p>
                  )}
                  {transaction.customerNumber && (
                    <p>
                      <strong>Customer Number :</strong>{" "}
                      {transaction.customerNumber}
                    </p>
                  )}
                  {currentUser?.data.userType === "admin" && (
                    <p>
                      <strong>Franchise Name :</strong> {transaction.userName}
                    </p>
                  )}
                  <p>
                    <strong>Transaction amount</strong> : {transaction.amount}
                  </p>
                  <p>
                    <strong>Franchisee Commission :</strong>{" "}
                    <span
                      className={
                        transaction.franchiseCommission > 0 &&
                        currentUser?.data.userType === "franchise"
                          ? classes.success
                          : null
                      }
                    >
                      {transaction.franchiseCommission}{" "}
                    </span>
                    {transaction.franchiseCommission > 0 &&
                    transaction.commissionType === "cash"
                      ? "(CASH)"
                      : ""}
                  </p>
                  {currentUser?.data.userType === "admin" && (
                    <p>
                      <strong>HO Commission :</strong>{" "}
                      <span
                        className={
                          transaction.franchiseCommission > 0 &&
                          currentUser?.data.userType === "admin"
                            ? classes.success
                            : null
                        }
                      >
                        {transaction.adminCommission}
                      </span>
                    </p>
                  )}
                  <p>
                    <strong>Wallet balance :</strong>{" "}
                    {transaction.walletBalance}
                  </p>
                </div>
              </div>
            );
          })
        ) : (
          <p>No Transactions found</p>
        )}
      </div>
      {transactions.length > 0 && (
        <div className={classes.controller}>
          <div className={classes.footer}>
            <div className={classes.footerItems}>
              <div className={classes.pagenationStatus}>{details}</div>
            </div>
            <div className={classes.footerItems}>
              <div
                className={`${classes.pageBtn} ${
                  page === 1 ? classes.disabled : ""
                }`}
                onClick={handlePreviousPage}
              >
                <MdArrowBackIos className={classes.symbols} />
              </div>
              <div className={classes.pagenation}>
                <p>{page}</p>
              </div>
              <div
                className={`${classes.pageBtn} ${
                  page === totalPages ? classes.disabled : ""
                }`}
                onClick={handleNextPage}
              >
                <MdArrowForwardIos className={classes.symbols} />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TransactionHistory;
