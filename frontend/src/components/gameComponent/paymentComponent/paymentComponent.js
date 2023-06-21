import React, { useEffect, useState } from "react";
import "./paymentComponent.css"
import PriceComponent from "../../priceComponent/PriceComponent";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToWishlist, fetchUserData, removeFromWishlist } from "../../../store/slices/rootSlice";


const PaymentComponent = props =>{
    const data = props.data 
    const dispatch = useDispatch()

    const [isWishlisted, setWishlisted] = useState(false)
    const [wishlist, setWishlist] = useState([]);
    const isAuthenticated = useSelector((state) => state.auth.isLoggedIn);   
    
    useEffect(() => {
        console.log("call check authen")
        console.log(wishlist)
        if (isAuthenticated) {
          dispatch(fetchUserData()).then((userData) => {
            setWishlist(userData.payload.wishlist || []);
            // console.log(isAuthenticated);
          }).catch((error) => {
            console.log(error);
          });
        }
      }, [dispatch]);

      useEffect(() => {
        if (wishlist.includes(data.id)) {
            setWishlisted(true);
        }
    }, [wishlist]);
  
    const navigate = useNavigate();
  
    function handleSignIn(e){
        e.preventDefault();
        if (!isAuthenticated){
            navigate("/signin");
        }
        else{
            navigate("/cart")
        }
    }

    const handleWishlist = (e) => {
        handleSignIn(e);
        // console.log(data.id, " before: " ,isWishlisted)
        if (!isWishlisted){
          dispatch(addToWishlist(data.id));
        }
        else {
          dispatch(removeFromWishlist(data.id));
        }
        setWishlisted((prev) => !prev);
    };
    
    console.log(wishlist)

    return(
        <>
            <div className="payment__container">
                <div className="payment__logo_game">
                    <div className="picture">
                        <img src = {data.logo} alt="#"/>
                    </div> 
                </div>
                <div className="payment__price">
                    <PriceComponent mainPrice={data.mainPrice}
                                    discountPercentage={data.discountPercentage}/>
                </div>

                <div className="payment__btns">
                    <div className="payment__btn__wrapper payment__btn__buy_now">
                        <button className="payment__btn btn__buy_now">
                            <span>Buy Now</span>
                        </button>
                    </div>
                    <div>
                        <div className="payment__btn__wrapper payment__btn__add_cart">
                            <button className="payment__btn btn__add_cart" onClick = {handleSignIn}>
                                <span>View in Cart</span>
                            </button>
                        </div>   
                    </div>

                    <div>
                        <div className="payment__btn__wrapper payment__btn__add_wishlist">
                            <button className="payment__btn btn__add_wishlist" onClick={handleWishlist}>
                                <span>{isWishlisted ? "In Wishlist": "Add to Wishlist"}</span>
                            </button>
                        </div>
                    </div>
                    
                    <div>
                        <ul className="payment__list_infos">
                            <li className="payment__item">
                                <div className="payment__item__wrapper">
                                    <div className="payment__item__title">Developer</div>
                                    <div className="payment__item__value">{(data.developer != null || data.developer !== " ")? data.developer: " "}</div>
                                </div>
                            </li>

                            <li className="payment__item">
                                <div className="payment__item__wrapper">
                                    <div className="payment__item__title">Publisher</div>
                                    <div className="payment__item__value">{(data.publisher != null || data.publisher !== " ")? data.publisher: " "}</div>
                                </div>
                            </li>

                            <li className="payment__item">
                                <div className="payment__item__wrapper">
                                    <div className="payment__item__title">Release Date</div>
                                    <div className="payment__item__value">{(data.releaseDate != null || data.releaseDate !== " ")? data.releaseDate: " "}</div>
                                </div>
                            </li>

                            <li className="payment__item">
                                <div className="payment__item__wrapper">
                                    <div className="payment__item__title">Platform</div>
                                    <div className="payment__item__value payment__item__value__platform">{(data.platform != null || data.platform !== " ")? (data.platform.map((el,ind)=>{
                                        return (<span>{el}</span>)
                                    })): " "}</div>
                                </div>
                            </li>

                        </ul>
                    </div>
                    
                </div>
            </div>
            
            
        </>
    )
}

export default PaymentComponent