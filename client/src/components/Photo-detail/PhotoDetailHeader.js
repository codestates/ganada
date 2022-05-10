import { MdOutlineIosShare } from 'react-icons/md';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import PhotoDetailModal from './PhotoDetailModal';

function PhotoDetailHeader() {
  const userInfo = useSelector((state) => state.userInfo);
  const imagesPath = `http://localhost:4000/images/`;
  const [isOpen, setIsOpen] = useState(false);

  const handleModal = () => {
    setIsOpen(!isOpen);
  };

  const handleClickImg = () => {
    if (!userInfo.image) {
      window.open(
        'https://static.nid.naver.com/images/web/user/default.png?type=s160',
      );
    }
    window.open(imagesPath + userInfo.image);
  };

  return (
    <div className="header-container">
      <div className="pg-profile-container">
        <div className="pg-nickname">{userInfo.name}</div>
        <div className="pg-profile-img-container">
          <button
            type="button"
            className="pg-profile-img-btn"
            onClick={handleClickImg}
          >
            <img
              src={
                userInfo.image === null
                  ? 'https://static.nid.naver.com/images/web/user/default.png?type=s160'
                  : imagesPath + userInfo.image
              }
              alt=""
            />
          </button>
        </div>
      </div>
      <div className="share-container">
        {isOpen ? <PhotoDetailModal handleModal={handleModal} /> : null}
        <button type="button" className="share-btn" onClick={handleModal}>
          <MdOutlineIosShare className="share-icon" />
          <span className="share-sub">공유하기</span>
        </button>
      </div>
    </div>
  );
}
export default PhotoDetailHeader;
