import { Link } from "react-router-dom";
import TopCategorySlider from "../../topCategorySlider";
import styles from "./MainCardContainer.module.css";
import GameCard from "../../browseComponents/GameCard/GameCard";
// import MenuItem from '@mui/material/MenuItem';

const MainCardContainer = ({data, title}) => {
    return (
        <>
            <TopCategorySlider text={title}/>
            <div className={styles.mainCardContainer}>
                <div className={styles.container}>
                    {data.map((val, i) => {
                        return( 
                            <div key={i} className={styles.card}>
                                <Link to={`/games/${val?.id}`} style={{"pointerEvents": "visiblePainted"}}>
                                    <GameCard 
                                        image={val?.cardImage}
                                        title={val?.title}
                                        tagline={val?.cardTagline}
                                        mainPrice={val?.mainPrice}
                                        discountPercentage={val?.discountPercentage}
                                        id={val?.id}
                                    />
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