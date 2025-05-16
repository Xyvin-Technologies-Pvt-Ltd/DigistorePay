import React from "react";
import classes from "./PlanPage.module.css";
import PlanCard from "../../components/plan_card/PlanCard";

const PlanPage = () => {
  return (
    <div className={classes.container}>
      <PlanCard
        title="Trial"
        amount="0"
        offers={[
          { name: "All services available", available: true },
          { name: "Customization Available", available: false },
          { name: "24/7 Customer Support", available: false },
        ]}
      ></PlanCard>
      <PlanCard
        title="Pro"
        amount="5000"
        offers={[
          { name: "All services available", available: true },
          { name: "Customization Available", available: true },
          { name: "24/7 Customer Support", available: true },
        ]}
      ></PlanCard>
    </div>
  );
};

export default PlanPage;
