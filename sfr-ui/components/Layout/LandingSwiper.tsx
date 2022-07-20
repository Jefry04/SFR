/* eslint-disable import/no-unresolved */
/* eslint-disable react/jsx-boolean-value */
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper';
import 'swiper/css/bundle';
import landing from '../../public/assets/landing1.png';

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
        <img
          src="https://static.wixstatic.com/media/1243160fd9104a18bbd0b5f208a8cefe.jpg/v1/fill/w_2832,h_755,al_b,q_90,enc_auto/1243160fd9104a18bbd0b5f208a8cefe.jpg"
          alt="canchas"
        />
      </SwiperSlide>
      <SwiperSlide className="swiper-slide">
        {' '}
        <img
          src="https://images.pexels.com/photos/46798/the-ball-stadion-football-the-pitch-46798.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          alt="canchas"
        />
      </SwiperSlide>
    </Swiper>
  );
};

export default LandingSwiper;
