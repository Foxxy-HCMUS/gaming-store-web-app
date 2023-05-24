import { useState } from "react";
// import style from "./productSlider.component.css"
import {Navigation, Thumbs } from "swiper";
import {Swiper, SwiperSlide} from 'swiper/react';
import "./productSlider.component.scss"
const ProductSlider = props => {
    const [activeThumb, setActiveThumb] = useState(null);
    console.log(activeThumb)
    return <>
        <div className="product-images-slider-container">
            <div className="product-images-slider-wrapper">
                <Swiper
                    thumbs={{ swiper: activeThumb && !activeThumb.destroyed ? activeThumb : null }}
                    Loop = {true}
                    spaceBetween={10}
                    navigation = {true}
                    modules={[Navigation, Thumbs]}
                    grabCursor={true}
                    className = "product-images-slider"
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
                    slidesPerView={6}
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