import Button from "../../../button/Button";
import classes from "./TotalCard.module.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { FaRankingStar } from "react-icons/fa6";
import { RiTeamFill } from "react-icons/ri";
import { FaUniversity } from "react-icons/fa";

const TotalCard = () => {
  const { currentUser } = useSelector((state) => state.user);

  return (
    <div className={classes.container}>
      <div className={classes.header}>
        <p className={classes.content}>Ranking Details</p>
      </div>
      <div className={classes.header}>
        <p className={classes.content}>Team Rank</p>
        <p id={classes.amount} className={classes.content}>
          <FaRankingStar style={{ color: "var(--honoblue)" }} /> **
        </p>
      </div>

      <div className={classes.header}>
        <p className={classes.content}>Team Total</p>
        <p id={classes.amount} className={classes.content}>
          <RiTeamFill style={{ color: "var(--honoblue)" }} /> **
        </p>
      </div>

      <div className={classes.header}>
        <p className={classes.content}>College Rank</p>
        <p id={classes.amount} className={classes.content}>
          <FaRankingStar style={{ color: "var(--honoblue)" }} /> **
        </p>
      </div>

      <div className={classes.header}>
        <p className={classes.content}>College Total</p>
        <p id={classes.amount} className={classes.content}>
          <FaUniversity style={{ color: "var(--honoblue)" }} /> **
        </p>
      </div>

      <Link className={classes.link} to="/collegefest">
        <Button btnName="Contest Details" />
      </Link>
    </div>
  );
};

export default TotalCard;
