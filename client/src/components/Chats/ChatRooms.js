import React from 'react';
// import { useLocation } from 'react-router-dom';

export default function ChatRooms({ chatRoom, timeago }) {
  const imagesPath = `${process.env.REACT_APP_API_URL}/images/`;
  const defaultImage =
    'https://static.nid.naver.com/images/web/user/default.png?type=s160';
  const { name, image, chats } = chatRoom;
  return (
    <ul>
      <li>
        <img src={image ? imagesPath + image : defaultImage} alt="" />
        <div className="chat-room-preview">
          <div className="room-nickname">
            {name}님<span className="">{}</span>
          </div>
          <div className="description">{chats}</div>
        </div>
      </li>
    </ul>
  );
}
