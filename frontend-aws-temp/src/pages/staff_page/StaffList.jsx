import React, { useState, useEffect } from "react";
import { flexRender } from "@tanstack/react-table";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useReactTable, getCoreRowModel } from "@tanstack/react-table";
import { MdArrowBackIos, MdArrowForwardIos } from "react-icons/md";
import { FiSearch } from "react-icons/fi";
import { TiArrowSortedDown, TiArrowUnsorted } from "react-icons/ti";
import axios from "axios";
import toast from "react-hot-toast";
import columns from "../../data/stafftablecolums";
import classes from "./StaffList.module.css";

const StaffList = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [page, setPage] = useState(1);
  const pageLimit = 10;
  const [content, setContent] = useState({});
  const [searching, setSearching] = useState("");
  const [isSorted, setIsSorted] = useState(false);
  const [filteringInput, setFilteringInput] = useState("");
  const [selectedFilter, setSelectedFilter] = useState({});
  const tableFilter = [
    { value: { employment: "fullTime" }, label: "Full-Time" },
    { value: { employment: "partTime" }, label: "Part-Time" },
    { value: { employment: "trainee" }, label: "Trainee" },
    { value: { employmentType: "fieldExecutive" }, label: "Field Executive" },
    { value: { employmentType: "officeExecutive" }, label: "Office Staff" },
  ];

  const navigate = useNavigate();
  const handleViewDetails = (employeeId) => {
    navigate(`/management/staff/${employeeId}`);
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/admin/getAllStaff`, {
          params: {
            page: page,
            pageLimit: pageLimit,
            search: searching,
            sort: isSorted ? "firstName" : null,
            filter: JSON.stringify(selectedFilter),
          },
        });
        if (res.data.errorcode) {
          toast.error(error.data.msg || "Failed to fetch staff data", {
            id: "staffFetch",
          });
        } else {
          setContent(res.data);
        }
      } catch (error) {
        toast.error(
          error.response?.data?.message ||
            "Something went wrong. Please try again.",
          { id: "staffFetch" }
        );
      }
    };
    fetchData();
  }, [page, pageLimit, searching, isSorted, selectedFilter]);

  const { data = {}, totalItems, totalPages: total, currentPage } = content;
  const { count = 0, rows: staffData = [] } = data;

  const table = useReactTable({
    data: staffData,
    columns: columns(handleViewDetails),
    getCoreRowModel: getCoreRowModel(),
  });

  // search

  const handleSearchChange = (event) => {
    setFilteringInput(event.target.value);
  };

  const handleSearch = () => {
    setSearching(filteringInput);
  };

  const handleSearchKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  // sort

  const toggleSort = () => {
    setIsSorted((prev) => !prev);
  };

  const getSortIcon = () => {
    return isSorted ? <TiArrowSortedDown /> : <TiArrowUnsorted />;
  };

  // filter

  const handleFilterChange = (event) => {
    const selectedValue = event.target.value;
    const filter = tableFilter.find(
      (item) => JSON.stringify(item.value) === selectedValue
    );
    setSelectedFilter(filter ? filter.value : {});
  };

  // pagenation

  const handleNextPage = () => {
    if (page < total) setPage(page + 1);
  };

  const handlePreviousPage = () => {
    if (page > 1) setPage(page - 1);
  };

  const startItem = (page - 1) * pageLimit + 1;
  const endItem = Math.min(page * pageLimit, totalItems);

  let details = (
    <p>{`Showing ${startItem} to ${endItem} of ${totalItems} staff`}</p>
  );

  return currentUser && currentUser.data.userType === "admin" ? (
    <>
      <div className={classes.container}>
        <div>
          <div className={classes.title}>
            <h2 className={classes.titleContent}>Staff List</h2>
            <div className={classes.controlPanel}>
              <div className={classes.searchContainer}>
                <input
                  className={classes.search}
                  type="text"
                  placeholder="Search Staff"
                  value={filteringInput}
                  onChange={handleSearchChange}
                  onKeyDown={handleSearchKeyPress}
                />
                <button
                  className={classes.searchBtn}
                  onClick={handleSearch}
                  title="Search"
                >
                  <FiSearch className={classes.magnifier} />
                </button>
              </div>
              <div className={classes.controller}>
                <div>
                  <button className={classes.btn} onClick={toggleSort}>
                    <span className={classes.btnname}>Staff Name</span>
                    <span>{getSortIcon()}</span>
                  </button>
                </div>
                <div>
                  <select
                    className={classes.dropDownSelect}
                    onChange={handleFilterChange}
                    value={JSON.stringify(selectedFilter)}
                  >
                    <option value="">All</option>
                    {tableFilter.map((field, index) => (
                      <option key={index} value={JSON.stringify(field.value)}>
                        {field.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
        {staffData.length > 0 ? (
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
          <p className={classes.dummy}>No user found</p>
        )}
      </div>
    </>
  ) : (
    <Navigate to="/profile" />
  );
};

export default StaffList;
