import { useLocation, Link, Outlet } from 'react-router-dom';

export default function MyPage() {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <>
      <section className="mypage">
        <div className="back">
          <div className="inner">
            <div className="mypage-header">
              <ul className="header-wrap">
                <Link to="/mypage/edit">
                  <li
                    className={currentPath === '/mypage/edit' ? 'active' : ''}
                  >
                    개인정보 변경
                  </li>
                </Link>
                <Link to="/mypage/change-password">
                  <li
                    className={
                      currentPath === '/mypage/change-password'
                        ? 'active'
                        : null
                    }
                  >
                    비밀번호 변경
                  </li>
                </Link>
                <Link to="/mypage/leave">
                  <li
                    className={
                      currentPath === '/mypage/leave' ? 'active' : null
                    }
                  >
                    회원탈퇴
                  </li>
                </Link>
              </ul>
            </div>
          </div>
        </div>
      </section>
      <Outlet />
    </>
  );
}
