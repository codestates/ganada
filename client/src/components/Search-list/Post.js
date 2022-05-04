import { Link } from 'react-router-dom';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { TiDocumentText } from 'react-icons/ti';
import ImageSlider from './ImageSlider';

function Post({ image }) {
  return (
    <div className="post-wrapper">
      <ImageSlider image={image} />
      <div className="post-content">
        <p className="title">한강에서 사진 찍으실 분</p>
        <div>mynickname</div>
        <div className="bottom-line" />
        <div className="description">
          <div className="description-icon">
            <TiDocumentText size="17" />
          </div>
          <div className="intro">
            사진찍으실분?? 저는 모델 경력 2년차 프리랜서 모델입니다... 전문
            사진작가분 구해요...
          </div>
        </div>
        <div className="position">
          <div className="position-icon">
            <FaMapMarkerAlt size="17" />
          </div>
          <div className="address">서울 중구 정동 5-8 뚝섬 한강 공원</div>
        </div>
        <Link to="/photodetail" className="detailLink">
          <button type="button" className="btnDetailView">
            view more
          </button>
        </Link>
      </div>
    </div>
  );
}
// 이름:name
// 제목:title
// 소개:description
// 주소:mainAddress, detailAddress
// 이미지: [image]
// 상태 :reservations.status (0,1:예약 중,2:종료)
export default Post;
