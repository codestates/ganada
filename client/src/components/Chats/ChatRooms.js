import React from 'react';
// import { useLocation } from 'react-router-dom';

export default function ChatRooms({ chatRoom, timeago }) {
  // const location = useLocation();
  // console.log(location.pathname.slice(6));
  const imagesPath = `http://localhost:4000/images/`;

  const { name, image, chats } = chatRoom;
  console.log(chatRoom);
  return (
    <ul>
      <li>
        <img src={imagesPath + image} alt="" />
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
