import { useEffect, useInsertionEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToWishlist } from "../../../store/actions";
import { useNavigate } from "react-router-dom";
import styles from "./GameCard.module.css";

import PriceComponent from "../../priceComponent/PriceComponent";
import rootReducer from './../../../store/reducer';

const GameCard = (props) => {
  const dispatch = useDispatch();

  // const user = useSelector((state) => state.rootReducer.user);
  // const wishlist = user.wishlist;
  // const [isWishlisted, setWishlisted] = useState(false);

  // useEffect(() => {
  //     if (wishlist.includes(props.id)) {
  //         setWishlisted(true);
  //     }
  // }, [user.displayName]);

  // const history = useNavigate();

  // const handleWishlist = (e) => {
  //     e.preventDefault();
  //     if (!wishlist) {
  //         history.push("/signin");
  //     }
  //     setWishlisted(true);

  //     dispatch(addToWishlist(props.id));
  // };

  return (
    <div className={styles.card}>
      <div className={styles.image_div}>
        <img src={props.image} alt={props.title} />
        {/* <div onClick={handleWishlist} className={styles.icon}>
                <img src={isWishlisted ? "/icons/add_to_wishlist.svg" :
                        "/icons/already_in_wishlist.svg" } alt="icon" />
                </div> */}
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
