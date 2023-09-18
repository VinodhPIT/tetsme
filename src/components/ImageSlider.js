import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useState, useEffect } from "react";
import Image from "next/image";
const ImageSlider = () => {
  const [isMobileView, setIsMobileView] = useState(false);

  useEffect(() => {
    // Check the window width and set isMobileView accordingly
    const handleResize = () => {
      setIsMobileView(window.innerWidth <= 768); // Adjust the breakpoint as needed
    };

    // Initially check the width and add a resize event listener
    handleResize();
    window.addEventListener("resize", handleResize);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  let sliderSettings = {};
  if (isMobileView) {
    sliderSettings = {
      dots: false,
      infinite: true,
      speed: 200,
      slidesToShow: 2,
      slidesToScroll: 1,
    };
  }

  return (
    <div className="img_box_wrap slick_custom_slider">
      <Slider {...sliderSettings}>
        <div>
          <img
            src="/img-mobile-new-01.png"
            alt="Image 1"
            width={218}
            height={446}
            className="responsive-image"
          />
        </div>
        <div>
          <img
            src="/img-mobile-new-01.png"
            alt="Image 2"
            width={218}
            height={446}
            className="responsive-image"
          />
        </div>
        <div>
          <img
            src="/img-mobile-new-01.png"
            alt="Image 3"
            width={218}
            height={446}
            className="responsive-image"
          />
        </div>
      </Slider>
    </div>
  );
};

export default ImageSlider;
