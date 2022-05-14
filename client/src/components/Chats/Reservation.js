import axios from 'axios';
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { setChatBoard } from '../../redux/chatBoardSlice';

export default function Reservation({
  setReservationModal,
  chatRoomId,
  arrivalMessage,
}) {
  const imagesPath = `http://localhost:4000/images/`;
  const { token } = useSelector((state) => state.auth);
  const message = useSelector((state) => state.chatMessage).data;
  const chatBoard = useSelector((state) => state.chatBoard).data;
  const chatRoom = useSelector((state) => state.chatRoom).data;
  const currentUserInfo = useSelector(
    (state) => state.currentChatUserInfo,
  ).data;
  const userInfo = useSelector((state) => state.userInfo);
  // 만약 serInfo.id === currentUserInfo?.hostId 일때
  // console.log(userInfo.id === currentUserInfo?.guestId);
  console.log(chatRoom);

  const dispatch = useDispatch();

  const handleOpen = () => {
    setReservationModal(true);
  };
  const SliceMessage = message && [...message];
  const findBoardId = SliceMessage?.sort((a, b) => b.id - a.id).find(
    (el) => el.chatroomId,
  );
  // 호스트 아이디의 경우 => status가 0일 경우 아무것도 안뜸.
  // 게스트 아이디의 경우 => status가 0일 경우 예약하기 버튼 버튼 클릭시 status는 1로 변경

  // 호스트 아이디의 경우 => status가 1일 경우 예약 수락, 예약 거절 버튼으로 변경
  // 게스트 아이디의 경우 => status가 1일 경우 예약 취소,

  // console.log(currentUserInfo?.guestId);
  // console.log(chatBoard);

  // chatBoard는 undefined 초기값
  // chatBoard는 값이 없을때, aiivalmessage일때, chatRoomId가 변경 되었을때, 다시 불러와야한다.

  useEffect(() => {
    const getPostDetail = async () => {
      try {
        await axios
          .get(`http://localhost:4000/boards/${findBoardId.boardId}`, {
            withCredentials: true,
          })
          .then((res) => {
            if (!chatBoard || arrivalMessage || currentUserInfo) {
              dispatch(
                setChatBoard({ ...res.data.data, id: findBoardId.boardId }),
              );
            }
          });
      } catch (err) {
        console.log(err);
      }
    };
    getPostDetail();
  }, [token, arrivalMessage, findBoardId?.boardId]);
  console.log(findBoardId);

  const imageSplit = ((chatBoard && chatBoard.image) || '').split(',')[0];

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
    <Link to={`/photodetail/${findBoardId?.boardId}`}>
      <div className="reservation-wrraper">
        <img src={imagesPath + imageSplit} alt="" />
        <div className="reservation">
          <div className="board-wrrapper">
            <div className="status">예약 수락 대기중</div>
            <div className="board-title">{chatBoard?.title}</div>
          </div>
          {userInfo.id === currentUserInfo?.guestId &&
          currentUserInfo?.status === 0 ? (
            <Link to={chatRoomId}>
              <button
                type="button"
                className="reservation-btn"
                onClick={handleOpen}
              >
                예약 하기
              </button>
            </Link>
          ) : (
            <div className="reservation-btn">예약 </div>
          )}
        </div>
      </div>
    </Link>
  );
}
