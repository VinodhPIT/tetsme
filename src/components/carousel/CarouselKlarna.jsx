import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

const CarouselKlarna = ({ items}) => {
  return (
    <Carousel  preventMovementUntilSwipeScrollTolerance={true}
    swipeScrollTolerance={50} >
      {items.map((item, index) => item.image?(
        <div key={index} className='custom_carousel_slider'>
          <div className='custom_option_block'>
            <span className="custom_option_item">{item.option1}</span>
          </div>
          <div className='custom_carousel_slider_item'>          
            <img className='align-self-center w_auto hidden'  src={item.image} alt={`Slide ${index}`} />
            <h2 className='title_pay_later'>{item.heading}</h2>
          </div>
          <p>{item.text}</p>
        </div>
      ):(<div className='download_app' key={index}>
        <h1 className='download_app_title'>Download the app for more!</h1>
        <p>We hand pick every tattoo artist to ensure your tattoo experience is handled with care,quality and inclusivity</p>
        <span className='download_app_img'><a href="" className='list_inline_item'><img src="./app-store.svg" alt="" className='w_auto'/></a> <a href="" className='list_inline_item'><img src="./g-play.svg" alt="" className='w_auto' /></a></span></div>))}
    </Carousel>
  );
};

export default CarouselKlarna;