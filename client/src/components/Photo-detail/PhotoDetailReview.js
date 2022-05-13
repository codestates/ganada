import { BsCamera } from 'react-icons/bs';

function PhotoDetailReview({ post }) {
  const totalPoint = post.user.kind + post.user.time + post.user.again;
  return (
    <div className="review-container">
      <div className="snap-point-title">
        <BsCamera className="snap-point-icon" />
        스냅포인트
        <span className="snap-point">
          {/* {totalPoint}  */}
          22 포인트
        </span>
      </div>
      <ul>
        <li>
          친절하고 매너가 좋아요.
          <span className="snap-point-sub">
            {/* {post.user.kind}  */}
            5포인트
          </span>
        </li>
        <li>
          시간 약속을 잘지켜요.
          <span className="snap-point-sub">
            {/* {post.user.time}  */}
            11 포인트
          </span>
        </li>
        <li>
          또 찍고싶어요.
          <span className="snap-point-sub">
            {/* {post.user.again}  */}6 포인트
          </span>
        </li>
      </ul>
    </div>
  );
}

export default PhotoDetailReview;
