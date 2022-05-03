/* eslint-disable jsx-a11y/label-has-associated-control */
export default function LeaveId() {
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
            <button type="submit">비동의</button>
            <button className="active" type="submit">
              탈퇴
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
