import ServiceMenu from "../service_menu/ServiceMenu";
import { managementMenu } from "../../data/managementmenu.jsx";
import classes from "./RechargeLayout.module.css";
import { Outlet } from "react-router-dom";

const ManagementLayout = ({ text }) => {
  return (
    <div className={classes.rechargeLayout}>
      <p className={classes.headerText}>{text}</p>
      <div className={classes.service_container}>
        <div className={classes.servicebar}>
          <ServiceMenu services={managementMenu} />
        </div>
        <div className={classes.content}>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default ManagementLayout;
