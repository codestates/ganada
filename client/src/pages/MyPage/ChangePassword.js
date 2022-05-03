import { useState } from 'react';

export default function ChangePassword() {
  const [inputPassword, setinputPassword] = useState({
    currentPassword: '',
    password: '',
    rePassword: '',
  });
  const [err, setErr] = useState({});

  const handleInput = (e) => {
    const { name, value } = e.target;
    setinputPassword({
      ...inputPassword,
      [name]: value,
    });
  };

  // error test
  const errCheck = (value) => {
    const errors = {};
    const { password, rePassword } = value;
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
    return errors;
  };

  // 포커스를 빠져나왔을 경우 유효성 검사!
  const focusBlur = (e) => {
    setErr(errCheck(inputPassword));
  };

  return (
    <div className="mypage-content">
      <div className="inner">
        <div className="content-wrap">
          <div className="content-title">비밀번호 변경</div>
          <div className="password-change-wrap">
            <ul>
              <li>
                생년월일, 전화번호와 관련된 연속된 숫자로된 비밀번호는 타인이
                쉽게 사용할 수 있으니 사용을 자제해 주세요.
              </li>
            </ul>
            <div className="input-wrap">
              <div className="password-title">현재 비밀번호 </div>
              <input
                name="currentPassword"
                onChange={handleInput}
                onBlur={focusBlur}
                type="password"
              />
              <div className="password-warning">{}</div>
              <div className="password-title">새 비밀번호 </div>
              <input
                name="password"
                onChange={handleInput}
                onBlur={focusBlur}
                type="password"
              />
              <div className="password-warning">{err.password}</div>
              <div className="password-title">새 비밀번호 확인 </div>
              <input
                name="rePassword"
                onChange={handleInput}
                onBlur={focusBlur}
                type="password"
              />
              <div className="password-warning">{err.rePassword}</div>
            </div>
          </div>
          <div className="btn-wrap">
            <button type="submit"> 취소 </button>
            <button type="submit" className="active">
              적용
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
