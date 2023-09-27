import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.min.css"; // Import the CSS file from your styles directory
import SwiperCore, { EffectCoverflow, Pagination, Autoplay } from "swiper";

SwiperCore.use([EffectCoverflow, Pagination, Autoplay]);
const images = ["./dragon.png", "./egyptian.jpeg", "./butterfly.jpeg"];
const ImageSwiper = () => {
  const params = {
    autoHeight: false,

    pagination: { clickable: true },
    preventInteractionOnTransition: true,
    grabCursor: true,
    centeredSlides: true,
    intialSlide: 1,
    slidesPerView: 1.5,
    loop: true,
    speed: 1000,
    simulateTouch: false,

    effect: "coverflow",
    coverflowEffect: {
      rotate: 0,
      depth: 200,
      slideShadows: false,
      modifier: 1,
    },

    pagination: {
      el: ".swiper-pagination",
      dynamicBullets: false,

      clickable: true,
    },
    autoplay: {
      delay: 2500,
      disableOnInteraction: false,
    },
    breakpoints: {
      768: {
        slidesPerView: 1.5,
        spaceBetween: 10,
        simulateTouch: true,
      },
    },
  };

  return (
    <Swiper {...params}>
      {images.map((image, index) => (
        <SwiperSlide key={index} swiper-container>
          <div className="swiper-slide">
            <img src={image} alt="" />
          </div>
        </SwiperSlide>
      ))}
      <div className="swiper-pagination"></div>
    </Swiper>
  );
};

export default ImageSwiper;
