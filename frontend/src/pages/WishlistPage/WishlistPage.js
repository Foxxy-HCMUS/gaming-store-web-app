import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchLandingPage } from "../../store/slices/dataSlice";
import { fetchGames, fetchUser } from "../../store/actions";
import styles from "./WishlistPage.module.css"
import { fetchUserData } from "../../store/slices/rootSlice";
import WishlistItemWrapper from "../../components/wishlistComponents/WishlistItemWrapper";
import Filters from "../../components/browseComponents/Filters/Filters";

// import styles from "./WishlistPage.module.css"

const WishlistPage = () =>{
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(fetchLandingPage())
      }, [dispatch])
    
    useEffect(()=>{
        dispatch(fetchUserData());
    },[dispatch]);

    const userData = useSelector((state)=> state.user.userData)
    const dataGetter = useSelector((state) => state.data.landingPageData)
    const [myWishlist, setMyWishlist] = useState([])

    const [wallet, setWallet] = useState([])

    useEffect(()=>{
        setWallet(userData.wallet)
    }, [userData.wallet]
    )

    useEffect(()=>{
        const idWishlist = userData.wishlist
        if (idWishlist != null){
            const wishlist = dataGetter.filter((features) => idWishlist.includes(features.id.toString()))
            setMyWishlist(wishlist)
        }
    }, [userData.wishlist])

    const [data, setData] = useState(null);

    const [sortingModal, setSortingModalState] = useState(false);
    const originalData = myWishlist;

    // const originalData = useSelector((state)=> state.games)
    // rerender whenever data change
    useEffect(() => {
      setData([...originalData]);
    }, [originalData]);

    const closeSortingModal = () => {
      setSortingModalState((prev) => !prev);
    };
  
    // const [filterModal, setFilterModal] = useState(false);
  
    // useEffect(() => {
    //   if (filterModal) {
    //     document.body.setAttribute("class", "overflow-hidden");
    //   } else {
    //     document.body.removeAttribute("class", "overflow-hidden");
    //   }
    // }, [filterModal]);
  
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
            <div className={styles.wishlist}>
                <div className={styles.wishlist__container}>
                    <div className={styles.wishlist__sub_navbar}>
                        <div className={styles.wishlist__title}><span>Wishlist</span></div>
                        <div className={styles.wishlist__points}>
                            <div className={styles.wishlist__user_wallet}>
                                <div className={styles.wishlist__wallet__title}>
                                    <span>My Wallet</span>
                                </div>
                                <div className={styles.wishlist__wallet__point}>
                                    <span>&#8377;{wallet}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div className={styles.wishlist__content}>
                        <aside className={styles.wishlist__filter}>
                            {/* <Filters/> */}
                        </aside>
                        <div className={styles.wishlist__wrapper}>
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
                            </div>
                            {
                                data ? <WishlistItemWrapper data = {data}></WishlistItemWrapper> : (<div> No results found</div>)
                            }
                            {/* {filterModal ? (
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
                                ) : null} */}
                        </div>
                    </div>
                    
                </div>
            </div>
        </>
    )
}

export default WishlistPage