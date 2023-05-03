import styles from "./PriceComponent.module.css";

const PriceComponent = ({ mainPrice, discountPercentage}) => {
    // const discount = price.discount;
    // const mainPrice = price.mainPrice;
    const discountedPrice = Math.round(mainPrice - (mainPrice * discountPercentage) / 100, 2);

    return (
        <div className={styles.price}>
            {discountPercentage === 100 || mainPrice === 0 ? (
                <div className={styles.blue_button}>Free</div>
            ) : discountPercentage === 0 ? (
                <div className={styles.discounted_price}>&#8377; {mainPrice}</div>
            ) : (
                <>  
                    <div className={styles.blue_button}>-{discountPercentage}%</div>
                    <div className={styles.main_price}>&#8377; {mainPrice}</div>
                    <div className={styles.discounted_price}>&#8377; {discountedPrice}</div>
                </>
            )
            }
        </div>
    );
};

export default PriceComponent;