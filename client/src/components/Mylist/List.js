// import { useEffect, useState } from 'react';
// import axios from 'axios';
import { Link } from 'react-router-dom';
import ImageSlider from '../Search-list/ImageSlider';

function List({ post, token }) {
  //   useEffect(() => {
  //     axios
  //       .get('http://localhost:4000/', {
  //         headers: { authorization: `Bearer ${token}` },
  //       })
  //       .then((res) => {
  //         console.log(res);
  //       });
  //   });

  return (
    <div className="mylist-body">
      <div className="slider-container">
        <ul>
          <li className="image-list">
            <ImageSlider />
          </li>
        </ul>
      </div>
      <div className="empty-line" />
      <div className="descript-container">
        <ul>
          <li className="description-title">{post.title}</li>
          <li className="description-des">{post.description}</li>
          <li className="description-address">{post.detailAddress}</li>
        </ul>
        <div className="btn-container">
          <Link to="/modify">
            <button type="button" className="modi-btn">
              수정
            </button>
          </Link>
          <button type="button" className="del-btn">
            삭제
          </button>
        </div>
      </div>
    </div>
  );
}

export default List;
