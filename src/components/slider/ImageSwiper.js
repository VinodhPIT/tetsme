import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Autoplay } from "swiper";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import { EffectCoverflow, Navigation, Pagination } from "swiper";
SwiperCore.use([Autoplay]);

const ImageSwiper = ({imgWidth,imgHeight}) => {

  return (
    <Swiper
      style={{
        "--swiper-pagination-bullet-horizontal-gap": "6px",
      }}
      loop={true}
      loopFillGroupWithBlank={true}
      pagination={{ clickable: true }}
      spaceBetween={110}
      centeredSlides={true}
      navigation={true}
      slidesPerView={"auto"}
      modules={[EffectCoverflow, Pagination, Navigation]}
      className="mySwiper"
      effect={"coverflow"}
      coverflowEffect={{
        rotate: 0,
        stretch: 80,
        depth: 150,
        modifier: 1,
        slideShadows: false,
      }}
      breakpoints={{
        // Define breakpoints for different screen sizes
        320: {
          slidesPerView: 1,
          spaceBetween: 10, // Adjust spacing for smaller screens
        },
        640: {
          slidesPerView: 2,
          spaceBetween: 20, // Adjust spacing for medium screens
        },
        1024: {
          slidesPerView: 2,
          spaceBetween: 30, // Adjust spacing for larger screens
        },
      }}
    >
      <SwiperSlide >
        <div className="testimonials-profile-circle" >
          <img
            style={{
              height: imgHeight,
              width: imgWidth,
              borderRadius: "20px",
              paddingTop: "60px",
            }}
            src="./dragon.png"
            alt=""
          />
        </div>
      </SwiperSlide>
      <SwiperSlide >
        <div className="testimonials-profile-circle" >
          <img
            style={{
              height: imgHeight,
              width: imgWidth,
              borderRadius: "20px",
              paddingTop: "70px",
            }}
            src="./egyptian.jpeg"
            alt=""
          />
        </div>
      </SwiperSlide>
      <SwiperSlide >
        <div className="testimonials-profile-circle" >
          <img
            style={{
              height: imgHeight,
              width: imgWidth,
              borderRadius: "20px",
              paddingTop: "70px",
            }}
            src="./butterfly.jpeg"
            alt=""
          />
        </div>
      </SwiperSlide>
    </Swiper>
  );
};
export default ImageSwiper;
