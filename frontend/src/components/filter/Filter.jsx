import React, { useState, useEffect } from "react";
import Modal from "../modal/Modal";
import classes from "./Filter.module.css";

const FilterComponent = ({ type, title, options, onApply }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [currentOptions, setCurrentOptions] = useState([]);

  useEffect(() => {
    if (modalOpen) {
      setCurrentOptions(selectedOptions);
    }
  }, [modalOpen]);
  const handleOptionChange = (event) => {
    const value = event.target.value;
    setSelectedOptions((prevOptions) =>
      prevOptions.includes(value)
        ? prevOptions.filter((option) => option !== value)
        : [...prevOptions, value],
    );
  };

  const handleApply = () => {
    onApply(selectedOptions);
    setModalOpen(false);
  };

  return (
    <>
      <button
        className={classes.filterButton}
        onClick={() => setModalOpen(true)}
      >
        {title}
      </button>
      <Modal
        isOpen={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setSelectedOptions(currentOptions);
        }}
      >
        <div className={`${classes.customModalContent}`}>
          <h2 className={classes.modalTitle}>Filter by {title}</h2>
          <div className={classes.checkboxGroup}>
            {options.map((option) => (
              <label key={option.value} className={classes.options}>
                <input
                  name={option.label}
                  type="checkbox"
                  // defaultValue={selectedOptions.includes(option.value)}
                  defaultChecked={selectedOptions.includes(option.value)}
                  value={option.value}
                  onChange={handleOptionChange}
                />
                {option.label}
              </label>
            ))}
          </div>
          <button onClick={handleApply} className={classes.applyButton}>
            Apply
          </button>
        </div>
      </Modal>
    </>
  );
};

export default FilterComponent;
