import React, {useRef} from 'react';
import {Swiper, SwiperSlide} from "swiper/react/swiper-react.js";

import cn from 'classnames';
import classes from './citySlider.scss';
// import "swiper/swiper-bundle.min.css";
import "swiper/swiper.min.css";

const CitySlider = () => {

    return (
        <div className="city-tags">
            <Swiper className="city-tags__slider"
                    spaceBetween={8}
                    slidesPerView={"auto"}
                    freeMode={true}
                    /*breakpoints={{
                        1260: {
                            slidesPerView: 7.5,
                        },
                        992: {
                            slidesPerView: 6.5,
                        },
                        768: {
                            slidesPerView: 4.5,
                        },
                        320: {
                            slidesPerView: 2.3
                        }
                    }}*/>
                <div className="city-tags__wrapper">
                    <SwiperSlide className='city-tags__item tag'>Иваново</SwiperSlide>
                    <SwiperSlide className='city-tags__item tag'>Владимир</SwiperSlide>
                    <SwiperSlide className='city-tags__item tag'>Ярославль</SwiperSlide>
                    <SwiperSlide className='city-tags__item tag'>Кострома</SwiperSlide>
                    <SwiperSlide className='city-tags__item tag'>Москва</SwiperSlide>
                    <SwiperSlide className='city-tags__item tag'>Ковров</SwiperSlide>
                    <SwiperSlide className='city-tags__item tag'>Шуя</SwiperSlide>
                    <SwiperSlide className='city-tags__item tag'>Рыбинск</SwiperSlide>
                </div>
            </Swiper>
        </div>
    );
};

export default CitySlider;