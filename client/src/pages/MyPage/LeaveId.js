/* eslint-disable jsx-a11y/label-has-associated-control */
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

export default function LeaveId({ setModal }) {
  const navigate = useNavigate();
  const userInfo = useSelector((state) => state.userInfo);
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const deleteUser = () => {
    axios
      .delete(
        `${process.env.REACT_APP_API_URL}/users/${userInfo.id}`,
        {
          headers: { authorization: `Bearer ${token}` },
        },
        {
          withCredentials: true,
        },
      )
      .then((res) => {
        localStorage.removeItem('Token');
        dispatch({ type: 'auth/isLogout' });
        setModal({
          open: true,
          title: '탈퇴가 완료되었습니다.',
          callback: () => {
            navigate('/');
          },
        });
      });
  };

  return (
    <div className="mypage-content">
      <div className="inner">
        <div className="content-wrap">
          <div className="content-title">회원탈퇴</div>
          <div className="leave-wrap">
            <ul>
              <div className="leave-title">
                회원 탈퇴 시 개인정보 및 모든 서비스 이용 기록 삭제됩니다.
              </div>
              <li>
                모든 개인정보 및 개인화 서비스 삭제 / 게시글 삭제 / 채팅 삭제
              </li>
              <li>
                회원 탈퇴 처리 후에는 개인정보를 복원할 수 없으므로 미리 백업해
                두시길 바랍니다.
              </li>
            </ul>
            <div className="leave-checkbox-wrap">
              <input type="checkbox" id="leave-check" />
              <label htmlFor="leave-check">
                회원탈퇴 유의사항을 모두 확인하였으며 동의합니다.
              </label>
            </div>
          </div>
          <div className="btn-wrap">
            <Link to="/">
              <button type="submit">비동의</button>{' '}
            </Link>
            <button className="active" type="submit" onClick={deleteUser}>
              탈퇴
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
