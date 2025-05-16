import React, { useState } from "react";
import classes from "./DmtTable.module.css";
import { useMemo } from "react";
import TableComp from "../../../table_component/TableComp";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { FaLock } from "react-icons/fa6";
import AdvertCard from "../../../advert_card/AdvertCard";

const DmtTable = () => {
  const [loading, setLoading] = useState(false);
  const { currentUser } = useSelector((state) => state.user);

  const [user, setUser] = useState([]);

  const navigate = useNavigate();

  const data = useMemo(() => user, [user]);

  const columns = [
    {
      header: "Customer Name",
      accessorKey: "name",
      footer: "customer name",
    },
    {
      header: "Phone Number",
      accessorKey: "customerId",
      footer: "Phone number",
    },

    {
      header: "View",
      accessorKey: "viewButton",
      cell: (tableProps) => (
        <button
          onClick={() => {
            navigate(
              `/services/dmtView/${data[tableProps.row.index].customerId}`,
              {
                state: user,
              },
            );
          }}
          className={classes.btn}
        >
          View
        </button>
      ),
      footer: "Actions",
    },
    {
      header: "Transfer",
      accessorKey: "transferButton",
      cell: () => (
        <button
          onClick={() =>
            navigate("/services/dmtFundTransfer", {
              state: user,
            })
          }
          className={classes.btn}
        >
          Transfer
        </button>
      ),
      footer: "Actions",
    },
  ];

  const onSubmit = () => {
    values;
    dmtUserFetch();
  };

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: {
        phoneNumber: "",
      },

      onSubmit,
    });

  const dmtUserFetch = async () => {
    const data = { phoneNumber: values.phoneNumber };
    try {
      setLoading(true);
      const res = await axios.post("/dmtRoute/DMTuserFetch", data);

      if (res.data.errorMsg === "SUCCESS") {
        setLoading(false);
        const userData = res.data.data;
        setUser([userData]);

        toast.success("User Fetched", {
          id: "dmtUserFetch",
        });
      } else {
        setLoading(false);

        toast.error(res.data.errorMsg, {
          id: "dmtUserFetch",
        });
      }
    } catch (error) {
      setLoading(false);
      toast.error(error?.response?.data?.message, {
        id: "dmtUserFetch",
      });
    }
  };

  return (
    <>
      {currentUser && currentUser?.data.verified ? (
        <div className={classes.mainContainer}>
          <p className={classes.heading}>Domestic Money Transfer</p>
          <form className={classes.form} onSubmit={handleSubmit}>
            <div className={classes.searchOrAddBox}>
              <input
                type="text"
                name="phoneNumber"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.phoneNumber}
                className={classes.searchBox}
                placeholder="Search with Mobile"
              />
              {errors.phoneNumber && touched.phoneNumber && (
                <p id={classes.errors}>{errors.phoneNumber}</p>
              )}
              <button
                type="submit"
                className={loading ? classes.btnDisabled : classes.searchBtn}
              >
                {loading ? "Please Wait" : "Search "}
              </button>
            </div>

            <p className={classes.or}>OR</p>

            <Link to={"/services/dmtAddCustomer"}>
              <button type="submit" className={classes.addBtn}>
                Add Customer
              </button>
            </Link>
          </form>

          {user.length > 0 && (
            <div className={classes.tableContainer}>
              <TableComp columns={columns} data={data} />
            </div>
          )}
        </div>
      ) : (
        <div className={classes.mainContainer}>
          <p className={classes.heading}>Domestic Money Transfer</p>
          <div className={classes.warningBlock}>
            <p className={classes.verifyText}>
              Service available only on verified account. <br />
              Contact admin now to get verified.
              <br />
              <span className={classes.lockIcon}>
                <FaLock />
              </span>
            </p>
            <p className={classes.noteText}>
              Time to get verified may vary depending on request volume.
            </p>
          </div>
        </div>
      )}
      <div style={{ position: "relative" }}>
        <AdvertCard
          image="/assets/ad/mobile.jpeg"
          alt="fastagAd"
          sticky={true}
        />
      </div>
    </>
  );
};

export default DmtTable;
