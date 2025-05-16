import classes from "./RechargeLayout.module.css";
import ServiceMenu from "../service_menu/ServiceMenu";
import { Outlet } from "react-router-dom";
import { onboardMenu } from "../../data/onboardmenu";

const OnboardLayout = ({ text }) => {
  return (
    <div className={classes.rechargeLayout}>
      <p className={classes.headerText}>{text}</p>
      <div className={classes.service_container}>
        <div className={classes.servicebar}>
          <ServiceMenu services={onboardMenu} />
        </div>
        <div className={classes.content}>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default OnboardLayout;
