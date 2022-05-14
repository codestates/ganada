import axios from 'axios';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import NoContents from '../components/NoContents';
import List from '../components/Mylist/List';
import Header from '../components/Mylist/Header';

function MyList() {
  const { id } = useSelector((state) => state.userInfo);
  const [list, setList] = useState([]);

  useEffect(() => {
    const getMylist = async () => {
      try {
        await axios
          .get(`http://localhost:4000/boards/user/${id}`)
          .then((res) => {
            console.log(res.data.data);
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
      {list.length > 0 ? (
        list.map((post) => {
          return (
            <List key={post.id} post={post} list={list} setList={setList} />
          );
        })
      ) : (
        <NoContents message={"We're Sorry! :("} />
      )}
    </div>
  );
}

export default MyList;
