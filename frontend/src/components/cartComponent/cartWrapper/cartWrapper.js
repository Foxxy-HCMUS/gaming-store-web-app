import React, { useEffect, useState } from "react";
import "./cartWrapper.component.css"
import CartItem from "../cartItem/cartItem"

const CartWrapper = props => {

    const myCart = props.data 
    const [cart, setCart] = useState([])

    useEffect(()=>{
        setCart(myCart)
    },[myCart])
    return (
        <>
            <div className="cart_game__items_wrapper">
                {cart == null ? <div></div>:cart.map((el)=>{return <div className="cart_game__item">
                    <CartItem data = {el}></CartItem>
                </div>})}
            </div>
        </>
    )
}
export default CartWrapper