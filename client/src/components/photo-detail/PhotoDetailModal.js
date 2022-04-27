/* eslint-disable import/no-cycle */
import { BsCheck2Circle } from 'react-icons/bs';
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import PhotoDetailHeader from './PhotoDetailHeader';

function PhotoDetailModal({ handleModal }) {
  return (
    <div className="modal-background ">
      <div className="modal-container">
        <div className="modal-view">
          <div className="modal-icon">
            <BsCheck2Circle className="modal-check-icon" />
          </div>
          <div className="modal-title">클립보드에 복사되었습니다!</div>
          <div className="modal-sub-title">
            Ctrl+V 를 이용해 친구들에게 공유해보세요!
          </div>
          <button
            type="button"
            className="modal-confirm-btn"
            onClick={handleModal}
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
}
export default PhotoDetailModal;
