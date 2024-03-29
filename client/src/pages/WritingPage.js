import axios from 'axios';
import { useState, useRef, useEffect } from 'react';
import { useNavigate, useParams, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Image from '../components/Write/Image';
import SelectPlaceModal from '../components/Write/SelectPlaceModal';
import Tag from '../components/Search-list/Tag';

function WritingPage({ setModal }) {
  const inputTitleRef = useRef(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tagInfo, setTagInfo] = useState([]);
  const [mainAddress, setMainAddress] = useState('');
  const [detailAddress, setDetailAddress] = useState('');
  const [coordinate, setCoordinate] = useState({});
  const [images, setImages] = useState([]);
  const navigate = useNavigate();
  const category = Number(useParams().id);
  const { token } = useSelector((state) => state.auth);
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
    if (
      !title ||
      !description ||
      !mainAddress ||
      !detailAddress ||
      !images ||
      tagInfo.length === 0
    ) {
      setModal({
        open: true,
        title: '모든 항목이 입력되어야 합니다.',
      });
    } else {
      try {
        const data = new FormData();
        for (const key in images) {
          if (Object.prototype.hasOwnProperty.call(images, key)) {
            data.append('file', images[key]);
          }
        }
        const result = await axios.post(
          `${process.env.REACT_APP_API_URL}/boards/images`,
          data,
          {
            headers: {
              'content-type': 'multipart/form-data',
            },
            withCredentials: true,
          },
        );
        if (result.status === 200) {
          await axios
            .post(
              `${process.env.REACT_APP_API_URL}/boards`,
              reqData,
              {
                headers: { authorization: `Bearer ${token}` },
              },
              {
                withCredentials: true,
              },
            )
            .then((res) => {
              if (res.status === 200) {
                navigate(`/photodetail/${res.data.data.id}`, {
                  state: { status: 1 },
                  replace: true,
                });
              } else {
                setModal({
                  open: true,
                  title: '등록 실패',
                });
              }
            });
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return (
    <form onSubmit={requestHandler} className="write-page-container">
      <div className="write-page-header">
        <h2>{category ? '모델 등록' : '사진 작가 등록'} </h2>
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
            maxLength={70}
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
          <Image setImages={setImages} setModal={setModal} />
        </div>
      </div>
      <div className="introduction-container">
        <div className="introduction">
          <span>소개</span>
        </div>
        <div className="introduction-area">
          <textarea
            className="input-introduction"
            maxLength={500}
            placeholder="촬영 내용을 소개해 주세요 (최대 500자)"
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
            maxLength={50}
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
          <Tag type={category} setTagInfo={setTagInfo} />
        </div>
      </div>
      <div className="action-button">
        <button className="cancle-button" type="button" onClick={cancleHandler}>
          취소
        </button>
        <button className="registration-button" type="submit">
          등록
        </button>
      </div>
    </form>
  );
}

export default WritingPage;
