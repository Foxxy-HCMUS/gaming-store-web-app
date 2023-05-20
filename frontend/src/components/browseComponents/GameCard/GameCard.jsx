import { useEffect, useInsertionEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { addToWishlist } from "../../../store/actions";
import { addToWishlist, fetchUserData, removeFromWishlist } from "../../../store/slices/rootSlice";
import { useNavigate } from "react-router-dom";
import styles from "./GameCard.module.css";

import PriceComponent from "../../priceComponent/PriceComponent";
// import rootReducer from './../../../store/reducer';

const GameCard = (props) => {
  const dispatch = useDispatch();

  // const user = useSelector((state) => state.user.userData);
  // const wishlist = (!user || !user.wishlist) ? [] : user.wishlist; 
  const [isWishlisted, setWishlisted] = useState(false);
  const [wishlist, setWishlist] = useState([]);

  const isAuthenticated = useSelector((state) => state.auth.isLoggedIn); // check Signed in 
  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchUserData()).then((userData) => {
        setWishlist(userData.payload.wishlist || []);
        // console.log(isAuthenticated);
      }).catch((error) => {
        console.log(error);
      });
    }
  }, [dispatch]); 
  // console.log(wishlist);

  useEffect(() => {
      if (wishlist.includes(props.id)) {
          setWishlisted(true);
      }
  }, [wishlist]);

  const navigate = useNavigate();

  const handleWishlist = (e) => {
      e.preventDefault();
      if (!isAuthenticated) {
          navigate("/signin");
      }
      // console.log(props.id, " before: " ,isWishlisted)
      if (!isWishlisted){
        dispatch(addToWishlist(props.id));
      }
      else {
        dispatch(removeFromWishlist(props.id));
      }
      setWishlisted((prev) => !prev);
  };

  return (
    <div className={styles.card}>
      <div className={styles.image_div}>
        <img src={props.image} alt={props.title} />
        <div onClick={handleWishlist} className={styles.icon}>
          {/* icon */}
                <img src={!isWishlisted ? "/icons/add_to_wishlist.svg" :
                        "/icons/already_in_wishlist.svg" } alt="icon" />
                </div>
      </div>
      <div className={styles.info}>
        <p className={styles.title}>{props.title}</p>
        <div className={styles.tagline_cont}>
          <div className={styles.tagline}>{props.tagline}</div>
        </div>
      </div>
      <div className={styles.price}>
        <PriceComponent
          mainPrice={props.mainPrice}
          discountPercentage={props.discountPercentage}
        />
      </div>
    </div>
  );
};

export default GameCard;
