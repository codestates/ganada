import { useRef, useState, useEffect } from 'react';
import { IoIosArrowDropright, IoIosArrowDropleft } from 'react-icons/io';

const images = [
  `${process.env.PUBLIC_URL}/img/jungleNuNu.jpg`,
  `${process.env.PUBLIC_URL}/img/jungleNuNu2.jpg`,
  `${process.env.PUBLIC_URL}/img/jungleNuNu3.jpg`,
];

function ImageSlider() {
  const TOTAL_SLIDES = images.length - 1;
  const [currentSlide, setCurrentSlide] = useState(0);
  const slideRef = useRef(null);
  const nextSlide = () => {
    if (currentSlide >= TOTAL_SLIDES) {
      // 더이상 넘어갈 수 없으면 슬라이드 초기화
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

  useEffect(() => {
    slideRef.current.style.transition = 'all 0.5s ease-in-out';
    slideRef.current.style.transform = `translateX(-${currentSlide}00%)`;
  }, [currentSlide]);

  return (
    <div className="slider">
      <button type="button" onClick={nextSlide}>
        <IoIosArrowDropright className="prevBtn" />
      </button>
      <button type="button" onClick={prevSlide}>
        <IoIosArrowDropleft className="nextBtn" />
      </button>
      <div className="sliderContainer" ref={slideRef}>
        <img src={images[0]} alt="nunu1" />
        <img src={images[1]} alt="nunu2" />
        <img src={images[2]} alt="nunu3" />
      </div>
    </div>
  );
}

export default ImageSlider;
