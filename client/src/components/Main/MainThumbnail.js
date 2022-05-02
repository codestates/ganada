import { useState, useEffect, useRef } from 'react';
import { GiPlainCircle } from 'react-icons/gi';
import useInterval from 'use-interval';

export default function MainThumbnail() {
  const images = [`img/1.png`, `img/2.png`, `img/3.png`];

  const TotalSlide = images.length - 1;
  const [currentSlide, setCurrentSlide] = useState(0);
  const slideRef = useRef(null);
  const nextSlide = () => {
    if (currentSlide >= TotalSlide) {
      setCurrentSlide(0);
    } else {
      setCurrentSlide(currentSlide + 1);
    }
  };

  useInterval(() => {
    nextSlide();
  }, 5000000000000000000);

  const left = () => {
    setCurrentSlide(0);
    slideRef.current.style.transform = `translateX(0vw)`;
    slideRef.current.style.transition = 'all 0.5s ease-in-out';
  };
  const middle = () => {
    setCurrentSlide(1);
    slideRef.current.style.transform = `translateX(-100vw)`;
    slideRef.current.style.transition = 'all 0.5s ease-in-out';
  };
  const right = () => {
    setCurrentSlide(2);
    slideRef.current.style.transform = `translateX(-200vw)`;
    slideRef.current.style.transition = 'all 0.5s ease-in-out';
  };

  useEffect(() => {
    slideRef.current.style.transition = 'all 0.5s ease-in-out';
    slideRef.current.style.transform = `translateX(-${currentSlide}00vw)`;
  }, [currentSlide]);

  return (
    <section className="mainThumb">
      <div className="mainThumbnail">
        <div className="main-slide">
          <GiPlainCircle
            className={
              currentSlide === 0 ? 'main-slide-btn active' : 'main-slide-btn '
            }
            onClick={left}
          />
          <GiPlainCircle
            className={
              currentSlide === 1 ? 'main-slide-btn active' : 'main-slide-btn'
            }
            onClick={middle}
          />
          <GiPlainCircle
            className={
              currentSlide === 2 ? 'main-slide-btn active' : 'main-slide-btn'
            }
            onClick={right}
          />
        </div>
        <div className="slider-contain">
          <div className="sliderContainer" ref={slideRef}>
            <div className="slider">
              <img src={images[0]} alt="slide1" />
              <div className="slider-txt">
                <div className="slider-left-txt">
                  가 <br />
                  <br />다
                </div>
                <div className="slider-middle-txt">나</div>
                <div className="slider-right-txt">
                  장 <br />
                  <br />운
                </div>
                <div className="slider-right-re-txt">순간을 담다</div>
              </div>
            </div>
            <div className="slider">
              <img src={images[1]} alt="slide2" />
              <div className="slider-txt">
                <div className="slider-left-txt">
                  가 <br />
                  <br />다
                </div>
                <div className="slider-middle-two-txt">&nbsp;&nbsp;아름</div>
                <div className="slider-right-txt">
                  장 <br />
                  <br />운
                </div>
                <div className="slider-right-re-txt">순간을 담다</div>
              </div>
            </div>
            <div className="slider">
              <img src={images[2]} alt="slide2" />
              <div className="slider-txt">
                <div className="slider-left-txt">
                  가 <br />
                  <br />다
                </div>
                <div className="slider-middle-two-txt">&nbsp;&nbsp;우리</div>
                <div className="slider-right-txt">
                  장 <br />
                  <br />운
                </div>
                <div className="slider-right-re-txt">순간을 담다</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
