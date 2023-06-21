import { useRef } from "react";
import TopCategorySlider from "../../topCategorySlider";
import styles from "./PopularGenres.module.css";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import "./styles.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Card = ({ image, title }) => {
  return (
    <div className={styles.card}>
      <img className={styles.image} src={image} alt={title} />
      <p className={styles.card_text}>{title}</p>
    </div>
  );
};

const PopularGenres = () => {
  const ref = useRef(null);

  const handleNextSlide = () => {
    ref.current.slickNext();
  };

  const handlePrevSlide = () => {
    ref.current.slickPrev();
  };

  var settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
    arrows: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
    ],
  };

  const data = [
    { image: "/genres/action.svg", title: "Action Games" },
    { image: "/genres/indie.svg", title: "Indie Games" },
    { image: "/genres/multiplayer.svg", title: "Multiplayer Games" },
    { image: "/genres/casual.svg", title: "Casual Games" },
    { image: "/genres/action-adventure.svg", title: "Action-Adventure Games" },
    { image: "/genres/adventure.svg", title: "Adventure Games" },
    { image: "/genres/cross_platform.svg", title: "Cross Platform Games" },
    { image: "/genres/horror.svg", title: "Horror Games" },
  ];

  return (
    <>
      <TopCategorySlider
        text="Popular Genres"
        onPrevClick={handlePrevSlide}
        onNextClick={handleNextSlide}
      />
      <div className={styles.main}>
        <Slider ref={ref} {...settings} className={styles.container}>
            {data.map((val, i) => {
              return (
                <div key={i} className={styles.cards}>
                  <Link
                    to={`/games/${val?.id}`}
                    style={{ pointerEvents: "visiblePainted" }}
                  >
                    <Card image={val?.image} title={val?.title} />
                  </Link>
                </div>
              );
            })}
        </Slider>
      </div>
    </>
  );
};

export default PopularGenres;
