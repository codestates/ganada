import './scss/style.scss';
import { Route, Routes, useNavigate, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Cookies } from 'react-cookie';
import Header from './components/Header';
import Footer from './components/Footer';
import Main from './components/Main/Main';
import Login from './pages/Login';
import Signup from './pages/Signup';
import MyPage from './pages/MyPage/MyPage';
import ChangePassword from './pages/MyPage/ChangePassword';
import Edit from './pages/MyPage/Edit';
import LeaveId from './pages/MyPage/LeaveId';
import SearchPage from './pages/SearchPage';
import WritingPage from './pages/WritingPage';
import PhotoDetail from './pages/PhotoDetail';
import MediaFooterNav from './components/MediaFooterNav';
import Chat from './pages/Chat';
import MyList from './pages/MyList';
import ModelDetail from './pages/ModelDetail';
import Modal from './components/Modal';
import NotFound from './pages/NotFond';
import PrivateRoute from './PrivateRoute';

const cookies = new Cookies();
const cookieToken = cookies.get('jwt');

function App() {
  const [isLogin, setIsLogin] = useState('');
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState('');
  const [modal, setModal] = useState({
    open: false,
    title: '',
    message: '',
    callback: false,
  });

  useEffect(() => {
    axios
      .get(`http://localhost:4000/users`, {
        headers: { authorization: `Bearer ${isLogin}` },
      })
      .then((res) => {
        setUserInfo(res.data.data);
      });
  }, [navigate, isLogin]);

  useEffect(() => {
    setIsLogin(localStorage.getItem('Token'));
  }, [navigate]);

  // 서버에 토큰을 보내며 로그아웃 요청
  const handleLogout = () => {
    axios
      .post(
        `http://localhost:4000/auth/logout`,
        null,
        {
          headers: { authorization: `Bearer ${isLogin}` },
        },
        {
          withCredentials: true,
        },
      )
      .then((res) => {
        localStorage.removeItem('Token');
        setIsLogin('');
        // cookies.removeCookie('jwt');
        navigate('/');
      });
  };

  return (
    <>
      <Modal
        open={modal.open}
        setPopup={setModal}
        message={modal.message}
        title={modal.title}
        callback={modal.callback}
      />
      <Header
        handleLogout={handleLogout}
        userInfo={userInfo}
        isLogin={isLogin}
      />
      <Routes>
        <Route path="/chat" element={<Chat />}>
          <Route path=":chatRoomId" element={<Chat />} />
        </Route>
        <Route path="/" element={<Main />} />
        <Route
          path="/login"
          element={<Login cookieToken={cookieToken} setIsLogin={setIsLogin} />}
        />
        <Route path="/signup" element={<Signup setModal={setModal} />} />
        <Route path="/photodetail" element={<PhotoDetail />} />
        <Route path="/modeldetail" element={<ModelDetail />} />
        <Route path="/mylist" element={<MyList />} />
        <Route
          path="/mypage"
          element={
            isLogin ? <MyPage userInfo={userInfo} /> : <Navigate to="/login" />
          }
        >
          <Route
            path="edit"
            element={
              <Edit
                userInfo={userInfo}
                setUserInfo={setUserInfo}
                isLogin={isLogin}
                setModal={setModal}
              />
            }
          />
          <Route
            path="change-password"
            element={
              <ChangePassword
                userInfo={userInfo}
                isLogin={isLogin}
                setModal={setModal}
              />
            }
          />
          <Route
            path="leave"
            element={
              <LeaveId
                userInfo={userInfo}
                isLogin={isLogin}
                setModal={setModal}
              />
            }
          />
        </Route>
        <Route path="/search" element={<SearchPage />} />
        <Route path="/write" element={<WritingPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>

      <Footer />
      <MediaFooterNav />
    </>
  );
}

export default App;
