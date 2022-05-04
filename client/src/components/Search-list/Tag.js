import { useEffect, useState } from 'react';

function Tag({ selected, setTags }) {
  const modelTags = ['청순', '섹시', '귀염', '도도', '지적', '날씬', '순수'];
  const photographerTags = ['실내촬영', '실외촬영', '노출촬영', '부분노출'];
  const [selectedTags, setSelectedTags] = useState([]);
  const tagHandler = (e) => {
    if (e.target.getAttribute('class') === 'tag selected') {
      e.target.classList.remove('selected');
      let tags = selectedTags.slice();
      tags = tags.filter((tag) => tag !== e.target.textContent);
      setSelectedTags(tags);
      setTags(tags);
    } else {
      e.target.classList.add('selected');
      const tags = selectedTags.slice();
      tags.push(e.target.textContent);
      setSelectedTags(tags);
      setTags(tags);
    }
  };
  useEffect(() => {
    setSelectedTags([]);
    setTags([]);
  }, [selected]);
  // console.log(selectedTags);

  return (
    <ul id="tags">
      {selected
        ? modelTags.map((tag) => (
            <li
              key={tag}
              className="tag"
              onClick={tagHandler}
              aria-hidden="true"
            >
              {tag}
            </li>
          ))
        : photographerTags.map((tag) => (
            <li
              key={tag}
              className="tag"
              onClick={tagHandler}
              aria-hidden="true"
            >
              {tag}
            </li>
          ))}
    </ul>
  );
}

export default Tag;
