import React from 'react';
import { useSelector } from 'react-redux';

export default function RecieverName() {
  const currentUserInfo = useSelector(
    (state) => state.currentChatUserInfo,
  ).data;
  const imagesPath = `${process.env.REACT_APP_API_URL}/images/`;
  const defaultImage =
    'https://static.nid.naver.com/images/web/user/default.png?type=s160';

  return (
    <div className="chat-nickname">
      <img
        src={
          currentUserInfo && currentUserInfo.image
            ? imagesPath + currentUserInfo.image
            : defaultImage
        }
        alt=""
      />
      <div className="nickname">
        {currentUserInfo && currentUserInfo ? currentUserInfo.name : ''}
      </div>
    </div>
  );
}
