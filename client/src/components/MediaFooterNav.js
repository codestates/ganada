import { useLocation, Link } from 'react-router-dom';
import { AiOutlineHome, AiOutlineMessage } from 'react-icons/ai';
import { FaUserCircle } from 'react-icons/fa';

export default function MediaFooterNav() {
  const location = useLocation();

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
        <Link to="/chat">
          <div
            className={
              location.pathname === '/chat' ? 'navIcon active' : 'navIcon'
            }
          >
            <AiOutlineMessage size="25" />
            <span> 메시지 </span>
          </div>
        </Link>
        <Link to="/login">
          <div
            className={
              location.pathname === '/login' ? 'navIcon active' : 'navIcon'
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
