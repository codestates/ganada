import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { BsFillChatFill } from 'react-icons/bs';
import { AiOutlineCheckCircle } from 'react-icons/ai';
import PhotoDetailSlider from '../components/Photo-detail/PhotoDetailSlider';
import PhotoDetailIntro from '../components/Photo-detail/PhotoDetailIntro';
import PhotoDetailMap from '../components/Photo-detail/PhotoDetailMap';
import PhotoDetailHeader from '../components/Photo-detail/PhotoDetailHeader';
import PhotoDetailReview from '../components/Photo-detail/PhotoDetailReview';
import AlertMessage from '../components/AlertMessage';

function PhotoDetail() {
  const location = useLocation();
  const [isActive, setIsActive] = useState(0);

  useEffect(() => {
    if (location.state) {
      setIsActive(location.state.status);
    }
  }, []);

  return (
    <div className="photoDetail-container">
      <PhotoDetailHeader />
      <div className="slider-container">
        <PhotoDetailSlider />
      </div>
      <PhotoDetailIntro />
      <PhotoDetailMap />
      <PhotoDetailReview />
      <button type="button" className="chat-btn">
        <BsFillChatFill className="chat-icon" />
      </button>
      {isActive && <AlertMessage message="글이 등록되었습니다." />}
    </div>
  );
}

export default PhotoDetail;
