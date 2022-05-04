import { useEffect, useState } from 'react';

export default function MainContents() {
  const [isTrue, setIsTrue] = useState(false);
  const handleScroll = () => {
    const position = window.pageYOffset;
    console.log(position);

    if (position >= 144) {
      setIsTrue(true);
    } else {
      setIsTrue(false);
    }
  };
  console.log(isTrue);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="main-contents">
      <div className="inner">
        <div className="title">오늘의 프로필</div>
        <div className="main-box-wrraper">
          <div className="box-wrraper" isReady={isTrue}>
            <div className="main-box">box1</div>
            <div className="main-box">box1</div>
            <div className="main-box">box1</div>
          </div>
          <div className="box-wrraper" isReady={isTrue}>
            <div className="main-box">box1</div>
            <div className="main-box">box1</div>
            <div className="main-box">box1</div>
          </div>
          <div className="box-wrraper" isReady={isTrue}>
            <div className="main-box">box1</div>
            <div className="main-box">box1</div>
            <div className="main-box">box1</div>
          </div>
        </div>
      </div>
    </div>
  );
}
