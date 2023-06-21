import { Link } from "react-router-dom";
import TopCategorySlider from "../../topCategorySlider";
import styles from "./MainCardContainer.module.css";
import GameCard from "../../browseComponents/GameCard/GameCard";
import { useRef } from "react";
import Slider from "react-slick";
// import MenuItem from '@mui/material/MenuItem';

// const MainCardContainer = ({data, title, onPrevClick, onNextClick}) => {
//     const sliderRef = useRef(null);

//     const handlePrevClick = () => {
//         sliderRef.current.scrollBy({
//             left: -sliderRef.current.offsetWidth,
//             behavior: "smooth",
//         });
//     };

//     const handleNextClick = () => {
//         sliderRef.current.scrollBy({
//             left: sliderRef.current.offsetWidth,
//             behavior: "smooth",
//         });
//     };

//     return (
//         <>
//             <TopCategorySlider
//             text={title}
//             onPrevClick={handlePrevClick}
//             onNextClick={handleNextClick}/>
//             <div className={styles.mainCardContainer}>
//                 <div className={styles.container} ref={sliderRef}>
//                     {data.map((val, i) => {
//                         return(
//                             <div key={i} className={styles.card}>
//                                 <Link to={`/games/${val?.id}`} style={{"pointerEvents": "visiblePainted"}}>
//                                     <GameCard
//                                         image={val?.cardImage}
//                                         title={val?.title}
//                                         tagline={val?.cardTagline}
//                                         mainPrice={val?.mainPrice}
//                                         discountPercentage={val?.discountPercentage}
//                                         id={val?.id}
//                                     />
//                                 </Link>
//                             </div>
//                         );
//                     })}
//                 </div>
//             </div>

//         </>
//     );
// };

// export default MainCardContainer;

import "./styles.css"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
const MainCardContainer = ({ data, title }) => {
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
    slidesToShow: 5,
    slidesToScroll: 3,
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
  return (
    <>
    <TopCategorySlider text={title} onPrevClick={handlePrevSlide} onNextClick={handleNextSlide} />
    <div className={styles.mainCardContainer}>
      <Slider ref={ref} {...settings} className={styles.container}>
        {data.map((val, i) => {
          return (
            <div key={i} styles={styles.card}>
              <Link
                // to={`/games/${val?.id}`}
                to = {`/${val?.id}`}
                style={{ pointerEvents: "visiblePainted" }}
              >
                <GameCard
                  image={val?.cardImage}
                  title={val?.title}
                  tagline={val?.cardTagline}
                  mainPrice={val?.mainPrice}
                  discountPercentage={val?.discountPercentage}
                  id={val?.id}
                />
              </Link>
            </div>
          );
        })}
      </Slider>
      </div>
    </>
  );
};

export default MainCardContainer;
