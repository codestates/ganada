import { MdOutlineIosShare } from 'react-icons/md';

function ModelDetailHeader() {
  return (
    <div className="header-container">
      <div className="pg-nickname">작가 닉네임1</div>
      <button type="button" className="share-btn">
        <MdOutlineIosShare className="share-icon" />
        <span className="share-sub">공유하기</span>
      </button>
    </div>
  );
}

export default ModelDetailHeader;
