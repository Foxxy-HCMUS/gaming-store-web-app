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

import { useSelector } from "react-redux";

import styles from "./homePage.module.css";
import MainCardContainer from "../../components/homeComponents/MainCardContainer/MainCardContainer";
import SecondaryCardContainer from "../../components/homeComponents/SecondaryCardContainer";
import FreeCardContainer from "../../components/homeComponents/FreeCardContainer";
// import MiniCardContainer from "../../components/homeComponents/MiniCardContainer/MiniCardContainer";
// import BrowseLink from "../../components/homeComponents/BrowseLink/BrowseLink";
// import Header from "../../components/header";
import SubNavbar from "../../components/subNavbar";
// import CarouselMain from "../../components/homeComponents/CarouselMain";
// import Footer from "../../components/Footer";
// import LoadingPage from "../../components/LoadingPage";

const Home = () => {
  const landingPageData = useSelector((state) => state.landingPageData);
  const saleData = landingPageData.slice(0, 5);
  const recentlyUpdatedData = landingPageData.slice(5, 10);
  const mostPopularData = landingPageData.slice(10, 15);
  const newToStoreData = landingPageData.slice(15, 20);

  const secondaryCardData1 = landingPageData.filter((el) => {
    if (el.title === "Corruption 2029" || el.title === "Anno 1701") {
      return el;
    }
    return false;
  });

  const secondaryCardData2 = landingPageData.filter((el) => {
    if (el.title === "Tribes of Midgard" || el.title === "One Hand Clapping") {
      return el;
    }
    return false;
  });

  return (
    <>
      {/* <Header /> */}
      <SubNavbar />
      <div className={styles.main}>
        <div className={styles.landing_container}>
          <div className={styles.main_container}>
            {/* {!landingPageData.length ? (
              <LoadingPage />
            ) : ( */}
              <>
                {/* <CarouselMain /> */}
                <div className={styles.mainCardContainer}>
                  <div className={styles.data_cont}>
                    <MainCardContainer data={saleData} title="Game On Sale" />
                  </div>
                </div>

                <div className={styles.secondaryCardContainer}>
                  <SecondaryCardContainer data={secondaryCardData1} />
                </div>

                <div className={styles.freeCardContainer}>
                  <FreeCardContainer />
                </div>

                {/* <div className={styles.minicard}>
                  <div className={styles.miniCardContainer}>
                    <MiniCardContainer data={saleData} heading="New Releases" />
                  </div>

                  <div className={styles.miniCardContainer}>
                    <MiniCardContainer
                      data={newToStoreData}
                      heading="Top Sellers"
                    />
                  </div>

                  <div className={styles.miniCardContainer}>
                    <MiniCardContainer
                      data={mostPopularData}
                      heading="Holiday Sale"
                    />
                  </div>
                </div> */}

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
                {/* <BrowseLink /> */}
              </>
            {/* )} */}
          </div>
        </div>
      </div>
      {/* <Footer /> */}
    </>
  );
};

export default Home;