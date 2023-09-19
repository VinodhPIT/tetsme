import React from "react";
import { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import Image from "next/image";

const ImageSlider = ({imgPath,imgAlt,imgblurDataURL,imgWidth,imgHeight}) => {
  const [isMobileView, setIsMobileView] = useState(false);
console.log(imgPath,imgAlt,imgblurDataURL,imgWidth,imgHeight)
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
      slidesToShow: 1.5,
      slidesToScroll: 1.5,
    };
  }

  return (
    <div className="img_box_wrap slick_custom_slider">
      <Slider {...sliderSettings}>
        <div>
        <Image
            priority={true}
            src={imgPath}
            width={imgWidth}
            height={imgHeight}
            alt={imgAlt}
            placeholder="empty"
            className="responsive-image"
          />
        </div>
        <div>
        <Image
            priority={true}
            src={imgPath}
            width={imgWidth}
            height={imgHeight}
            alt={imgAlt}
            placeholder="empty"
            className="responsive-image"
          />
        </div>
        <div>
          <Image
            priority={true}
            src={imgPath}
            width={imgWidth}
            height={imgHeight}
            alt={imgAlt}
            placeholder="empty"
            className="responsive-image"
          />
        </div>
      </Slider>
    </div>
  );
};

export default ImageSlider;
