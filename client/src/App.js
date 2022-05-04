import './scss/style.scss';
import { Route, Routes, useNavigate } from 'react-router-dom';
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

const cookies = new Cookies();
const token = cookies.get('jwt');

function App() {
  const [userInfo, setUserInfo] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:4000/users`, {
        headers: { authorization: `Bearer ${token}` },
      })
      .then((res) => {
        // console.log(res.data.data.email);
        setUserInfo(res.data.data);
      });
  }, []);

  // 서버에 토큰을 보내며 로그아웃 요청
  const handleLogout = () => {
    if (window.confirm('정말 로그아웃 하시겠습니까?')) {
      axios
        .post(
          `http://localhost:4000/auth/logout`,
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
          navigate('/');
        });
    }
  };

  return (
    <>
      <Header handleLogout={handleLogout} userInfo={userInfo} />
      <Routes>
        <Route path="/chat" element={<Chat />}>
          <Route path=":chatRoomId" element={<Chat />} />
        </Route>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<Login token={token} />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/photodetail" element={<PhotoDetail />} />
        <Route path="/modeldetail" element={<ModelDetail />} />
        <Route path="/mylist" element={<MyList />} />
        <Route path="/mypage" element={<MyPage />}>
          <Route
            path="edit"
            element={<Edit userInfo={userInfo} token={token} />}
          />
          <Route
            path="change-password"
            element={<ChangePassword userInfo={userInfo} />}
          />
          <Route path="leave" element={<LeaveId userInfo={userInfo} />} />
        </Route>
        <Route path="/search" element={<SearchPage />} />
        <Route path="/write" element={<WritingPage />} />
      </Routes>
      <Footer />
      <MediaFooterNav />
    </>
  );
}

export default App;
