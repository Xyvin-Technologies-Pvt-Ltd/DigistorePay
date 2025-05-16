import React, { useState, useEffect } from "react";
import classes from "./Sort.module.css";

const Sort = ({
  currentSortLabel,
  sortOptions,
  currentSortField,
  currentSortOrder,
  onSortChange,
}) => {
  const [showDropdown, setShowDropdown] = useState(false);

  const handleSortChange = (field, order, label) => {
    onSortChange(field, order, label);
    setShowDropdown(false);
  };

  const handleClickOutside = (event) => {
    if (!event.target.closest(`.${classes.sortContainer}`)) {
      setShowDropdown(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className={classes.sortContainer}>
      <div
        className={classes.sortButton}
        onClick={() => setShowDropdown(!showDropdown)}
      >
        {currentSortLabel} ▼
      </div>
      {showDropdown && (
        <div className={classes.sortDropdown}>
          {sortOptions.map((option) => (
            <div
              key={option.field + option.order}
              onClick={() =>
                handleSortChange(option.field, option.order, option.label)
              }
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Sort;
