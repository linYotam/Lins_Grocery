import { EastOutlined, WestOutlined } from '@mui/icons-material';
import React, { useState } from 'react';

const Slider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const images = [
    '/images/recipe_01.jpg',
    '/images/recipe_02.jpg',
    '/images/recipe_03.jpg',
    '/images/recipe_04.jpg',
  ];

  const prevSlide = () => {
    setCurrentSlide(currentSlide === 0 ? 2 : prev => prev - 1);
  };

  const nextSlide = () => {
    setCurrentSlide(currentSlide === 2 ? 0 : prev => prev + 1);
  };

  return (
    <div className="slider">
      <div className="slider__container" style={{ transform: `translateX(-${currentSlide * 100}rem)` }}>
        {/* <div
        className="container"
        style={{
          transform: `translateX(calc((100vw - 300%) / 2)) translateX(-${currentSlide * 100}%)`,
        }}> */}
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt="recipe"
            className={`image ${index === currentSlide ? '' : 'hidden'}`}
          />
        ))}
      </div>
      <div className="icons">
        <WestOutlined className="icon" onClick={prevSlide} />
        <EastOutlined className="icon" onClick={nextSlide} />
      </div>
    </div>
  );
};

export default Slider;
