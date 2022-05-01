import React from 'react';
import { AiOutlineMessage } from 'react-icons/ai';

export default function MessageNull() {
  return (
    <div className="messageNull">
      <AiOutlineMessage size="100" />
      <div className="messageNull-title">
        모델님이나 사진작가님과 대화를 나눠보세요!
      </div>
      <div className="messageNull-btn-wrraper">
        <div className="messageNull-btn">모델둘러보기</div>
        <div className="messageNull-btn">사진작가둘러보기</div>
      </div>
    </div>
  );
}
