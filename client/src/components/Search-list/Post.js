import { useNavigate } from 'react-router-dom';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { TiDocumentText } from 'react-icons/ti';
import ImageSlider from './ImageSlider';

function Post({ post }) {
  const navigate = useNavigate();
  const clickHandler = () => {
    navigate(`/photodetail/${post.id}`);
  };
  return (
    <div className="post-wrapper" onClick={clickHandler} aria-hidden="true">
      <ImageSlider image={post.image} />
      <div className="post-content">
        <p className="nickname">{post.user.name}</p>
        <p className="title">{post.title}</p>
        <div className="bottom-line" />
        <div className="description-container">
          <div className="description-icon">
            <TiDocumentText size="17" />
          </div>
          <div className="description">{post.description}</div>
        </div>
        <div className="position">
          <div className="position-icon">
            <FaMapMarkerAlt size="17" />
          </div>
          <div className="address">{post.mainAddress}</div>
        </div>
        <div className="status-container">
          <span
            className={
              post.status ? 'reservation-status' : 'hidden-reservation-status'
            }
          >
            예약 종료
          </span>
        </div>
      </div>
    </div>
  );
}
export default Post;
