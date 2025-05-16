import classes from "./Tutorial.module.css";
import { useState } from "react";
import Modal from "../../components/modal/Modal";

const Tutorial = () => {
  const [selectedFilter, setSelectedFilter] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedVideoUrl, setSelectedVideoUrl] = useState("");

  const openModal = (videoUrl) => {
    setSelectedVideoUrl(videoUrl);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedVideoUrl("");
  };

  const handleFilterChange = (e) => {
    setSelectedFilter(e.target.value);
  };

  return (
    <>
      <div className={classes.mainContainer}>
        <div className={classes.subContainer}>
          <div className={classes.headerContainer}>
            <p className={classes.heading}>Video Tutorials</p>
            <div className={classes.filter}>
              <select
                value={selectedFilter}
                onChange={handleFilterChange}
                className={classes.filterDropdown}
              >
                <option value="">Category</option>
                <option value="all">All</option>
                <option value="Prepaid">Prepaid</option>
                <option value="billPayment">Bill Payments</option>
                <option value="dmt">DMT</option>
              </select>
            </div>
          </div>

          {/* Video sections */}
          <div className={classes.videoWrapper}>
            <div
              className={classes.card}
              onClick={() =>
                openModal("https://www.youtube.com/embed/jia51iwCbjM")
              }
            >
              <img
                className={classes.iframeImage}
                src="/assets/placeholder.jpg"
                alt="iframeImage"
              />
              <div className={classes.videoDescription}>
                <p>How to Recharge Wallet Using Internet Banking</p>
                <ul>
                  <li>Registration</li>
                  <li>App Installation</li>
                  <li>Services</li>
                </ul>
              </div>
              <div className={classes.time}>
                <p>00:53</p>
              </div>
            </div>
          </div>

          <div className={classes.videoWrapper}>
            <div
              className={classes.card}
              onClick={() =>
                openModal("https://www.youtube.com/embed/zFV8H7I2hxg")
              }
            >
              <img
                className={classes.iframeImage}
                src="/assets/placeholder.jpg"
                alt="iframeImage"
              />
              <div className={classes.videoDescription}>
                <p>How to Recharge DTH using Digistore Pay app</p>
                <ul>
                  <li>Registration</li>
                  <li>App Installation</li>
                  <li>Services</li>
                </ul>
              </div>
              <div className={classes.time}>
                <p>00:36</p>
              </div>
            </div>
          </div>

          <div className={classes.videoWrapper}>
            <div
              className={classes.card}
              onClick={() =>
                openModal("https://www.youtube.com/embed/M0kohsSrEho")
              }
            >
              <img
                className={classes.iframeImage}
                src="/assets/placeholder.jpg"
                alt="iframeImage"
              />
              <div className={classes.videoDescription}>
                <p>How to Pay Electricity Bill Using Digistore Pay</p>
                <ul>
                  <li>Registration</li>
                  <li>App Installation</li>
                  <li>Services</li>
                </ul>
              </div>
              <div className={classes.time}>
                <p>00:39</p>
              </div>
            </div>
          </div>

          <div className={classes.videoWrapper}>
            <div
              className={classes.card}
              onClick={() =>
                openModal("https://www.youtube.com/embed/ZZcM-1sLWPw")
              }
            >
              <img
                className={classes.iframeImage}
                src="/assets/placeholder.jpg"
                alt="iframeImage"
              />
              <div className={classes.videoDescription}>
                <p>How to Recharge Prepaid Mobile Using Digistore Pay</p>
                <ul>
                  <li>Registration</li>
                  <li>App Installation</li>
                  <li>Services</li>
                </ul>
              </div>
              <div className={classes.time}>
                <p>00:42</p>
              </div>
            </div>
          </div>

          <Modal isOpen={isModalOpen} onClose={closeModal}>
            <div className={classes.customModalContent}>
              <iframe
                src={selectedVideoUrl}
                frameBorder="0"
                width="100%"
                height="100%"
                allowFullScreen
              ></iframe>
            </div>
          </Modal>
        </div>
      </div>
    </>
  );
};

export default Tutorial;
