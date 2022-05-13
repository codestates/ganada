import { useState, useEffect } from 'react';
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import { BsFillChatFill } from 'react-icons/bs';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setPostInfo } from '../redux/postInfoSlice';
import PhotoDetailSlider from '../components/Photo-detail/PhotoDetailSlider';
import PhotoDetailIntro from '../components/Photo-detail/PhotoDetailIntro';
import PhotoDetailMap from '../components/Photo-detail/PhotoDetailMap';
import PhotoDetailHeader from '../components/Photo-detail/PhotoDetailHeader';
import PhotoDetailReview from '../components/Photo-detail/PhotoDetailReview';
import AlertMessage from '../components/AlertMessage';

function PhotoDetail() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [isActive, setIsActive] = useState(false);
  const [posts, setPosts] = useState('');
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);

  useEffect(() => {
    if (location.state) {
      setIsActive(true);
    }
  }, []);

  const chatRoomsPost = async () => {
    try {
      await axios
        .post(
          `http://localhost:4000/chatRooms/`,
          { id },
          {
            headers: { authorization: `Bearer ${token}` },
          },
          { withCredentials: true },
        )
        .then(navigate('/chat'));
    } catch (err) {
      console.log(err);
    }
  };

  console.log();
  useEffect(() => {
    const getPostDetail = async () => {
      try {
        await axios
          .get(`http://localhost:4000/boards/${id}`, {
            withCredentials: true,
          })
          .then((res) => {
            setPosts(res.data.data);
            dispatch(setPostInfo(res.data.data));
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
