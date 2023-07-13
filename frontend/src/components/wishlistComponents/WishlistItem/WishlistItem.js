import React, { useEffect, useState } from "react";
import "./WishlistItem.component.css"
import PriceComponent from "../../priceComponent/PriceComponent";
import {Link, useNavigate} from "react-router-dom"
import { useDispatch, useSelector,  } from "react-redux";
import { addToCart, addToWishlist, fetchUserData, getOrders, removeFromWishlist } from "../../../store/slices/rootSlice";

const WishlistItem = props => {
    const gameInfo = props.data
    const dispatch = useDispatch()
    const [isAdded, setIsAdded] = useState(false)
    const navigate = useNavigate()
    // const wishlist = useSelector((state) => state.user.userData.wishlist)
    const userData = useSelector(state => state.user.userData)   
    const dataGetter = useSelector((state) => state.data.landingPageData)
    useEffect(()=>{
        async function fetchData() {
            await dispatch(getOrders({ userId: userData.id }));
          }
          fetchData();
    },[dispatch, userData])
    const orders = useSelector(state => state.user.orders)
    // const [myLibraries, setMyLibraries] = useState([])
    const [isInLibrary, setIsInLibrary] = useState(false)

    useEffect(() =>{
        const gameOrdered = orders.map((el) => {
            var gameId_list = []
            const gameId =  el.order_games.map((el)=>{
                gameId_list.push(el.gameId)
            })
            return gameId_list
        }).flat(1)
        if(dataGetter!=null && gameOrdered != null){
            if(gameOrdered.includes(gameInfo.id)){
                setIsInLibrary(true)
            }
        }
    }, [orders, dataGetter])

    const cart = useSelector((state) => state.user.userData.cart)

    const linkStyle = {
        textDecoder: "none",
        color: "white"
    }

    useEffect(()=>{
        if (cart !== null && cart !== []){
            if(cart.includes(gameInfo.id)){
                setIsAdded(true)
            }
        }
    }, [cart])

    const handleAddCart = (e) =>{
        e.preventDefault()
        if(isAdded === true){
            navigate("/cart")
        }
        else{
            dispatch(addToCart(gameInfo.id))
            setIsAdded((prev) => !prev)
        }
    }

    const handleRemove = (e) => {
        e.preventDefault()
        dispatch(removeFromWishlist(gameInfo.id))
        // console.log(gameInfo.id)
    }
    return(
        <>     
            <div className="wishlist__item__container">
                <div className="wishlist__item__wrapper">
                    <div className="wishlist__item__img">
                        <img src={gameInfo.cardImage} alt=""/>
                    </div>
                    <div className="wishlist__item__info">
                        <div className="wishlist__item__top">
                            <div className="wishlist__item__name">
                            <Link to={`/${gameInfo.id.toString()}`} style={linkStyle}>
                                <span className="hover-underline-animation">{gameInfo.title}</span>
                            </Link>
                            </div>
                            {
                                isInLibrary?<div className="wishlist__item__price">In Libraries</div>:<div className="wishlist__item__price">
                                <PriceComponent mainPrice={gameInfo.mainPrice} discountPercentage={gameInfo.discountPercentage}/>
                            </div>
                            }
                            
                        </div>
                        <div className="wishlist__item__bottom">
                            <div className="wishlist__item__btns">
                                <button className="wishlist__item__btn wishlist__item__btn__remove" onClick={handleRemove}>
                                    <span>Remove</span>
                                </button>
                                {
                                    isInLibrary?<div></div>:<button className="wishlist__item__btn wishlist__item__btn__view_cart" onClick={handleAddCart}>
                                    <span>{isAdded ? "View In Cart" : "Add To Cart"}</span>
                                </button>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
        </>
    )
}

export default WishlistItem