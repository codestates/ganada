import './scss/style.scss';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Cookies } from 'react-cookie';
import Header from './components/Header';
import Footer from './components/Footer';
import Main from './components/Main/Main';
import Login from './pages/Login';
import Signup from './pages/Signup';
import MyPage from './pages/MyPage/MyPage';
import ChangePassword from './pages/MyPage/ChangePassword';
import Edit from './pages/MyPage/Edit';
import LeaveId from './pages/MyPage/LeaveId';
import SearchPlace from './pages/SearchPlace';
import WritingPage from './pages/WritingPage';
import PhotoDetail from './pages/PhotoDetail';
import MediaFooterNav from './components/MediaFooterNav';
import Chat from './pages/Chat';
import PhotoDetailImage from './components/photo-detail/PhotoDetailImage';

const cookies = new Cookies();
const token = cookies.get('jwt');

function App() {
  const [isLogin, setIsLogin] = useState(null);
  const [userInfo, setUserInfo] = useState('');
  const [accessToken, setAccessToken] = useState('');
  const navigate = useNavigate();

  console.log(accessToken);
  console.log(isLogin);

  // 서버에 토큰을 보내며 로그아웃 요청
  const handleLogout = () => {
    if (window.confirm('정말 로그아웃 하시겠습니까?')) {
      axios
        .post(
          `http://localhost:4000/auth/logout`,
          null,
          {
            headers: { authorization: `Bearer ${accessToken}` },
          },
          {
            withCredentials: true,
          },
        )
        .then((res) => {
          localStorage.removeItem('Token');
          setUserInfo(null);
          setIsLogin(false);
          alert('로그아웃 되었습니다.');
          navigate('/');
        });
    }
  };

  return (
    <>
      <Header handleLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route
          path="/login"
          element={
            <Login
              setIsLogin={setIsLogin}
              setUserInfo={setUserInfo}
              setAccessToken={setAccessToken}
            />
          }
        />
        <Route path="/signup" element={<Signup />} />
        <Route path="/photodetail" element={<PhotoDetail />} />
        <Route path="/photodetailImage" element={<PhotoDetailImage />} />
        <Route path="/mypage" element={<MyPage />}>
          <Route path="edit" element={<Edit />} />
          <Route path="change-password" element={<ChangePassword />} />
          <Route path="leave" element={<LeaveId />} />
        </Route>
        <Route path="/search" element={<SearchPlace />} />
        <Route path="/chat" element={<Chat />}>
          <Route path=":chatRoomId" element={<Chat />} />
        </Route>
        <Route path="/write" element={<WritingPage />} />
      </Routes>
      <Footer />
      <MediaFooterNav />
    </>
  );
}

export default App;
