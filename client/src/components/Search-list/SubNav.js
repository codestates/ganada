import React, { useState, useEffect, useRef } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Tag from './Tag';
import { useOutsideClick } from '../../hooks/useOutsideClick';
import { setType } from '../../redux/searchConditionSlice';

function SubNav({ setModal }) {
  const [isClicked, setIsClicked] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const dropdownRef = useRef(null);
  const [isActive, setIsActive] = useOutsideClick(dropdownRef, false);
  const type = searchParams.get('type'); // redux로 처리하면 삭제 가능?
  const keyword = searchParams.get('keyword'); // redux로 처리하면 삭제 가능?
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  // redux로 처리하면 삭제 가능?
  useEffect(() => {
    if (searchParams.get('type') === 'model') {
      setIsClicked(!isClicked);
    }
  }, []);

  const dropDownHandler = () => {
    if (!token) {
      setModal({
        open: true,
        title: '로그인이 필요합니다.',
      });
      return;
    }
    setIsActive(!isActive);
  };

  const btnModelPhotograhper = (e) => {
    if (
      !(
        (e.target.value === 'model' && isClicked) ||
        (e.target.value === 'photographer' && !isClicked)
      )
    ) {
      setIsClicked(!isClicked);
      if (isClicked) {
        dispatch(setType('photographer'));
      } else {
        dispatch(setType('model'));
      }
      if (keyword) {
        setSearchParams({ type, keyword });
      }
    }
  };

  return (
    <div className="searchPage-header">
      <div className="header-left">
        <div className="search-wrapper">
          <Link to={`/search?type=model&keyword=${keyword}`}>
            <button
              type="button"
              value="model"
              className={
                isClicked
                  ? 'btn-search-photographer clicked'
                  : 'btn-search-photographer'
              }
              onClick={btnModelPhotograhper}
            >
              모델 찾기
            </button>
          </Link>
          <Link to={`/search?type=photographer&keyword=${keyword}`}>
            <button
              type="button"
              value="photographer"
              className={
                isClicked ? 'btn-search-model' : 'btn-search-model clicked'
              }
              onClick={btnModelPhotograhper}
            >
              작가 찾기
            </button>
          </Link>
        </div>
        <Tag type={type === 'model' ? 1 : 0} />
      </div>
      <div className="header-right">
        <button
          type="button"
          onClick={dropDownHandler}
          className="dropdown-trigger"
          ref={dropdownRef}
        >
          글 쓰기
        </button>
        <nav className={`menu ${isActive ? 'active' : 'inactive'}`}>
          <ul>
            <li>
              <Link to="/write/0">작가 등록</Link>
            </li>
            <li>
              <Link to="/write/1">모델 등록</Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}
export default SubNav;
