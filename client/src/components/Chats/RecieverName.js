import React from 'react';

export default function RecieverName({ chatUserInfo }) {
  const { name, image } = chatUserInfo;
  const imagesPath = `http://localhost:4000/images/`;
  const defaultImage =
    'https://static.nid.naver.com/images/web/user/default.png?type=s160';
  return (
    <div className="chat-nickname">
      <img src={image && image ? imagesPath + image : defaultImage} alt="" />
      <div className="nickname"> {name && name}</div>
    </div>
  );
}
