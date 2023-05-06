import styles from "./MiniCard.module.css";
import PriceComponent from './../../priceComponent/PriceComponent';

const MiniCard = (props) => {
  const { banner, title, mainPrice, discountPercentage } = props;

  return (
    <>
      <div className={styles.main}>
        <div className={styles.image_div}>
          <img src={banner} alt="banner" />
        </div>

        <div className={styles.content}>
          <div className={styles.heading_div}>
            <p className={styles.heading}>{title}</p>
          </div>
          <div className={styles.price}>
            <PriceComponent mainPrice={mainPrice} discountPercentage={discountPercentage}/>
          </div>
        </div>
      </div>
    </>
  );
};

export default MiniCard;