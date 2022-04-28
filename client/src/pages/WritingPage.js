import { useState } from 'react';
import SelectPlaceModal from '../components/Write/SelectPlaceModal';
import Tag from '../components/place-list/Tag';

function WritingPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [place, setPlace] = useState('');

  const modalHandler = (address) => {
    if (isModalOpen && address) {
      setPlace(address);
    }
    setIsModalOpen(!isModalOpen);
  };
  return (
    <div className="write-page-container">
      <div className="write-page-header">
        <h2>사진 작가 등록</h2>
      </div>
      <div className="title-container">
        <div className="title">
          <span>제목</span>
        </div>
        <div className="input-title">
          <input type="text" placeholder="제목을 입력하세요" />
        </div>
      </div>
      <div className="image-container">
        <div className="image">
          <span>이미지</span>
        </div>
        <div className="upload-image-area">
          <input
            type="file"
            accept="image/*"
            required
            multipl="true"
            // style={{ display: 'none' }}
          />
        </div>
      </div>
      <div className="introduction-container">
        <div className="introduction">
          <span>소개</span>
        </div>
        <div className="introduction-area">
          <textarea
            className="input-introduction"
            placeholder="촬영 내용을 소개해 주세요"
          />
        </div>
      </div>
      <div className="search-place-container">
        <div className="place">
          <span>촬영지</span>
        </div>
        <div className="search-place-wrapper">
          <input className="show-address" type="text" readOnly value={place} />
          <button
            type="button"
            className="btn-open-modal"
            onClick={modalHandler}
          >
            검색
          </button>
          <input
            className="input-detail-address"
            type="text"
            placeholder="상세주소 입력"
          />
          {isModalOpen ? (
            <SelectPlaceModal modalHandler={modalHandler} />
          ) : null}
        </div>
      </div>
      <div className="concepts-container">
        <div className="concept">
          <span>컨셉</span>
        </div>
        <div className="tag-wrapper">
          <Tag selected={0} />
        </div>
      </div>
      <div className="action-button">
        <button className="cancle-button" type="button">
          취소
        </button>
        <button className="registration-button" type="button">
          등록
        </button>
      </div>
    </div>
  );
}

export default WritingPage;
