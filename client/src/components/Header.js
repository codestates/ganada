import { AiOutlineSearch, AiOutlineMessage } from 'react-icons/ai';
import { RiLogoutBoxRLine } from 'react-icons/ri';
import { FaUserCircle, FaRegEdit } from 'react-icons/fa';
import { Link, useLocation, useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setKeyword } from '../redux/searchConditionSlice';

export default function Header({ handleLogout, cookieToken, isLogin }) {
  const userInfo = useSelector((state) => state.userInfo);
  const { token } = useSelector((state) => state.auth);

  const location = useLocation();
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isTrue, setIsTrue] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();
  const type = searchParams.get('type');
  const dispatch = useDispatch();
  const imagesPath = `http://localhost:4000/images/`;

  const onClick = () => {
    setIsTrue(!isTrue);
  };
  const updateScroll = () => {
    setScrollPosition(window.scrollY || document.documentElement.scrollTop);
  };

  const inputHandler = (e) => {
    setInputValue(e.target.value);
  };

  useEffect(() => {
    window.addEventListener('scroll', updateScroll);
  }, []);

  // 헤더 숨길 경로
  const hideHeader = ['/login', '/signup'];
  if (hideHeader.includes(location.pathname)) {
    return null;
  }
  if (token && cookieToken) {
    return (
      <header className={scrollPosition ? 'header-active' : ''}>
        <div className="inner">
          <div className="nav">
            <div className="logo">
              <Link to="/">GANADA</Link>
            </div>
            <form className="search-input">
              <input
                type="text"
                name="search"
                placeholder="어디로 촬영 가시나요?"
                value={inputValue}
                onChange={inputHandler}
              />
              <Link
                to={`/search?type=${type || 'model'}&keyword=${inputValue}`}
              >
                <button type="submit">
                  <AiOutlineSearch
                    className="search-button"
                    alt="Submit Form"
                    onClick={() => dispatch(setKeyword(inputValue))}
                  />
                </button>
              </Link>
            </form>
            <ul className="right-header">
              <li className="left-chat">
                <Link to="/chat">
                  <AiOutlineMessage size="30" />
                </Link>
              </li>
              <div className="drop-menu " role="presentation" onClick={onClick}>
                <div className="profile">
                  <img
                    src={
                      userInfo.image === null
                        ? 'https://static.nid.naver.com/images/web/user/default.png?type=s160'
                        : imagesPath + userInfo.image
                    }
                    alt=""
                  />
                </div>
                <div className={isTrue ? 'list active' : 'list'}>
                  <h3>
                    {userInfo.name}님 <br />
                    <span>환영합니다!</span>
                  </h3>
                  <ul>
                    <li>
                      <FaUserCircle size="20" color="grey" className="icon" />
                      <Link to="/mypage/edit">마이페이지</Link>
                    </li>
                    <li>
                      <FaRegEdit size="20" color="grey" className="icon" />
                      <Link to="/mylist">내가쓴글</Link>
                    </li>
                    <li>
                      <RiLogoutBoxRLine
                        size="20"
                        color="grey"
                        className="icon"
                      />
                      <Link to="/" onClick={handleLogout}>
                        로그아웃
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </ul>
          </div>
        </div>
      </header>
    );
  }
  return (
    <header className={scrollPosition ? 'header-active' : ''}>
      <div className="inner">
        <div className="nav">
          <div className="logo">
            <Link to="/">GANADA</Link>
          </div>
          <form className="search-input">
            <input
              type="text"
              name="search"
              placeholder="어디로 촬영 가시나요?"
              value={inputValue}
              onChange={inputHandler}
            />
            <Link to={`/search?type=${type || 'model'}&keyword=${inputValue}`}>
              <button
                type="submit"
                onClick={() => dispatch(setKeyword(inputValue))}
              >
                <AiOutlineSearch className="search-button" alt="Submit Form" />
              </button>
            </Link>
          </form>
          <ul className="right-header">
            <li className="before">
              <Link to="/login">로그인</Link>
            </li>
            <li className="before">
              <Link to="/signup">회원가입</Link>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
}
