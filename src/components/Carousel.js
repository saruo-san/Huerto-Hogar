import React, { useState, useEffect } from 'react';
import './Carousel.css';

const Carousel = ({ slides }) => {
  const [current, setCurrent] = useState(0);

  const goNext = () => {
    setCurrent((prev) => (prev + 1) % slides.length);
  };

  const goPrev = () => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  };

  useEffect(() => {
    const autoplay = setInterval(goNext, 5000);
    return () => clearInterval(autoplay);
  }, [slides.length, goNext]);

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowRight') goNext();
    if (e.key === 'ArrowLeft') goPrev();
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  const getSlideClass = (index) => {
    if (index === current) return 'slide active';
    const prev = (current - 1 + slides.length) % slides.length;
    const next = (current + 1) % slides.length;
    if (index === prev) return 'slide prev';
    if (index === next) return 'slide next';
    return 'slide';
  };

  return (
    <div className="carrusel">
      <button className="carrusel-btn prev" onClick={goPrev} aria-label="Anterior">&#10094;</button>
      {slides.map((slide, index) => (
        <div key={index} className={getSlideClass(index)}>
          {slide}
        </div>
      ))}
      <button className="carrusel-btn next" onClick={goNext} aria-label="Siguiente">&#10095;</button>
    </div>
  );
};

export default Carousel;
