import { collegefestaward } from "../../../data/collegefestaward";
import { Link } from "react-router-dom";

import classes from "./ContestPrize.module.css";
import Footer from "../../../components/footer/Footer";

const ContestPrize = () => {
  return (
    <main className={classes.container}>
      <div className={classes.contestprize}>
        <div className={classes.criteria}>
          <div className={classes.criteriacontent}>
            <h2>Criteria</h2>
            <p>
              As part of the competition, each team is required to organize an
              awareness activity. This could be anything from a short reel to a
              social media campaign, aimed at generating buzz and attracting
              attention to the benefits of digital transactions. The content and
              idea for the promotional activity must be approved by the
              Digistore Pay team.
            </p>
          </div>
          <h2>Prize Pool</h2>
          <div className={classes.prizepool}>
            <div className={classes.bestcontestprize}>
              <div className={classes.contestcard1}>
                <div className={classes.cardcontent}>
                  <img src="/images/collegefest/trophy.png" />
                  <div className={classes.cardtext}>
                    <h3>Best Performing College</h3>
                    <h4>AWARD</h4>
                    <h2>₹5,00,000/-</h2>
                  </div>
                </div>
              </div>
            </div>
            {collegefestaward.map((awarddata) => (
              <div className={classes.bestcontestprize2}>
                <div className={classes.contestcard2}>
                  <div className={classes.cardcontent2}>
                    <img src={awarddata.image} />
                    <div className={classes.cardtext}>
                      <h3>{awarddata.heading}</h3>
                      <h4>{awarddata.title}</h4>
                      <h2>{awarddata.prize}</h2>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ----- below prize pool section ----- */}

        <div className={classes.belowprize}>
          <div className={classes.prizecontainer}>
            <div className={classes.prizerow}>
              <div className={classes.prizecol}>
                <div className={classes.notecontent}>
                  <div className={classes.notecontentalert}>
                    Note: All below awards include cash prize ranging from Rs
                    15,000 to Rs 25,000
                  </div>
                  <h1>21+ Awards</h1>
                </div>
                <p>
                  Check out the Rural Digistore Pay Quest Leaderboard to see
                  who's leading the charge in our digital barnyard showdown!
                </p>
                <Link
                  to="https://forms.gle/Hm9EBtw9io5oNvpk7"
                  className={classes.prospectusdownload}
                >
                  Register Now
                </Link>
              </div>
            </div>
            <div className={classes.prizerow3}>
              <div className={classes.prospectus}>
                <div className={classes.prospectus1}>
                  Download our Prospectus to know more
                  <a
                    className={classes.prospectusdownload}
                    href="/assets/collegefestprospectus.pdf"
                    target="_blank"
                    download
                  >
                    Download Prospectus
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
};

export default ContestPrize;
