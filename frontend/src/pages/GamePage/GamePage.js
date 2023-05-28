import React, {useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./GamePage.module.css";
import HoverRating from "../../components/gameComponent/rating.component";
// import { productImages } from "../../assets";
import { fetchGames } from "../../store/actions";
import { useState } from "react";
import ProductSlider from "../../components/swiperSliderComponent/productSlider.component";
import ListFeatures from "../../components/listFeaturesComponents/listFeatures.component";
const GamePage = ({_id}) =>{
    const dispatch = useDispatch();
    const dataGetter = useSelector((state) => state.data.landingPageData);
    const [saleData, setSaleData] = useState([]);
    
    useEffect(()=>{
        dispatch(fetchGames());
    },[dispatch]);

    useEffect(() => {
        const filteredData = dataGetter.filter((infoFeature) => infoFeature.id.toString() === _id);
        setSaleData(filteredData);
      }, [dataGetter, _id]);

    // Initialize value
    const sliderImage = saleData[0]?.heroImages
    const genres = saleData[0]?.genres
    // const tags = saleData.map((value) => {return value.tags})
    const tags = saleData[0]?.tags
    // Image Slider Handle
    function checkSliderImage(sliderImage){
        if(sliderImage!=null){
            return (<ProductSlider data = {sliderImage}/>);
        }
        else{
            return (
                <div>No Ordered Game</div>
            )
        }
    }

    return (
        <>
        <div className ={styles.container}>
            <div className={styles.about_game}>
                <div className={styles.infomation_game}>
                    <div className={styles.infomation_game__container}>
                        <h1>
                            <span className={styles.title}> {saleData.map((value, ind) => {return value.title})} </span>
                        </h1>

                        {/* Thay rating vào từ backend */}
                        <HoverRating rating={3}/>

                        {checkSliderImage(sliderImage)}

                        <div className= {styles.about_game__container}>
                            <span className={styles.about_game__description}>{saleData.map((value, ind) => {return value.aboutGame})}</span>
                        </div>
                    </div>
                </div>
                
                <div className={styles.type_game}>
                    <div className={styles.type_game__container}>
                        <div className = {styles.type_game__title}>Genres</div>
                        <div className = {styles.type_game__list_feature}>
                            <ListFeatures data= {genres}/>
                        </div>
                    </div>
                    <div className={styles.type_game__container}>
                        <div className = {styles.type_game__title}>Features</div>
                        <div className = {styles.type_game__list_feature}>
                            <ListFeatures data = {tags}/>
                        </div>
                    </div>
                </div>
            </div>
            
        </div>
        </>
        
    );
}

export default GamePage;