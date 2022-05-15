import './scss/style.scss';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Cookies } from 'react-cookie';
import { useSelector, useDispatch } from 'react-redux';
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
import Modal from './components/Modal';
import KakaoLogin from './components/KakaoLogin';
import ModifyPage from './pages/ModifyPage';
import NotFound from './pages/NotFound';
import ReservationModal from './components/Chats/ReservationModal';

const cookies = new Cookies();
const cookieToken = cookies.get('jwt');

function App() {
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.userInfo);
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [modal, setModal] = useState({
    open: false,
    title: '',
    message: '',
    callback: false,
  });
  const [reservationModal, setReservationModal] = useState(false);

  const getUserInfo = () => {
    try {
      axios
        .get(`${process.env.REACT_APP_API_URL}/users`, {
          headers: { authorization: `Bearer ${token}` },
          withCredentials: true,
        })
        .then((res) => {
          dispatch({
            type: 'userInfo/setUpdateUserInfo',
            payload: res.data.data,
          });
        });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    dispatch({
      type: 'auth/isLogin',
      payload: localStorage.getItem('Token'),
    });
  }, [navigate]);

  useEffect(() => {
    if (token) {
      getUserInfo();
    }
  }, [token]);

  // 서버에 토큰을 보내며 로그아웃 요청
  const handleLogout = () => {
    axios
      .post(
        `${process.env.REACT_APP_API_URL}/auth/logout`,
        null,
        {
          headers: { authorization: `Bearer ${token}` },
        },
        {
          withCredentials: true,
        },
      )
      .then((res) => {
        localStorage.removeItem('Token');
        dispatch({
          type: 'auth/isLogout',
        });
        navigate('/');
      });
  };

  return (
    <>
      <ReservationModal
        reservationModal={reservationModal}
        setReservationModal={setReservationModal}
      />
      <Modal
        open={modal.open}
        setPopup={setModal}
        message={modal.message}
        title={modal.title}
        callback={modal.callback}
      />
      <Header handleLogout={handleLogout} cookieToken={cookieToken} />
      <Routes>
        <Route
          path="/chat"
          element={
            <Chat
              setModal={setModal}
              setReservationModal={setReservationModal}
            />
          }
        >
          <Route path=":chatRoomId" element={<Chat />} />
        </Route>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<Login cookieToken={cookieToken} />} />
        <Route path="/signup" element={<Signup setModal={setModal} />} />
        <Route
          path="/photodetail/:id"
          element={<PhotoDetail setModal={setModal} />}
        />
        <Route path="/mylist" element={<MyList />} />
        <Route path="/auth/kakao/callback" element={<KakaoLogin />} />
        <Route path="/mypage" element={<MyPage />}>
          <Route
            path="edit"
            element={<Edit getUserInfo={getUserInfo} setModal={setModal} />}
          />
          <Route
            path="change-password"
            element={<ChangePassword setModal={setModal} />}
          />
          <Route path="leave" element={<LeaveId setModal={setModal} />} />
        </Route>
        <Route path="/search" element={<SearchPage setModal={setModal} />} />
        <Route
          path="/write/:id"
          element={<WritingPage setModal={setModal} />}
        />
        <Route path="/modify" element={<ModifyPage setModal={setModal} />} />
        <Route path="*" element={<NotFound />} />
      </Routes>

      <Footer />
      <MediaFooterNav />
    </>
  );
}

export default App;
