import PriceComponent from "../../priceComponent/PriceComponent";
import styles from "./SecondaryCard.module.css";

const SecondaryCard = (props) => {
    // const { image, title, description, mainPrice, discountPercentage } = props;
    return (
        <>
            <div className={styles.card}>
                <div className={styles.image_div}>
                    <img className={styles.banner} src={props.image} alt="cardImage" />
                </div>
                <div className={styles.content}>
                    <p className={styles.title}>{props.title} Available Now.</p>
                    <div className={styles.description_cont}>
                        <p className={styles.description}>{props.description}</p>
                    </div>
                    <div className={styles.price}>
                        <PriceComponent 
                        mainPrice={props.mainPrice} 
                        discountPercentage={props.discountPercentage} />
                    </div>
                </div>
            </div>
        </>
    );
};

export default SecondaryCard;