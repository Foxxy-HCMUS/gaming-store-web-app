import { Link } from "react-router-dom";
import SecondaryCard from "../SecondaryCard/SecondaryCard";
import styles from "./SecondaryCardContainer.styles.css";

const SecondaryCardContainer = ({ data, title }) => {
    return (
        <>
            <div className={styles.container}>
                {data.map((val, i) => {
                    return (
                        <Link key={i} to={`/games/${val?._id}`}>
                            <div className={styles.card}>
                                <SecondaryCard>
                                    image={val?.thumbnail}
                                    title={val?.title}
                                    description={val?.description}
                                    price={val?.mainPrice}
                                </SecondaryCard>
                            </div>
                        </Link>
                    );
                })}
            </div>
        </>
    );
};

export default SecondaryCardContainer;