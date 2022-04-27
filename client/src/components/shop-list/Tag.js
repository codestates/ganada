import { useState } from 'react';

function Tag({ tags }) {
  const tagHandler = (e) => {
    if (e.target.getAttribute('class') === 'tag selected') {
      e.target.classList.remove('selected');
    } else {
      e.target.classList.add('selected');
    }
  };

  return (
    <div className="sub-nav-left">
      <ul id="tags">
        {tags.map((tag, index) => (
          <li key={tag} className="tag" onClick={tagHandler} aria-hidden="true">
            {tag}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Tag;
