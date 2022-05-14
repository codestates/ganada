import { Link, useNavigate } from 'react-router-dom';
import { useRef, useEffect, useState } from 'react';
import axios from 'axios';
// import Modal from '../components/Modal';

export default function Signup({ setModal }) {
  // input value change
  const [inputValue, setInputValue] = useState({
    email: '',
    emailValidate: '',
    password: '',
    rePassword: '',
    name: '',
    phoneNumber: '',
  });

  const [err, setErr] = useState({});
  const navigate = useNavigate();

  const handleInput = (e) => {
    const { name, value } = e.target;
    setInputValue({
      ...inputValue,
      [name]: value,
    });
  };

  // error test
  const errCheck = (value) => {
    const errors = {};
    const { email, password, rePassword, name, phoneNumber } = value;
    if (
      email !== '' &&
      !/^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/.test(
        email,
      )
    ) {
      errors.email = '올바르지 않은 이메일 형식입니다.';
    }

    if (
      password !== '' &&
      !/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@!%*#?&])[A-Za-z\d@!%*#?&]{8,}$/.test(
        password,
      )
    ) {
      errors.password =
        '비밀번호는 최소 8자 이상, 알파벳과 숫자 및 특수문자를 포함해야 합니다.';
    }

    if (rePassword !== '' && rePassword !== password) {
      errors.rePassword = '비밀번호가 일치하지 않습니다.';
    }

    if (name !== '' && !/^[\w\Wㄱ-ㅎㅏ-ㅣ가-힣]{2,20}$/.test(name)) {
      errors.name = '닉네임은 최소 2글자이상 특수문자 제외해서 입력해주세요.';
    }
    if (
      phoneNumber !== '' &&
      !/^(01[016789]{1}|02|0[3-9]{1}[0-9]{1})([0-9]{3,4})([0-9]{4})$/.test(
        phoneNumber,
      )
    ) {
      errors.phoneNumber = '전화번호가 옳바르지 않습니다.';
    }

    return errors;
  };

  // 포커스를 빠져나왔을 경우 유효성 검사
  const focusBlur = (e) => {
    const checkData = errCheck(inputValue);
    setErr(checkData);
  };

  // focus
  const inputRef = useRef(null);
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const handleSignup = async (e) => {
    e.preventDefault();
    if (Object.values(inputValue).includes('')) {
      setModal({
        open: true,
        title: '모든 항목은 필수 입니다.',
      });
    } else if (Object.keys(err).length !== 0) {
      setModal({
        open: true,
        title: '다시한번 확인해주세요',
      });
    } else {
      const data = {
        email: inputValue.email,
        password: inputValue.password,
        rePassword: inputValue.rePassword,
        name: inputValue.name,
        phoneNumber: inputValue.phoneNumber,
        emailValidate: inputValue.emailValidate,
      };
      try {
        await axios
          .post(`${process.env.REACT_APP_API_URL}auth/signup`, data, {
            withCredentials: true,
          })
          .then((res) => {
            if (res.data.message === '잘못된 정보입니다.') {
              setModal({
                open: true,
                title: '인증번호를 확인해주세요.',
              });
            } else {
              setModal({
                open: true,
                title: '회원가입이 완료 되었습니다!',
                callback: () => {
                  navigate('/login');
                },
              });
            }
          });
      } catch (error) {
        console.log(error);
      }
    }
  };

  const emailValidRequest = async () => {
    if (err.email === '올바르지 않은 이메일 형식입니다.') {
      console.log('돌아가');
    } else {
      try {
        await axios
          .post(`${process.env.REACT_APP_API_URL}auth/mailVerification`, {
            email: inputValue.email,
          })
          .then((res) => {
            if (res.data.message === '위 메일로 인증번호가 전송되었습니다.') {
              setModal({
                open: true,
                title: '인증 메일이 발송 되었습니다.',
              });
            } else {
              setErr({ ...err, email: res.data.message });
            }
          });
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <section className="signup">
      <div className="inner">
        <div className="signup-content">
          <Link to="/">
            <div className="logo-title">GANADA</div>
          </Link>
          <div className="sub-title">가장 나 다운 순간을 담다 </div>
          <div className="signup-form">
            <div className="signup-email">
              <div className="signup-title">이메일 </div>
              <div className="email-wrap">
                <input
                  className="email"
                  name="email"
                  ref={inputRef}
                  onChange={handleInput}
                  onBlur={focusBlur}
                />
                <button
                  type="submit"
                  formMethod="POST"
                  className={
                    inputValue.email === '' ? 'email-btn' : 'email-btn active'
                  }
                  onClick={emailValidRequest}
                >
                  인증 받기
                </button>
              </div>
              <div className="signup-warning">
                {err.email === '위 메일로 인증번호가 전송되었습니다.' ? null : (
                  <span>{err.email}</span>
                )}
              </div>
              <div className="signup-title"> 인증번호 </div>
              <input
                name="emailValidate"
                onChange={handleInput}
                onBlur={focusBlur}
              />
              <div className="signup-warning">{err.emailValidate}</div>
            </div>

            <div className="signup-password">
              <div className="signup-title">비밀번호 </div>
              <input
                name="password"
                onChange={handleInput}
                onBlur={focusBlur}
                type="password"
              />
              <div className="signup-warning">{err.password}</div>
              <div className="signup-title">비밀번호 확인 </div>
              <input
                name="rePassword"
                onChange={handleInput}
                onBlur={focusBlur}
                type="password"
              />
              <div className="signup-warning">{err.rePassword}</div>
            </div>

            <div className="signup-name">
              <div className="signup-title">닉네임 </div>
              <input name="name" onChange={handleInput} onBlur={focusBlur} />
              <div className="signup-warning">{err.name} </div>
            </div>

            <div className="signup-title"> 전화번호 </div>
            <input
              name="phoneNumber"
              onChange={handleInput}
              onBlur={focusBlur}
            />
            <div className="signup-warning">{err.phoneNumber}</div>

            <div className="btn-wrap">
              <button
                type="submit"
                className={
                  Object.values(inputValue).includes('')
                    ? 'signup-btn'
                    : 'signup-btn active'
                }
                onClick={handleSignup}
              >
                회원가입
              </button>
            </div>
            <div className="last-txt">
              이미 회원이신가요?
              <Link to="/login">
                <span className="login-signup">로그인하기</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
