import ImageSlider from './ImageSlider';

function PlaceList({ post }) {
  const clickHandler = () => {
    console.log('asd');
  };

  return (
    <div>
      <div className="place-info">
        <ImageSlider />
        <div className="place-detail" onClick={clickHandler} aria-hidden="true">
          <div className="post-title">{post.title}</div>
          <div>{post.description}</div>
          <div>{post.detailAddress}</div>
        </div>
      </div>
      <div className="border-line"> </div>
    </div>
  );
}

export default PlaceList;
