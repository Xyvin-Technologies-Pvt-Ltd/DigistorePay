import React, { useEffect } from "react";
import { IoClose } from "react-icons/io5";
import classes from "./Modal.module.css";

const Modal = ({
  isOpen,
  onClose,
  children,
  title,
  showCloseButton = true,
}) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  return (
    <>
      {isOpen && (
        <div className={classes.modal}>
          <div className={classes.content}>
            <div className={classes.subContent}>
              <span className={classes.title}>{title}</span>
              {showCloseButton && (
                <span className={classes.close} onClick={onClose}>
                  <IoClose className={classes.closeButton} />{" "}
                </span>
              )}
            </div>
            <div className={classes.modalContent}>{children}</div>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
