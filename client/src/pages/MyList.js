import axios from 'axios';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import NoContents from '../components/NoContents';
import Header from '../components/Mylist/Header';
import List from '../components/Mylist/List';

function MyList() {
  const { id } = useSelector((state) => state.userInfo);
  const [list, setList] = useState([]);

  useEffect(() => {
    const getMylist = async () => {
      try {
        await axios
          .get(`${process.env.REACT_APP_API_URL}/boards/user/${id}`, {
            withCredentials: true,
          })
          .then((res) => {
            setList(res.data.data);
          });
      } catch (err) {
        console.log(err);
      }
    };
    getMylist();
  }, [id]);

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
