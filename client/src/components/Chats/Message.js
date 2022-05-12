import React from 'react';

export default function Message({ reverse, chat, timeago, chatRooms }) {
  // const chatUserInfo = chatRooms.filter((el) => el.id === chat.chatroomId);
  // const { image, name } = chatUserInfo[0];
  const { createdAt, chats } = chat;
  // const { image } = receiverUser.users;
  return (
    <div className={reverse ? 'message' : 'message reverse'}>
      <div className="message-wrraper">
        <img className="message-img" src="" alt="" />
        <p className="message-txt">{chats}</p>
      </div>
      <span className="message-time">{timeago(createdAt)}</span>
    </div>
  );
}
