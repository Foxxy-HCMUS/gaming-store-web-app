import { Link } from "react-router-dom";
import TopCategorySlider from "../../TopCategorySlider";
import styles from "./MainCardContainer.styles.css";
import GameCard from "../../browseComponents/GameCard";

const MainCardContainer = ({data, title}) => {
    return (
        <>
            <TopCategorySlider text={title}/>
            <div className={styles.mainCardContainer}>
                <div className={styles.container}>
                    {data.map((val, i) => () => {
                        return( 
                            <div key={i} className={styles.card}>
                                <Link to={`/games/${val?._id}`}>
                                    <GameCard>
                                        image={val?.cardImage}
                                        title={val?.title}
                                        tagline={val?.cardTagline}
                                        price={val?.mainPrice}
                                        id={val?._id}
                                    </GameCard>
                                </Link>
                            </div>
                        );
                    })}
                </div>
            </div>
                
        </>
    );
};

export default MainCardContainer;