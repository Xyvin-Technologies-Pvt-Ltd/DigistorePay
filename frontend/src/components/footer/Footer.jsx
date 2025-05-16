import classes from "./Footer.module.css";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className={classes.footer}>
      <div className={classes.flexContainer}>
        <div className={classes.logoSection}>
          <img src="/favicon-32x32.png" />
          <p>DIGISTORE PAY</p>
          <p>Simplifying Online Payments and Services</p>
          {/* <p>First Floor, Zam Zam Plaza, Above More Super Market Pala Road, Ettumanoor , Kottayam, Kerala- 686631</p> */}
        </div>

        <div className={classes.linksSection}>
          <div>
            <h4>Useful Links</h4>
            <Link to="/terms_conditions">Terms & Conditions</Link>
            <Link to="/privacy_policy">Privacy Policy</Link>
            <Link to="/refund_policy">Refund Policy</Link>
          </div>

          <div>
            <h4>Community</h4>
            <Link to="#">Help Center</Link>
            <Link to="#">Partners</Link>
            <Link to="#">Careers</Link>
            <Link to="/calculator">Income Calculator</Link>
            <Link to="/signup">Become a Franchise</Link>
          </div>

          <div>
            <h4>Contact Us</h4>
            <p style={{ color: "#aaa", fontSize: "14px", lineHeight: 1 }}>
              Digisuvidha Pvt Ltd,{" "}
            </p>
            <p style={{ color: "#aaa", fontSize: "14px", lineHeight: 1 }}>
              First Floor, Zam Zam Plaza,{" "}
            </p>
            <p style={{ color: "#aaa", fontSize: "14px", lineHeight: 1 }}>
              Above More Super Market Pala Road, Ettumanoor,{" "}
            </p>
            <p style={{ color: "#aaa", fontSize: "14px", lineHeight: 1 }}>
              Kottayam, Kerala- 686631
            </p>
          </div>
        </div>
      </div>

      <div className={classes.copyrightSection}>
        <p>Copyright © 2024 Digisuvidha Pvt Ltd. All Rights Reserved.</p>
        <div className={classes.socialIcons}>
          <p>GST Number : 32AAHCD8806D1ZX </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
