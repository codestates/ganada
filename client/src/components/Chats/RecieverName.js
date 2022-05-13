import React from 'react';

export default function RecieverName({ getUserInfo }) {
  const userInfo = getUserInfo()[0];
  const imagesPath = `http://localhost:4000/images/`;
  const defaultImage =
    'https://static.nid.naver.com/images/web/user/default.png?type=s160';
  return (
    <div className="chat-nickname">
      <img
        src={
          userInfo && userInfo.image
            ? imagesPath + userInfo.image
            : defaultImage
        }
        alt=""
      />
      <div className="nickname"> {userInfo && userInfo.name}</div>
    </div>
  );
}
