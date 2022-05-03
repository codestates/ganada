import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Tag from './Tag';

function SubNav() {
  const [selected, setSelected] = useState(0);

  const searchModel = () => {
    setSelected(0);
  };

  const searchPhotograpger = () => {
    setSelected(1);
  };

  return (
    <div className="sub-nav">
      <div className="sub-nav-left">
        <Tag selected={selected} />
      </div>
      <div className="sub-nav-right">
        <div>
          <Link to="/write">
            <button type="button" className="btn-write">
              글쓰기
            </button>
          </Link>
        </div>
        <div className="search-wrapper">
          <button
            type="button"
            className="btn-search-photographer"
            onClick={searchModel}
          >
            주변작가
          </button>
          <button
            type="button"
            className="btn-search-model"
            onClick={searchPhotograpger}
          >
            주변모델
          </button>
        </div>
      </div>
    </div>
  );
}

export default SubNav;
