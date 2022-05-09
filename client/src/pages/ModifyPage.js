import axios from 'axios';
import { Navigate } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';
import Image from '../components/Write/Image';
import SelectPlaceModal from '../components/Write/SelectPlaceModal';
import Tag from '../components/Search-list/Tag';
import Modal from '../components/Modal';

function ModifyPage({ role = 1 }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const inputTitleRef = useRef(null);
  const [title, setTitle] = useState('제목입니다람쥐'); // 15글자 + ...
  const [description, setDescription] = useState('소개입니다');
  const [tags, setTags] = useState([]);
  const [mainAddress, setMainAddress] = useState('경기도 안양시 동안구 범계동');
  const [detailAddress, setDetailAddress] =
    useState('목련선경아파트 106동 1401호');
  const [coordinate, setCoordinate] = useState({
    lat: 39.77777,
    lng: 128.03812,
  });
  const [category, setCategory] = useState('');
  const [images, setImages] = useState('');
  const isLogin = true;
  const reqData = {
    category: 0,
    title,
    description,
    tags: tags.toString(),
    latitude: coordinate.lat,
    longitude: coordinate.lng,
    mainAddress,
    detailAddress,
  };

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
    if (isModalOpen && address && latlng) {
      setMainAddress(address);
      setDetailAddress('');
      setCoordinate({ ...latlng });
    }
    setIsModalOpen(!isModalOpen);
  };

  const requestHandler = async () => {
    if (!title || !description || !mainAddress || !detailAddress || !images) {
      alert('모든 항목이 입력되어야 합니다.');
    } else {
      const data = new FormData();
      for (const key in images) {
        if (Object.prototype.hasOwnProperty.call(images, key)) {
          data.append('file', images[key]);
        }
      }
      await axios
        .post('http://localhost:4000/boards/images', data, {
          withCredentials: true,
        })
        .then((result) => {
          console.log(result);
        });
    }
    await axios
      .patch('http://localhost:4000/boards', reqData, {
        withCredentials: true,
      })
      .then((res) => {
        console.log('요청 성공');
      });
  };

  return (
    <div className="modify-page-container">
      {isLogin ? (
        <div>
          <div className="modify-page-header">
            <h2>수정하기 </h2>
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
              <Image setImages={setImages} />
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
                value={description}
                onChange={descriptionHandler}
              />
            </div>
          </div>
          <div className="search-place-container">
            <div className="place">
              <span>촬영지</span>
            </div>
            <div className="search-place-wrapper">
              <input
                className="show-address"
                type="text"
                disabled
                value={mainAddress}
              />
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
              <Tag selected={role} setTagss={setTags} />
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
      ) : (
        <Navigate to="/search" />
      )}
    </div>
  );
}

export default ModifyPage;
