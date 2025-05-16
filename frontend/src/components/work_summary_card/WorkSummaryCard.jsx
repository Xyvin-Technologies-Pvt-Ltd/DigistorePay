import React from "react";
import classes from "./WorkSummaryCard.module.css";
import { PiFilesLight } from "react-icons/pi";
import { AiOutlineFileSync, AiOutlineFileDone } from "react-icons/ai";

const WorkSummaryCard = () => {
  return (
    <div className={classes.mainContainer} key={1}>
      <div className={classes.headerSection}>
        <p id={classes.inqueue} className={classes.stats}>
          <PiFilesLight className={classes.icons} />
          25
        </p>
        <p id={classes.processing} className={classes.stats}>
          <AiOutlineFileSync className={classes.icons} />
          10
        </p>
        <p id={classes.done} className={classes.stats}>
          <AiOutlineFileDone className={classes.icons} />
          165
        </p>
      </div>
      <div className={classes.description}>
        <p className={classes.mode}>
          Type of Service: <span>PASSPORT</span>
        </p>
        <div className={classes.details}>
          <p className={classes.detail}>
            Current Status:{" "}
            <span id={classes.inqueue} className={classes.span}>
              InQueue
            </span>
          </p>
          <p className={classes.detail}>
            Franchise Code : <span className={classes.span}>DSP9495322806</span>
          </p>
          <p className={classes.detail}>
            Customer Mobile : <span className={classes.span}>1234578960</span>
          </p>

          <p className={classes.detail}>
            Amount : <span className={classes.span}>1250</span>
          </p>
          <p className={classes.detail}>
            Received Date : <span className={classes.span}>26/09/24</span>
          </p>
          <p className={classes.detail}>
            Assigned On : <span className={classes.span}>N/A</span>
          </p>
          <p className={classes.detail}>
            Completed On : <span className={classes.span}>N/A</span>
          </p>
          <p className={classes.detail}>
            Declined On : <span className={classes.span}>{}</span>
          </p>
        </div>
      </div>

      <div className={classes.description}>
        <p className={classes.mode}>
          Type of Service: <span>PanCard</span>
        </p>
        <div className={classes.details}>
          <p className={classes.detail}>
            Current Status:{" "}
            <span id={classes.processing} className={classes.span}>
              Processing
            </span>
          </p>
          <p className={classes.detail}>
            Franchise Code : <span className={classes.span}>DSP9495322806</span>
          </p>
          <p className={classes.detail}>
            Customer Mobile : <span className={classes.span}>1234578960</span>
          </p>

          <p className={classes.detail}>
            Amount : <span className={classes.span}>500</span>
          </p>
          <p className={classes.detail}>
            Received Date : <span className={classes.span}>26/09/24</span>
          </p>
          <p className={classes.detail}>
            Assigned On : <span className={classes.span}>26/09/24</span>
          </p>
          <p className={classes.detail}>
            Completed On : <span className={classes.span}>N/A</span>
          </p>
          <p className={classes.detail}>
            Declined On : <span className={classes.span}>{}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default WorkSummaryCard;
