import Balance from "../../components/profile_components/summary/balance/Balance";
import TotalCard from "../../components/profile_components/summary/total_card/TotalCard";
import classes from "./SummaryPage.module.css";
import Transactions from "../../components/profile_components/summary/transactions/Transactions";
import TopFranchise from "../../components/profile_components/summary/top_franchise/TopFranchise";
import AdvertCard from "../../components/advert_card/AdvertCard";
import WorkSummary from "../../components/profile_components/summary/work_summary/WorkSummary";
import Rating from "../../components/profile_components/summary/rating/Rating";
import JobHistory from "../../components/profile_components/summary/job_history/JobHistory";
import { useSelector } from "react-redux";

const collegeList = [
  {
    name: "Coming Soon",
    location: "Coming Soon",
  },
  {
    name: "Coming Soon",
    location: "Coming Soon",
  },
  {
    name: "Coming Soon",
    location: "Coming Soon",
  },
  {
    name: "Coming Soon",
    location: "Coming Soon",
  },
  {
    name: "Coming Soon",
    location: "Coming Soon",
  },
];

const franchiseList = [
  {
    name: "Soorya Stores",
    location: "Kollam",
  },
  {
    name: "Kuttante Kada",
    location: "Alappuzha",
  },
  {
    name: "Digital Mobile",
    location: "Kochi",
  },
  {
    name: "RCM Traders",
    location: "Palakkad",
  },
  {
    name: "Arun Studio",
    location: "Kottayam",
  },
];

const SummaryPage = () => {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <div
      className={
        currentUser && currentUser?.data.userType === "student"
          ? classes.college_container
          : classes.main_container
      }
    >
      {currentUser && currentUser?.data.userType === "student" ? (
        <>
          <div className={classes.totalOnboard}>
            <TotalCard />
          </div>
          <div className={classes.collegeAd}>
            <AdvertCard image="/assets/ad/collegefestad.jpeg" alt="ad" />
          </div>
          <div className={classes.top_team}>
            <TopFranchise
              heading="Top College"
              subHead="by total onboarding"
              rankList={collegeList}
            />
          </div>
        </>
      ) : currentUser && currentUser?.data.userType === "staff" ? (
        <>
          <div className={classes.wallet}>
            <WorkSummary />
          </div>
          <div className={classes.cardPay}>
            <AdvertCard image="/assets/ad/mobile.jpeg" alt="ad" />
          </div>
          <div className={classes.transaction}>
            <JobHistory />
          </div>
          <div className={classes.top_franchise}>
            <Rating />
          </div>
        </>
      ) : (
        <>
          <div className={classes.wallet}>
            <Balance />
          </div>
          <div className={classes.cardPay}>
            <AdvertCard image="/assets/ad/mobile.jpeg" alt="ad" />
          </div>
          <div className={classes.transaction}>
            <Transactions />
          </div>
          <div className={classes.top_franchise}>
            <JobHistory />
            {/* <TopFranchise
              heading="Top Franchise"
              subHead="June 2024"
              showImage={true}
              rankList={franchiseList}
            /> */}
          </div>
        </>
      )}
    </div>
  );
};

export default SummaryPage;
