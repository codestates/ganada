import { useEffect, useState, useRef } from 'react';
import { BsFillArrowUpCircleFill } from 'react-icons/bs';
import { useSelector } from 'react-redux';
import axios from 'axios';
import SubNav from '../components/Search-list/SubNav';
import Post from '../components/Search-list/Post';

function SearchPage({ setModal }) {
  const [topBtn, setTopBtn] = useState(false);
  const outterRef = useRef();
  const { keyword, tags, type } = useSelector((state) => state.searchCondition);
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

  // useEffect(() => {
  window.addEventListener('scroll', handleScroll);
  // }, []);

  useEffect(() => {
    // console.log(tags);
    // console.log(type);
    // console.log(keyword);
    // console.log(posts);
    getPosts();
  }, [tags, type, keyword]);

  const getPosts = async () => {
    await axios
      .get(
        `http://localhost:4000/boards?category=${type}&keyword=${keyword}&tags=${tags}`,
        { withCredentials: true },
      )
      .then((res) => {
        setPosts(res.data.data);
        // console.log(posts);
      });
  };
  console.log(posts);

  return (
    <div className="searchPage-container">
      <SubNav dropdownRef={outterRef} setModal={setModal} />
      <div className="searchPage-body">
        {posts.length > 0 &&
          posts.map((post) => {
            return <Post key={post.id} post={post} />;
          })}
      </div>
      <BsFillArrowUpCircleFill
        className={topBtn ? 'top-icon' : 'top-icon hidden'}
        size="50"
        onClick={goToTopHandler}
      />
    </div>
  );
}

export default SearchPage;
