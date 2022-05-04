import { Link } from 'react-router-dom';

export default function MainBanner() {
  return (
    <div className="main-banner">
      <div className="inner">
        <ul className="model-banner">
          <li className="banner-title"> 모델은 저절로 찾아오지 않아</li>
          <li className="banner-sub">
            모델 찾기 어려우신거 압니다. <br /> 당신 주변에 있는 매력적인
            모델분을 소개합니다.
          </li>
          <Link to="/search?type=model">
            <button type="button" className="banner-btn">
              내 주변 모델 둘러보기
            </button>
          </Link>
        </ul>
        <ul className="photographer-banner">
          <li className="banner-title">사진작가는 저절로 찾아오지 않아</li>
          <li className="banner-sub">
            특별한 순간을 담아보세요. <br /> 당신 주변에 있는 작가님을
            소개합니다.
          </li>
          <Link to="/search?type=photographer">
            <button type="button" className="banner-btn">
              내 주변 사진작가 둘러보기
            </button>
          </Link>
        </ul>
      </div>
    </div>
  );
}
