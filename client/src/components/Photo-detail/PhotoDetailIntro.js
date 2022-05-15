import { MdOutlineDescription } from 'react-icons/md';
import { TiUser } from 'react-icons/ti';
import { useState } from 'react';

function PhotoDetailIntro({ post }) {
  const tagList = post.tags.split(',');

  return (
    <div className="intro-container">
      <div className="intro-sub-container">
        <div className="left-container">
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
        <div className="right-container">
          {post.status === 1 ? (
            <div className="reservation-sub">예약종료</div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default PhotoDetailIntro;
