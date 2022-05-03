import { Link } from 'react-router-dom';
import { useRef, useEffect, useState } from 'react';
import axios from 'axios';

export default function Signup() {
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
    const { email, emailValidate, password, rePassword, name, phoneNumber } =
      value;
    if (
      email !== '' &&
      !/^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/.test(
        email,
      )
    ) {
      errors.email = '올바르지 않은 이메일 형식입니다.';
    }

    if (emailValidate !== '' && email !== emailValidate) {
      errors.emailValidate = '인증번호가 올바르지 않습니다.';
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

  // 포커스를 빠져나왔을 경우 유효성 검사!
  const focusBlur = (e) => {
    setErr(errCheck(inputValue));
  };

  // focus
  const inputRef = useRef(null);
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const signupHandling = async () => {
    const data = {
      email: inputValue.email,
      emailValidate: inputValue.emailValidate,
      password: inputValue.empasswordail,
      rePassword: inputValue.rePassword,
      name: inputValue.name,
      phoneNumber: inputValue.phoneNumber,
    };
    try {
      await axios.post(`http://localhost:4000/auth/signup`, data);
    } catch (error) {
      console.log(error);
    }
  };

  const emailValidRequest = () => {
    try {
      axios
        .post('http://localhost:4000/auth/mailVerification', {
          email: inputValue.email,
        })
        .then((res) => console.log('너 뭐하니????'));
    } catch (error) {
      console.log(error);
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
                  className="email-btn"
                  onClick={emailValidRequest}
                >
                  인증 받기
                </button>
              </div>
              <div className="signup-warning">{err.email} </div>
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
                className="signup-btn"
                onClick={signupHandling}
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
