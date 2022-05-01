import React from 'react';

export default function Message({ reverse, chat, timeago, receiverUser }) {
  const { createdAt, chats } = chat;
  const { image } = receiverUser.users;
  return (
    <div className={reverse ? 'message reverse' : 'message'}>
      <div className="message-wrraper">
        <img className="message-img" src={image} alt="" />
        <p className="message-txt">{chats}</p>
      </div>
      <span className="message-time">{timeago(createdAt)}</span>
    </div>
  );
}
