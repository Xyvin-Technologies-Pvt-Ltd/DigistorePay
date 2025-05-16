import React, { useState } from "react";
import classes from "./DataRemovalRequest.module.css";

const DataRemovalRequest = () => {
  const [formData, setFormData] = useState("");
  const [requestSent, setRequestSent] = useState(false);

  const handleInputChange = (e) => {
    setFormData(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData) {
      setRequestSent(true);
      setFormData("");
    }
  };

  return (
    <>
      <div className={classes.mainLayout}>
        <div className={classes.subLayout} id={classes.justify}>
          <div className={classes.content}>
            <div className={classes.detailedContent}>
              <h1 className={classes.headerText}>Data Removal Request</h1>
              <div>
                <p id={classes.justify}>
                  Please confirm that you want to delete your account and all
                  associated data by entering your username/e-mail address in
                  the field below. You can also add any additional information
                  you want to send us.
                  <br />
                  Users will be able to enter their e-mail/username and any
                  other information they want to send along with the account
                  deletion request. As soon as we receive a request, we forward
                  it to you via e-mail.
                  <br />
                  When you receive such an e-mail from us, you should confirm
                  the user's identity that requested account deletion to confirm
                  it. You need to do this because theoretically any user can
                  request deletion of any account, since the app can't check
                  which user is currently logged in.
                </p>
                <div className={classes.dataRemoval}>
                  <input
                    className={classes.contactInput}
                    type="text"
                    placeholder="Username/E-mail Address"
                    value={formData}
                    onChange={handleInputChange}
                  />
                  <div className={classes.requestButton}>
                    <button
                      className={classes.requestButtonBtn}
                      type="submit"
                      onClick={handleSubmit}
                    >
                      Submit
                    </button>
                  </div>
                </div>
                {requestSent && (
                  <p id={classes.center}>
                    Your request has been sent successfully!
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DataRemovalRequest;
