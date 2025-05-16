import React from "react";
import classes from "./SearchBar.module.css";

const SearchBar = ({
  inputs,
  onInputChange,
  searchFields,
  selectedSearchField,
  onSearchFieldChange,
  onSearchClick,
}) => {
  return (
    <div className={classes.searchBarContainer}>
      {inputs.map((input, index) => (
        <input
          key={index}
          type={input.type || "text"}
          placeholder={input.placeholder}
          value={input.value}
          onChange={(e) => onInputChange(e, input.name)}
          className={classes.searchBarInput}
        />
      ))}
      <div className={classes.verticalLine}>|</div>

      <select
        value={selectedSearchField}
        onChange={onSearchFieldChange}
        className={classes.searchBarSelect}
      >
        <option value="">Select the field</option>
        {searchFields.map((field, index) => (
          <option key={index} value={field.value}>
            {field.label}
          </option>
        ))}
      </select>

      <button onClick={onSearchClick} className={classes.searchBarButton}>
        Search
      </button>
    </div>
  );
};
export default SearchBar;
