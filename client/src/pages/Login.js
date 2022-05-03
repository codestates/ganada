import { Link, useNavigate } from 'react-router-dom';
import { useRef, useEffect, useState } from 'react';
import axios from 'axios';

export default function Login({ setAccessToken, setIsLogin }) {
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
            `http://localhost:4000/auth/login`,
            { email, password },
            { withCredentials: true },
          )
          .then((res) => {
            if (res.data.message === '잘못된 정보를 입력') {
              setErrorMessage(
                'ID가 존재하지 않거나 비밀번호가 일치하지 않습니다 다시 시도해주세요',
              );
            } else {
              localStorage.setItem('Token', res.data.token);
              setAccessToken(res.data.token);
              setIsLogin(res.data);
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
            {errorMessage}
            <input
              type="password"
              placeholder="비밀번호"
              onChange={handleInputValue('password')}
            />
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
        </form>
      </div>
    </section>
  );
}
