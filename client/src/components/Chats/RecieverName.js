import React from 'react';

export default function RecieverName({ receiverUser }) {
  const { name, image } = receiverUser.users;
  return (
    <div className="chat-nickname">
      <img src={image} alt="" />
      <div className="nickname"> {name}</div>
    </div>
  );
}
