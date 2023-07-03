import React, { useEffect, useState } from "react";
import "./paymentComponent.css"
import PriceComponent from "../../priceComponent/PriceComponent";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, addToWishlist, fetchUserData, getOrders, removeFromWishlist } from "../../../store/slices/rootSlice";
import { library } from "@fortawesome/fontawesome-svg-core";


const PaymentComponent = props =>{
    const data = props.data
    const dispatch = useDispatch()
    const platform = Object.keys(data.specifications["Configurations"])

    const [isWishlisted, setWishlisted] = useState(false)
    const [wishlist, setWishlist] = useState([]);
    const isAuthenticated = useSelector((state) => state.auth.isLoggedIn);

    const userData = useSelector(state => state.user.userData)   


    useEffect(()=>{
        async function fetchData() {
            await dispatch(getOrders({ userId: userData.id }));
          }
          fetchData();
    },[dispatch, userData])

    const orders = useSelector(state => state.user.orders)
    const dataGetter = useSelector((state) => state.data.landingPageData)
    const [isInLibrary, setIsInLibrary] = useState(false)

    useEffect(() =>{
        const gameOrdered = orders.map((el) => {
            var gameId_list = []
            const gameId =  el.order_games.map((el)=>{
                gameId_list.push(el.gameId)
            })
            return gameId_list
        }).flat(1)
        // console.log(gameOrdered)
        // console.log(dataGetter)
        if(dataGetter!=null && gameOrdered != null){
            if(gameOrdered.includes(data.id))
            setIsInLibrary(true)
        }

    }, [orders, dataGetter])
    
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

    const handleCart = (e) => {
        if(!isAuthenticated){
            navigate("/signin")
        }
        else{
            dispatch(addToCart(data.id))
            navigate("/cart")
        }
    }

    const handleInLibrary = (e) =>{
        navigate("/libraries")
    }
    
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
                        
                        {
                            isInLibrary === true?
                            (
                            <button className="payment__btn btn__buy_now" onClick={handleInLibrary}>
                                <span>In Libraries</span>
                            </button>):
                            
                            (<button className="payment__btn btn__buy_now">
                                            <span>Buy Now</span>
                                        </button>)
                        }
                        
                    </div>
                    <div>
                        {
                            !isInLibrary? (<div className="payment__btn__wrapper payment__btn__add_cart">
                            <button className="payment__btn btn__add_cart" onClick = {handleCart}>
                                <span>View in Cart</span>
                            </button>
                        </div>   ) :(<div></div>)
                        }
                        
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
                                    <div className="payment__item__value payment__item__value__platform">{(platform != null || platform !== " ")? (platform.map((el,ind)=>{
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