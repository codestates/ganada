function PhotoDetailIntro({ isLogin }) {
  return (
    <div className="intro-container">
      <div className="intro-sub-container">
        <div className="intro-sub-title">
          같이 한강 사진 찍으러 가실 분을 찾습니다~~~!
        </div>
        <div className="intro-description">
          수요일에 같이 가실분 구해요!!
          <br />
          연락 주세요!! 인생사진 찍어보세요!
        </div>
        <div className="intro-concept">
          <span className="intro-concept-list">실외촬영</span>
        </div>
      </div>
      {/* 로그인 했을 경우에만 수정, 삭제 버튼이 보이게 */}
      <div className="intro-btn-container">
        <button type="button" className="intro-delete-btn">
          삭제
        </button>
        <button type="button" className="intro-modify-btn">
          수정
        </button>
      </div>
    </div>
  );
}

export default PhotoDetailIntro;
