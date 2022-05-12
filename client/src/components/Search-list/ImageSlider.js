import { useRef, useState, useEffect } from 'react';
import { IoIosArrowDropright, IoIosArrowDropleft } from 'react-icons/io';

function ImageSlider({ image }) {
  let parsedImages = null;
  if (image) {
    parsedImages = image.split(',');
  }

  const TOTAL_SLIDES = parsedImages.length - 1;
  const [currentSlide, setCurrentSlide] = useState(0);
  const slideRef = useRef(null);
  const imagesPath = `http://localhost:4000/images/`;

  const nextSlide = (e) => {
    e.stopPropagation();
    if (currentSlide >= TOTAL_SLIDES) {
      // 더이상 넘어갈 수 없으면 슬라이드 초기화
      setCurrentSlide(0);
    } else {
      setCurrentSlide(currentSlide + 1);
    }
  };
  const prevSlide = (e) => {
    e.stopPropagation();
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
        <img src={imagesPath + parsedImages[0]} alt="profile-img" />;
        <img src={imagesPath + parsedImages[1]} alt="profile-img" />;
        <img src={imagesPath + parsedImages[2]} alt="profile-img" />;
      </div>
    </div>
  );
}

export default ImageSlider;
