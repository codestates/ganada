import { useNavigate } from 'react-router-dom';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { TiDocumentText } from 'react-icons/ti';
import ImageSlider from './ImageSlider';
import stringParser from '../../modules/string-parser';

function Post({ post }) {
  const navigate = useNavigate();
  const clickHandler = () => {
    navigate(`/photodetail/${post.id}`);
  };

  const parsedPost = stringParser(post);

  return (
    <div className="post-wrapper" onClick={clickHandler} aria-hidden="true">
      <ImageSlider image={post.image} />
      <div className="post-content">
        <p className="nickname">{post.user.name}</p>
        <p className="title">{parsedPost.title}</p>
        <div className="bottom-line" />
        <div className="description-container">
          <div className="description-icon">
            <TiDocumentText size="17" />
          </div>
          <div className="description">{parsedPost.description}</div>
        </div>
        <div className="position">
          <div className="position-icon">
            <FaMapMarkerAlt size="17" />
          </div>
          <div className="address">서울 중구 정동 5-8 뚝섬 한강 공원</div>
        </div>
        {/* <Link to="/photodetail" className="detailLink">
          <button type="button" className="btnDetailView">
            view more
          </button>
        </Link> */}
      </div>
    </div>
  );
}
export default Post;
