import React, { useState, useEffect } from "react";
import "react-tabs/style/react-tabs.css";
import { useSelector } from "react-redux";
import AccountView from "../../components/account_view/AccountView";
const AccountPage = () => {
  const [data, setData] = useState({});
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    if (currentUser?.data) {
      setData(currentUser.data);
    }
  }, [currentUser]);

  // const handleData = (data) => {
  //   setData(data);
  // };
  return (
    <>
      {/* franchise profile */}
      {currentUser && currentUser?.data.userType === "franchise" && (
        <AccountView data={data} setData={setData} />
      )}

      {/* admin profile */}

      {currentUser && currentUser?.data.userType === "admin" && (
        <p>Account settings coming Soon...</p>
      )}

      {/* distributor profile */}

      {currentUser && currentUser?.data.userType === "distributor" && (
        <p>Account settings coming Soon...</p>
      )}

      {currentUser && currentUser?.data.userType === "staff" && (
        <AccountView data={data} setData={setData} />
      )}
    </>
  );
};

export default AccountPage;
