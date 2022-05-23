import { MdOutlineIosShare } from 'react-icons/md';
import { useState } from 'react';
import PhotoDetailModal from './PhotoDetailModal';

function PhotoDetailHeader({ post }) {
  const imagesPath = `${process.env.REACT_APP_API_URL}/images/`;
  const [isOpen, setIsOpen] = useState(false);
  const handleModal = () => {
    setIsOpen(!isOpen);
  };

  const handleClickImg = () => {
    if (!post.image) {
      window.open(
        'https://static.nid.naver.com/images/web/user/default.png?type=s160',
      );
    }
    window.open(imagesPath + post.image);
  };

  return (
    <div className="header-container">
      <div className="pg-profile-container">
        <div className="pg-nickname">{post.name}</div>
        <div className="pg-profile-img-container">
          <button
            type="button"
            className="pg-profile-img-btn"
            onClick={handleClickImg}
          >
            <img
              src={
                post.image === null
                  ? 'https://static.nid.naver.com/images/web/user/default.png?type=s160'
                  : imagesPath + post.image
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
