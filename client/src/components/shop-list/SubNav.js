import Tag from 'components/Tag';
import { useState } from 'react';

function SubNav() {
  const initialTags = ['청순', '섹시', '귀염', '도도', '지적', '날씬', '순수'];
  const initialTags1 = ['실내촬영', '실외촬영', '노출촬영', '부분노출'];
  const [selected, setSelected] = useState(true);
  const [tags, setTags] = useState(initialTags1);

  const btnHandler = () => {
    if (selected) {
      setTags(initialTags);
    } else {
      setTags(initialTags1);
    }
    setSelected(!selected);
  };

  return (
    <div className="sub-nav">
      <Tag tags={tags} />
      <div className="sub-nav-right">
        <div>
          <button type="button" className="btn-write">
            글쓰기
          </button>
        </div>
        <div className="search-wrapper">
          <button
            type="button"
            className="search-photographer"
            onClick={btnHandler}
          >
            주변작가
          </button>
          <button type="button" className="search-model" onClick={btnHandler}>
            주변모델
          </button>
        </div>
      </div>
    </div>
  );
}

export default SubNav;
