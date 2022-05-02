import React from 'react';

export default function Reservation() {
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
        <button type="button" className="reservation-btn">
          예약하기
        </button>
      </div>
    </div>
  );
}
