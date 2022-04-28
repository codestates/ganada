import { useState, useEffect } from 'react';
import PlaceList from '../components/place-list/PlaceList';
import KakaoMap from '../components/place-list/KakaoMap';
import SubNav from '../components/place-list/SubNav';
import Pagination from '../components/place-list/Pagination';
import { data } from '../assets/dummyData';

function SearchPlace() {
  const [posts, setPosts] = useState(data);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(3);
  // get current post
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  useEffect(() => {
    // setLoading(true);
    // console.log('axios 데이터 요청');
    // setLoading(false);
  }, []);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="place-list-container">
      <SubNav />
      <div className="wrapper">
        <div className="place-list">
          {currentPosts.map((post) => {
            return <PlaceList key={post.id} post={post} />;
          })}
          <Pagination
            postsPerPage={postsPerPage}
            totalPosts={posts.length}
            currentPage={currentPage}
            paginate={paginate}
          />
        </div>
        <KakaoMap />
      </div>
    </div>
  );
}

export default SearchPlace;
