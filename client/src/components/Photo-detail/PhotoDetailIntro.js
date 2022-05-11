function PhotoDetailIntro({ post }) {
  return (
    <div className="intro-container">
      <div className="intro-sub-container">
        <div className="intro-sub-title">{post.title}</div>
        <div className="intro-description">{post.description}</div>
        <div className="intro-concept">
          <span className="intro-concept-list">청순</span>
        </div>
      </div>
      {/* 로그인 했을 경우에만 수정, 삭제 버튼이 보이게 */}
      {/* <div className="intro-btn-container">
        <button type="button" className="intro-delete-btn">
          삭제
        </button>
        <button type="button" className="intro-modify-btn">
          수정
        </button>
      </div> */}
    </div>
  );
}

export default PhotoDetailIntro;
