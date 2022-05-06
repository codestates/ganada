import { useLocation } from 'react-router-dom';

export default function Header() {
  const location = useLocation();

  // 푸터 숨길 경로
  const hideHeader = [
    '/login',
    '/signup',
    '/mypage/edit',
    '/mypage/change-password',
    '/mypage/leave',
  ];
  if (hideHeader.includes(location.pathname)) {
    return null;
  }

  return (
    <footer>
      <div className="inner">
        <ul>
          <li>Copyrightⓒ2022 by ganada All rights reserved. </li>
        </ul>
      </div>
    </footer>
  );
}
