import React, { useEffect, useState } from "react";
import styles from "./CartPage.module.css"
import { useDispatch, useSelector} from "react-redux";
import { fetchLandingPage } from "../../store/slices/dataSlice";
import { SubtractWallet, fetchUserData, getOrders, removeFromCart } from "../../store/slices/rootSlice";
import CartWrapper from "../../components/cartComponent/cartWrapper"
import { useNavigate } from "react-router-dom";
// import { SubtractWallet } from "../../../../backend/app/controllers/user-session.controller";

const CartPage = () => {
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(fetchLandingPage())
      }, [dispatch])
    
    useEffect(()=>{
        dispatch(fetchUserData());
    },[dispatch]);


    // const cart = useSelector((state)=>state.user.userData.cart)
    const [myCart, setMyCart] = useState([])
    // const [cartID, setCardID] = useState([])
    const dataGetter = useSelector((state) => state.data.landingPageData)
    const userData = useSelector((state)=> state.user.userData)
    const [wallet, setWallet] = useState([])

    useEffect(()=>{
        var idCart = userData.cart
        if(dataGetter!=null && idCart != null){
            idCart = idCart.slice(1,-1).split(',').map(str=>{return parseInt(str,10)})
            const cartData = dataGetter.filter((features) => idCart.includes(features.id))
            console.log(cartData)
            setMyCart(cartData);
        }
        else{
            setMyCart([])
        }
    }, [userData.cart])

    useEffect(()=>{
        setWallet(userData.wallet)
    }, [userData.wallet])

    const [price, setPrice] = useState({
        "Price": 0,
        "Discount Price": 0,
        "Total": 0,
    })



    useEffect(()=>{
        async function fetchData() {
            await dispatch(getOrders({ userId: userData.id }));
          }
          fetchData();
    },[dispatch, userData])


    const orders = useSelector(state => state.user.orders)

    useEffect(() =>{
        if(orders !==null && orders.lenght !== 0){
            orders.map((el) => {
                el.order_games.map((el)=>{
                    removeFromCart(el.gameId)
                })
        })
        }
        
    }, [orders, dataGetter, myCart])



    useEffect(()=>{
        let price = 0, discountedPrice = 0, total = 0;
        myCart.forEach(element => {
            price = Math.round((price + element.mainPrice)*100)/100
            discountedPrice = Math.round((discountedPrice - element.mainPrice*element.discountPercentage/100)*100)/100
        });
        total = Math.round((price + discountedPrice)*100)/100
        setPrice(prev => ({...prev,
            "Price": price,
            "Discount Price": discountedPrice,
            "Total": total
        }))
    },[myCart])

    const navigate = useNavigate()
    const handleCart = (e) =>{
        e.preventDefault()
        // dispatch(SubtractWallet(1000));
        navigate("/checkout")
    }

    return(
        <>
            <div className={styles.cart_page}>
                <div className={styles.cart_page__container}>
                    <div className={styles.cart_page__sub_navbar}>
                        <div className={styles.cart_page__title}>
                            <span>My Cart</span>
                        </div>
                        <div className={styles.cart_page__points}>
                            <div className={styles.cart_page__user_wallet}>
                                <div className={styles.cart_page__wallet__title}>
                                    <span>My Wallet</span>
                                </div>
                                <div className={styles.cart_page__wallet__point}>
                                    <span>&#8377;{wallet}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={styles.cart_game__content}>
                        <aside className={styles.cart_game__payment}>
                            <div className={styles.cart_game__payment__container}>
                                <div className={styles.cart_game__payment__wrapper}>
                                    <div className={styles.cart_game__payment__title}>
                                        <span>Games and Apps Summary</span>
                                    </div>

                                    <ul className={styles.cart_game__payment__summary}>
                                        {Object.keys(price).map((key, ind)=> {
                                            console.log(key)
                                            return (<li className={styles.cart_game__payment__summary__part}>
                                                {
                                                    key === "Total"?<div className={styles.cart_game__payment__total}>
                                                        <div className={styles.cart_game__payment__part__title}><span>{key}</span></div>
                                                        <div className={styles.cart_game__payment__part__value}><span>{price[key]<0?"-":""} &#8377; {Math.abs(price[key])}</span></div>
                                                    </div>:
                                                    <div className={styles.cart_game__payment__price}>
                                                        <div className={styles.cart_game__payment__part__title}><span>{key}</span></div>
                                                        <div className={styles.cart_game__payment__part__value}><span>{price[key]<0?"-":""} &#8377; {Math.abs(price[key])}</span></div>
                                                    </div>
                                                }
                                                
                                            </li>)
                                        })}
                                    </ul>

                                    <div className={styles.cart_game__payment__btns}>
                                        <div className={styles.cart_game__payment__btn}>
                                            {
                                                myCart.length===0?<button disabled className ={styles.cart_game__payment__checkout} onClick={handleCart}>
                                                <span>Checkout</span>
                                            </button>:<button className ={styles.cart_game__payment__checkout} onClick={handleCart}>
                                                <span>Checkout</span>
                                            </button>
                                            }
                                            
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </aside>    
                        <div className={styles.cart_game__wrapper}>
                            <CartWrapper data = {myCart}/>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CartPage