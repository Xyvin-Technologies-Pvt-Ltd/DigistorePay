import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import classes from "./HomePage.module.css";
import InformationCard from "../../components/informationcard/InformationCard";
import images from "../../data/logodata";
import { cards } from "../../data/servicescarddata";
import HeaderWithCarousel from "../../components/hero/HeaderWithCarousel";
import { useSelector } from "react-redux";
import Footer from "../../components/footer/Footer";

const HomePage = () => {
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const handleCardClick = (path) => {
    navigate(path);
  };

  useEffect(() => {
    currentUser ? navigate("/login") : null;
  }, []);

  return (
    <main className={classes.container}>
      <div className={classes.imageContainer}>
        <HeaderWithCarousel />
      </div>
      <div className={classes.mainContainer}>
        {/*the Why Opt Us Section  */}
        <div className={classes.whyDigiStorePay}>
          <div className={classes.container_choice}>
            <p className={classes.subHeading}>Why Choose Us</p>
            <div className={classes.cardGrid}>
              <InformationCard />
            </div>
          </div>
        </div>

        {/* Our Services sections */}
        <div>
          <p className={classes.subHeading}>Our Services</p>
        </div>
        <div className={classes.customContainer} id="service">
          <div className={classes.customRow}>
            {cards.map((card) => (
              <div
                key={card.id}
                className={classes.customCol}
                // onClick={() => handleCardClick(card.path)}
              >
                <div className={classes.cardComponent}>
                  <div className={classes.cardImgContainer}>
                    <img
                      src={card.image}
                      alt={card.title}
                      className={classes.cardImg}
                    />
                  </div>
                  <div className={classes.cardBody}>
                    <h5 className={classes.cardTitle}>{card.title}</h5>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/*Our patners section */}

        <div className={classes.partnersSection}>
          <div className={classes.subHeading}>
            <p>Our Partners</p>
          </div>
          <div className={classes.logoSlider}>
            <div className={classes.logoWrapper}>
              <div className={classes.logoList} aria-hidden="true">
                {images.concat(images).map((image, index) => (
                  <div className={classes.logoItems} key={index}>
                    <img src={image.src} alt={image.alt} />
                  </div>
                ))}
                {images.concat(images).map((image, index) => (
                  <div className={classes.logoItems} key={index}>
                    <img src={image.src} alt={image.alt} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/*contact Section */}
        <div>
          <p className={classes.subHeading}>Contact US</p>
        </div>
        <p className={classes.contactTextCenter}>
          Contact us for any inquiries or assistance. We're here to help
          streamline your experience.
        </p>

        <div className={classes.contactContainer}>
          <div className={classes.contactRow}>
            <div className={classes.contactColImage}>
              <img
                src="/images/homePage/Connected_contact_us.png"
                alt="Contact image"
                className={classes.contactImage}
              />
            </div>
            <div className={classes.contactColForm}>
              <form>
                <div className={classes.contactInputContainer}>
                  <input
                    type="text"
                    className={classes.contactInput}
                    placeholder="Enter Full Name"
                  />
                  <input
                    type="email"
                    className={classes.contactInput}
                    placeholder="Enter Email Address"
                  />
                  <input
                    type="text"
                    className={classes.contactInput}
                    placeholder="Enter Phone Number"
                  />
                  <input
                    type="text"
                    className={classes.contactInput}
                    placeholder="Subject"
                  />
                  <textarea
                    className={`${classes.contactInput} ${classes.contactTextarea}`}
                    rows={3}
                    placeholder="Leave a message for us"
                  />
                </div>
                <div className={classes.contactTextCenter}>
                  <button className={classes.contactBtn} type="submit">
                    Send Message
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </main>
  );
};

export default HomePage;
