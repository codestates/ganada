import ImageSlider from './ImageSlider';

function Post({ image }) {
  return (
    <div className="post-wrapper">
      <ImageSlider image={image} />
      <div className="post-content">
        <p>한강에서 사진 찍으실 분</p>
      </div>
    </div>
  );
}

export default Post;
