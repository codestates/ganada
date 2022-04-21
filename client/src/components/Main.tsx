import { useState, useEffect, useRef } from 'react';

export default function Main() {
  const images = [
    `${process.env.PUBLIC_URL}/img/1.png`,
    `${process.env.PUBLIC_URL}/img/2.png`,
    `${process.env.PUBLIC_URL}/img/3.png`,
  ];

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

  useEffect(() => {
    setInterval(() => {
      nextSlide();
    }, 4000);
    slideRef.current.style.transition = 'all 0.5s ease-in-out';
    slideRef.current.style.transform = `translateX(-${currentSlide}00vw)`;
  }, [currentSlide]);

  return (
    <section className="mainThumb">
      <div className="mainThumbnail">
        <div className="slider">
          <div className="sliderContainer" ref={slideRef}>
            <div className="slider">
              <img src={images[0]} alt="slide1" />
              <div className="slider-left-txt">
                가 <br />
                <br />다
              </div>
              <div className="slider-middle-txt">나</div>
              <div className="slider-right-txt">
                장 <br />
                <br />운
              </div>
              <div className="slider-right-re-txt">
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;순간을 담다
              </div>
            </div>
            <div className="slider">
              <img src={images[1]} alt="slide2" />
              <div className="slider-left-txt">
                가 <br />
                <br />다
              </div>
              <div className="slider-middle-two-txt">&nbsp;&nbsp;아름</div>
              <div className="slider-right-txt">
                장 <br />
                <br />운
              </div>
              <div className="slider-right-re-txt">
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;순간을 담다
              </div>
            </div>
            <div className="slider">
              <img src={images[2]} alt="slide2" />
              <div className="slider-left-txt">
                가 <br />
                <br />다
              </div>
              <div className="slider-middle-two-txt">&nbsp;&nbsp;우리</div>
              <div className="slider-right-txt">
                장 <br />
                <br />운
              </div>
              <div className="slider-right-re-txt">
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;순간을 담다
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
