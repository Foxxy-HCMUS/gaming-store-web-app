import React, { useEffect, useState } from "react";
import "./cartItem.component.css"
import PriceComponent from "../../priceComponent/PriceComponent";
import { addToWishlist, getOrders, removeFromCart } from "../../../store/slices/rootSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";


const CartItem = props => {

    const gameInfo = props.data
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleMoveToWishlist = (e) => {
        e.preventDefault()
        dispatch(removeFromCart(gameInfo.id))
        dispatch(addToWishlist(gameInfo.id))
    }

    const handleRemove = (e)=>{
        e.preventDefault()
        dispatch(removeFromCart(gameInfo.id))
    }

    return(
        <>
            <div className={`cart_game__item__container`}>
                <div className="cart_game__item__wrapper">
                    <div className="cart_game__item__img">
                        <img src={gameInfo.cardImage} alt=""/>
                    </div>
                    <div className="cart_game__item__info">
                        <div className="cart_game__item__top">
                            <div className="cart_game__item__name">
                                <span className="hover-underline-animation">{gameInfo.title}</span>
                            </div>
                            <div className="cart_game__item__price">
                                <PriceComponent mainPrice={gameInfo.mainPrice} discountPercentage={gameInfo.discountPercentage}/>
                            </div>
                        </div>
                        <div className="cart_game__item__bottom">
                            <div className="cart_game__item__btns">
                                <button className="cart_game__item__btn cart_game__item__btn__remove" onClick={handleRemove}>
                                    <span>Remove</span>
                                </button>
                                <button className="cart_game__item__btn cart_game__item__btn__move_wishlist" onClick={handleMoveToWishlist}>
                                    <span>Move To Wishlist</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CartItem