import React, { useState, useEffect } from "react";
import classes from "./Carousel.module.css";

const Carousel = ({ imageData }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [nextImageIndex, setNextImageIndex] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex(nextImageIndex);
      setNextImageIndex((nextIndex) => (nextIndex + 1) % imageData.length);
    }, 3000); // Change image every 3 seconds

    return () => clearInterval(interval);
  }, [nextImageIndex]);

  return (
    <div className={classes.HeroImageCarousel}>
      {imageData.map((image, index) => (
        <img
          key={index}
          src={image.src}
          alt={image.alt}
          className={`${classes.HeroCarouselImage} ${
            index === currentImageIndex ? classes.HeroCarouselImageActive : ""
          } ${index === nextImageIndex ? classes.HeroCarouselImageNext : ""}`}
        />
      ))}
    </div>
  );
};

export default Carousel;
