import { IoMdSend } from 'react-icons/io';
import axios from 'axios';
import { useEffect, useState, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Picker from 'emoji-picker-react';
import { MdInsertEmoticon } from 'react-icons/md';
import { io } from 'socket.io-client';
import ChatRooms from '../components/Chats/ChatRooms';
import Message from '../components/Chats/Message';
import Reservation from '../components/Chats/Reservation';
import MessageNull from '../components/Chats/MessageNull';
import RecieverName from '../components/Chats/RecieverName';
import { setChatMessage } from '../redux/chatSlice';
import { setChatRoom } from '../redux/chatRoomSlice';

export default function Chat({ setReservationModal, setModal }) {
  const socket = useRef();
  const inSection = useRef();
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [chatUserInfo, setChatUserInfo] = useState({});
  const [newMessage, setNewMessage] = useState('');
  const [showEmoji, setShowEmojij] = useState(false);
  const { chatRoomId } = useParams();
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const userInfo = useSelector((state) => state.userInfo);
  const message = useSelector((state) => state.chatMessage).data;
  const chatRooms = useSelector((state) => state.chatRoom).data;

  useEffect(() => {
    socket.current = io('ws://localhost:4000');
  }, [token]);

  useEffect(() => {
    socket.current.on('receiveMessage', (data) => {
      const { chats, userId, chatroomId, updatedAt } = data;
      setArrivalMessage({
        userId,
        chats,
        chatroomId,
        updatedAt,
      });
      console.log(data);
    });
  }, [token]);

  useEffect(() => {
    socket.current.emit('join', { chatroomId: chatRoomId });
  }, [chatRoomId, token]);

  useEffect(() => {
    arrivalMessage && dispatch(setChatMessage([arrivalMessage, ...message]));
  }, [arrivalMessage, chatRoomId, token]);

  useEffect(() => {
    const getMessage = async () => {
      try {
        const res = await axios.get(
          `http://localhost:4000/chatContents/${chatRoomId}}`,
          {
            headers: { authorization: `Bearer ${token}` },
          },
          { withCredentials: true },
        );
        dispatch(setChatMessage(res.data.checkChatContents));
      } catch (err) {
        console.log(err);
      }
    };
    getMessage();
  }, [chatRoomId, token, chatUserInfo, dispatch]);

  useEffect(() => {
    const getChatRooms = async () => {
      try {
        const res = await axios.get(
          'http://localhost:4000/chatRooms/',
          {
            headers: { authorization: `Bearer ${token}` },
          },
          { withCredentials: true },
        );
        dispatch(setChatRoom(res.data.data));
      } catch (err) {
        console.log(err);
      }
    };
    getChatRooms();
  }, [token, arrivalMessage]);

  const sendMessage = (e) => {
    if (newMessage === '' || newMessage === '\n') {
      setNewMessage('');
    } else {
      const data = {
        chats: newMessage,
        userId: userInfo.id,
        chatroomId: chatRoomId,
        updatedAt: new Date(Date.now()),
      };
      socket.current.emit('sendMessage', data);
      setNewMessage('');
    }
  };

  useEffect(() => {
    const onClick = (e) => {
      if (inSection.current && !inSection.current.contains(e.target)) {
        setShowEmojij(false);
      }
    };

    document.addEventListener('mousedown', onClick);
  }, [chatRoomId]);

  const emojiShowHide = () => {
    setShowEmojij(!showEmoji);
  };

  const handleEmojiClick = (e, emojiObject) => {
    let msg = newMessage;
    msg += emojiObject.emoji;
    setNewMessage(msg);
  };

  // 자동 textaarea높이 지정
  const autoResizeTextarea = () => {
    const textarea = document.querySelector('.autoTextarea');
    if (textarea) {
      textarea.style.height = 'auto';
      const height = textarea.scrollHeight;
      textarea.style.height = `${height + 3}px`;
    }
  };
  const timeago = (createdat) => {
    const milliSeconds = Math.floor(new Date() - createdat);
    const seconds = milliSeconds / 1000;
    if (seconds < 60) return `방금 전`;
    const minutes = seconds / 60;
    if (minutes < 60) return `${Math.floor(minutes)}분 전`;
    const hours = minutes / 60;
    if (hours < 24) return `${Math.floor(hours)}시간 전`;
    const days = hours / 24;
    if (days < 7) return `${Math.floor(days)}일 전`;
    const weeks = days / 7;
    if (weeks < 5) return `${Math.floor(weeks)}주 전`;
    const months = days / 30;
    if (months < 12) return `${Math.floor(months)}개월 전`;
    const years = days / 365;
    return `${Math.floor(years)}년 전`;
  };

  return (
    <div className="chat">
      <div className="back">
        <div className="inner">
          <div className="chat-rooms">
            <div className="chat-rooms-wrraper">
              <div className="nickname"> {userInfo.name} </div>
              <div className="chatRooms">
                {chatRooms &&
                  chatRooms.map((chatRoom) => (
                    <Link
                      to={`${chatRoom.id}`}
                      onClick={(e) => setChatUserInfo(chatRoom)}
                    >
                      <ChatRooms chatRoom={chatRoom} timeago={timeago} />
                    </Link>
                  ))}
              </div>
            </div>
          </div>
          <div className="chat-message">
            <div className="chat-message-wrraper">
              {chatRoomId ? (
                <>
                  <RecieverName message={message} chatUserInfo={chatUserInfo} />
                  <Reservation
                    setReservationModal={setReservationModal}
                    chatRoomId={chatRoomId}
                  />
                </>
              ) : null}
              <div className="messages">
                {chatRoomId ? (
                  message &&
                  message.map((chat) => (
                    <Message
                      chatUserInfo={chatUserInfo}
                      chat={chat}
                      reverse={chat.userId !== userInfo.id}
                      timeago={timeago}
                      chatRooms={chatRooms}
                    />
                  ))
                ) : (
                  <MessageNull />
                )}
              </div>
              {chatRoomId ? (
                <div className="send-chat-input">
                  <div className="emoji" ref={inSection}>
                    {showEmoji && <Picker onEmojiClick={handleEmojiClick} />}
                    <MdInsertEmoticon
                      size="24"
                      color="grey"
                      onClick={emojiShowHide}
                    />
                  </div>
                  <form className="input-wrraper">
                    <textarea
                      placeholder="메시지를 입력하세요"
                      rows="1"
                      className="autoTextarea"
                      onKeyDown={autoResizeTextarea}
                      onKeyUp={autoResizeTextarea}
                      onChange={(e) => setNewMessage(e.target.value)}
                      value={newMessage}
                      // eslint-disable-next-line react/jsx-no-duplicate-props
                      onKeyUp={(e) =>
                        e.key === 'Enter'
                          ? sendMessage(e) && newMessage === ''
                          : null
                      }
                    />
                    {chatRoomId ? (
                      <button
                        type="button"
                        className={newMessage === '' ? 'send' : 'send active'}
                        onClick={sendMessage}
                      >
                        <IoMdSend size="30" />
                      </button>
                    ) : null}
                  </form>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
