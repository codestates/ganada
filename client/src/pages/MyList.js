import axios from 'axios';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import List from '../components/Mylist/List';
import Header from '../components/Mylist/Header';

function MyList({ setModal }) {
  const { id } = useSelector((state) => state.userInfo);
  const [list, setList] = useState([]);

  useEffect(() => {
    const getMylist = async () => {
      try {
        await axios
          .get(`${process.env.REACT_APP_API_URL}boards/user/${id}`)
          .then((res) => {
            setList(res.data.data);
          });
      } catch (err) {
        console.log(err);
      }
    };
    getMylist();
  }, []);

  return (
    <div className="mylist-container">
      <Header />
      {list.length > 0
        ? list.map((post) => {
            return (
              <List
                key={post.id}
                post={post}
                list={list}
                setList={setList}
                setModal={setModal}
              />
            );
          })
        : null}
    </div>
  );
}

export default MyList;
