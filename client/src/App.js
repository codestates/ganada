import './scss/style.scss';
import { Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Main from './components/Main/Main';
import Login from './components/Login/Login';
import Signup from './components/Signup/Signup';
import MyPage from './components/MyPage/MyPage';
import ChangePassword from './components/MyPage/ChangePassword';
import Edit from './components/MyPage/Edit';
import LeaveId from './components/MyPage/LeaveId';
import PhotoDetail from './pages/PhotoDetail';

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/photodetail" element={<PhotoDetail />} />
        <Route path="/mypage" element={<MyPage />}>
          <Route path="edit" element={<Edit />} />
          <Route path="change-password" element={<ChangePassword />} />
          <Route path="leave" element={<LeaveId />} />
        </Route>
      </Routes>
      <Footer />
    </>
  );
}

export default App;
