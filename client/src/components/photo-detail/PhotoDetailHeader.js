/* eslint-disable import/no-cycle */
import { MdOutlineIosShare } from 'react-icons/md';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { useState } from 'react';
import PhotoDetailModal from './PhotoDetailModal';

function PhotoDetailHeader() {
  const url = window.location.href;
  const [isOpen, setIsOpen] = useState(false);

  const handleModal = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="header-container">
      <div className="pg-nickname">작가 닉네임</div>
      {isOpen ? <PhotoDetailModal handleModal={handleModal} /> : null}
      <CopyToClipboard text={url}>
        <button type="button" className="share-btn" onClick={handleModal}>
          <MdOutlineIosShare className="share-icon" />
          <span className="share-sub">공유하기</span>
        </button>
      </CopyToClipboard>
    </div>
  );
}
export default PhotoDetailHeader;
