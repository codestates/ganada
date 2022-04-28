import { BsFillChatFill } from 'react-icons/bs';
import PhotoDetailIntro from '../components/photo-detail/PhotoDetailIntro';
import PhotoDetailSlider from '../components/photo-detail/PhotoDetailSlider';
import PhotoDetailReview from '../components/photo-detail/PhotoDetailReview';
import PhotoDetailHeader from '../components/photo-detail/PhotoDetailHeader';

function PhotoDetail() {
  return (
    <div className="photoDetail-container">
      <PhotoDetailHeader />
      <div className="slider-container">
        <PhotoDetailSlider />
      </div>
      <PhotoDetailIntro />
      <PhotoDetailReview />
      <button type="button" className="chat-btn">
        <BsFillChatFill className="chat-icon" />
      </button>
    </div>
  );
}

export default PhotoDetail;
