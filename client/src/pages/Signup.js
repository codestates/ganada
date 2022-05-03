// import { Link, useNavigate } from 'react-router-dom';
// import { useRef, useEffect, useState } from 'react';
// <<<<<<< HEAD:client/src/components/Signup/Signup.js
// import axios from 'axios';
// =======
// import { BiError } from 'react-icons/bi';
// import axios from 'axios';
// import AlertModal from '../components/AlertModal';
// >>>>>>> aeeaf59eafbefd175b989b2a605248d5f131259d:client/src/pages/Signup.js

// export default function Signup() {
//   // input value change
//   const [inputValue, setInputValue] = useState({
//     email: '',
//     emailValidate: '',
//     password: '',
//     rePassword: '',
//     name: '',
//     phoneNumber: '',
//   });
//   const [err, setErr] = useState({});
//   const [againAlert, setAgainAlert] = useState(false);
//   const [buttonAlert, setButtonAlert] = useState(false);
//   const [mailAlert, setMailAlert] = useState(false);
//   const [loginAlert, setLoginAlert] = useState(false);
//   const navigate = useNavigate();

//   const handleInput = (e) => {
//     const { name, value } = e.target;
//     setInputValue({
//       ...inputValue,
//       [name]: value,
//     });
//   };
//   // error test
//   const errCheck = (value) => {
//     const errors = {};
// <<<<<<< HEAD:client/src/components/Signup/Signup.js
//     const { email, emailValidate, password, rePassword, name, phoneNumber } =
//       value;
// =======
//     const { email, password, rePassword, name, phoneNumber } = value;
// >>>>>>> aeeaf59eafbefd175b989b2a605248d5f131259d:client/src/pages/Signup.js
//     if (
//       email !== '' &&
//       !/^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/.test(
//         email,
//       )
//     ) {
//       errors.email = '올바르지 않은 이메일 형식입니다.';
//     }

//     if (
//       password !== '' &&
//       !/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@!%*#?&])[A-Za-z\d@!%*#?&]{8,}$/.test(
//         password,
//       )
//     ) {
//       errors.password =
//         '비밀번호는 최소 8자 이상, 알파벳과 숫자 및 특수문자를 포함해야 합니다.';
//     }

//     if (rePassword !== '' && rePassword !== password) {
//       errors.rePassword = '비밀번호가 일치하지 않습니다.';
//     }

//     if (name !== '' && !/^[\w\Wㄱ-ㅎㅏ-ㅣ가-힣]{2,20}$/.test(name)) {
//       errors.name = '닉네임은 최소 2글자이상 특수문자 제외해서 입력해주세요.';
//     }
//     if (
//       phoneNumber !== '' &&
//       !/^(01[016789]{1}|02|0[3-9]{1}[0-9]{1})([0-9]{3,4})([0-9]{4})$/.test(
//         phoneNumber,
//       )
//     ) {
//       errors.phoneNumber = '전화번호가 옳바르지 않습니다.';
//     }

//     return errors;
//   };

//   // 포커스를 빠져나왔을 경우 유효성 검사
//   const focusBlur = (e) => {
//     const checkData = errCheck(inputValue);
//     setErr(checkData);
//   };

//   // focus
//   const inputRef = useRef(null);
//   useEffect(() => {
//     inputRef.current.focus();
//   }, []);

//   const signupHandling = async () => {
// <<<<<<< HEAD:client/src/components/Signup/Signup.js
//     const data = {
//       email: inputValue.email,
//       emailValidate: inputValue.emailValidate,
//       password: inputValue.empasswordail,
//       rePassword: inputValue.rePassword,
//       name: inputValue.name,
//       phoneNumber: inputValue.phoneNumber,
//     };
//     try {
//       await axios.post(`http://localhost:4000/auth/signup`, data);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const emailValidRequest = () => {
//     try {
//       axios
//         .post('http://localhost:4000/auth/mailVerification', {
//           email: inputValue.email,
//         })
//         .then((res) => console.log('너 뭐하니????'));
// =======
//     if (Object.values(inputValue).includes('')) {
//       setButtonAlert(true);
//     } else if (Object.keys(err).length !== 0) {
//       setAgainAlert(true);
//     } else {
//       const data = {
//         email: inputValue.email,
//         password: inputValue.password,
//         rePassword: inputValue.rePassword,
//         name: inputValue.name,
//         phoneNumber: inputValue.phoneNumber,
//         emailValidate: inputValue.emailValidate,
//       };
//       try {
//         await axios
//           .post(`http://localhost:4000/auth/signup`, data, {
//             withCredentials: true,
//           })
//           .then(setLoginAlert(true))
//           .then(() => {
//             if (!loginAlert) {
//               navigate('/login');
//             }
//           });
//       } catch (error) {
//         console.log(error);
//       }
//     }
//   };

//   const emailValidRequest = async () => {
//     try {
//       await axios
//         .post('http://localhost:4000/auth/mailVerification', {
//           email: inputValue.email,
//         })
//         .then((res) => setErr({ ...err, email: res.data.message }))
//         .then(setMailAlert(true));
// >>>>>>> aeeaf59eafbefd175b989b2a605248d5f131259d:client/src/pages/Signup.js
//     } catch (error) {
//       console.log(error);
//     }
//   };
//   return (
//     <section className="signup">
//       <div className="inner">
//         <div className="signup-content">
//           <Link to="/">
//             <div className="logo-title">GANADA</div>
//           </Link>
//           <div className="sub-title">가장 나 다운 순간을 담다 </div>
//           <div className="signup-form">
//             <div className="signup-email">
//               <div className="signup-title">이메일 </div>
//               <div className="email-wrap">
//                 <input
//                   className="email"
//                   name="email"
//                   ref={inputRef}
//                   onChange={handleInput}
//                   onBlur={focusBlur}
//                 />
//                 <button
//                   type="submit"
// <<<<<<< HEAD:client/src/components/Signup/Signup.js
//                   className="email-btn"
// =======
//                   className={
//                     inputValue.email === '' ? 'email-btn' : 'email-btn active'
//                   }
// >>>>>>> aeeaf59eafbefd175b989b2a605248d5f131259d:client/src/pages/Signup.js
//                   onClick={emailValidRequest}
//                 >
//                   인증 받기
//                 </button>
//               </div>
//               <div className="signup-warning">
//                 {err.email === '위 메일로 인증번호가 전송되었습니다.' ? null : (
//                   <span>{err.email}</span>
//                 )}
//               </div>
//               <div className="signup-title"> 인증번호 </div>
//               <input
//                 name="emailValidate"
//                 onChange={handleInput}
//                 onBlur={focusBlur}
//               />
//               <div className="signup-warning">{err.emailValidate}</div>
//             </div>

//             <div className="signup-password">
//               <div className="signup-title">비밀번호 </div>
//               <input
//                 name="password"
//                 onChange={handleInput}
//                 onBlur={focusBlur}
//                 type="password"
//               />
//               <div className="signup-warning">{err.password}</div>
//               <div className="signup-title">비밀번호 확인 </div>
//               <input
//                 name="rePassword"
//                 onChange={handleInput}
//                 onBlur={focusBlur}
//                 type="password"
//               />
//               <div className="signup-warning">{err.rePassword}</div>
//             </div>

//             <div className="signup-name">
//               <div className="signup-title">닉네임 </div>
//               <input name="name" onChange={handleInput} onBlur={focusBlur} />
//               <div className="signup-warning">{err.name} </div>
//             </div>

//             <div className="signup-title"> 전화번호 </div>
//             <input
//               name="phoneNumber"
//               onChange={handleInput}
//               onBlur={focusBlur}
//             />
//             <div className="signup-warning">{err.phoneNumber}</div>

//             <div className="btn-wrap">
//               <button
//                 type="submit"
// <<<<<<< HEAD:client/src/components/Signup/Signup.js
//                 className="signup-btn"
// =======
//                 className={
//                   Object.values(inputValue).includes('')
//                     ? 'signup-btn'
//                     : 'signup-btn active'
//                 }
// >>>>>>> aeeaf59eafbefd175b989b2a605248d5f131259d:client/src/pages/Signup.js
//                 onClick={signupHandling}
//               >
//                 회원가입
//               </button>
//             </div>
//             <div className="last-txt">
//               이미 회원이신가요?
//               <Link to="/login">
//                 <span className="login-signup">로그인하기</span>
//               </Link>
//             </div>
//           </div>
//         </div>
//       </div>
//       {mailAlert && err.email === '위 메일로 인증번호가 전송되었습니다.' ? (
//         <AlertModal
//           title="인증 메일이 발송 되었습니다."
//           setAlert={setMailAlert}
//           alert={mailAlert}
//         />
//       ) : null}
//       {againAlert ? (
//         <AlertModal
//           title="다시한번 확인해주세요"
//           setAlert={setAgainAlert}
//           alert={againAlert}
//         />
//       ) : null}
//       {buttonAlert ? (
//         <AlertModal
//           title="모든 항목은 필수 입니다."
//           setAlert={setButtonAlert}
//           alert={buttonAlert}
//         />
//       ) : null}
//       {loginAlert ? (
//         <AlertModal
//           title="회원가입이 완료되었습니다!"
//           setAlert={setLoginAlert}
//           alert={loginAlert}
//         />
//       ) : null}
//     </section>
//   );
// }
