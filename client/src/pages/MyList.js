import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { setPostsList } from '../redux/myPostsSlice';
import List from '../components/Mylist/List';

function MyList({ setModal }) {
  const { token } = useSelector((state) => state.auth);
  const { id } = useSelector((state) => state.userInfo);
  const { myPosts } = useSelector((state) => state.myPosts);
  const [list, setList] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    getMylist();
  }, []);

  const getMylist = async () => {
    try {
      await axios
        .get(`http://localhost:4000/boards/user/${id}`, {
          headers: { authorization: `Bearer ${token}` },
        })
        .then((res) => {
          console.log(res.data.data);
          dispatch(setPostsList(res.data.data));
          setList(res.data.data);
        });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <div className="mylist-container">
        {list.length > 0 ? (
          list.map((post) => {
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
        ) : (
          <div>없음</div>
        )}
      </div>
    </div>
  );
}

export default MyList;
