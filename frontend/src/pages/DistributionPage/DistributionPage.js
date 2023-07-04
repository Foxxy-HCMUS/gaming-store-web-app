import styles from "./DistributionPage.module.css"
import React from "react";
import DistributionComponent from "../../components/distributionComponent";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const DistributionPage = () => {

    const isAuth = useSelector(state=>state.auth.isLoggedIn)
    const navigate = useNavigate()
    const handleOnClick =() =>{
        navigate("/register")
    }

    return (
        <>
        <div className={styles.container}>
            <div className={styles.wrapper}>
                <div className={styles.marketing}>
                    <div className={styles.marketing_panel__img}>
                        <img src="https://cdn2.unrealengine.com/epic-games-store-self-service-publishing-tools-4554ceb470ed.webp" alt=""></img>
                    </div>

                    <div className={styles.marketing_panel__content}>
                        <span className={styles.marketing_panel__content__text}>Now open to all developers and publishers</span>
                        <div className={styles.marketing_panel__btn}>
                            <button onClick={handleOnClick}><span>Sign Up Today</span></button>
                        </div>
                    </div>
                </div>
                <div className={styles.list__components}>
                    <div className={styles.component}>
                            <DistributionComponent 
                                    image = {"https://cdn2.unrealengine.com/direct-game-distribution-06596600236d.svg"}
                                    title = {"Reach a Global Audience"}
                                    content = {"Direct distribution to over 230 million Epic users across 187 countries with 16 languages supported."} 
                            />
                    </div>

                    <div className={styles.component}>
                            <DistributionComponent 
                                    image = {"https://cdn2.unrealengine.com/video-game-revenue-c74196d72f94.svg"}
                                    title = {"88%/12% Revenue Split"}
                                    content = {"Keep 88% of the revenue and monitor product performance with integrated analytics dashboards."} 
                            />
                    </div>

                    <div className={styles.component}>
                            <DistributionComponent 
                                    image = {"https://cdn2.unrealengine.com/player-engagement-69f0a2ba31cd.svg"}
                                    title = {"Drive Player Engagement"}
                                    content = {"Tap into store features like wishlists, achievements, store-wide promotions and more!"} 
                            />
                    </div>

                    <div className={styles.component}>
                            <DistributionComponent 
                                    image = {"https://cdn2.unrealengine.com/epic-games-payment-methods-18cc6135990f.svg"}
                                    title = {"Worldwide E-Commerce"}
                                    content = {"Epic's payment service supports 76 payment methods with 47 regional currencies and more on the way."} 
                            />
                    </div>

                    <div className={styles.component}>
                            <DistributionComponent 
                                    image = {"https://cdn2.unrealengine.com/epic-games-wallet-2af74bb47a7a.svg"}
                                    title = {"Epic Wallet"}
                                    content = {"Users can load up their Wallet with funds to spend on products and services in the store, now available in more than 140 countries."} 
                            />
                    </div>

                    <div className={styles.component}>
                            <DistributionComponent 
                                    image = {"https://cdn2.unrealengine.com/game-ratings-localization-and-affliate-network-benefits-a931a6cb27b8.svg"}
                                    title = {"Additional Benefits"}
                                    content = {"Easy IARC ratings in Epic Developer Portal, request no-cost localization for store pages and activate our Support-A-Creator affiliate network."} 
                            />
                    </div>
                </div>
            </div>
        </div>
            
        </>
    );
};

export default DistributionPage;