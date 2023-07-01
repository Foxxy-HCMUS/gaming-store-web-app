import React, { useEffect, useState } from "react";
import "./WishlistItemWrapper.component.css"
import WishlistItem from "../WishlistItem/WishlistItem";

const WishlistItemWrapper = props =>{
    const myWishlist = props.data
    const [wishlist, setWishlist] = useState([])

    useEffect(()=>{
        setWishlist(myWishlist)
    }, [myWishlist])
    return (
        <>
        <div className="wishlist__items_wrapper">
            {wishlist == null? <div></div>:wishlist.map((el)=> {return (<div className="wishlist_item">
                <WishlistItem data = {el}/>
            </div>)})}
        </div>
        </>
    )
}

export default WishlistItemWrapper