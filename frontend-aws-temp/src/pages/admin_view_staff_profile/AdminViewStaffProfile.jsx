import React, { useEffect, useState } from "react";
// import { Tabs, TabList, Tab, TabPanel } from "react-tabs";
import axios from "axios";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import classes from "./AdminViewStaffProfile.module.css";
import AccountView from "../../components/account_view/AccountView";
const AdminViewStaffProfile = () => {
  const [data, setData] = useState();
  const { employeeId } = useParams();

  useEffect(() => {
    const fetchStaffAccount = async () => {
      try {
        const res = await axios.get(`/admin/getStaff`, {
          params: {
            employeeId: employeeId,
          },
        });

        if (res.status === 200) {
          setData(res.data.data);
        } else {
          toast.error(res.data.message, { id: "adminView" });
        }
      } catch (error) {
        console.log(error);
        toast.error("Something went wrong", { id: "adminView" });
      }
    };
    fetchStaffAccount();
  }, [employeeId]);

  return (
    <div className={classes.mainLayout}>
      {/* Admin view staff profile */}
      <p className={classes.headerText}>Staff Details</p>
      <div className={classes.service_container}>
        <div className={classes.content}>
          <AccountView data={data} setData={setData} />
        </div>
      </div>
    </div>
  );
};

export default AdminViewStaffProfile;
