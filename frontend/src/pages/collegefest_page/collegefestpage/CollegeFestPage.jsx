import { Link } from "react-router-dom";
import {
  FaMobileAlt,
  FaBullseye,
  FaEye,
  FaHandHoldingUsd,
  FaPeopleCarry,
} from "react-icons/fa";

import classes from "./CollegeFestPage.module.css";
import Footer from "../../../components/footer/Footer";

const CollegeFestPage = () => {
  return (
    <main className={classes.container}>
      {/* ----- Landing Section ----- */}

      <div className={classes.collegefest}>
        <div>
          <div className={classes.collegefestanimation}>
            <h1>
              RURAL <br /> DIGISTORE PAY <br /> QUEST
            </h1>
            <p>
              The Rural Digistore Pay Quest is not just a competition, it's a
              movement to empower Kerala's youth and rural communities with
              digital literacy and financial empowerment. By harnessing the
              power of technology and the energy of our youth, we're driving
              positive social change and building a brighter future for all
            </p>
            <Link
              to="https://forms.gle/Hm9EBtw9io5oNvpk7"
              className={classes.learnmorebutton}
            >
              Register Now
            </Link>
            <Link to="/criteria" className={classes.learnmorebutton}>
              Know More
            </Link>
            <p>Date: 15th June 2024 to 05 January 2025</p>
          </div>
        </div>
      </div>

      {/* ----- End of Landing Section ----- */}

      {/* ----- Card Layout Section ----- */}

      <div className={classes.cardlayout}>
        <div className={classes.cardone}>
          <div className={classes.cardone1}>
            <div className={classes.cardcontent}>
              <div className={classes.cardicon}>
                <FaMobileAlt size={20} />
              </div>
              <h3 className={classes.cardtitle}>DIGISTOREPAY</h3>
              <p className={classes.cardtext}>
                Access to digital services is no longer a luxury: its a
                necessity. In rural Kerala, where traditional modes of payment
                prevail, the need for accessible, flexible, and digitized
                solutions is more pressing than ever. Enter Digistore Pay - a
                revolutionary app designed to bring the power of digital
                transactions to every corner of the state. Digistore Pay isn't
                just an app; it's a gateway to a world of digital possibilities.
                With its user-friendly interface and intuitive features,
                Digistore Pay makes digital transactions accessible to everyone,
                regardless of their location or background. From small villages
                to bustling towns, Digistore Pay is bridging the gap between
                rural and urban economies, empowering individuals and businesses
                alike to embrace the digital revolution.
              </p>
            </div>
          </div>
        </div>
        <div className={classes.cardtwo}>
          <div className={classes.cardtwo2}>
            <div className={classes.cardcontent}>
              <div className={classes.cardicon}>
                <FaBullseye size={15} />
              </div>
              <h3 className={classes.cardtitle}>OUR MISSION</h3>
              <p className={classes.cardtext}>
                To empower individuals, businesses, and communities with
                innovative digital payment solutions that enhance financial
                inclusion, promote economic growth, and foster social
                development.
              </p>
            </div>
          </div>
          <div className={classes.card3}>
            <div className={classes.cardcontent}>
              <div className={classes.cardicon}>
                <FaEye size={15} />
              </div>
              <h3 className={classes.cardtitle}>OUR VISION</h3>
              <p className={classes.cardtext}>
                Gone are the days of rigid payment systems. With Digistore Pay,
                users enjoy unprecedented flexibility in managing their
                finances. Whether it's paying bills, transferring funds, or
                making purchases online, Digistore Pay offers a seamless and
                convenient experience tailored to the needs of rural
                communities. With just a few taps on their smartphones, users
                can access a wide range of financial services, anytime,
                anywhere.
              </p>
            </div>
          </div>
        </div>
        <div className={classes.cardtwo}>
          <div className={classes.card4}>
            <div className={classes.cardcontent}>
              <div className={classes.cardicon}>
                <FaHandHoldingUsd size={15} />
              </div>
              <h3 className={classes.cardtitle}>
                FLEXIBILITY AT YOUR FINGERTIPS
              </h3>
              <p className={classes.cardtext}>
                To empower individuals, businesses, and communities with
                innovative digital payment solutions that enhance financial
                inclusion, promote economic growth, and foster social
                development.
              </p>
            </div>
          </div>
          <div className={classes.card5}>
            <div className={classes.cardcontent}>
              <div className={classes.cardicon}>
                <FaPeopleCarry size={15} />
              </div>
              <h3 className={classes.cardtitle}>
                THE SOCIAL IMPACT OF THE RURAL DIGISTORE
              </h3>
              <p className={classes.cardtext}>
                The Rural Digistore Pay Quest is not just a competition: it's a
                movement to empower Kerala's youth and rural communities with
                digital literacy and financial empowerment. By harnessing the
                power of technology and the energy of our youth, we're driving
                positive social change and building a brighter future for all.
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* ----- End of Card Layout Section ----- */}

      {/* ----- College Contest Banner Section ----- */}

      <div className={classes.competition}>
        <img src="/images/collegefest/collegefestbanner.jpeg"></img>
        <div className={classes.competitioncontent}>
          <div className={classes.competitioncontenttext}>
            <h2>College Contest: Rural Digistore Pay Quest</h2>
            <p>
              Introducing the Rural Digistore Pay Quest, Kerala's largest
              college competition! With 285 colleges and 30000 students
              involved, we are empowering change-makers through digital literacy
              initiative for a brighter future.
            </p>
          </div>
        </div>
      </div>
      <div className={classes.competitiongravity}>
        <div className={classes.gravitysection}>
          <h3>The Gravity of the Event</h3>
          <p>
            The rural Digistore Pay Quest in Kerala marks a significant
            milestone, uniting colleges, students, and dignitaries statewide in
            our shared endeavor for a more digital, inclusive, and prosperous
            future.
          </p>
          <Link to="/register_session" className={classes.learnmorebutton}>
            Sessions Details
          </Link>
        </div>
      </div>

      {/* ----- End of College Contest Banner Section ----- */}
      <Footer />
    </main>
  );
};

export default CollegeFestPage;
