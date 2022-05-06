import { useEffect, useState } from 'react';

export default function MainContents() {
  const [isTrue, setIsTrue] = useState(false);
  const [isTrue2, setIsTrue2] = useState(false);
  const handleScroll = () => {
    const position = window.pageYOffset;
    if (position >= 70) {
      setIsTrue(true);
    } else {
      setIsTrue(false);
    }

    if (position >= 800) {
      setIsTrue2(true);
    } else {
      setIsTrue2(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="main-contents">
      <div className="inner">
        <div className="title">오늘의 모델</div>
        <div
          className={isTrue ? 'main-box-wrraper active' : 'main-box-wrraper'}
        >
          <div className="box-wrraper">
            <div className="main-box">box1</div>
            <div className="main-box">box1</div>
            <div className="main-box">box1</div>
          </div>
          <div className="box-wrraper">
            <div className="main-box">box1</div>
            <div className="main-box">box1</div>
            <div className="main-box">box1</div>
          </div>
        </div>
        <div className="title">오늘의 작가</div>
        <div
          className={isTrue2 ? 'main-box-wrraper active' : 'main-box-wrraper'}
        >
          <div className="box-wrraper">
            <div className="main-box">box1</div>
            <div className="main-box">box1</div>
            <div className="main-box">box1</div>
          </div>
          <div className="box-wrraper">
            <div className="main-box">box1</div>
            <div className="main-box">box1</div>
            <div className="main-box">box1</div>
          </div>
        </div>
      </div>
    </div>
  );
}
