import { FcOldTimeCamera, FcOvertime, FcConferenceCall } from 'react-icons/fc';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';

export default function Modal({ reservationModal, setReservationModal }) {
  const [evaluate, setEvaluate] = useState({
    kind: false,
    time: false,
    again: false,
  });
  const { kind, time, again } = evaluate;

  const { token } = useSelector((state) => state.auth);
  const currentUserInfo = useSelector(
    (state) => state.currentChatUserInfo,
  ).data;

  const handleClose = () => {
    setReservationModal(false);
    setEvaluate({
      kind: false,
      time: false,
      again: false,
    });
  };
  console.log(evaluate);
  const evaluateUser = () => {
    try {
      axios
        .put(
          `http://localhost:4000/users/${currentUserInfo.name}`,
          evaluate,
          {
            headers: { authorization: `Bearer ${token}` },
          },
          {
            withCredentials: true,
          },
        )
        .then((res) => {
          setReservationModal(false);
          setEvaluate({
            kind: false,
            time: false,
            again: false,
          });
        });
    } catch (err) {
      console.log(err);
    }
  };

  const handleEvaluate = (type) => {
    if (type === 0) {
      setEvaluate({ ...evaluate, kind: !kind });
    } else if (type === 1) {
      setEvaluate({ ...evaluate, time: !time });
    } else {
      setEvaluate({ ...evaluate, again: !again });
    }
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
          <button
            type="button"
            className={kind ? 'review active' : 'review'}
            onClick={() => handleEvaluate(0)}
          >
            <div className="circle">
              <FcConferenceCall size="50" />
            </div>
            <div className="title"> 친절하고 매너가 좋아요 </div>
          </button>
          <button
            type="button"
            className={time ? 'review active' : 'review'}
            onClick={() => handleEvaluate(1)}
          >
            <div className="circle">
              <FcOvertime size="90" />
            </div>
            <div className="title"> 시간약속을 잘지켜요</div>
          </button>
          <button
            type="button"
            className={again ? 'review active' : 'review'}
            onClick={() => handleEvaluate(2)}
          >
            <div className="circle">
              <FcOldTimeCamera size="90" />
            </div>
            <div className="title"> 또 찍고 싶어요</div>
          </button>
        </div>
        <div className="reservation-btn">
          <button type="button" className="cancle-button" onClick={handleClose}>
            취소
          </button>
          <button
            type="button"
            className="success-button"
            onClick={evaluateUser}
          >
            확인
          </button>
        </div>
      </div>
    </div>
  );
}
