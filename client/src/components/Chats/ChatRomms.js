import React from 'react';

export default function ChatRomms() {
  return (
    <ul>
      <li>
        <img
          src="https://static.nid.naver.com/images/web/user/default.png?type=s160"
          alt=""
        />
        <div className="chat-room-preview">
          <div className="room-nickname">
            유정잉 <span className="">14분전</span>
          </div>
          <div className="description">
            안녕하세요 모델구하시는거 맞나요? 안녕하세요 모델구하시는거 맞나요?
            안녕하세요 모델구하시는거 맞나요? 안녕하세요 모델구하시는거 맞나요?
          </div>
        </div>
      </li>
    </ul>
  );
}
