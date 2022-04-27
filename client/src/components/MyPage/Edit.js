import {} from 'react-router-dom';

export default function Edit() {
  return (
    <div className="mypage-content">
      <div className="inner">
        <div className="content-wrap">
          <div className="content-title">개인정보 변경</div>
          <tbody>
            <tr>
              <th>프로필 사진</th>
              <td>
                <img
                  src="https://static.nid.naver.com/images/web/user/default.png?type=s160"
                  alt=""
                />
              </td>
            </tr>
            <tr>
              <th>이메일</th>
              <td>dbwjdrkddls@naver.com</td>
            </tr>
            <tr>
              <th>닉네임</th>
              <td>운영자</td>
            </tr>
          </tbody>
        </div>
      </div>
    </div>
  );
}
