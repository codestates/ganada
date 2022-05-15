import { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import MainContentsBox from './MainContentsBox';

export default function MainContents() {
  const [isTrue, setIsTrue] = useState(false);
  const [isTrue2, setIsTrue2] = useState(false);
  const [photographerPosts, setPhotographerPosts] = useState(false);
  const [modelPosts, setModelPosts] = useState(false);
  const inSection = useRef();
  const handleScroll = () => {
    const position = window.pageYOffset;
    if (position >= 10) {
      setIsTrue(true);
    } else {
      setIsTrue(false);
    }

    if (position >= 750) {
      setIsTrue2(true);
    } else {
      setIsTrue2(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const getPost = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_API_URL}/boards?category=&keyword=&tags=&status=`,
        );
        setPhotographerPosts(res.data.data);
      } catch (err) {
        console.log(err);
      }
    };
    getPost();
  }, []);

  useEffect(() => {
    const getPost = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_API_URL}/boards?category=model&keyword=&tags=&status=`,
        );
        setModelPosts(res.data.data);
      } catch (err) {
        console.log(err);
      }
    };
    getPost();
  }, []);

  return (
    <div className="main-contents">
      <div className="inner">
        <div className="title">오늘의 모델</div>

        <div
          className={isTrue ? 'main-box-wrraper active' : 'main-box-wrraper'}
        >
          <div className="box-wrraper" useRef={inSection}>
            {modelPosts &&
              modelPosts.slice(0, 6).map((post) => (
                <Link to={`photodetail/${post.id}`}>
                  <MainContentsBox post={post} />
                </Link>
              ))}
          </div>
        </div>

        <div className="title">오늘의 작가</div>
        <div
          className={isTrue2 ? 'main-box-wrraper active' : 'main-box-wrraper'}
        >
          <div className="box-wrraper">
            {photographerPosts &&
              photographerPosts.slice(0, 6).map((post) => (
                <Link to={`photodetail/${post.id}`}>
                  <MainContentsBox post={post} />
                </Link>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
