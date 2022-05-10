import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Test({ setModal }) {
  const navigate = useNavigate();
  const modalHandler = () => {
    setModal({
      open: true,
      title: '탈퇴가 완료되었습니다.',
      callback: () => {
        navigate('/');
      },
    });
  };
  return (
    <div>
      <button type="button" onClick={modalHandler}>
        모달
      </button>
    </div>
  );
}
