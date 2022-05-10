import { FcOldTimeCamera, FcOvertime, FcConferenceCall } from 'react-icons/fc';

export default function Modal({ reservationModal, setReservationModal }) {
  const handleClose = () => {
    setReservationModal(false);
  };

  return (
    <div
      className={
        reservationModal
          ? 'reservation-modal-back'
          : 'reservation-modal-back active'
      }
    >
      <div className="reservation-modal">
        <div className="review-title">
          후기를 선택해주세요 <span>* 중복선택 가능</span>
        </div>
        <div className="review-wrapper">
          <div className="review">
            <div className="circle">
              <FcConferenceCall size="50" />
            </div>
            <div className="title"> 친절하고 매너가 좋아요 </div>
          </div>
          <div className="review">
            <div className="circle">
              <FcOvertime size="90" />
            </div>
            <div className="title"> 시간약속을 잘지켜요</div>
          </div>
          <div className="review">
            <div className="circle">
              <FcOldTimeCamera size="90" />
            </div>
            <div className="title"> 또 찍고 싶어요</div>
          </div>
        </div>
        <div className="reservation-btn">
          <button type="button" className="cancle-button" onClick={handleClose}>
            취소
          </button>
          <button
            type="button"
            className="success-button"
            onClick={handleClose}
          >
            확인
          </button>
        </div>
      </div>
    </div>
  );
}
