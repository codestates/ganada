import { BsCameraFill } from 'react-icons/bs';

function ModelDetailReview() {
  return (
    <div className="review-container">
      <div className="snap-point-title">
        <BsCameraFill />
        스냅포인트
        <span className="snap-point">30포인트</span>
      </div>
      <ul>
        <li>
          친절하고 매너가 좋아요.
          <span className="snap-point-sub">10포인트</span>
        </li>
        <li>
          시간 약속을 잘지켜요.
          <span className="snap-point-sub">10포인트</span>
        </li>
        <li>
          또 찍고싶어요.
          <span className="snap-point-sub">10포인트</span>
        </li>
      </ul>
    </div>
  );
}

export default ModelDetailReview;
