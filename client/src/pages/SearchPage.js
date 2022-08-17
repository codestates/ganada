import { useEffect, useState, useRef, useCallback } from 'react';
import axios from 'axios';
import { BsFillArrowUpCircleFill } from 'react-icons/bs';
import { useSelector, useDispatch } from 'react-redux';
import NoContents from '../components/NoContents';
import { setKeyword } from '../redux/searchConditionSlice';
import SubNav from '../components/Search-list/SubNav';
import Post from '../components/Search-list/Post';

function SearchPage({ setModal }) {
  const [topBtn, setTopBtn] = useState(false);
  const [posts, setPosts] = useState([]);
  const outterRef = useRef();
  const dispatch = useDispatch();
  const { keyword, tags, type, bookingStatus } = useSelector(
    (state) => state.searchCondition,
  );

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
  }, [dispatch]);

  const getPosts = useCallback(async () => {
    await axios
      .get(
        `${
          process.env.REACT_APP_API_URL
        }/boards?category=${type}&keyword=${keyword}&tags=${tags}&status=${Number(
          !bookingStatus,
        )}`,
        { withCredentials: true },
      )
      .then((res) => {
        setPosts(res.data.data);
      });
  }, [keyword, type, tags, bookingStatus]);

  useEffect(() => {
    getPosts();
  }, [getPosts]);

  return (
    <div className="serachPage">
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
    </div>
  );
}

export default SearchPage;
