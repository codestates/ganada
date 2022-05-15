import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { setCurrentChatUserInfo } from '../../redux/currentChatUserInfoSlice';

export default function Message({ reverse, chat, timeago }) {
  const imagesPath = `${process.env.REACT_APP_API_URL}/images/`;
  const defaultImage =
    'https://static.nid.naver.com/images/web/user/default.png?type=s160';
  const { updatedAt, chats } = chat;
  const chatRooms = useSelector((state) => state.chatRoom).data;
  const currentUserInfo = useSelector(
    (state) => state.currentChatUserInfo,
  ).data;
  const location = useLocation();
  const dispatch = useDispatch();
  const currentRoom = chatRooms?.find(
    (el) => String(el.id) === location.pathname.slice(-1),
  );
  useEffect(() => {
    dispatch(setCurrentChatUserInfo(currentRoom));
  }, [location, dispatch, currentRoom]);

  return (
    <div className={reverse ? 'message' : 'message reverse'}>
      <div className="message-wrraper">
        <img
          className="message-img"
          src={
            currentUserInfo && currentUserInfo.image
              ? imagesPath + currentUserInfo.image
              : defaultImage
          }
          alt=""
        />
        <p className="message-txt">{chats}</p>
      </div>
      <span className="message-time">
        {/* {timeago(Number(updatedAt.slice(0, -5)))} */}
      </span>
    </div>
  );
}
