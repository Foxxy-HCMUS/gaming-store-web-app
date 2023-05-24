import React, {useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import style from "./GamePage.module.css";
import HoverRating from "../../components/gameComponent/rating.component";
// import { productImages } from "../../assets";
import 'swiper/css'
import 'swiper/css/navigation'
import { fetchGames } from "../../store/actions";
import { useState } from "react";
import ProductSlider from "../../components/swiperSliderComponent/productSlider.component";
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

    const sliderImage = saleData[0]?.heroImages
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
        <div className ={style.container}>
            <div>
                <h1>
                    <span className={style.title}> {saleData.map((value, ind) => {return value.title})} </span>
                </h1>
                {/* Thay rating vào từ backend */}
                <HoverRating rating={3}/>
                {/* <checkSliderImage sliderImage = {sliderImage}/> */}
                {
                    checkSliderImage(sliderImage)
                }
            </div>
        </div>
        </>
        
    );
}

export default GamePage;