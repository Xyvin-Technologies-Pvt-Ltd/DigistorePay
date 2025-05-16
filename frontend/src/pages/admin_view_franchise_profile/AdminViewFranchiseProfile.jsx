import React, { useEffect, useState } from "react";
// import { Tabs, TabList, Tab, TabPanel } from "react-tabs";
// import axios from "axios";
// import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import classes from "./AdminViewFranchiseProfile.module.css";
import AccountView from "../../components/account_view/AccountView";
import { fetchAccount } from "../../utils/fetchAccount";
const AdminViewFranchiseProfile = () => {
  const [data, setData] = useState();
  const { franchiseUniqueId } = useParams();

  useEffect(() => {
    if (franchiseUniqueId) {
      fetchAccount(franchiseUniqueId, setData);
    }
  }, [franchiseUniqueId]);

  return (
    <div className={classes.mainLayout}>
      {/* Admin view franchise profile */}
      <p className={classes.headerText}>Franchise Details</p>
      <div className={classes.service_container}>
        <div className={classes.content}>
          <AccountView data={data} setData={setData} />
        </div>
      </div>
    </div>
  );
};

export default AdminViewFranchiseProfile;
