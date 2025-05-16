import React, { useState, useEffect } from "react";
import { useMemo } from "react";
import TableComp from "../../../table_component/TableComp";
import classes from "./DmtView.module.css";
import { useParams, useLocation } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const DmtView = () => {
  const { customerId } = useParams();
  const { state } = useLocation();
  const user = state[0];
  const [benificiaryList, setBenificiaryList] = useState([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const dmtFetchAllBenificiaries = async () => {
    const data = { phoneNumber: customerId };
    try {
      setLoading(true);
      const res = await axios.post(
        "/dmtRoute/DMTfetchAllRecipientsOfUser",
        data,
      );

      if (res.data.error) {
        setLoading(false);
        toast.error(res.data.message, {
          id: "dmtFetchAllBenificiaries",
        });
      } else {
        setLoading(false);
        const userData = res.data.data.recipientList;
        setBenificiaryList(userData);
      }
    } catch (error) {
      setLoading(false);
      toast.error(error?.response?.data?.message, {
        id: "dmtFetchAllBenificiaries",
      });
    }
  };

  const handleDelete = async (recipientId) => {
    const data = { phoneNumber: customerId, recipientId };
    try {
      setLoading(true);
      const res = await axios.post("/dmtRoute/DMTdeleteBeneficery", data);
      if (res.data.error) {
        setLoading(false);
        toast.error(res.data.message, { id: "deleteRecipient" });
      } else {
        setLoading(false);
        dmtFetchAllBenificiaries();
        toast.success("Beneficiary deleted", { id: "deleteRecipient" });
      }
    } catch (error) {
      setLoading(false);
      toast.error(error?.response?.data?.message, { id: "deleteRecipient" });
    }
  };

  const data = useMemo(() => benificiaryList, [benificiaryList]);

  const columns = [
    {
      header: "Benificiary Name",
      accessorKey: "recipientName",
      footer: "Benificiary Name",
    },
    {
      header: "IFSC",
      accessorKey: "udf1",
      footer: "Phone number",
    },
    {
      header: "Account Number",
      accessorKey: "udf2",
      footer: "Account Number",
    },
    {
      header: "Phone Number",
      accessorKey: "mobileNo",
      footer: "Phone number",
    },
    {
      header: "",
      accessorKey: "deleteButton",

      cell: (tableProps) => (
        <button
          id={classes.delete}
          onClick={() => {
            handleDelete(data[tableProps.row.index].recipientId);
          }}
          className={classes.btn}
        >
          Delete
        </button>
      ),
      footer: "Actions",
    },
  ];

  const [filtering, setfiltering] = useState("");

  useEffect(() => {
    dmtFetchAllBenificiaries();
  }, []);

  return (
    <div className={classes.mainContainer}>
      {user ? (
        <>
          <p className={classes.heading}>View Customer</p>
          <div className={classes.viewNav}>
            <div className="div">Name: {user.name}</div>
            <div className="div">
              KYC: {user.kycstatus ? " KYC Not Applied" : " Verified"}
            </div>
            <div className="div">Mobile: {user.customerId}</div>
            <div className="div">Monthly Limit : 25000</div>
          </div>
          <div className={classes.btnNav}>
            <button
              onClick={() =>
                navigate("/services/dmtAddBenificiary", { state: user })
              }
              className={classes.btn}
            >
              Add Benificiary
            </button>

            <input
              type="text"
              className={classes.searchBox}
              value={filtering}
              onChange={(e) => setfiltering(e.target.value)}
              placeholder="Search with Mobile"
            />
          </div>

          <TableComp
            columns={columns}
            data={data}
            filtering={filtering}
            setfiltering={setfiltering}
          />
        </>
      ) : (
        "Please wait"
      )}
    </div>
  );
};

export default DmtView;
