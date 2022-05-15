import axios from 'axios';
import { Navigate, useNavigate } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Image from '../components/Write/Image';
import SelectPlaceModal from '../components/Write/SelectPlaceModal';
import Tag from '../components/Search-list/Tag';

function ModifyPage({ setModal }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const inputTitleRef = useRef(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tagInfo, setTagInfo] = useState([]);
  const [mainAddress, setMainAddress] = useState('');
  const [detailAddress, setDetailAddress] = useState('');
  const [coordinate, setCoordinate] = useState({});
  const [category, setCategory] = useState('');
  const [images, setImages] = useState('');
  const { token } = useSelector((state) => state.auth);
  const { postState } = useSelector((state) => state.postInfo);
  const navigate = useNavigate();
  const reqData = {
    category,
    title,
    description,
    tags: tagInfo.toString(),
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
  const cancleHandler = () => {
    navigate(-1);
  };
  const requestHandler = async () => {
    if (!title || !description || !mainAddress || !detailAddress || !images) {
      setModal({
        open: true,
        title: '모든 항목이 입력되어야 합니다.',
      });
    } else {
      const data = new FormData();
      for (const key in images) {
        if (Object.prototype.hasOwnProperty.call(images, key)) {
          data.append('file', images[key]);
        }
      }
      await axios
        .post(`${process.env.REACT_APP_API_URL}/boards/images`, data, {
          withCredentials: true,
        })
        .then((result) => {
          console.log(result);
        });
    }
    await axios
      .patch(`${process.env.REACT_APP_API_URL}/boards`, reqData, {
        withCredentials: true,
      })
      .then((res) => {
        console.log('요청 성공');
      });
  };

  return (
    <div className="modify-page-container">
      {token ? (
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
              <Tag type={postState.category || 0} setTagInfo={setTagInfo} />
            </div>
          </div>
          <div className="action-button">
            <button
              className="cancle-button"
              type="button"
              onClick={cancleHandler}
            >
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
        <Navigate to="/login" replace />
      )}
    </div>
  );
}

export default ModifyPage;
