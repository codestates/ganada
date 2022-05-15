import axios from 'axios';
import React, { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { io } from 'socket.io-client';
import { setChatBoard } from '../../redux/chatBoardSlice';
import { DeleteInitChatBoard } from '../../redux/initChatBoardSlice';
import { setStatus } from '../../redux/currentChatUserInfoSlice';

export default function Reservation({
  setReservationModal,
  chatRoomId,
  arrivalMessage,
}) {
  const socket = useRef();
  const [arrivalstatus, setArrivalStatus] = useState(null);
  const imagesPath = `http://localhost:4000/images/`;
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const message = useSelector((state) => state.chatMessage).data;
  const chatBoard = useSelector((state) => state.chatBoard).data;
  const currentUserInfo = useSelector(
    (state) => state.currentChatUserInfo,
  ).data;
  const initChatBoard = useSelector((state) => state.initChatBoard).data;
  const userInfo = useSelector((state) => state.userInfo);
  const location = useLocation();
  const [reservation, setReservation] = useState({
    hostTitle: '',
    userTitle: '',
    reservationStatus: '',
  });

  useEffect(() => {
    socket.current = io('ws://localhost:4000');
  }, [token]);

  useEffect(() => {
    socket.current.emit('join', { chatroomId: chatRoomId });
    setArrivalStatus(null);
  }, [chatRoomId, token]);

  useEffect(() => {
    if (currentUserInfo?.status === 1) {
      setReservation({
        hostTitle: '예약 수락',
        guestTitle: '예약 수락 대기중',
        reservationStatus: '예약 대기',
      });
    } else if (currentUserInfo?.status === 2) {
      setReservation({
        hostTitle: '촬영종료',
        guestTitle: '촬영 종료',
        reservationStatus: '예약 대기',
      });
    } else {
      setReservation({
        hostTitle: '게스트의 예약을 기다리는 중입니다.',
        guestTitle: '예약하기',
        reservationStatus: '예약 대기',
      });
    }
    socket.current.on('receiveReservation', (data) => {
      const { chatroomId, status, hostTitle, guestTitle, reservationStatus } =
        data;
      setArrivalStatus({
        chatroomId,
        status,
        hostTitle,
        guestTitle,
        reservationStatus,
      });
      dispatch(setStatus(status));
    });
  }, [
    socket,
    chatRoomId,
    token,
    currentUserInfo?.status,
    dispatch,
    arrivalstatus?.status,
    arrivalstatus,
  ]);

  // 커런트 유저인포는 그냥 먹는다.
  // 실시간으로 커런트 유저인포의 정보를 변경해줬다.
  // 다른 방으로 가면 커런트 유저인포는 어떻게 되는가?
  console.log('커런트', currentUserInfo);
  console.log('어라이벌', !arrivalstatus?.status);

  const SliceMessage = message && [...message];
  const findBoardId = SliceMessage?.sort((a, b) => b.id - a.id).find(
    (el) => el.chatroomId,
  );

  const putReservationStatus = async () => {
    try {
      await axios
        .put(
          `http://localhost:4000/chatRooms/${chatRoomId}`,
          { status: 1 },
          {
            headers: { authorization: `Bearer ${token}` },
          },
          {
            withCredentials: true,
          },
        )
        .then((res) => {
          let hostTitle;
          let guestTitle;
          let reservationStatus;
          if (res.data.data + 1 === 1) {
            hostTitle = '예약 수락';
            guestTitle = '예약 수락 대기중';
            reservationStatus = '예약 대기';
          } else if (res.data.data + 1 === 2) {
            hostTitle = '촬영종료';
            guestTitle = '촬영종료';
            reservationStatus = '촬영 중';
          } else {
            hostTitle = '게스트의 예약을 기다리는 중입니다.';
            guestTitle = '예약하기';
            reservationStatus = '예약 대기';
          }
          const data = {
            chatroomId: chatRoomId,
            status: res.data.data + 1,
            reservationStatus,
            hostTitle,
            guestTitle,
          };

          socket.current.emit('sendReservation', data);
          if (res.data.message === '촬영이 종료 되었습니다.') {
            setReservationModal(true);
          }
        });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const getPostDetail = async () => {
      try {
        await axios
          .get(`http://localhost:4000/boards/${findBoardId?.boardId}`, {
            withCredentials: true,
          })
          .then((res) => {
            if (!initChatBoard) {
              dispatch(
                setChatBoard({ ...res.data.data, id: findBoardId.boardId }),
              );
            } else {
              dispatch(setChatBoard(initChatBoard));
            }
          })
          .then(dispatch(DeleteInitChatBoard()));
      } catch (err) {
        console.log(err);
      }
    };
    getPostDetail();
  }, [token, arrivalMessage, location, findBoardId?.boardId]);
  const imageSplit = ((chatBoard && chatBoard.image) || '').split(',')[0];

  return (
    <Link to={`/photodetail/${findBoardId?.boardId}`}>
      <div className="reservation-wrraper">
        <img src={imagesPath + imageSplit} alt="" />
        <div className="reservation">
          <div className="board-wrrapper">
            <div className="status">
              {arrivalstatus
                ? arrivalstatus?.reservationStatus
                : reservation?.reservationStatus}
            </div>
            <div className="board-title">{chatBoard?.title}</div>
          </div>

          {userInfo.id === currentUserInfo?.guestId ? (
            <Link to={chatRoomId}>
              <button
                type="button"
                className="reservation-btn"
                onClick={putReservationStatus}
              >
                {arrivalstatus
                  ? arrivalstatus.guestTitle
                  : reservation.guestTitle}
              </button>
            </Link>
          ) : (
            <Link to={chatRoomId}>
              <button
                type="button"
                className="reservation-btn"
                onClick={putReservationStatus}
              >
                {(arrivalstatus && arrivalstatus.hostTitle) ||
                  reservation.hostTitle}
              </button>
            </Link>
          )}
        </div>
      </div>
    </Link>
  );
}
