import { Link, useNavigate } from 'react-router-dom';
import { useRef, useEffect, useState } from 'react';
import axios from 'axios';

export default function Login({ setIsLogin, getUserInfo }) {
  const inputRef = useRef(null);
  const navigate = useNavigate();

  const [loginInfo, setLoginInfo] = useState({
    email: '',
    password: '',
  });
  const [errorMessage, setErrorMessage] = useState('');
  const handleInputValue = (key) => (e) => {
    setLoginInfo({ ...loginInfo, [key]: e.target.value });
  };
  const handleLogin = async (e) => {
    e.preventDefault();
    const { email, password } = loginInfo;
    if (!email || !password) {
      setErrorMessage('이메일과 비밀번호를 입력하세요');
    } else {
      try {
        await axios
          .post(
            `${process.env.REACT_APP_API_URL}/auth/login`,
            { email, password },
            { withCredentials: true },
          )
          .then((res) => {
            if (res.data.message === '잘못된 정보를 입력') {
              setErrorMessage(
                'ID가 존재하지 않거나 비밀번호가 일치하지 않습니다.',
              );
            } else {
              localStorage.setItem('Token', res.data.token);
              navigate('/');
            }
          });
      } catch (err) {
        console.log(err);
      }
    }
  };

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  // kakao에 인가코드 요청
  // 받은 인가코드를 KakaoLogin 컴포넌트에서 서버로 전달
  const kakaoLoginHandler = (e) => {
    e.preventDefault();
    window.location.assign(
      `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${process.env.REACT_APP_KAKAO_CLIENT_ID}/&redirect_uri=${process.env.REACT_APP_KAKAO_REDIRECT_URI}`,
    );
  };

  return (
    <section className="login">
      <div className="inner">
        <form className="login-content" onSubmit={handleLogin}>
          <Link to="/">
            <div className="logo-title">GANADA</div>
          </Link>
          <div className="sub-title">가장 나 다운 순간을 담다 </div>
          <div className="login-form">
            <input
              type="text"
              placeholder="이메일"
              ref={inputRef}
              onChange={handleInputValue('email')}
            />
            <input
              type="password"
              placeholder="비밀번호"
              onChange={handleInputValue('password')}
            />
            <div className="signup-warning">{errorMessage}</div>
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
              <button
                type="submit"
                className="login-btn kakao"
                onClick={kakaoLoginHandler}
              >
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
        </form>
      </div>
    </section>
  );
}
