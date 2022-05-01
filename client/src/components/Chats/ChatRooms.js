import React from 'react';

export default function ChatRooms({ chatRoom, timeago }) {
  const { createdAt, chats } =
    chatRoom.chatContents[chatRoom.chatContents.length - 1];
  const { name, image } = chatRoom.receiverId.users;
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
