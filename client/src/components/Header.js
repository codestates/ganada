import { AiOutlineSearch } from 'react-icons/ai';
import { Link, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function Header() {
  const location = useLocation();
  const [scrollPosition, setScrollPosition] = useState(0);
  const updateScroll = () => {
    setScrollPosition(window.scrollY || document.documentElement.scrollTop);
  };
  useEffect(() => {
    window.addEventListener('scroll', updateScroll);
  });

  // 헤더 숨길 경로
  const hideHeader = ['/login', '/signup', '/write'];
  if (hideHeader.includes(location.pathname)) {
    return null;
  }

  return (
    <header className={scrollPosition ? 'header-active' : 'header-default'}>
      <div className="inner">
        <div className="nav">
          <div className="logo">
            <Link to="/">GANADA</Link>
          </div>
          <form className="search-input">
            <input
              type="text"
              name="search"
              placeholder="지역명, 지하철역, 동이름으로 검색"
            />
            <AiOutlineSearch className="search-button" />
          </form>
          <ul className="right-header">
            <li>
              <Link to="/login">로그인</Link>
            </li>
            <li>
              <Link to="/signup">회원가입</Link>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
}
