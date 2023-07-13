// import React, { Component } from "react";
// import SubNavbar from "../../components/subNavbar/sub-navbar.component";

// import UserService from "../../services/user.service";

// export default class Home extends Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       content: ""
//     };
//   }

//   componentDidMount() {
//     UserService.getPublicContent().then(
//       response => {
//         this.setState({
//           content: response.data
//         });
//       },
//       error => {
//         this.setState({
//           content:
//             (error.response && error.response.data) ||
//             error.message ||
//             error.toString()
//         });
//       }
//     );
//   }

//   render() {
//     return (
//       <div className="container">
//         <header className="jumbotron">
//           <h3>{this.state.content}</h3>
//         </header>
//         <SubNavbar />
//       </div>
//     );
//   }
// }

import { useDispatch, useSelector } from "react-redux";

import styles from "./homePage.module.css";
import MainCardContainer from "../../components/homeComponents/MainCardContainer/MainCardContainer";
import SecondaryCardContainer from "../../components/homeComponents/SecondaryCardContainer";
import FreeCardContainer from "../../components/homeComponents/FreeCardContainer";
// import BrowseLink from "../../components/homeComponents/BrowseLink/BrowseLink";
// import Header from "../../components/header";
import SubNavbar from "../../components/subNavbar";
import NavBar from "../../components/navBar";
import CarouselMain from "../../components/homeComponents/CarouselMain/CarouselMain";
// import LoadingPage from "../../components/LoadingPage";
import rootReducer from './../../store/reducer';
import Footer from "../../components/footer";
import MiniCardContainer from './../../components/homeComponents/MiniCardContainer/index';
import { useEffect } from "react";
import { fetchLandingPage } from "../../store/slices/dataSlice";

const HomePage = () => {
  const dispatch = useDispatch()
  useEffect(()=>{
    dispatch(fetchLandingPage())
  }, [dispatch])
  const landingPageData = useSelector((state) => state.data.landingPageData);
  // const landingPageData = useSelector((state) => state.games);
  const saleData = landingPageData.filter(game =>
    (game.discountedPrice !== game.mainPrice) || (game.discountedPrice === 0));
  
  const today = new Date();
  const recentlyUpdatedData = landingPageData
  .map((game) => {
    const releaseDate = new Date(Date.parse(game.releaseDate));
    const timeDiff = Math.abs(releaseDate - today);
    const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
    return { game, diffDays };
  })
  .sort((a, b) => a.diffDays - b.diffDays)
  .filter((data, index) => index < 10)
  .map((data) => data.game);
  
  const newToStoreData = landingPageData.slice(10, 15);
  // const mostPopularData = landingPageData.slice(10, 15);
  const mostPopularDataWithRatings = landingPageData.map(game => {
    const rating = game.reviews ? game.reviews.rating : 0;
    return { ...game, rating };
  });

  const sortedData = mostPopularDataWithRatings.sort((a, b) => b.rating - a.rating);

  const mostPopularData = sortedData.slice(0, 10);

  const secondaryCardData1 = landingPageData.filter((el) => {
    if (el.title === "Genshin Impact" || el.title === "Among Us" || el.title === "Fortnite") {
      return el;
    }
    return false;
  });

  // console.log(secondaryCardData1);

  const secondaryCardData2 = landingPageData.filter((el) => {
    if (el.title === "It Takes Two" || el.title === "Genshin Impact" || el.title === "Honkai: Star Rail") {
      return el;
    }
    return false;
  });

  return (
    <>
      {/* <NavBar /> */}
      {/* <SubNavbar /> */}
      <div className={styles.main}>
        <div className={styles.landing_container}>
          <div className={styles.main_container}>
              <>
              <CarouselMain data={newToStoreData} />
                <div className={styles.mainCardContainer}>
                  <div className={styles.data_cont}>
                    <MainCardContainer data={saleData} title="Game On Sale" />
                  </div>
                </div>

                <div className={styles.secondaryCardContainer}>
                  <SecondaryCardContainer data={secondaryCardData1}/>
                </div>

                <div className={styles.freeCardContainer}>
                  <FreeCardContainer />
                </div>

                <ul className={styles.minicard}>
                  <li className={styles.miniCardContainer}>
                    <MiniCardContainer data={newToStoreData} heading="New Releases" />
                  </li>

                  <li className={styles.miniCardContainer}>
                    <MiniCardContainer
                      data={newToStoreData}
                      heading="Top Sellers"
                    />
                  </li>

                  <li className={styles.miniCardContainer}>
                    <MiniCardContainer
                      data={newToStoreData}
                      heading="Holiday Sale"
                    />
                  </li>
                </ul>

                <div className={styles.secondaryCardContainer}>
                  <SecondaryCardContainer data={secondaryCardData2} />
                </div>

                <div className={styles.mainCardContainer}>
                  <div className={styles.data_cont}>
                    <MainCardContainer
                      data={recentlyUpdatedData}
                      title="Recently Updated"
                    />
                  </div>
                </div>

                <div className={styles.mainCardContainer}>
                  <div className={styles.data_cont}>
                    <MainCardContainer
                      data={newToStoreData}
                      title="Holiday Sale Spotlight"
                    />
                  </div>
                </div>
              </>
          </div>
        </div>
      </div>
      <Footer/>
    </>
  );
};

export default HomePage;