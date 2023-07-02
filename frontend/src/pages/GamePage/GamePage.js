import React, {useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./GamePage.module.css";
import HoverRating from "../../components/gameComponent/rating.component";
// import { productImages } from "../../assets";
import { fetchGames } from "../../store/actions";
import { useState } from "react";
import ProductSlider from "../../components/swiperSliderComponent/productSlider.component";
import ListFeatures from "../../components/listFeaturesComponents/listFeatures.component";
import ShowMore from "../../components/showmoreComponent";
import PictureShowMore from "../../components/showmoreComponent/pictureShowMore/pictureShowMore";
import SpecificationTable from "../../components/specificationComponents/specificationComponents";
import Footer from "../../components/footer/Footer";
import PaymentComponent from "../../components/gameComponent/paymentComponent";
import { fetchLandingPage } from "../../store/slices/dataSlice";
import { fetchUserData } from "../../store/slices/rootSlice";

const GamePage = ({_id}) =>{
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(fetchLandingPage())
      }, [dispatch])

    const dataGetter = useSelector((state) => state.data.landingPageData);
    const [saleData, setSaleData] = useState([]);
    
    useEffect(()=>{
        dispatch(fetchGames());
    },[dispatch]);

    useEffect(() => {
        const filteredData = dataGetter.filter((infoFeature) => infoFeature.id.toString() === _id);
        setSaleData(filteredData);
      }, [dataGetter, _id]);

    if(saleData.length === 0 || saleData == null){
        return (
        <>
            <div></div>
        </>
        )
    }
    // Initialize value
    const sliderImage = saleData[0]?.heroImages
    const genres = saleData[0]?.genres
    const tags = saleData[0]?.tags
    const gameFeatures = saleData[0]?.gameFeatures
    const imagesShowMore = saleData[0]?.images
    const specifications = saleData[0]?.specifications
    return (
        <>
        <div className ={styles.container}>
            <div className={styles.about_game}>
                <div className={styles.nav_game}>
                    <div className={styles.nav_game__container}>
                        <h1>
                            <span className={styles.title}> {saleData.map((value, ind) => {return value.title})} </span>
                        </h1>
                        {/* Thay rating vào từ backend */}
                        <HoverRating rating={3}/>
                    </div>
                </div>

                <div className={styles.infomation_game}>
                    <div className={styles.infomation_game__description__col0}>
                        <div className={styles.slider__image}>
                            <ProductSlider data = {sliderImage}/>   
                        </div>

                        <div className={styles.description}>
                            <span className={styles.about_game__description}>{saleData.map((value, ind) => {return value.aboutGame})}</span>
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

                        <div className = {styles.showmore}>
                            <ShowMore data = {
                                <div>
                                    {gameFeatures.map((el, ind) =>
                                        {return <div className= {styles.showmore__content__text} key = {ind}>
                                            {el}
                                        </div>}
                                    )}

                                    <PictureShowMore data = {imagesShowMore}></PictureShowMore>
                                </div>}>
                            </ShowMore>
                        </div>
                    </div>
                    
                    <aside className={styles.infomation_game__description__col1}>
                        <div className={styles.payment}>
                            <PaymentComponent data = {saleData[0]}/>
                        </div>
                    </aside>
                </div>

                <div className={styles.wrapper}>
                    <div className={styles.infomation_game2}>
                        <div className={styles.infomation_game__description}>
                            <div className={styles.specifications}>
                                <div className={styles.title}>Specifications</div>
                                <div className={styles.specifications__table}>
                                    <SpecificationTable data = {specifications}></SpecificationTable>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>                            
            </div>
        </div>
        <Footer/>
    </>
        
    );
}

export default GamePage;