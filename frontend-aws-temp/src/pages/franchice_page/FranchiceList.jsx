import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  getFilteredRowModel,
} from "@tanstack/react-table";
import { FiSearch } from "react-icons/fi";
import {
  TiArrowUnsorted,
  // TiArrowSortedUp, // the up arrow
  TiArrowSortedDown,
} from "react-icons/ti";
import { MdFileDownload } from "react-icons/md";
import { MdArrowForwardIos, MdArrowBackIos } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import Modal from "../../components/modal/Modal";
import DatePicker from "react-datepicker";
import classes from "./FranchiceList.module.css";
import "react-datepicker/dist/react-datepicker.css";
import columns from "../../data/tablecolums";
import { JsonToExcel } from "react-json-to-excel";

function FranchiceList() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const { currentUser } = useSelector((state) => state.user);
  const [content, setContent] = useState({});
  const [page, setPage] = useState(1);
  const [filteringInput, setFilteringInput] = useState("");
  const [filtering, setFiltering] = useState("");
  const [isSorted, setIsSorted] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState({});
  const [errorState, setErrorState] = useState(false);
  const pageLimit = 12;
  const tableFilter = [
    { value: { userPlan: "free" }, label: "Free" },
    { value: { userPlan: "paid" }, label: "Paid" },
    { value: { panCenter: "true" }, label: "Pan-Center" },
    { value: { panCenter: "false" }, label: "Not Pan-Center" },
    { value: { blocked: "blocked" }, label: "Blocked" },
    { value: { blocked: "unBlocked" }, label: "Active" },
    { value: { verified: "true" }, label: "Verified" },
    { value: { verified: "false" }, label: "UnVerified" },
  ];
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen((prev) => !prev);
  };

  const navigate = useNavigate();
  const handleViewDetails = (franchiseUniqueId) => {
    navigate(`/management/viewfranchise/${franchiseUniqueId}`);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/admin/getAllFranchises`, {
          params: {
            page: page,
            pageLimit: pageLimit,
            search: filtering,
            sort: isSorted ? "franchiseName" : null,
            filter: JSON.stringify(selectedFilter),
            startDate: startDate,
            endDate: endDate,
          },
        });
        if (res.data.errorcode) {
          toast.error(res.data.msg, { id: "franchiseList" });
        } else {
          setErrorState(false);
          setContent(res.data);
        }
      } catch (error) {
        setErrorState(true);
        setContent({});
        toast.error(error.response?.data?.message || "Something went wrong", {
          id: "franchiseList",
        });
      }
    };

    fetchData();
  }, [page, filtering, isSorted, selectedFilter, startDate, endDate]);

  const {
    status,
    data = [],
    totalItems,
    totalPages: total,
    currentPage,
  } = content;

  /*search logic  */

  const handleSearchChange = (event) => {
    setFilteringInput(event.target.value);
  };
  const handleSearch = () => {
    setFiltering(filteringInput);
  };
  const handleSearchKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  /*pagination logic  */
  const handleNextPage = () => {
    if (page < total) setPage(page + 1);
  };

  const handlePreviousPage = () => {
    if (page > 1) setPage(page - 1);
  };
  /* simple sorting logic and icon toggler */

  const toggleSort = () => {
    setIsSorted((prev) => !prev);
  };

  const getSortIcon = () => {
    return isSorted ? <TiArrowSortedDown /> : <TiArrowUnsorted />;
  };
  const handleFilterChange = (event) => {
    const selectedValue = event.target.value;
    const filter = tableFilter.find(
      (item) => JSON.stringify(item.value) === selectedValue
    );
    setSelectedFilter(filter ? filter.value : {});
  };
  /*pagination indicator */

  const startItem = (page - 1) * pageLimit + 1;
  const endItem = Math.min(page * pageLimit, totalItems);

  let details = (
    <p>{`Showing ${startItem} to ${endItem} of ${totalItems} franchise`}</p>
  );

  //table definition is here

  const table = useReactTable({
    data: data,
    columns: columns(handleViewDetails, currentUser?.data?.userType),
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      globalFilter: filtering,
    },

    onGlobalFilterChange: setFiltering,
  });

  const handleConfirm = () => {
    setStartDate(null);
    setEndDate(null);
    closeModal();
  };

  const filteredData = data?.map((item) => {
    const {
      panPic,
      shopPic,
      bankPassbookPic,
      aadhaarPicback,
      aadhaarPicFront,

      ...rest
    } = item;

    rest.digitalElements = Array.isArray(rest.digitalElements)
      ? rest.digitalElements.toString()
      : "N/A";
    return rest;
  });

  return currentUser &&
    (currentUser.data.userType === "admin" ||
      currentUser.data.userType === "staff") ? (
    <>
      <div className={classes.container}>
        <div className={classes.header}>
          <div className={classes.title}>
            <div className={classes.titleContainer}>
              <h2 className={classes.titleContent}>Franchise list</h2>
              <MdFileDownload
                className={classes.downloadIcon}
                onClick={openModal}
              />
            </div>
            {isModalOpen && (
              <Modal
                isOpen={openModal}
                onClose={handleConfirm}
                title={"Select Date Range"}
              >
                <div className={classes.modalContent}>
                  {/* <h3 className={classes.modalHeading}>Select Date Range</h3> */}
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
                        fileName="franchise-data"
                        btnClassName={
                          data
                            ? `${classes.confirmButtonEnable}`
                            : `${classes.confirmButtonDiable}`
                        }
                        data={filteredData}
                      />
                    </div>
                  </div>
                </div>
              </Modal>
            )}

            <div className={classes.controlPannel}>
              <div className={classes.searchContainer}>
                <input
                  className={classes.search}
                  type="text"
                  placeholder="Search franchise"
                  value={filteringInput}
                  onChange={handleSearchChange}
                  onKeyDown={handleSearchKeyPress}
                />
                <button
                  className={classes.searchBtn}
                  onClick={handleSearch}
                  aria-label="Search button"
                  title="Search"
                >
                  <FiSearch className={classes.magnifier} />
                </button>
              </div>
              <div className={classes.controller}>
                <div className={classes.controllerItems}>
                  <button className={classes.btn} onClick={toggleSort}>
                    <span className={classes.btnname}>Franchise name</span>
                    <span>{getSortIcon()}</span>
                  </button>
                </div>
                <div className={classes.controllerItems}>
                  <>
                    <select
                      className={classes.dropDownSelect}
                      onChange={handleFilterChange}
                      value={JSON.stringify(selectedFilter)}
                    >
                      <option value="" className={classes.dropdownoptions}>
                        All
                      </option>
                      {tableFilter.map((field, index) => (
                        <option
                          key={index}
                          value={JSON.stringify(field.value)}
                          className={classes.dropdownoptions}
                        >
                          {field.label}
                        </option>
                      ))}
                    </select>
                  </>
                </div>
              </div>
            </div>
          </div>
        </div>
        {errorState ? (
          <p className={classes.dummy}>No franchise found</p>
        ) : (
          <>
            <div className={classes.tableContainer}>
              <div className={classes.tableContent}>
                <div>
                  <table>
                    <thead>
                      {table.getHeaderGroups().map((headerGroup) => (
                        <tr key={headerGroup.id}>
                          {headerGroup.headers.map((header) => (
                            <th key={header.id}>
                              {flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                              )}
                            </th>
                          ))}
                        </tr>
                      ))}
                    </thead>
                    <tbody>
                      {table.getRowModel().rows.map((row) => (
                        <tr key={row.id}>
                          {row.getVisibleCells().map((cell) => (
                            <td key={cell.id}>
                              {flexRender(
                                cell.column.columnDef.cell,
                                cell.getContext()
                              )}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <div className={classes.footer}>
              <div className={classes.footerItems}>
                <div className={classes.pagenationStatus}>{details}</div>
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
        )}
      </div>
    </>
  ) : (
    <Navigate to="/profile" />
  );
}

export default FranchiceList;
