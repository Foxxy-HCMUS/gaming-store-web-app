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

const HomePage = () => {
  // const landingPageData = useSelector((state) => state.data.landingPageData);
  const landingPageData = useSelector((state) => state.data.landingPageData);
  const saleData = landingPageData.slice(0, 10);
  const recentlyUpdatedData = landingPageData.slice(5, 10);
  const newToStoreData = landingPageData.slice(10, 15);
  const mostPopularData = landingPageData.slice(10, 15);

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
                      data={mostPopularData}
                      heading="Top Sellers"
                    />
                  </li>

                  <li className={styles.miniCardContainer}>
                    <MiniCardContainer
                      data={mostPopularData}
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

export default HomePage