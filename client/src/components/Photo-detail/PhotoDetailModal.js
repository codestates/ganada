import { AiOutlineClose, AiOutlineCheckCircle } from 'react-icons/ai';
import { BiCopy } from 'react-icons/bi';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { useState } from 'react';
import KakaoShare from './KakaoShare';

function PhotoDetailModal({ handleModal }) {
  const url = window.location.href;
  const [isShow, setIsShow] = useState(false);

  const showBoxHandler = () => {
    setIsShow(!isShow);
  };

  return (
    <div className="modal-background ">
      <div className="modal-container">
        <div className="modal-view">
          <div className="modal-header">
            <button type="button" className="close-btn" onClick={handleModal}>
              <AiOutlineClose className="close-icon" />
            </button>
          </div>
          <h4>공유하기</h4>
          <div className="modal-body">
            <CopyToClipboard text={url}>
              <button
                type="button"
                className="copy-link-btn"
                onClick={showBoxHandler}
              >
                <BiCopy className="copy-icon" />
                링크복사
              </button>
            </CopyToClipboard>
            <KakaoShare />
          </div>
          {isShow ? (
            <div className="show-box">
              <AiOutlineCheckCircle className="show-icon" />
              <span className="show-sub">링크 복사 완료</span>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
export default PhotoDetailModal;
