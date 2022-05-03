import { useState, useEffect } from 'react';
import { BsFillChatFill } from 'react-icons/bs';
import PhotoDetailSlider from '../components/Photo-detail/PhotoDetailSlider';
import PhotoDetailIntro from '../components/Photo-detail/PhotoDetailIntro';
import PhotoDetailMap from '../components/Photo-detail/PhotoDetailMap';
import PhotoDetailReview from '../components/Photo-detail/PhotoDetailReview';
import PhotoDetailHeader from '../components/Photo-detail/PhotoDetailHeader';

function ModelDetail() {
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
    </div>
  );
}

export default ModelDetail;
