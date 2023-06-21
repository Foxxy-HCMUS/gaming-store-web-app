import { useState } from "react";
// import style from "./productSlider.component.css"
import {Autoplay, Navigation, Thumbs } from "swiper";
import {Swiper, SwiperSlide} from 'swiper/react';
import "./productSlider.component.scss"
import "swiper/css/autoplay";
import 'swiper/css'
import 'swiper/css/navigation'
const ProductSlider = props => {
    const [activeThumb, setActiveThumb] = useState(null);
    return <>
        <div className= "product-images-slider-container">
            <div className="product-images-slider-wrapper">
                <Swiper
                    thumbs={{ swiper: activeThumb && !activeThumb.destroyed ? activeThumb : null }}
                    Loop = {true}
                    spaceBetween={10}
                    navigation = {true}
                    modules={[Autoplay, Navigation, Thumbs]}
                    grabCursor={true}
                    className = "product-images-slider"
                    autoplay ={{
                        "delay": 3000,
                        "disableOnInteraction": false,
                    }}
                >
                    {
                        props.data.map((item, index) => (
                            <SwiperSlide key = {index}>
                                <img src={item} alt="Slider Images" />
                            </SwiperSlide>
                        ))
                    }
                </Swiper>
            </div>
            <div className="product-images-thumbs-wrapper">
                <Swiper
                    onSwiper={setActiveThumb}
                    Loop = {true}
                    spaceBetween={10}
                    slidesPerView={7}
                    modules={[Navigation, Thumbs]}
                    className = "product-images-thumb"
                >
                    {
                        props.data.map((item, index) => (
                            <SwiperSlide key = {index}>
                                <div className="product-images-thumb-wrapper">
                                    <img src={item} alt="Slider Images" />
                                </div>
                            </SwiperSlide>
                        ))
                    }
                </Swiper>
            </div>
        </div>
    </>
};

export default ProductSlider;