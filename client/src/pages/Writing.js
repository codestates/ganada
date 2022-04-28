function Write() {
  return (
    <div className="article-container">
      <h2>작가 등록</h2>
      <div className="article-title">
        <input type="text" placeholder="제목" />
      </div>
      <div className="article-image">이미지 등록 영역</div>
      <div className="article-introduction">소개 글 작성 영역</div>
      <div className="ariticle-place">장소 선택 영역</div>
      <div className="article-concept">컨셉 설정 영역</div>
      <div className="article-button">
        <button type="button">취소</button>
        <button type="button">등록</button>
      </div>
    </div>
  );
}

export default Write;
