import { AiOutlineSearch } from 'react-icons/ai';

export default function Header() {
  return (
    <header>
      <div className="inner">
        <div className="nav">
          <div className="logo"> GANADA </div>
          <form className="search-input">
            <input
              type="text"
              name="search"
              placeholder="지역명, 지하철역, 동이름으로 검색"
            />
            <AiOutlineSearch className="search-button" />
          </form>
          <ul className="right-header">
            <li>로그인</li>
            <li>회원가입</li>
          </ul>
        </div>
      </div>
    </header>
  );
}
