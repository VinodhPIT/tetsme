import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.min.css"; // Import the CSS file from your styles directory
import SwiperCore, {
  EffectCoverflow,
  Pagination,
  Keyboard,
  Mousewheel,
} from "swiper";

SwiperCore.use([EffectCoverflow, Pagination, Keyboard, Mousewheel]);
const images = ["./dragon.png", "./egyptian.jpeg", "./butterfly.jpeg"];
const ImageSwiper = () => {
  const params = {
    autoHeight: false,
    
    pagination: { clickable: true },
    grabCursor: true,
    centeredSlides: true,
    intialSlide: 1,
    slidesPerView: 1.5,
    loop: true,
    spaceBetween: 10,
    effect: "coverflow",
    coverflowEffect: {
      rotate: 0,
      depth: 200,
      slideShadows: false,
      modifier:1
    },

    pagination: {
      el: ".swiper-pagination",
      dynamicBullets: true,
      
      clickable: true,
    },
    autoplay: { delay: 5000 },

    breakpoints: {
      320: {
        slidesPerView: 1.5,
        spaceBetween: 10,
      },
      414: {
        slidesPerView: 1.5,
        spaceBetween: 10,
      },
      560: {
        slidesPerView: 1.5,
        spaceBetween: 10,
      },
      768: {
        slidesPerView: 1.5,
        spaceBetween: 20,
      },
      820: {
        slidesPerView: 1.5,
        spaceBetween: 10,
      },
      1024: {
        slidesPerView: 1.5,
        spaceBetween: 10,
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
