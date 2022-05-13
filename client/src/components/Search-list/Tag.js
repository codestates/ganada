import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setTags, setBookingStatus } from '../../redux/searchConditionSlice';

function Tag({ type, setTagInfo }) {
  const modelTags = ['청순', '섹시', '귀염', '도도', '지적', '날씬', '순수'];
  const photographerTags = ['실내촬영', '실외촬영', '노출촬영', '부분노출'];
  const [selectedTags, setSelectedTags] = useState([]);
  const [isChecked, setIsChecked] = useState(false);
  const { bookingStatus } = useSelector((state) => state.searchCondition);
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    setSelectedTags([]);
    dispatch(setTags([]));
    setIsChecked(false);
    dispatch(setBookingStatus(false));
  }, [type]);

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

  const clickHandler = (e) => {
    setIsChecked(!isChecked);
    dispatch(setBookingStatus(!isChecked));
  };

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
      {location.pathname === '/search' && (
        <li className="checkBox-container" onClick={clickHandler} aria-hidden>
          예약 가능
          <input
            type="checkbox"
            className="checkbox"
            checked={isChecked}
            onChange={() => {}}
          />
        </li>
      )}
    </ul>
  );
}

export default Tag;
