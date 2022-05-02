import { useState, useRef, useEffect } from 'react';
import Image from '../components/Write/Image';
import SelectPlaceModal from '../components/Write/SelectPlaceModal';
import Tag from '../components/place-list/Tag';

function WritingPage({ role = 1 }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const inputTitleRef = useRef(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState([]);
  const [place, setPlace] = useState('');
  const [detailAddress, setDetailAddress] = useState('');
  const [coordinate, setCoordinate] = useState({});
  const [category, setCategory] = useState('');

  useEffect(() => {
    if (inputTitleRef.current !== null) inputTitleRef.current.focus();
  }, []);

  const titleHandler = (e) => {
    setTitle(e.target.value);
  };

  const descriptionHandler = (e) => {
    setDescription(e.target.value);
  };

  const detailAddressHandler = (e) => {
    setDetailAddress(e.target.value);
  };

  const modalHandler = (address, latlng) => {
    if (isModalOpen && address) {
      setPlace(address);
      setCoordinate({ ...latlng });
    }
    setIsModalOpen(!isModalOpen);
  };

  const requestHandler = () => {
    if (!title || !description || !place || !detailAddress) {
      alert('모든 항목이 입력되어야 합니다.');
    } else {
      alert(title);
      alert(description);
      alert(place);
      alert(detailAddress);
      alert(tags);
      alert(coordinate.lat);
      alert(coordinate.lng);
    }
  };

  return (
    <div className="write-page-container">
      <div className="write-page-header">
        <h2>{role ? '모델 등록' : '사진 작가 등록'} </h2>
      </div>
      <div className="title-container">
        <div className="title">
          <span>제목</span>
        </div>
        <div className="input-title">
          <input
            type="text"
            ref={inputTitleRef}
            placeholder="제목을 입력하세요"
            onChange={titleHandler}
            value={title}
          />
        </div>
      </div>
      <div className="image-container">
        <div className="image-title">
          <span>이미지</span>
        </div>
        <div className="image-upload-area">
          {[1, 2, 3].map((item) => {
            return <Image key={item} />;
          })}
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
            onChange={descriptionHandler}
          />
        </div>
      </div>
      <div className="search-place-container">
        <div className="place">
          <span>촬영지</span>
        </div>
        <div className="search-place-wrapper">
          <input className="show-address" type="text" disabled value={place} />
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
            value={detailAddress}
            onChange={detailAddressHandler}
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
          <Tag selected={role} setTags={setTags} />
        </div>
      </div>
      <div className="action-button">
        <button className="cancle-button" type="button">
          취소
        </button>
        <button
          className="registration-button"
          type="button"
          onClick={requestHandler}
        >
          등록
        </button>
      </div>
    </div>
  );
}

export default WritingPage;
