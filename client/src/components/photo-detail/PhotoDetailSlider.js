/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useRef, useState, useEffect } from 'react';
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

function PhotoDetailSlider() {
  const images = ['/img/1.png', '/img/2.png', '/img/3.png'];
  const navigate = useNavigate();
  const TOTAL_SLIDES = images.length - 1;
  const slideRef = useRef(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    if (currentSlide >= TOTAL_SLIDES) {
      setCurrentSlide(0);
    } else {
      setCurrentSlide(currentSlide + 1);
    }
  };
  const prevSlide = () => {
    if (currentSlide === 0) {
      setCurrentSlide(TOTAL_SLIDES);
    } else {
      setCurrentSlide(currentSlide - 1);
    }
  };

  const moveDot = (index) => {
    setCurrentSlide(index);
  };

  const showAllImage = () => {
    navigate('/photodetailImage');
  };

  useEffect(() => {
    slideRef.current.style.transition = 'all 0.5s ease-in-out';
    slideRef.current.style.transform = `translateX(-${currentSlide}00%)`;
  }, [currentSlide]);

  return (
    <>
      <div className="left-slide-btn-container">
        <button type="button" className="left-slide-btn" onClick={prevSlide}>
          <MdKeyboardArrowLeft className="prevBtn" />
        </button>
      </div>
      <div
        className="slider-img-container"
        onClick={showAllImage}
        role="button"
        aria-label="button"
      >
        <div className="slider-img" ref={slideRef}>
          <img src={images[0]} alt="nunu1" />
          <img src={images[1]} alt="nunu2" />
          <img src={images[2]} alt="nunu3" />
        </div>
        <div className="dots-container">
          {Array.from({ length: 3 }).map((item, index) => (
            <button
              type="button"
              aria-label="dot"
              onClick={() => moveDot(index)}
              className={currentSlide === index ? 'dot active' : 'dot'}
            />
          ))}
        </div>
      </div>
      <div className="right-slide-btn-container">
        <button type="button" className="right-slide-btn" onClick={nextSlide}>
          <MdKeyboardArrowRight className="nextBtn" />
        </button>
      </div>
    </>
  );
}

export default PhotoDetailSlider;
