import React, { useState, useEffect } from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import Tag from './Tag';

function SubNav({ setTags }) {
  const [selected, setSelected] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const params = useParams();
  const [searchParams, setSearchParams] = useSearchParams();

  const searchModelPhotograhper = () => {
    setIsClicked(!isClicked);
    setSelected(!selected);
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
        <div className="search-wrapper">
          <Link to="/search?type=model">
            <button
              type="button"
              className={
                isClicked
                  ? 'btn-search-photographer clicked'
                  : 'btn-search-photographer'
              }
              onClick={searchModelPhotograhper}
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
              onClick={searchModelPhotograhper}
            >
              작가 찾기
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default SubNav;
