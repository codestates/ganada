import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

export default function RecieverName({ chatRooms, chatRoomId }) {
  // const { name, image } = receiverUser.users;
  const location = useLocation();
  const [name, setName] = useState('');

  useEffect(() => {
    const receiver = () => {
      chatRooms.filter((el) => el.id === location.pathname.slice(6));
    };
    console.log(chatRooms);

    receiver();
  }, [location]);

  return (
    <div className="chat-nickname">
      {/* <img src={} alt="" /> */}
      <div className="nickname"> {name}</div>
    </div>
  );
}
