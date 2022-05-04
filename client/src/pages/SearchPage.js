import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { BsFillArrowUpCircleFill } from 'react-icons/bs';
import SubNav from '../components/Search-list/SubNav';
import Post from '../components/Search-list/Post';

const images = {
  1: [
    `${process.env.PUBLIC_URL}/img/tpgus/bg_1.jpeg`,
    `${process.env.PUBLIC_URL}/img/tpgus/bg_2.jpeg`,
    `${process.env.PUBLIC_URL}/img/tpgus/bg_3.jpeg`,
  ],

  2: [
    `${process.env.PUBLIC_URL}/img/tpgus/gu_1.jpeg`,
    `${process.env.PUBLIC_URL}/img/tpgus/gu_2.jpeg`,
    `${process.env.PUBLIC_URL}/img/tpgus/gu_3.jpeg`,
  ],

  3: [
    `${process.env.PUBLIC_URL}/img/tpgus/kg_1.jpeg`,
    `${process.env.PUBLIC_URL}/img/tpgus/kg_2.jpeg`,
    `${process.env.PUBLIC_URL}/img/tpgus/kg_3.jpeg`,
  ],
  4: [
    `${process.env.PUBLIC_URL}/img/tpgus/md_1.jpeg`,
    `${process.env.PUBLIC_URL}/img/tpgus/md_2.jpeg`,
    `${process.env.PUBLIC_URL}/img/tpgus/md_3.jpeg`,
  ],
  5: [
    `${process.env.PUBLIC_URL}/img/tpgus/sz_1.jpeg`,
    `${process.env.PUBLIC_URL}/img/tpgus/sz_2.jpeg`,
    `${process.env.PUBLIC_URL}/img/tpgus/sz_3.jpeg`,
  ],
  6: [
    `${process.env.PUBLIC_URL}/img/tpgus/zh_1.jpeg`,
    `${process.env.PUBLIC_URL}/img/tpgus/zh_2.jpeg`,
    `${process.env.PUBLIC_URL}/img/tpgus/zh_3.jpeg`,
  ],
  7: [
    `${process.env.PUBLIC_URL}/img/tpgus/zh_1.jpeg`,
    `${process.env.PUBLIC_URL}/img/tpgus/zh_2.jpeg`,
    `${process.env.PUBLIC_URL}/img/tpgus/zh_3.jpeg`,
  ],
  8: [
    `${process.env.PUBLIC_URL}/img/tpgus/zh_1.jpeg`,
    `${process.env.PUBLIC_URL}/img/tpgus/zh_2.jpeg`,
    `${process.env.PUBLIC_URL}/img/tpgus/zh_3.jpeg`,
  ],
  9: [
    `${process.env.PUBLIC_URL}/img/tpgus/zh_1.jpeg`,
    `${process.env.PUBLIC_URL}/img/tpgus/zh_2.jpeg`,
    `${process.env.PUBLIC_URL}/img/tpgus/zh_3.jpeg`,
  ],
  10: [
    `${process.env.PUBLIC_URL}/img/tpgus/zh_1.jpeg`,
    `${process.env.PUBLIC_URL}/img/tpgus/zh_2.jpeg`,
    `${process.env.PUBLIC_URL}/img/tpgus/zh_3.jpeg`,
  ],
};

function SearchPage() {
  const params = useParams();
  const [tags, setTags] = useState([]);

  const goToTopHandler = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="searchPage-container">
      <SubNav setTags={setTags} />
      <div className="searchPage-body">
        {['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'].map((item) => {
          return <Post key={item} image={images[item]} />;
        })}
      </div>
      <BsFillArrowUpCircleFill
        className="top-icon"
        size="50"
        onClick={goToTopHandler}
      />
    </div>
  );
}

export default SearchPage;
