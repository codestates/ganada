import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { MdPlace, MdOutlineDescription } from 'react-icons/md';
import { FaCheck } from 'react-icons/fa';
import { TiUser } from 'react-icons/ti';
import { useState } from 'react';
import { setPostInfo } from '../../redux/postInfoSlice';
import ImageSlider from '../Search-list/ImageSlider';
import DeleteModal from './DeleteModal';

function List({ list, post, setList }) {
  const { token } = useSelector((state) => state.auth);
  const [reservationStatus, setReservationStatus] = useState(post.status);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [modal, setModal] = useState({
    open: false,
    title: '',
    message: '',
    callback: false,
  });
  const clickHandler = () => {
    navigate(`/photodetail/${post.id}`);
  };

  const stopPropagate = (e) => {
    e.stopPropagation();
  };

  const modifyHandler = () => {
    dispatch(setPostInfo(post));
    navigate('/modify');
  };

  const reservationHandler = async () => {
    try {
      setModal({
        open: true,
        title: '예약을 종료하시겠습니까?',
        callback: async () => {
          await axios
            .put(
              `${process.env.REACT_APP_API_URL}/boards/${post.id}`,
              { status: 1 },
              {
                headers: {
                  'content-type': 'application/json',
                  authorization: `Bearer ${token}`,
                },
              },
              {
                withCredentials: true,
              },
            )
            .then((res) => {
              if (res.status === 200) {
                setReservationStatus(1);
              }
            });
        },
      });
    } catch (err) {
      console.log(err);
    }
  };

  const deletePost = async (e) => {
    setModal({
      open: true,
      title: '삭제 하시겠습니까?',
      callback: async () => {
        await axios
          .delete(`${process.env.REACT_APP_API_URL}/boards/${post.id}`, {
            headers: { authorization: `Bearer ${token}` },
          })
          .then((res) => {
            const filteredlist = list.filter((posts) => {
              return posts.id !== post.id;
            });
            setList(filteredlist);
          });
      },
    });
  };

  return (
    <>
      <DeleteModal
        open={modal.open}
        setPopup={setModal}
        message={modal.message}
        title={modal.title}
        callback={modal.callback}
      />
      <div className="mylist-body" onClick={clickHandler} aria-hidden="true">
        <div className="slider-container">
          <ul>
            <li className="image-list">
              <ImageSlider image={post.image} />
            </li>
          </ul>
        </div>
        <div className="empty-line" />
        <div className="descript-container">
          <ul>
            <li className="description-title">
              <TiUser className="icon-style" />
              {post.title}
            </li>
            <div className="devide-container">
              <div className="devide">
                <MdOutlineDescription className="icon-style" />
              </div>
              <li className="description-des">{post.description}</li>
            </div>
            <li className="description-address">
              <MdPlace className="icon-style" />
              {post.detailAddress}
            </li>
            <li
              className={
                reservationStatus === 1
                  ? 'reservation-status'
                  : 'hidden-reservation-status'
              }
            >
              <FaCheck className="icon-style" />
              예약이 종료된 게시글입니다
            </li>
          </ul>
          <div className="half-container">
            <div
              className="btn-container"
              aria-hidden="true"
              onClick={stopPropagate}
            >
              <button
                type="button"
                onClick={reservationHandler}
                className={
                  reservationStatus === 1
                    ? 'hidden-btn-reservation'
                    : 'btn-reservation'
                }
              >
                예약 종료
              </button>
              <button
                type="button"
                className="modi-btn"
                onClick={modifyHandler}
              >
                수정
              </button>
              <button type="button" className="del-btn" onClick={deletePost}>
                삭제
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default List;
