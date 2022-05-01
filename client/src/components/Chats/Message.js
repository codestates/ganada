import React from 'react';

export default function Message({ reverse }) {
  return (
    <div className={reverse ? 'message' : 'message reverse'}>
      <div className="message-wrraper">
        <img
          className="message-img"
          src="https://images.pexels.com/photos/3686769/pexels-photo-3686769.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
          alt=""
        />
        <p className="message-txt">안녕하세요안녕하세요안녕하세요안녕</p>
      </div>
      <span className="message-time">14분전</span>
    </div>
  );
}
