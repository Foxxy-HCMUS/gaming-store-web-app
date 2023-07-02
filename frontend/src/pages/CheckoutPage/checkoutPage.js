import React, { useEffect, useState } from "react"; 
import styles from "./checkoutPage.module.css";
import PaymentWay from "../../components/checkoutComponent/paymentWayComponent";
import { useDispatch, useSelector } from "react-redux";
import { fetchLandingPage } from "../../store/slices/dataSlice";
import { SubtractWallet, fetchUserData, makeOrder } from "../../store/slices/rootSlice";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faWallet } from "@fortawesome/free-solid-svg-icons";
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { useNavigate } from "react-router-dom";
import PriceComponent from "../../components/priceComponent/PriceComponent"

const CheckPage = () =>{

    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(fetchLandingPage())
        dispatch(fetchUserData())
    },[dispatch])

    const [isActive, SetIsActive] = useState(false)
    const [active, SetActive] = useState({})
    const [isEnough, SetIsEnough] = useState(false)
    const userData = useSelector(state => state.user.userData)
    const dataGetter = useSelector((state) => state.data.landingPageData)
    const [wallet, setWallet] = useState(userData.wallet)
    const [myCart, setMyCart] = useState([])
    const [total, setTotal] = useState(1000)

    useEffect(()=>{
        setWallet(userData.wallet)
        setMyCart(dataGetter.filter((features) => userData.cart.includes(features.id.toString())))
    }, [userData.wallet])
    
    useEffect(()=>{
        let price = 0, discountedPrice = 0
        if(myCart!=null){
            myCart.forEach(element => {
                price = Math.round((price + element.mainPrice)*100)/100
                discountedPrice = Math.round((discountedPrice - element.mainPrice*element.discountPercentage/100)*100)/100
            });
            const totally = Math.round((price + discountedPrice)*100)/100
            if (wallet < totally){
                SetActive({
                    border: "solid #da1b1b 2px"
                })
            }
            else{
                SetActive({
                    border: "solid #23934e 2px"
                })
            }
            setTotal(totally)
        }
    }, [wallet, myCart])

    console.log(total)
    const [value, setValue] = useState('');
    
    const handleChange = event => {
        const result = event.target.value.replace(/\D/g, '');
    
        setValue(result);
      };

    // const navigate = useNavigate()
    const HandleAddMoney = () =>{
        dispatch(SubtractWallet(wallet + Number(value)))
        window.location.reload()
    }

    const HandleCheckout = () =>{
        let order =[]
        myCart.forEach((el)=>{
            order.push({"id": Number(el.id)})
        })


        console.log(order)
        dispatch(makeOrder({'userId': Number(userData.id), 'games': order}))
        // window.location.reload()
    }

    return (
        <>
            <div className = {styles.checkout_page}>
                <div className={styles.checkout_page__container}>
                    <div className= {styles.checkout_page__wrapper}>
                        <aside className={styles.checkout_page__product}>
                            <div className={styles.product__container}>
                                <div className={styles.product__wrapper}>
                                    <div className={styles.product__title}><span>Your Payment</span></div>
                                    <div className={styles.product__list__items}>
                                        {
                                            myCart.map((el) => {return(
                                                <div className={styles.product__item}>
                                                    <div className={styles.product__item__title}>
                                                        <span>{el.title}</span>
                                                    </div>
                                                    <div className={styles.product__item__price}>
                                                        <PriceComponent mainPrice={el.mainPrice} discountPercentage={el.discountPercentage}/>
                                                    </div>
                                                </div>
                                            )})
                                        }
                                    </div>
                                    <div className={styles.product__total}>
                                            <div className={styles.product__total__title}>
                                                <span>Total</span>
                                            </div>
                                            <div className={styles.product__total__price}>
                                                <span>&#8377;</span>
                                                <span>{total}</span>
                                            </div>
                                        </div>
                                    <div className={styles.product__place_order}>
                                        <button className={styles.product__place_order__btn} onClick={HandleCheckout}>Place Order</button>
                                    </div>
                                </div>
                            </div>
                        </aside>
                        <div className={styles.checkout_page__payment_way}>
                            <div className={styles.payment__wrapper}>
                                <div className={styles.payment__navbar}>
                                    <div className={styles.payment__navbar__title}><span>Checkout</span></div>
                                    <div className={styles.payment__navbar__account_payment}><span>{userData.username}</span></div>
                                </div>
                                <div className={styles.payment__item}>
                                    <div className={styles.payment__item__container}>
                                        <div className={styles.payment__item__title}>
                                            <span>My Wallet</span>
                                        </div>
                                        <div className={styles.payemnt__item__wrapper} style={active}>
                                            <div className={styles.payment__item__icon}>
                                                <div className={styles.payment__item__icon__item}>
                                                    <FontAwesomeIcon icon={faWallet} />  
                                                </div>
                                            </div>
                                            <div className={styles.payment__item__name}>
                                                <span>My Wallet Have: </span>
                                            </div>
                                            <div className={styles.payment__item__wallet}>
                                                <span>&#8377;{wallet}</span>
                                            </div>
                                        </div>
                                    </div> 

                                    <div className={styles.payment__add__money}>
                                        <div className={styles.payment__item__title}>
                                            <span>Add Money To Wallet By Cart</span>
                                        </div>
                                        <div className={styles.payment__add__money__form}>
                                            <Typography variant="h6" gutterBottom>
                                                Payment method
                                            </Typography>
                                            <Grid container spacing={3}>
                                                <Grid item xs={12} md={6}>
                                                <TextField
                                                    required
                                                    id="cardName"
                                                    label="Name on card"
                                                    fullWidth
                                                    autoComplete="cc-name"
                                                    variant="standard"
                                                />
                                                </Grid>
                                                <Grid item xs={12} md={6}>
                                                <TextField
                                                    required
                                                    id="cardNumber"
                                                    label="Card number"
                                                    fullWidth
                                                    autoComplete="cc-number"
                                                    variant="standard"
                                                    value = {value}
                                                    onChange = {handleChange}
                                                />
                                                </Grid>
                                                <Grid item xs={12} md={6}>
                                                <TextField
                                                    required
                                                    id="expDate"
                                                    label="Expiry date"
                                                    fullWidth
                                                    autoComplete="cc-exp"
                                                    variant="standard"
                                                />
                                                </Grid>
                                                <Grid item xs={12} md={6}>
                                                <TextField
                                                    required
                                                    id="cvv"
                                                    label="CVV"
                                                    helperText="Last three digits on signature strip"
                                                    fullWidth
                                                    autoComplete="cc-csc"
                                                    variant="standard"
                                                />
                                                </Grid>
                                                <Grid item xs={12}>
                                                <FormControlLabel
                                                    control={<Checkbox color="secondary" name="saveCard" value="yes" />}
                                                    label="Remember credit card details for next time"
                                                />
                                                </Grid>
                                            </Grid>
                                        </div>
                                        <div className={styles.payment__add__moeny__submit}>
                                            <button className = {styles.payment__add__money__btn} onClick={HandleAddMoney}>Submit</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CheckPage;