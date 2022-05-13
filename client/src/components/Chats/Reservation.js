import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

export default function Reservation({ setReservationModal, chatRoomId }) {
  const imagesPath = `http://localhost:4000/images/`;
  const { postState } = useSelector((state) => state.postInfo);
  const { token } = useSelector((state) => state.auth);
  const [array, setArray] = useState('');

  const handleOpen = () => {
    setReservationModal(true);
  };

  console.log(chatRoomId === String(postState.chatRoomId));
  console.log(array);
  console.log(typeof postState.chatRoomId);
  useEffect(() => {
    if (chatRoomId === String(postState.chatRoomId)) {
      setArray(postState);
    } else {
      setArray('');
    }
  }, [token, postState, chatRoomId]);
  const imageSplit = ((array && array.image) || '').split(',')[0];

  return (
    <Link to={`/photodetail/${array.id}`}>
      <div className="reservation-wrraper">
        <img src={array && array ? imagesPath + imageSplit : null} alt="" />
        <div className="reservation">
          <div className="board-wrrapper">
            <div className="status">예약중</div>
            <div className="board-title">
              {array && postState ? array.title : '글이 없습니다.'}
            </div>
          </div>
          <Link to={chatRoomId}>
            <button
              type="button"
              className="reservation-btn"
              onClick={handleOpen}
            >
              예약하기
            </button>
          </Link>
        </div>
      </div>
    </Link>
  );
}
