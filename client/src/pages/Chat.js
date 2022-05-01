import { IoMdSend } from 'react-icons/io';
import ChatRomms from '../components/Chats/ChatRomms';
import Message from '../components/Chats/Message';
import Reservation from '../components/Chats/Reservation';

export default function Chat() {
  const autoResizeTextarea = () => {
    const textarea = document.querySelector('.autoTextarea');

    if (textarea) {
      textarea.style.height = 'auto';
      const height = textarea.scrollHeight; // 높이
      textarea.style.height = `${height + 8}px`;
    }
  };
  const reverse = true;

  return (
    <div className="chat">
      <div className="back">
        <div className="inner">
          <div className="chat-rooms">
            <div className="chat-rooms-wrraper">
              <div className="nickname"> y__jiny_O </div>
              <div className="chatRomms">
                <ChatRomms />
                <ChatRomms />
              </div>
            </div>
          </div>
          <div className="chat-message">
            <div className="chat-message-wrraper">
              <div className="chat-nickname">
                <img
                  src="https://static.nid.naver.com/images/web/user/default.png?type=s160"
                  alt=""
                />
                <div className="nickname"> 유정잉</div>
              </div>
              <Reservation />
              <div className="messages">
                <Message />
                <Message reverse={reverse} />
                <Message />
                <Message />
                <Message />
                <Message reverse={reverse} />
                <Message reverse={reverse} />
                <Message />
                <Message />
                <Message />
                <Message reverse={reverse} />
              </div>
              <div className="send-chat-input">
                <form className="input-wrraper">
                  <textarea
                    placeholder="메시지를 입력하세요"
                    rows="1"
                    className="autoTextarea"
                    onKeyDown={autoResizeTextarea}
                    onKeyUp={autoResizeTextarea}
                  />
                  <button type="button" className="send">
                    <IoMdSend size="30" />
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
