import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { MdPlace, MdOutlineDescription } from 'react-icons/md';
import { TiUser } from 'react-icons/ti';
import { setPostInfo } from '../../redux/postInfoSlice';
import ImageSlider from '../Search-list/ImageSlider';

function List({ list, setList, post, setModal }) {
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const clickHandler = () => {
    navigate(`/photodetail/${post.id}`);
  };

  const stopPropagate = (e) => {
    e.stopPropagation();
  };

  const modifyHandler = () => {
    dispatch(setPostInfo(post));
    navigate('/modify');
  };

  const deletePost = async (e) => {
    await axios
      .delete(`${process.env.REACT_APP_API_URL}boards/${post.id}`, {
        headers: { authorization: `Bearer ${token}` },
      })
      .then((res) => {
        const filteredlist = list.filter((posts) => {
          return posts.id !== post.id;
        });
        setList(filteredlist);
      });
  };

  return (
    <div className="mylist-body" onClick={clickHandler} aria-hidden="true">
      <div className="slider-container">
        <ul>
          <li className="image-list">
            <ImageSlider image={post.image} />
          </li>
        </ul>
      </div>
      <div className="empty-line" />
      <div className="descript-container">
        <ul>
          <li className="description-title">
            <TiUser className="icon-style" />
            {post.title}
          </li>
          <div className="devide-container">
            <div className="devide">
              <MdOutlineDescription className="icon-style" />
            </div>
            <li className="description-des">{post.description}</li>
          </div>
          <li className="description-address">
            <MdPlace className="icon-style" />
            {post.detailAddress}
          </li>
        </ul>
        <div className="half-container">
          <div
            className="btn-container"
            aria-hidden="true"
            onClick={stopPropagate}
          >
            <button type="button" className="modi-btn" onClick={modifyHandler}>
              수정
            </button>
            <button type="button" className="del-btn" onClick={deletePost}>
              삭제
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default List;
