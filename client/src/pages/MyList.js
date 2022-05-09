import { useState } from 'react';
import Header from '../components/Mylist/Header';
import List from '../components/Mylist/List';
import { data } from '../assets/dummyData';

function MyList() {
  const [posts, setPosts] = useState(data);

  return (
    <div className="mylist-container">
      {posts.map((post) => {
        return <List key={post.id} post={post} />;
      })}
    </div>
  );
}

export default MyList;
