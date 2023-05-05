import { Link } from "react-router-dom";
import SecondaryCard from "../SecondaryCard/SecondaryCard";
import styles from "./SecondaryCardContainer.module.css";

const SecondaryCardContainer = ({ data, title }) => {
    return (
        <>
            <div className={styles.container}>
                {data.map((val, i) => {
                    return (
                        <Link key={i} to={`/games/${val?.id}`} className={styles.link}>
                            <div className={styles.card}>
                                <SecondaryCard
                                    image={val?.thumbnails}
                                    title={val?.title}
                                    description={val?.description}
                                    mainPrice={val?.mainPrice}
                                    discountPercentage={val?.discountPercentage}
                                />
                            </div>
                        </Link>
                    );
                })}
            </div>
        </>
    );
};

export default SecondaryCardContainer;