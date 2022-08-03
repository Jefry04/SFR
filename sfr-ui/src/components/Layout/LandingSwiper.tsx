/* eslint-disable import/no-unresolved */
/* eslint-disable react/jsx-boolean-value */
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import Image from 'next/image';
import { Navigation, Autoplay } from 'swiper';
import 'swiper/css/bundle';
import landing from '../../public/assets/landing1.png';
import landing2 from '../../public/assets/Landing2.jpeg';

const LandingSwiper = () => {
  return (
    <Swiper
      effect="fade"
      navigation={true}
      modules={[Navigation, Autoplay]}
      className="swiper"
      autoplay={{
        delay: 2500,
        disableOnInteraction: false,
      }}
    >
      <SwiperSlide className="swiper-slide">
        <Image src={landing} alt="canchas" />
      </SwiperSlide>
      <SwiperSlide className="swiper-slide">
        <Image src={landing2} alt="canchas" />
      </SwiperSlide>
    </Swiper>
  );
};

export default LandingSwiper;
