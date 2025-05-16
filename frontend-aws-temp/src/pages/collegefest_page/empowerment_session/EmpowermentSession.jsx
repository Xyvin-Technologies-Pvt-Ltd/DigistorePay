import Footer from "../../../components/footer/Footer";
import { collgefestempowermentsession } from "../../../data/collegefestempowermentsession";
import { Link } from "react-router-dom";
import classes from "./EmpowermentSession.module.css";

const EmpowermentSession = () => {
  return (
    <main className={classes.container}>
      <div className={classes.empowermentsession}>
        <div className={classes.empowermentsession2}>
          <h1>Empowerment Sessions</h1>
          <div className={classes.empowermentsessioncontent}>
            <p className={classes.empowermentsession2content}>
              As part of the Rural Digistore Pay Quest, we are conducting the
              following sessions to empower and educate participants:
            </p>
            <Link
              to="https://forms.gle/bQKFBsgnqF5EdQYy5"
              className={classes.empowermentsessionregister}
            >
              Register Now
            </Link>
          </div>
          <div className={classes.empowermentsessioncontainer}>
            <div className={classes.empowermentsessiongrid}>
              {collgefestempowermentsession.map((empdata) => (
                <div key={1} className={classes.empowermentsessioncard}>
                  <h2>{empdata.number}</h2>
                  <h3>{empdata.heading}</h3>
                  <p>{empdata.details}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
};

export default EmpowermentSession;
