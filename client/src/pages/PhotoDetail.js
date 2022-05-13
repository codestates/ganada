import { useState, useEffect } from 'react';
import { useLocation, useParams, useNavigate, Link } from 'react-router-dom';
import { BsFillChatFill } from 'react-icons/bs';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setPostInfo, setChatBoard } from '../redux/postInfoSlice';
import PhotoDetailSlider from '../components/Photo-detail/PhotoDetailSlider';
import PhotoDetailIntro from '../components/Photo-detail/PhotoDetailIntro';
import PhotoDetailMap from '../components/Photo-detail/PhotoDetailMap';
import PhotoDetailHeader from '../components/Photo-detail/PhotoDetailHeader';
import PhotoDetailReview from '../components/Photo-detail/PhotoDetailReview';
import AlertMessage from '../components/AlertMessage';

function PhotoDetail({ setModal }) {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [isActive, setIsActive] = useState(false);
  const [posts, setPosts] = useState('');
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const { postState } = useSelector((state) => state.postInfo);
  console.log(postState);

  useEffect(() => {
    if (location.state) {
      setIsActive(true);
    }
  }, []);

  const chatRoomsPost = async () => {
    try {
      await axios
        .post(
          `${process.env.REACT_APP_API_URL}chatRooms/`,
          { id },
          {
            headers: { authorization: `Bearer ${token}` },
          },
          { withCredentials: true },
        )
        .then((res) => {
          dispatch(
            setChatBoard({
              ...postState,
              chatRoomId: res.data.data.createGuestRoom.chatRoomId,
            }),
          );
          navigate('/chat');
        });
    } catch (err) {
      if (err.response.data.message === '이미 채팅방이 존재합니다.') {
        dispatch(setChatBoard(err.response.data.data));
        navigate(`/chat/${err.response.data.data}`);
      } else if (
        err.response.data.message === '본인에게는 메시지를 보낼 수 없습니다.'
      ) {
        // navigate(`/chat`);
        setModal({
          open: true,
          title: '본인과의 채팅은 불가능합니다',
        });
      } else {
        console.log(err);
      }
    }
  };

  // 현재 채팅은 보드의 상태를 가지고 있어야한다.
  // 내가 가지고있는 정보
  // 보드의 정보
  // 채팅 룸의 정보
  // 채팅을 클릭시 ..내가 누른 보드의 상태를 저장해야한다?
  //
  useEffect(() => {
    const getPostDetail = async () => {
      try {
        await axios
          .get(`${process.env.REACT_APP_API_URL}boards/${id}`, {
            withCredentials: true,
          })
          .then((res) => {
            setPosts(res.data.data);
            dispatch(setPostInfo({ ...res.data.data, id }));
          });
      } catch (err) {
        console.log(err);
      }
    };
    getPostDetail();
  }, []);

  return (
    <div>
      {posts ? (
        <div className="photoDetail-container">
          <PhotoDetailHeader post={posts.user} />
          <div className="slider-container">
            <PhotoDetailSlider image={posts.image} />
          </div>
          <PhotoDetailIntro post={posts} />
          <PhotoDetailMap post={posts} />
          <PhotoDetailReview post={posts} />
          <button type="submit" className="chat-btn" onClick={chatRoomsPost}>
            <BsFillChatFill className="chat-icon" />
          </button>
          {isActive && <AlertMessage message="글이 등록되었습니다." />}
        </div>
      ) : null}
    </div>
  );
}

export default PhotoDetail;
