function PhotoDetailIntro({ post }) {
  const tagList = post.tags.split(',');

  return (
    <div className="intro-container">
      <div className="intro-sub-container">
        <div className="intro-sub-title">{post.title}</div>
        <div className="intro-description">{post.description}</div>
        {tagList.map((tag) => {
          return (
            <div className="concept-container">
              <div className="intro-concept">
                <span className="intro-concept-list">{tag}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default PhotoDetailIntro;
