import { useLocation } from 'react-router-dom';

export default function Header() {
  const location = useLocation();

  // 푸터 숨길 경로
  const hideHeader = ['/login', '/signup'];
  if (hideHeader.includes(location.pathname)) {
    return null;
  }

  return (
    <footer>
      <div className="inner">
        <ul>
          <li>footer</li>
        </ul>
      </div>
    </footer>
  );
}
