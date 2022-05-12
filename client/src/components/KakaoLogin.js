import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const KakaoLogin = () => {
  const navigate = useNavigate();

  // 인가코드 가져오기
  useEffect(() => {
    const code = new URL(window.location.href).searchParams.get('code');
    if (code) {
      kakao(code);
    }
  }, []);

  // 서버에 인가코드 전달
  const kakao = async (code) => {
    await axios
      .post('http://localhost:4000/auth/kakao/callback', null, {
        headers: {
          authorization: code,
        },
        withCredentials: true,
      })
      .then((res) => {
        localStorage.setItem('Token', res.data.token);
        navigate('/');
      });
  };
};

export default KakaoLogin;
