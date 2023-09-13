import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

const CarouselComponent = ({ items }) => {
  return (
    <Carousel >
      {items.map((item, index) => item.image?(
        <div key={index} className='d-flex flex-column  custom-container '>
          <div className='d-flex justify-content-end gap-2'>
          <h4 className="bg-dark text-light fs-3 px-2 py-1">{item.button1}</h4>
          <h4 className="bg-dark text-light fs-3 px-2 py-1">{item.button2}</h4>
          </div>
          <img className=' align-self-center carousel-image'  src={item.image} alt={`Slide ${index}`} />
          <h2 className=' align-self-start  fw-bold' >{item.heading}</h2>
          <span className='text-start mb-5 fs-5' >{item.text}</span>
        </div>
      ):(<div className='d-flex flex-column w-50  custom-margin'>
        <h1 className='fw-bold'>Download the app for more!</h1>
        <p className='fs-5'>We hand pick every tattoo artist to ensure your tattoo experience is handled with care,quality and inclusivity</p>
        <a href=""><img className='download-link-image' src='./Group 82237.png'/></a></div>))}
    </Carousel>
  );
};

export default CarouselComponent;