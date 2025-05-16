import { useEffect, useState } from "react";
import classes from "./WalletTopUpRequest.module.css";
import { useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import axios from "axios";
import WalletRequestCard from "../../components/wallet_request_card/WalletRequestCard";
import SearchBar from "../../components/search_bar/SearchBar";
import Filter from "../../components/filter/Filter";
import Sort from "../../components/sort/Sort";
import { MdArrowForwardIos, MdArrowBackIos } from "react-icons/md";
import { Navigate } from "react-router-dom";

const WalletTopUpRequest = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [page, setPage] = useState(1);
  const [searchInputs, setSearchInputs] = useState([
    {
      name: "searchValue",
      placeholder: "Username/Executive Name",
      value: "",
    },
  ]);
  const [selectedOptions, setSelectedOptions] = useState("");
  const [sortField, setSortField] = useState("createdAt");
  const [sortLabel, setSortLabel] = useState("Date: Requested On");
  const [sortOrder, setSortOrder] = useState("desc");
  const pageLimit = 10;
  const [totalPages, setTotalPages] = useState(1);
  const [data, setData] = useState([]);
  const [totalItems, setTotalItems] = useState(0);

  // Helper to get the search value from searchInputs
  const getSearchValue = () => {
    const searchInput = searchInputs.find(
      (input) => input.name === "searchValue",
    );
    return searchInput ? searchInput.value : "";
  };

  // Move fetchWalletRequests outside the useEffect so it can be reused in other handlers
  const fetchWalletRequests = async () => {
    try {
      const searchValue = getSearchValue();
      const response = await axios.get(
        `/moneyTransferRoute/moneyTransferVerify`,
        {
          params: {
            search: searchValue || "",
            filter: JSON.stringify(selectedOptions),
            sort: sortField || "", // Sort only if a field is selected
            page: page,
            pageLimit: pageLimit,
          },
        },
      );

      if (response.data.error) {
        toast.error(response.data.error, {
          id: "request",
        });
      } else {
        const fetchedData = Array.isArray(response.data.datas)
          ? response.data.datas
          : [];
        setData(fetchedData);
        setTotalPages(response.data.totalPages);
        setTotalItems(response.data.totalItems);
        // toast.success("Wallet Top Up Requests Updated", {
        //   id: "request",
        // });
      }
    } catch (error) {
      toast.error("Error Fetching Wallet Top Up Requests", {
        id: "request",
      });
      setData([]);
      console.error("Fetch Error:", error);
    }
  };

  // useEffect to call fetchWalletRequests on component mount and dependencies
  useEffect(() => {
    fetchWalletRequests();
  }, [sortField, sortOrder, page, pageLimit, selectedOptions]);

  const handleInputChange = (e) => {
    const { value } = e.target;
    setSearchInputs((prevInputs) =>
      prevInputs.map((input) =>
        input.name === "searchValue" ? { ...input, value } : input,
      ),
    );
  };

  const handleSearch = () => {
    fetchWalletRequests();
  };

  const handleFilterApply = (filterType, selectedFilterOptions) => {
    setSelectedOptions((prevOptions) => ({
      ...prevOptions,
      [filterType]: selectedFilterOptions, // Update filter object with selected options
    }));
  };

  const handleSortChange = (field, order, label) => {
    setSortField(field);
    setSortLabel(label);
    setSortOrder(order);
    fetchWalletRequests(); // Trigger data reload with new sort
  };

  const handleNextPage = () => {
    if (page < totalPages) setPage(page + 1);
  };

  const handlePreviousPage = () => {
    if (page > 1) setPage(page - 1);
  };

  const sortOptions = [
    { field: "updatedAt", label: "Date: Approved On" },
    { field: "createdAt", label: "Date: Requested On" },
  ];

  const startItem = (page - 1) * pageLimit + 1;
  const endItem = Math.min(page * pageLimit, totalItems);

  let details = (
    <p>{`Showing ${startItem} to ${endItem} of ${totalItems} wallet top up request`}</p>
  );

  return currentUser && currentUser.data.userType === "admin" ? (
    <div className={classes.mainLayout}>
      <div className={classes.service_container}>
        <div className={classes.content}>
          <div className={classes.mainContainer}>
            <p className={classes.heading}>Wallet Top Up Request</p>
            <div className={classes.searchBarContainer}>
              <SearchBar
                inputs={searchInputs}
                onInputChange={handleInputChange}
                searchFields={[
                  { value: "userName", label: "Username" },
                  { value: "executiveName", label: "Executive Name" },
                ]}
                onSearchClick={handleSearch}
              />
            </div>

            <div className={classes.filterContainer}>
              <div className={classes.filter}>
                <Filter
                  type="transactionType"
                  title="Mode"
                  options={[
                    { value: "executive", label: "Executive" },
                    { value: "upi", label: "UPI" },
                    { value: "internetBanking", label: "Internet Banking" },
                  ]}
                  onApply={(selectedOptions) =>
                    handleFilterApply("transactionType", selectedOptions)
                  }
                />
                <Filter
                  type="status"
                  title="Status"
                  options={[
                    { value: "approved", label: "Approved" },
                    { value: "pending", label: "Pending" },
                    { value: "rejected", label: "Rejected" },
                  ]}
                  onApply={(selectedOptions) =>
                    handleFilterApply("status", selectedOptions)
                  }
                />
              </div>
              <div className={classes.sort}>
                <div className="sort">
                  <Sort
                    sortOptions={sortOptions}
                    currentSortField={sortField}
                    currentSortLabel={sortLabel}
                    currentSortOrder={sortOrder}
                    onSortChange={handleSortChange}
                  />
                </div>
              </div>
            </div>

            <div className={classes.requestsGrid}>
              {Array.isArray(data) && data.length > 0 ? (
                data.map((request, index) => (
                  <div key={index} className={classes.requestItem}>
                    <WalletRequestCard
                      key={request.id}
                      id={request.uniqueId}
                      franchise={request.userName}
                      amount={request.amount}
                      transactionType={request.transactionType}
                      transactionId={request.transationId}
                      createdAt={request.createdAt}
                      date={request.date}
                      documentPic={request.documentPic}
                      executiveId={request.executiveId}
                      executiveName={request.executiveName}
                      fromUpiId={request.fromUpiId}
                      remark={request.remark}
                      referenceNo={request.referenceNo}
                      status={request.status}
                      toAcc={request.toAcc}
                      toUpiId={request.toUpiId}
                      updatedAt={request.updatedAt}
                      fromAcc={request.fromAcc}
                      setTopUpRequests={setData}
                    />
                  </div>
                ))
              ) : (
                <p>No Wallet Top Up Requests available.</p>
              )}
            </div>

            {data.length > 0 && (
              <div className={classes.controller}>
                <div className={classes.footer}>
                  <div className={classes.footerItems}>
                    <div className={classes.pagenationStatus}>{details}</div>
                  </div>
                  <div className={classes.footerItems}>
                    <div
                      className={classes.pageBtn}
                      onClick={handlePreviousPage}
                    >
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
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  ) : (
    <Navigate to="/profile" />
  );
};

export default WalletTopUpRequest;
