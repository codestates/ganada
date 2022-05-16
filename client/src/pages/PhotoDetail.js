import { useState, useEffect } from 'react';
import { useLocation, useParams, useNavigate, Link } from 'react-router-dom';
import { BsFillChatFill } from 'react-icons/bs';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setPostInfo } from '../redux/postInfoSlice';
import { setInitChatBoard } from '../redux/initChatBoardSlice';
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

  useEffect(() => {
    if (location.state) {
      setIsActive(true);
    }
  }, []);

  useEffect(() => {
    const getPostDetail = async () => {
      try {
        await axios
          .get(`${process.env.REACT_APP_API_URL}/boards/${id}`, {
            headers: {
              'Content-type': 'application/x-www-form-urlencoded',
              'Content-type': 'multipart/form-data',
            },
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

  const chatRoomsPost = async () => {
    try {
      await axios
        .post(
          `${process.env.REACT_APP_API_URL}/chatRooms/`,
          { id },
          {
            headers: { authorization: `Bearer ${token}` },
          },
          {
            headers: {
              'Content-type': 'application/x-www-form-urlencoded',
              'Content-type': 'multipart/form-data',
            },
            withCredentials: true,
          },
        )
        .then((res) => {
          dispatch(
            setInitChatBoard({
              ...postState,
              chatRoomId: res.data.data.createGuestRoom.chatRoomId,
            }),
          );
          navigate(`/chat/${res.data.data.createGuestRoom.chatRoomId}`);
        });
    } catch (err) {
      if (err.response.data.message === '이미 채팅방이 존재합니다.') {
        dispatch(
          setInitChatBoard({
            ...postState,
            chatRoomId: err.response.data.data,
          }),
        );
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

  useEffect(() => {
    const getPostDetail = async () => {
      try {
        await axios
          .get(`${process.env.REACT_APP_API_URL}/boards/${id}`, {
            headers: {
              'Content-type': 'application/x-www-form-urlencoded',
              'Content-type': 'multipart/form-data',
            },
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
