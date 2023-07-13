import React from "react";
import styles from "./Card.module.css";

const Card = (props) => {

    return (
        <div className={styles.container}>
            <div className={styles.img_div}>
                <img src={props.cardImage} alt="banner" />
            </div>
        </div>
    );
};

export default Card;