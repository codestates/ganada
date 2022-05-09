import { Link } from 'react-router-dom';
import { useRef, useEffect } from 'react';
import axios from 'axios';

export default function Login() {
  const inputRef = useRef(null);
  useEffect(() => {
    if (inputRef.current !== null) inputRef.current.focus();
  });

  return (
    <section className="login">
      <div className="inner">
        <div className="login-content">
          <Link to="/">
            <div className="logo-title">GANADA</div>
          </Link>
          <div className="sub-title">가장 나 다운 순간을 담다 </div>
          <div className="login-form">
            <input type="text" placeholder="이메일" ref={inputRef} />
            <input type="text" placeholder="비밀번호" />
            <div className="btn-wrap">
              <button type="submit" className="login-btn">
                로그인
              </button>
            </div>
            <div className="auth-btn-wrap">
              <button type="submit" className="login-btn naver">
                <img src="img/naverlogo.png" className="logo" alt="logo" />
                <span>네이버 로그인</span>
              </button>
              <button type="submit" className="login-btn kakao">
                <img
                  src="img/kakaologo.png"
                  className="logo kakao"
                  alt="logo"
                />
                <span>카카오 로그인</span>
              </button>
              <button type="submit" className="login-btn google">
                <img
                  src="img/googlelogo.png"
                  className="logo google"
                  alt="logo"
                />
                <span>Google 로그인</span>
              </button>
            </div>
            <div className="last-txt">
              가나다가 처음이신가요?
              <Link to="/signup">
                <span className="login-signup">회원가입하기</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
