import React from 'react';

export default function Message({ reverse, chat, timeago, getUserInfo }) {
  const userInfo = getUserInfo()[0];
  const imagesPath = `http://localhost:4000/images/`;
  const defaultImage =
    'https://static.nid.naver.com/images/web/user/default.png?type=s160';
  const { updatedAt, chats } = chat;

  return (
    <div className={reverse ? 'message' : 'message reverse'}>
      <div className="message-wrraper">
        <img
          className="message-img"
          src={
            userInfo && userInfo.image
              ? imagesPath + userInfo.image
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
