import { IoFilterSharp } from "react-icons/io5";
import { useSelector } from "react-redux";
import GameCard from "../../components/browseComponents/GameCard/GameCard";
import styles from "./BrowsePage.module.css";
import { Link } from "react-router-dom";
import PopularGenres from "../../components/browseComponents/PopularGenres/PopularGenres";
import Footer from "../../components/footer";
import Filters from "../../components/browseComponents/Filters/Filters";
import { sortGames } from "../../store/slices/rootSlice";
import { useEffect, useState } from "react";

const BrowsePage = () => {
  const [data, setData] = useState(null);

  const [sortingModal, setSortingModalState] = useState(false);
  const originalData = useSelector((state) => state.games);

  // rerender whenever data change
  useEffect(() => {
    setData([...originalData]);
  }, [originalData]);

  const closeSortingModal = () => {
    setSortingModalState((prev) => !prev);
  };

  const [filterModal, setFilterModal] = useState(false);

  useEffect(() => {
    if (filterModal) {
      document.body.setAttribute("class", "overflow-hidden");
    } else {
      document.body.removeAttribute("class", "overflow-hidden");
    }
  }, [filterModal]);

  const sortGames = (sortBy) => {
    if (sortBy === "all") {
      setData([...originalData]);
    }
    else if (sortBy === "alphabetical") {
      data.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortBy === "highToLow") {
      data.sort((a, b) => b.discountedPrice - a.discountedPrice);
    } else if (sortBy === "lowToHigh") {
      data.sort((a, b) => a.discountedPrice - b.discountedPrice);
    } else if (sortBy === "newRelease") {
      data.sort((date1, date2) => {
        date1 = new Date(date1.releaseDate);
        date2 = new Date(date2.releaseDate);
        return date2 - date1;
      });
    }
    setData([...data]);
  };

  const [activeSort, setActiveSort] = useState("All");

  return (
    <>
      <div className={styles.main}>
        <div className={styles.browse_container}>
          <PopularGenres />
          <div className={styles.main_container}>
            <div className={styles.data_wrapper}>
              <div className={styles.filters_container}>
                <div className={styles.sorting}>
                  <p className={styles.sorting_title}>
                    <span className={styles.showText}>Show:</span>{" "}
                    <span
                      onClick={closeSortingModal}
                      className={styles.activeSort}
                    >
                      {activeSort}
                    </span>
                  </p>

                  {sortingModal ? (
                    <div
                      onClick={closeSortingModal}
                      className={styles.sorting_modal}
                    >
                      <p
                        onClick={() => {
                          sortGames("all");
                          setActiveSort("All");
                        }}
                        className={styles.sorting_option}
                      >
                        All
                      </p>

                      <p
                        onClick={() => {
                          sortGames("newRelease");
                          setActiveSort("New Release");
                        }}
                        className={styles.sorting_option}
                      >
                        New Realease
                      </p>

                      <p
                        onClick={() => {
                          sortGames("alphabetical");
                          setActiveSort("Alphabetical");
                        }}
                        className={styles.sorting_option}
                      >
                        Alphabetical
                      </p>

                      <p
                        onClick={() => {
                          sortGames("lowToHigh");
                          setActiveSort("Price: Low to High");
                        }}
                        className={styles.sorting_option}
                      >
                        Price: Low to High
                      </p>

                      <p
                        onClick={() => {
                          sortGames("highToLow");
                          setActiveSort("Price: High to Low");
                        }}
                        className={styles.sorting_option}
                      >
                        Price: High to Low
                      </p>
                    </div>
                  ) : null}
                </div>
                {/* <div
                  onClick={() => setFilterModal(true)}
                  className={styles.filters}
                >
                  <p>Filters</p>
                  <IoFilterSharp style={{ width: "18px", height: "18px" }} />
                </div> */}
              </div>
              <div className={styles.data_container}>
                {data ? (
                  data.map((val, i) => {
                    return (
                      <div key={i} className={styles.card}>
                        <Link
                          to={`/${val?.id}`}
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
                  })
                ) : (
                  <div className={styles.error}>
                    <p className={styles.error_main}>No results found</p>
                  </div>
                )}
              </div>
            </div>
            <div className={styles.filter_desktop}>
              <Filters />
            </div>
          </div>
        </div>
        <Footer />

        {filterModal ? (
          <div className={styles.modal_overlay}>
            <div className={styles.modal_container}>
              <Filters handleClose={setFilterModal} />
            </div>
            <div className={styles.bottom_navbar}>
              <div className={styles.clear}>CLEAR</div>
              <button
                onClick={() => setFilterModal(false)}
                className={styles.done}
              >
                DONE
              </button>
            </div>
          </div>
        ) : null}
      </div>
    </>
  );
};

export default BrowsePage;
