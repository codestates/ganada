import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import Tag from './Tag';

function SubNav({ setTags, setType }) {
  const [selected, setSelected] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const type = searchParams.get('type');
  const keyword = searchParams.get('keyword');
  const btnModelPhotograhper = () => {
    setIsClicked(!isClicked);
    setSelected(!selected);
    if (isClicked) {
      setType('photographer');
    } else {
      setType('model');
    }
    setSearchParams({ type, keyword: 'asd' });
  };

  useEffect(() => {
    if (searchParams.get('type') === 'model') {
      setIsClicked(!isClicked);
      setSelected(!selected);
    }
  }, []);

  return (
    <div className="searchPage-header">
      <div className="header-left">
        <div className="search-wrapper">
          <Link to="/search?type=model">
            <button
              type="button"
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
          <Link to="/search?type=photographer">
            <button
              type="button"
              className={
                isClicked ? 'btn-search-model' : 'btn-search-model clicked'
              }
              onClick={btnModelPhotograhper}
            >
              작가 찾기
            </button>
          </Link>
        </div>
        <Tag selected={selected} setTags={setTags} />
      </div>
      <div className="header-right">
        <div>
          <Link to="/write">
            <button type="button" className="btn-write">
              글쓰기
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default SubNav;
