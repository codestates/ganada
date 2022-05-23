import { useLocation, Link } from 'react-router-dom';
import { AiOutlineHome, AiOutlineMessage } from 'react-icons/ai';
import { FaUserCircle } from 'react-icons/fa';
import { useSelector } from 'react-redux';

export default function MediaFooterNav() {
  const location = useLocation();
  const { token } = useSelector((state) => state.auth);

  return (
    <div className="media-nav">
      <div className="media-nav-wrap">
        <Link to="/">
          <div
            className={location.pathname === '/' ? 'navIcon active' : 'navIcon'}
          >
            <AiOutlineHome size="25" />
            <span> 홈 </span>
          </div>
        </Link>
        <Link to={token ? '/chat' : '/login'}>
          <div
            className={
              location.pathname.includes('/chat' || '/login')
                ? 'navIcon active'
                : 'navIcon'
            }
          >
            <AiOutlineMessage size="25" />
            <span> 메시지 </span>
          </div>
        </Link>
        <Link to={token ? '/mypage/edit' : '/login'}>
          <div
            className={
              location.pathname.includes('/mypage/edit' || '/login')
                ? 'navIcon active'
                : 'navIcon'
            }
          >
            <FaUserCircle size="25" />
            <span> 마이페이지 </span>
          </div>
        </Link>
      </div>
    </div>
  );
}
