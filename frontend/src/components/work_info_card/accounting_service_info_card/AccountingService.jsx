import React from "react";
import classes from "./AccountingService.module.css";

const AccountingService = ({ work }) => {
  const getFileExtension = (url) => url?.split(".").pop().toLowerCase();

  const DocumentView = (url, title) => {
    return getFileExtension(url) === "pdf" ? (
      <iframe
        src={`https://docs.google.com/viewer?url=${url}&embedded=true`}
        title={title}
        width="300px"
      ></iframe>
    ) : (
      <img className={classes.documentImages} src={url} alt={title} />
    );
  };

  return (
    <>
      <p className={classes.heading}>TASK INFORMATION</p>
      <div className={classes.basic}>
        <div>
          <p>
            <strong>EMAIL: </strong>
            {work.email || "N/A"}
          </p>
          {(work.tableName === "GST Registration" ||
            work.tableName === "K-Swift") && (
            <>
              <p>
                <strong>PINCODE: </strong>
                {work?.pinCode}
              </p>
            </>
          )}
          {work.tableName === "GST Registration" && (
            <>
              <p>
                <strong>SHOP LATITUDE: </strong>
                {work?.shopLatitude}
              </p>
              <p>
                <strong>SHOP LONGITUDE: </strong>
                {work?.shopLongitude}
              </p>
              <p>
                <strong>BUILDING STATUS: </strong>
                {work?.building.toUpperCase()}
              </p>
              <p>
                <strong>TYPE OF BUSINESS: </strong>
                {work?.typeOfBusiness.toUpperCase()}
              </p>
              {work.typeOfBusiness === "company" && (
                <p>
                  <strong>NUMBER OF DIRECTORS: </strong>
                  {work?.noOfDirectors}
                </p>
              )}
              {work.typeOfBusiness === "partnership" && (
                <p>
                  <strong>NUMBER OF PARTNERS: </strong>
                  {work?.noOfPartners}
                </p>
              )}
            </>
          )}
          {(work.tableName === "GST Filing" ||
            work.tableName === "Financial Statement") && (
            <>
              <p>
                <strong>GST NUMBER: </strong>
                {work?.gstNumber}
              </p>
              <p>
                <strong>GST USERNAME: </strong>
                {work?.gstUsername}
              </p>
              <p>
                <strong>GST PASSWORD: </strong>
                {work?.gstPassword}
              </p>
            </>
          )}
          {work.tableName === "IncomeTax Filing" &&
            work.typeofTransaction === "business" && (
              <>
                <p>
                  <strong>GST USERNAME: </strong>
                  {work?.gstUsername}
                </p>
                <p>
                  <strong>GST PASSWORD: </strong>
                  {work?.gstPassword}
                </p>
                <p>
                  <strong>ACCOUNT NAME: </strong>
                  {work?.accountName.toUpperCase()}
                </p>
                <p>
                  <strong>ACCOUNT NUMBER: </strong>
                  {work?.accountNumber}
                </p>
              </>
            )}
          {work.tableName === "Company Formation" && (
            <>
              <p>
                <strong>BUSINESS TYPE: </strong>
                {work?.businessType.toUpperCase()}
              </p>
              <p>
                <strong>SHARE HOLDING DETAILS: </strong>
                {work?.shareHoldingDetails}
              </p>
              <p>
                <strong>NUMBER OF DIRECTORS: </strong>
                {work?.numberOfDirectors}
              </p>
            </>
          )}
          {work.tableName === "Partnership Deed" && (
            <>
              <p>
                <strong>NUMBER OF PARTNERS: </strong>
                {work?.numberOfPartners}
              </p>
            </>
          )}
          {work.tableName === "IncomeTax Filing" && (
            <>
              <p>
                <strong>PAN NUMBER: </strong>
                {work?.panNumber}
              </p>
              <p>
                <strong>INCOME TAX PASSWORD: </strong>
                {work?.incomeTaxPassword}
              </p>
            </>
          )}
        </div>
        <div>
          {(work.tableName === "GST Registration" ||
            work.tableName === "GST Filing" ||
            work.tableName === "Company Formation" ||
            work.tableName === "Financial Statement" ||
            work.tableName === "K-Swift" ||
            work.tableName === "Partnership Deed") && (
            <p>
              <strong>BUSINESS NAME: </strong>
              {work?.businessName.toUpperCase()}
            </p>
          )}
          {(work.tableName === "GST Registration" ||
            work.tableName === "Company Formation" ||
            work.tableName === "K-Swift") && (
            <>
              <p>
                <strong>BUSINESS ADDRESS LINE 1: </strong>
                {work?.businessAddressLine1.toUpperCase()}
              </p>
              <p>
                <strong>BUSINESS ADDRESS LINE 2: </strong>
                {work?.businessAddressLine2.toUpperCase()}
              </p>
            </>
          )}
          {work.tableName === "IncomeTax Filing" && (
            <>
              <p>
                <strong>TYPE OF ITR: </strong>
                {work?.typeofTransaction
                  ?.replace(/([a-z])([A-Z])/g, "$1 $2")
                  .toUpperCase()}
              </p>
              {work.typeofTransaction === "capitalGain" && (
                <p>
                  <strong>TYPE OF CAPITAL GAIN: </strong>
                  {work?.typeofCapitalGain.toUpperCase()}
                </p>
              )}

              {work.typeofTransaction === "typeofTransaction" && (
                <>
                  <p>
                    <strong>BRANCH NAME: </strong>
                    {work?.branchName?.toUpperCase() || "N/A"}
                  </p>
                  <p>
                    <strong>IFSC CODE: </strong>
                    {work?.ifscCode}
                  </p>
                </>
              )}
            </>
          )}

          {work.tableName === "Partnership Deed" && (
            <>
              <p>
                <strong>BUSINESS ADDRESS: </strong>
                {work?.businessAddress.toUpperCase()}
              </p>
            </>
          )}
          {work.tableName === "Financial Statement" && (
            <>
              <p>
                <strong>BUSINESS TYPE: </strong>
                {work?.businessType.toUpperCase()}
              </p>
            </>
          )}
          {work.tableName === "GST Registration" &&
            work.typeOfBusiness === "proprietary" && (
              <>
                <p>
                  <strong>RESIDENCE LONGITUDE: </strong>
                  {work?.residenceLongitude}
                </p>
                <p>
                  <strong>RESIDENCE LATITUDE: </strong>
                  {work?.residenceLatitude}
                </p>
              </>
            )}
        </div>
      </div>
      <div className={classes.basic}>
        <div>
          {work.tableName === "GST Filing" && (
            <>
              <p>
                <strong>UPLOADED BILLS: </strong>
              </p>
              <p>{DocumentView(work?.bills)}</p>
            </>
          )}
          {work.tableName === "K-Swift" && (
            <>
              <p>
                <strong>AADHAAR FRONT-SIDE: </strong>
              </p>
              <p>{DocumentView(work?.aadhaarFront)}</p>
              <p>
                <strong>AADHAAR BACK-SIDE: </strong>
              </p>
              <p>{DocumentView(work?.aadhaarBack)}</p>
            </>
          )}
          {work.tableName === "Financial Statement" && (
            <>
              <p>
                <strong>CASH BOOK & OTHER ACCOUNT:</strong>
              </p>
              <p>{DocumentView(work?.cashbookAndOtherAccounts)}</p>
              <p>
                <strong>CREDITORS & DEBITORS LIST:</strong>
              </p>
              <p>{DocumentView(work?.creditorsAndDebitorsList)}</p>
              <p>
                <strong>BANK STATEMENT:</strong>
              </p>
              <p>{DocumentView(work?.bankStatements)}</p>
            </>
          )}
        </div>
        <div>
          {work.tableName === "K-Swift" && (
            <>
              <p>
                <strong>SIGNATURE: </strong>
              </p>
              <p>
                <img
                  className={classes.documentImages}
                  src={work?.signature}
                  alt="Signature"
                />
              </p>
            </>
          )}
          {work.tableName === "Financial Statement" && (
            <>
              <p>
                <strong>GST STATEMENT:</strong>
              </p>
              <p>{DocumentView(work?.gstStatement)}</p>
              <p>
                <strong>STOCK DETAILS: </strong>
              </p>
              <p>{DocumentView(work?.stockDetails)}</p>
            </>
          )}
        </div>
      </div>
      {work.tableName === "Company Formation" && (
        <>
          <p className={classes.heading}>DOCUMENTS SUBMITTED</p>
          <div className={classes.basic}>
            <div>
              <p>
                <strong>ADDRESS PROOF: </strong>
              </p>
              <p>{DocumentView(work?.addressProof)}</p>
              <p>
                <strong>EDUCATIONAL DETAILS: </strong>
              </p>
              <p>{DocumentView(work?.educationDetails)}</p>
            </div>
            <div>
              <p>
                <strong>BANK STATEMENT: </strong>
              </p>
              <p>{DocumentView(work?.bankStatement)}</p>
              <p>
                <strong>NOC FROM BUILDING OWNER: </strong>
              </p>
              <p>{DocumentView(work?.NOC)}</p>
              <p>
                <strong>RENT AGREEMENT: </strong>
              </p>
              <p>{DocumentView(work?.rentAgreement)}</p>
            </div>
          </div>
          {work.directorDetails.map((director, index) => (
            <>
              <hr />
              <p className={classes.heading}>DIRECTORS {index + 1} DETAILS</p>
              <div key={index} className={classes.basic}>
                <div>
                  <p>
                    <strong>PANCARD:</strong>
                  </p>
                  <p>{DocumentView(director?.panCard)}</p>
                  <p>
                    <strong>AADHAR FRONT-SIDE:</strong>
                  </p>
                  <p>{DocumentView(director?.aadhaarFront)}</p>
                  <p>
                    <strong>AADHAR BACK-SIDE:</strong>
                  </p>
                  <p>{DocumentView(director?.aadhaarBack)}</p>
                  <p>
                    <strong>PHOTO:</strong>
                  </p>
                  <p>
                    <img
                      className={classes.documentImages}
                      src={director?.photo}
                      alt="Photo"
                    />
                  </p>
                </div>
                <div>
                  <p>
                    <strong>Address Proof:</strong>
                  </p>
                  <p>{DocumentView(director?.addressProof)}</p>
                  <p>
                    <strong>Bank Statement:</strong>
                  </p>
                  <p>{DocumentView(director?.bankStatement)}</p>
                  <p>
                    <strong>Digital Signature certificate:</strong>
                  </p>
                  <p>{DocumentView(director?.digitalSignatureCertificate)}</p>
                  <p>
                    <strong>Signature:</strong>
                  </p>
                  <p>
                    <img
                      className={classes.documentImages}
                      src={director?.signature}
                      alt="signature"
                    />
                  </p>
                </div>
              </div>
            </>
          ))}
        </>
      )}
      {work.tableName === "Partnership Deed" && (
        <>
          <p className={classes.heading}>DOCUMENTS SUBMITTED</p>
          <div className={classes.basic}>
            <div>
              <p>
                <strong>BANK ACCOUNT STATEMENT: </strong>
              </p>
              <p>{DocumentView(work?.bankAmountStatement)}</p>
              <p>
                <strong>RENT/LEASE AGREEMENT: </strong>
              </p>
              <p>{DocumentView(work?.rentOrLeaseAgreement)}</p>
            </div>
            <div>
              <p>
                <strong>LATEST PROPERTY TAX: </strong>
              </p>
              <p>{DocumentView(work?.latestPropertyTax)}</p>
              <p>
                <strong>LAND TAX RECEIPT: </strong>
                <p>{DocumentView(work?.LandTaxRecipt)}</p>
              </p>
            </div>
          </div>
          {work.partners.map((partner, index) => (
            <>
              <hr />
              <p className={classes.heading}>PARTNER {index + 1} DETAILS</p>
              <div key={index} className={classes.basic}>
                <div>
                  <p>
                    <strong>ADDRESS LINE 1: </strong>
                    {partner?.addressLine1.toUpperCase()}
                  </p>
                  <p>
                    <strong>PHOTO: </strong>
                  </p>
                  <p>
                    <img
                      className={classes.documentImages}
                      src={partner?.photo}
                      alt="photo"
                    />
                  </p>
                  <p>
                    <strong>Signature: </strong>
                  </p>
                  <p>
                    <img
                      className={classes.documentImages}
                      src={partner?.signature}
                      alt="signature"
                    />
                  </p>
                </div>
                <div>
                  <p>
                    <strong>ADDRESS LINE 2: </strong>
                    {partner.addressLine2.toUpperCase()}
                  </p>
                  <p>
                    <strong>PANCARD: </strong>
                  </p>
                  <p>{DocumentView(partner?.panCard)}</p>
                  <p>
                    <strong>AADHAAR FRONT-SIDE: </strong>
                  </p>
                  <p>{DocumentView(partner?.aadhaarFront)}</p>
                  <p>
                    <strong>AADHAAR BACK-SIDE: </strong>
                  </p>
                  <p>{DocumentView(partner?.aadhaarBack)}</p>
                </div>
              </div>
            </>
          ))}
        </>
      )}
      {work.tableName === "GST Registration" && (
        <>
          <p className={classes.heading}>DOCUMENTS SUBMITTED</p>
          <div className={classes.basic}>
            <div>
              <p>
                <strong>RENT/LEASE AGREEMENT: </strong>
              </p>
              <p>{DocumentView(work?.rentAgreement)}</p>
            </div>
            <div>
              <p>
                <strong>LAND TAX RECEIPT: </strong>
              </p>
              <p>{DocumentView(work?.landTaxReceipt)}</p>
            </div>
          </div>
          {work.typeOfBusiness === "company" && (
            <>
              <div className={classes.basic}>
                <div>
                  <p>
                    <strong>CERTIFICATE OF INCORPORATION: </strong>
                  </p>
                  <p>{DocumentView(work?.incorporationCertificate)}</p>
                  <p>
                    <strong>NO OBJECTION CERTIFICATE: </strong>
                  </p>
                  <p>{DocumentView(work?.noObjectionCertificate)}</p>
                </div>
                <div>
                  <p>
                    <strong>PROPERTY TAX RECEIPT: </strong>
                  </p>
                  <p>{DocumentView(work?.propertyTaxReceipt)}</p>
                </div>
              </div>
              {work.directorsDetails.map((director, index) => (
                <>
                  <hr />
                  <p className={classes.heading}>
                    DIRECTOR {index + 1} DETAILS
                  </p>
                  <div className={classes.basic}>
                    <div>
                      <p>
                        <strong>DIRECTOR {index + 1} LATITUDE:</strong>
                        {director?.latitude}
                      </p>
                      <p>
                        <strong>DIRECTOR {index + 1} LONGITUDE: </strong>
                        {director?.longitude}
                      </p>
                    </div>
                    <div>
                      <p>
                        <strong>DIRECTOR {index + 1} PINCODE: </strong>
                        {director?.pinCode}
                      </p>
                    </div>
                  </div>
                  <div key={index} className={classes.basic}>
                    <div>
                      <p>
                        <strong>DIRECTOR {index + 1} PANCARD: </strong>
                      </p>
                      <p>{DocumentView(director?.panPic)}</p>
                      <p>
                        <strong>DIRECTOR {index + 1} PHOTO: </strong>
                      </p>
                      <p>
                        <img
                          className={classes.documentImages}
                          src={director?.photo}
                          alt="photo"
                        />
                      </p>
                    </div>
                    <div>
                      <p>
                        <strong>
                          DIRECTOR {index + 1} AADHAAR FRONT-SIDE:{" "}
                        </strong>
                      </p>
                      <p>{DocumentView(director?.aadhaarFront)}</p>
                      <p>
                        <strong>
                          DIRECTOR {index + 1} AADHAAR BACK-SIDE:{" "}
                        </strong>
                      </p>
                      <p>{DocumentView(director?.aadhaarBack)}</p>
                    </div>
                  </div>
                </>
              ))}
            </>
          )}
          {work.typeOfBusiness === "partnership" && (
            <>
              <div className={classes.basic}>
                <div>
                  <p>
                    <strong>NO OBJECTION CERTIFICATE: </strong>
                  </p>
                  <p>{DocumentView(work?.noObjectionCertificate)}</p>
                  <p>
                    <strong>PARTNERSHIP DEED: </strong>
                  </p>
                  <p>{DocumentView(work?.partnershipDeed)}</p>
                </div>
                <div>
                  <p>
                    <strong>PROPERTY TAX RECEIPT: </strong>
                  </p>
                  <p>{DocumentView(work?.propertyTaxReceipt)}</p>
                  <p>
                    <strong>BANK DETAILS: </strong>
                  </p>
                  <p>{DocumentView(work?.bankDetails)}</p>
                </div>
              </div>
              {work.partnersDetails.map((partner, index) => (
                <>
                  <hr />
                  <p className={classes.heading}>PARTNER {index + 1} DETAILS</p>
                  <div key={index} className={classes.basic}>
                    <div>
                      <p>
                        <strong>ADDRESS LINE 1:</strong>
                        {partner.addressLine1.toUpperCase()}
                      </p>
                      <p>
                        <strong>ADDRESS LINE 2:</strong>
                        {partner.addressLine2.toUpperCase()}
                      </p>
                      <p>
                        <strong>PINCODE: </strong>
                        {partner.pinCode}
                      </p>
                    </div>
                    <div>
                      <p>
                        <strong>LATITUDE: </strong>
                        {partner.latitude}
                      </p>
                      <p>
                        <strong>LONGITUDE: </strong>
                        {partner.longitude}
                      </p>
                    </div>
                  </div>
                  <div key={index} className={classes.basic}>
                    <div>
                      <p>
                        <strong>PARTNER {index + 1} PHOTO: </strong>
                      </p>{" "}
                      <p>
                        <img
                          className={classes.documentImages}
                          src={partner?.photo}
                          alt="Photo"
                        />
                      </p>
                      <p>
                        <strong>PARTNER {index + 1} PANCARD:</strong>
                      </p>
                      <p>{DocumentView(partner?.panPic)}</p>
                    </div>
                    <div>
                      <p>
                        <strong>PARTNER {index + 1} AADHAAR FRONT-SIDE:</strong>
                      </p>
                      <p>{DocumentView(partner?.aadhaarFront)}</p>
                      <p>
                        <strong>PARTNER {index + 1} AADHAAR BACK-SIDE:</strong>
                      </p>
                      <p>{DocumentView(partner?.aadhaarBack)}</p>
                    </div>
                  </div>
                </>
              ))}
            </>
          )}
          {work.typeOfBusiness === "proprietary" && (
            <>
              <div className={classes.basic}>
                <div>
                  <p>
                    <strong>PHOTO: </strong>
                  </p>{" "}
                  <p>
                    <img
                      className={classes.documentImages}
                      src={work?.photo}
                      alt="Photo"
                    />
                  </p>
                  <p>
                    <strong>BANK DETAILS: </strong>
                  </p>
                  <p>{DocumentView(work?.bankDetails)}</p>
                  <p>
                    <strong>BUILDING TAX RECEIPT: </strong>
                  </p>
                  <p>{DocumentView(work?.buildingTaxReceipt)}</p>
                </div>
                <div>
                  <p>
                    <strong>PANCARD: </strong>
                  </p>
                  <p>{DocumentView(work?.panPic)}</p>
                  <p>
                    <strong>AADHAAR FRONT-SIDE: </strong>
                  </p>
                  <p>{DocumentView(work?.aadhaarFront)}</p>
                  <p>
                    <strong>AADHAAR BACK-SIDE: </strong>
                  </p>
                  <p>{DocumentView(work?.aadhaarBack)}</p>
                </div>
              </div>
            </>
          )}
        </>
      )}
      {work.tableName === "IncomeTax Filing" && (
        <>
          {work.typeofTransaction === "business" && (
            <>
              <p className={classes.heading}>DOCUMENTS SUBMITTED</p>
              <div className={classes.basic}>
                <div>
                  <p>
                    <strong>BANK STATEMENT: </strong>
                  </p>
                  <p>{DocumentView(work?.bankStatement)}</p>
                  <p>
                    <strong>BUSINESS LOAN STATEMENT: </strong>
                  </p>
                  <p>{DocumentView(work?.businessLoanStatement)}</p>
                </div>
                <div>
                  <p>
                    <strong>AADHAAR FRONT-SIDE: </strong>
                  </p>
                  <p>{DocumentView(work?.aadhaarFront)}</p>
                  <p>
                    <strong>AADHAAR BACK-SIDE: </strong>
                  </p>
                  <p>{DocumentView(work?.aadhaarBack)}</p>
                </div>
              </div>
            </>
          )}
          {work.typeofTransaction === "salaried" && (
            <>
              <div className={classes.basic}>
                <div>
                  <p>
                    <strong>PF AMOUNT: </strong>
                    {work?.pfAmount}
                  </p>
                  <p>
                    <strong>HEALTH INSURANCE AMOUNT: </strong>
                    {work?.healthInsuranceAmount}
                  </p>
                  <p>
                    <strong>NPS AMOUNT: </strong>
                    {work?.npsNumber}
                  </p>
                </div>
                <div>
                  <p>
                    <strong>LIFE INSURANCE AMOUNT: </strong>
                    {work?.lifeInsuranceAmount}
                  </p>
                  <p>
                    <strong>RENT PAID: </strong>
                    {work?.rentPaid}
                  </p>
                  <p>
                    <strong>TUITION FEES: </strong>
                    {work?.tuitionFees}
                  </p>
                </div>
              </div>
              <div className={classes.basic}>
                <div>
                  <p>
                    <strong>FORM 16: </strong>
                  </p>
                  <p>{DocumentView(work?.form16)}</p>
                  <p>
                    <strong>HOUSING LOAN BANK STATEMENT: </strong>
                  </p>
                  <p>{DocumentView(work?.housingLoanBankStatement)}</p>
                </div>
                <div>
                  <p>
                    <strong>SALARY SLIP: </strong>
                  </p>
                  <p>{DocumentView(work?.salarySlip)}</p>
                  <p>
                    <strong>ELECTRIC VEHICLE PURCHASE: </strong>
                  </p>
                  <p>{DocumentView(work?.electricVehiclePurchase)}</p>
                </div>
              </div>
            </>
          )}
          {work.typeofTransaction === "capitalGain" && (
            <>
              {work.typeofCapitalGain === "securities" && (
                <div className={classes.basic}>
                  <div>
                    <p>
                      <strong>TYPE OF CAPITAL GAIN: </strong>
                      {work?.typeofCapitalGain.toUpperCase()}
                    </p>
                    <p>
                      <strong>SECURITIES TYPE: </strong>
                      {work?.securities
                        ?.replace(/([a-z])([A-Z])/g, "$1 $2")
                        .toUpperCase()}
                    </p>
                    <p>
                      <strong>SALE DATE: </strong>
                      {new Date(work.saleDate).toLocaleDateString() || "N/A"}
                    </p>
                    <p>
                      <strong>SALE AMOUNT: </strong>
                      {work?.saleAmount}
                    </p>
                    <p>
                      <strong>COMPANY NAME: </strong>
                      {work?.companyName.toUpperCase()}
                    </p>
                  </div>
                  <div>
                    <p className={classes.heading}>PURCHASE DETAILS</p>
                    <p>
                      <strong>PURCHASE DATE: </strong>
                      {new Date(work.purchaseDate).toLocaleDateString() ||
                        "N/A"}
                    </p>
                    <p>
                      <strong>PURCHASE AMOUNT: </strong>
                      {work?.purchaseAmount}
                    </p>
                    <p>
                      <strong>ISIN NUMBER: </strong>
                      {work?.isinNumber}
                    </p>
                  </div>
                </div>
              )}
              {work.typeofCapitalGain === "property" && (
                <div className={classes.basic}>
                  <div>
                    <p>
                      <strong>PURCHASE DEED: </strong>
                    </p>
                    <p>{DocumentView(work?.purchaseDeed)}</p>
                  </div>
                  <div>
                    <p>
                      <strong>SALE DEED: </strong>
                    </p>
                    <p>{DocumentView(work?.saleDeed)}</p>
                  </div>
                </div>
              )}
            </>
          )}
        </>
      )}
    </>
  );
};

export default AccountingService;
