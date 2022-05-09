import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setTags } from '../../redux/searchConditionSlice';

function Tag({ type, setTagInfo }) {
  const modelTags = ['청순', '섹시', '귀염', '도도', '지적', '날씬', '순수'];
  const photographerTags = ['실내촬영', '실외촬영', '노출촬영', '부분노출'];
  const [selectedTags, setSelectedTags] = useState([]);
  const dispatch = useDispatch();

  // const tagHandler = (e) => {
  //   let tags = selectedTags.slice();
  //   if (e.target.getAttribute('class') === 'tag selected') {
  //     e.target.classList.remove('selected');
  //     tags = tags.filter((tag) => tag !== e.target.textContent);
  //   } else {
  //     e.target.classList.add('selected');
  //     tags.push(e.target.textContent);
  //   }
  //   setSelectedTags(tags);
  // dispatch(setTags(tags));
  // if (setTagInfo) {
  //   setTagInfo(tags);
  // }
  // };
  const tagHandler = (e) => {
    let newTags = selectedTags.slice();
    if (newTags.indexOf(e.target.textContent) !== -1) {
      newTags = newTags.filter((tag) => tag !== e.target.textContent);
    } else {
      newTags.push(e.target.textContent);
    }
    setSelectedTags(newTags);
    dispatch(setTags(newTags));
    if (setTagInfo) {
      setTagInfo(newTags);
    }
  };

  useEffect(() => {
    setSelectedTags([]);
    dispatch(setTags([]));
  }, [type]);
  // console.log(selectedTags);

  return (
    <ul id="tags">
      {type
        ? modelTags.map((tag) => (
            <li
              key={tag}
              className={`tag ${
                selectedTags.indexOf(tag) === -1 ? '' : 'selected'
              }`}
              onClick={tagHandler}
              aria-hidden="true"
            >
              {tag}
            </li>
          ))
        : photographerTags.map((tag) => (
            <li
              key={tag}
              className={`tag ${
                selectedTags.indexOf(tag) === -1 ? '' : 'selected'
              }`}
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
