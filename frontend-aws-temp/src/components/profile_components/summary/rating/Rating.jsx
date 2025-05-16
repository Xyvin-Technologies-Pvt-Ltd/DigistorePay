import React from "react";
import classes from "./Rating.module.css";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
function Rating() {
  const cardData = [
    { name: "PanCard", rating: 4.5 },
    { name: "Ticket Booking", rating: 0 },
    { name: "Loan", rating: 3.8 },
    { name: "Insurance", rating: 0.1 },
    { name: "Passport", rating: 5 },
  ];

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 !== 0;
    const totalStars = 5;

    return (
      <div className={classes.rating}>
        {[...Array(fullStars)].map((_, index) => (
          <FaStar key={index} className={classes.star} />
        ))}

        {halfStar && <FaStarHalfAlt className={classes.star} />}

        {[...Array(totalStars - fullStars - (halfStar ? 1 : 0))].map(
          (_, index) => (
            <FaRegStar key={index + fullStars} className={classes.star} />
          ),
        )}
      </div>
    );
  };

  return (
    <div className={classes.container}>
      <div>
        <h3 className={classes.head}>Your Rating</h3>
        <p className={classes.subhead}>December - 2024</p>
      </div>
      {cardData.map((item, index) => (
        <div key={index} className={classes.card}>
          <p className={classes.name}>{item.name}</p>
          <div className={classes.stars}>{renderStars(item.rating)}</div>
        </div>
      ))}
    </div>
  );
}

export default Rating;
