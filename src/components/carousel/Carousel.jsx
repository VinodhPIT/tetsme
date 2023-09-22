import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

const CarouselComponent = ({ items,itemStyle }) => {
  return (
    <Carousel
    preventMovementUntilSwipeScrollTolerance={true}
    swipeScrollTolerance={50}
  >
      {items.map((item, index) => item.image?(
        <div key={index} className='custom_carousel_slider custom_type_one'>
          <div className={itemStyle}>          
            <div className="keywords_wrap">
              <ul className="keywords_list">
                <li>{item.button1}</li>
                <li>{item.button2}</li>
              </ul>
            </div>
          </div>
          <div className='custom_carousel_slider_item'>
            <img className='align-self-center carousel-image'  src={item.image} alt={`Slide ${index}`} />
            <h4>{item.heading}</h4>
            <p>{item.text}</p>
          </div>     
        </div>
      ):(<div className='download_app' key={index}>
        <h1 className='download_app_title'>Download the app for more!</h1>
        <p>We hand pick every tattoo artist to ensure your tattoo experience is handled with care,quality and inclusivity</p>
        <span className='download_app_img'><a href="" className='list_inline_item'><img src="./app-store.svg" alt="" className='w_auto'/></a> <a href="" className='list_inline_item'><img src="./g-play.svg" alt="" className='w_auto' /></a></span></div>))}
    </Carousel>
  );
};

export default CarouselComponent;