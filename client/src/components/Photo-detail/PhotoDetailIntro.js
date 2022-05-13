import { MdPlace, MdOutlineDescription } from 'react-icons/md';
import { TiUser } from 'react-icons/ti';

function PhotoDetailIntro({ post }) {
  const tagList = post.tags.split(',');

  return (
    <div className="intro-container">
      <div className="intro-sub-container">
        <div className="half-container">
          <div className="title-container">
            <div className="title-icon">
              <TiUser />
            </div>
            <div className="intro-sub-title">{post.title}</div>
          </div>
          <div className="desc-container">
            <div className="desc-icon">
              <MdOutlineDescription />
            </div>
            <div className="intro-description">{post.description}</div>
          </div>
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
        <div className="half-container-two" />
      </div>
    </div>
  );
}

export default PhotoDetailIntro;
