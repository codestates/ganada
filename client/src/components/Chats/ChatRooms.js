import React from 'react';
// import { useLocation } from 'react-router-dom';

export default function ChatRooms({ chatRoom, timeago }) {
  // const location = useLocation();
  // console.log(location.pathname.slice(6));
  const { createdAt, chats } =
    chatRoom.chatContents[chatRoom.chatContents.length - 1];
  const { name, image } = chatRoom.receiverId.users;
  console.log(chatRoom);
  return (
    <ul>
      <li>
        <img src={image} alt="" />
        <div className="chat-room-preview">
          <div className="room-nickname">
            {name}님<span className="">{timeago(createdAt)}</span>
          </div>
          <div className="description">{chats}</div>
        </div>
      </li>
    </ul>
  );
}
