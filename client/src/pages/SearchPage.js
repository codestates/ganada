import { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { BsFillArrowUpCircleFill } from 'react-icons/bs';
import { useSelector, useDispatch } from 'react-redux';
import NoContents from '../components/NoContents';
import { setKeyword } from '../redux/searchConditionSlice';
import SubNav from '../components/Search-list/SubNav';
import Post from '../components/Search-list/Post';

function SearchPage({ setModal }) {
  const [topBtn, setTopBtn] = useState(false);
  const outterRef = useRef();
  const dispatch = useDispatch();
  const { keyword, tags, type, bookingStatus } = useSelector(
    (state) => state.searchCondition,
  );
  const [posts, setPosts] = useState([]);

  const goToTopHandler = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  const handleScroll = () => {
    const position = window.pageYOffset;

    if (position > 0) {
      setTopBtn(true);
    } else if (position === 0) {
      setTopBtn(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      dispatch(setKeyword(''));
    };
  }, []);

  useEffect(() => {
    getPosts();
  }, [type, tags, keyword, bookingStatus]);

  useEffect(() => {
    return () => {
      dispatch(setKeyword(''));
    };
  }, []);

  const getPosts = async () => {
    await axios
      .get(
        `http://localhost:4000/boards?category=${type}&keyword=${keyword}&tags=${tags}&status=${Number(
          !bookingStatus,
        )}`,
        { withCredentials: true },
      )
      .then((res) => {
        setPosts(res.data.data);
      });
  };

  return (
    <div className="searchPage-container">
      <div>
        <SubNav dropdownRef={outterRef} setModal={setModal} />
        <div className="searchPage-body">
          {posts.length > 0 ? (
            posts.map((post) => {
              return <Post key={post.id} post={post} />;
            })
          ) : (
            <NoContents message={"We're Sorry! :("} />
          )}
        </div>
        <BsFillArrowUpCircleFill
          className={topBtn ? 'top-icon' : 'top-icon hidden'}
          size="50"
          onClick={goToTopHandler}
        />
      </div>
    </div>
  );
}

export default SearchPage;
