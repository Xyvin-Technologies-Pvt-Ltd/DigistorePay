import React from "react";
import classes from "./RechargeLayout.module.css";
import ServiceMenu from "../service_menu/ServiceMenu";
import { Outlet } from "react-router-dom";
import { profileMenu } from "../../data/profilemenu";
import { useSelector } from "react-redux";
import { MdVerified } from "react-icons/md";

const ProfileLayout = ({ hours }) => {
  const { currentUser } = useSelector((state) => state.user);
  let text =
    hours < 4
      ? `Welcome Back ${
          currentUser.data.userType === "admin"
            ? "Admin"
            : currentUser.data.userType === "franchise"
              ? currentUser.data.franchiseName
              : currentUser.data.userType === "student"
                ? currentUser.data.captainName
                : currentUser.data.userType === "staff"
                  ? `${currentUser.data.firstName} ${currentUser.data.lastName}`
                  : "User"
        }!`
      : hours >= 4 && hours < 12
        ? `Good Morning ${
            currentUser.data.userType === "admin"
              ? "Admin"
              : currentUser.data.userType === "franchise"
                ? currentUser.data.franchiseName
                : currentUser.data.userType === "student"
                  ? currentUser.data.captainName
                  : currentUser.data.userType === "staff"
                    ? `${currentUser.data.firstName} ${currentUser.data.lastName}`
                    : "User"
          }!`
        : hours >= 12 && hours < 17
          ? `Good Afternoon ${
              currentUser.data.userType === "admin"
                ? "Admin"
                : currentUser.data.userType === "franchise"
                  ? currentUser.data.franchiseName
                  : currentUser.data.userType === "student"
                    ? currentUser.data.captainName
                    : currentUser.data.userType === "staff"
                      ? `${currentUser.data.firstName} ${currentUser.data.lastName}`
                      : "User"
            }!`
          : hours >= 17 && hours <= 24
            ? `Good Evening ${
                currentUser.data.userType === "admin"
                  ? "Admin"
                  : currentUser.data.userType === "franchise"
                    ? currentUser.data.franchiseName
                    : currentUser.data.userType === "student"
                      ? currentUser.data.captainName
                      : currentUser.data.userType === "staff"
                        ? `${currentUser.data.firstName} ${currentUser.data.lastName}`
                        : "User"
              }!`
            : `Welcome Back ${
                currentUser.data.userType === "admin"
                  ? "Admin"
                  : currentUser.data.userType === "franchise"
                    ? currentUser.data.franchiseName
                    : currentUser.data.userType === "student"
                      ? currentUser.data.captainName
                      : currentUser.data.userType === "staff"
                        ? `${currentUser.data.firstName} ${currentUser.data.lastName}`
                        : "User"
              }!`;
  return (
    <div className={classes.rechargeLayout}>
      <p className={classes.headerText}>
        {text}
        <span>
          {currentUser?.data?.verified ? (
            <MdVerified style={{ color: "var(--honoblue)" }} />
          ) : null}
        </span>
      </p>
      <div className={classes.service_container}>
        {currentUser && currentUser.data.userType === "student" ? (
          <div className={classes.content}>
            <Outlet />
          </div>
        ) : (
          <>
            <div className={classes.servicebar}>
              <ServiceMenu services={profileMenu} />
            </div>
            <div className={classes.content}>
              <Outlet />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ProfileLayout;
