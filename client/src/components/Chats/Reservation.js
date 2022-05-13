import React, { useState } from 'react';
import { useSelector } from 'react-redux';

export default function Reservation({ setReservationModal }) {
  const handleOpen = () => {
    setReservationModal(true);
  };
  const { postState } = useSelector((state) => state.postInfo);
  console.log(postState);

  return (
    <div className="reservation-wrraper">
      <img
        src="https://static.nid.naver.com/images/web/user/default.png?type=s160"
        alt=""
      />
      <div className="reservation">
        <div className="board-wrrapper">
          <div className="status">예약중</div>
          <div className="board-title">같이 한강 가실분 구해요</div>
        </div>
        <button type="button" className="reservation-btn" onClick={handleOpen}>
          예약하기
        </button>
      </div>
    </div>
  );
}
