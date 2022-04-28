import PhotoDetailHeader from 'components/photo-detail/PhotoDetailHeader';
import PhotoDetailIntro from 'components/photo-detail/PhotoDetailIntro';
import PhotoDetailReview from 'components/photo-detail/PhotoDetailReview';
// import PhotoDetailModal from 'components/photo-detail/PhotoDetailModal';
import ImageSlider from 'components/ImageSlider';
import { BsFillChatFill } from 'react-icons/bs';
// import Header from 'components/Header';
// import Footer from 'components/Footer';

function PhotoDetail() {
  return (
    // <Header />
    <div className="photoDetail-container">
      <PhotoDetailHeader />
      <div className="slider-container">
        <ImageSlider />
      </div>
      <PhotoDetailIntro />
      <PhotoDetailReview />
      <button type="button" className="chat-btn">
        <BsFillChatFill className="chat-icon" />
      </button>
    </div>
    // <Footer />
  );
}

export default PhotoDetail;
