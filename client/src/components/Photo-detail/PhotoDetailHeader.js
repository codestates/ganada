import { MdOutlineIosShare } from 'react-icons/md';
import { useState } from 'react';
import PhotoDetailModal from './PhotoDetailModal';

function PhotoDetailHeader({ posts }) {
  const images = ['/img/son.png'];
  // const url = window.location.href;
  const [isOpen, setIsOpen] = useState(false);

  const handleModal = () => {
    setIsOpen(!isOpen);
  };

  const handleClickImg = () => {
    window.open('/img/son.png');
  };

  return (
    <div className="header-container">
      <div className="pg-profile-container">
        <div className="pg-nickname">작가 닉네임</div>
        <div className="pg-profile-img-container">
          <button
            type="button"
            className="pg-profile-img-btn"
            onClick={handleClickImg}
          >
            <img src={images[0]} alt="profile" />
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
