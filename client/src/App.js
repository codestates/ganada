import './scss/style.scss';
import { Route, Routes } from 'react-router-dom';
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
        <Route path="/search" element={<SearchPlace />} />
        <Route path="/write" element={<WritingPage />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
