import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
// import { services } from "../../data/services";
import classes from "./ServiceMenu.module.css";
import { MdOutlineMoreHoriz } from "react-icons/md";
import { useLocation } from "react-router-dom";
import { useViewport } from "../../hooks/ViewPort";
import { useSelector } from "react-redux";

const ServiceMenu = ({ services }) => {
  const { currentUser } = useSelector((state) => state.user);
  const [showMenu, setShowMenu] = useState(false);
  const [listLimit, setListLimit] = useState(4);
  let location = useLocation();
  const { width } = useViewport();

  useEffect(() => {
    if (width < 576) setListLimit(3);
    else if (width > 576 && width < 768) setListLimit(4);
    else if (width > 768 && width < 992) setListLimit(5);
    else if (width > 992 && width < 1200) setListLimit(7);
    else setListLimit(8);
  }, [width]);

  return (
    <>
      <div className={classes.menuContainer}>
        {services.slice(0, listLimit).map((service) => {
          return service.access.includes(currentUser.data.userType) ? (
            <Link
              id={
                location.pathname === `${service.link}`.toLowerCase()
                  ? classes.active
                  : ""
              }
              className={classes.link}
              key={service.name}
              to={service.link}
              onClick={() => setShowMenu(false)}
            >
              <div
                id={
                  location.pathname === `${service.link}`.toLowerCase()
                    ? classes.active
                    : ""
                }
                className={classes.service}
              >
                <div className={classes.icon}>{service.icon}</div>
                <label>{service.name}</label>
              </div>
            </Link>
          ) : null;
        })}
        {services.length > listLimit && (
          <div
            className={classes.service}
            onClick={() => setShowMenu(!showMenu)}
          >
            <div className={classes.icon}>
              <MdOutlineMoreHoriz />
            </div>
            <label>View All</label>
          </div>
        )}
      </div>
      {services.length > listLimit && showMenu ? (
        <div
          className={classes.submenu}
          style={{ gridTemplateColumns: `repeat(${listLimit + 1},1fr)` }}
        >
          {services.slice(listLimit).map((service) =>
            service.access.includes(currentUser.data.userType) ? (
              <Link
                id={
                  location.pathname === `${service.link}`.toLowerCase()
                    ? classes.active
                    : ""
                }
                className={classes.link}
                key={service.name}
                to={service.link}
                onClick={() => setShowMenu(false)}
              >
                <div
                  id={
                    location.pathname === `${service.link}`.toLowerCase()
                      ? classes.active
                      : ""
                  }
                  className={classes.service}
                >
                  <div className={classes.icon}>{service.icon}</div>
                  <label>{service.name}</label>
                </div>
              </Link>
            ) : null,
          )}
        </div>
      ) : null}
    </>
  );
};

export default ServiceMenu;
