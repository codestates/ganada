/* eslint-disable jsx-a11y/label-has-associated-control */
import { MdPhotoCamera } from 'react-icons/md';
import { useState } from 'react';

export default function Edit() {
  // input value change
  const [inputValue, setInputValue] = useState({
    nickname: '운영자',
    phoneNumber: '01012345678',
  });
  const [err, setErr] = useState({});

  const handleInput = (e) => {
    const { name, value } = e.target;
    setInputValue({
      ...inputValue,
      [name]: value,
    });
  };

  // error test
  const errCheck = (value) => {
    const errors = {};
    const { nickname, phoneNumber } = value;

    if (nickname !== '' && !/^[\w\Wㄱ-ㅎㅏ-ㅣ가-힣]{2,20}$/.test(nickname)) {
      errors.nickname = '최소 2글자이상 특수문자 제외';
    }
    if (
      phoneNumber !== '' &&
      !/^(01[016789]{1}|02|0[3-9]{1}[0-9]{1})([0-9]{3,4})([0-9]{4})$/.test(
        phoneNumber,
      )
    ) {
      errors.phoneNumber = '전화번호가 옳바르지 않습니다.';
    }

    return errors;
  };

  // 포커스를 빠져나왔을 경우 유효성 검사!
  const focusBlur = (e) => {
    setErr(errCheck(inputValue));
  };

  // 이미지 변경
  const [imageSrc, setImageSrc] = useState(
    'https://static.nid.naver.com/images/web/user/default.png?type=s160',
  );
  const encodeFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    return new Promise(() => {
      reader.onload = () => {
        setImageSrc(reader.result);
      };
    });
  };

  const deleteImg = () => {
    setImageSrc(
      'https://static.nid.naver.com/images/web/user/default.png?type=s160',
    );
  };

  return (
    <div className="mypage-content">
      <div className="inner">
        <div className="content-wrap">
          <div className="content-title">개인정보 변경</div>
          <tbody>
            <tr>
              <th>프로필 사진</th>
              <td>
                <div className="profile">
                  <button type="button" onClick={deleteImg}>
                    사진삭제
                  </button>

                  {imageSrc && <img src={imageSrc} alt="preview-img" />}

                  <input
                    type="file"
                    id="file"
                    onChange={(e) => {
                      encodeFile(e.target.files[0]);
                    }}
                  />

                  <label className="icon-wrap" htmlFor="file">
                    <MdPhotoCamera size="23" />
                  </label>
                </div>
              </td>
            </tr>
            <tr>
              <th>이메일</th>
              <td>dbwjdrkddls@naver.com</td>
            </tr>
            <tr>
              <th>닉네임</th>
              <td>
                <input
                  name="nickname"
                  value={inputValue.nickname}
                  onChange={handleInput}
                  onBlur={focusBlur}
                />
                <div className="warning">{err.nickname} </div>
              </td>
            </tr>
            <tr>
              <th>전화번호</th>
              <td>
                <input
                  value={inputValue.phoneNumber}
                  name="phoneNumber"
                  onChange={handleInput}
                  onBlur={focusBlur}
                />
                <div className="warning">{err.phoneNumber} </div>
              </td>
            </tr>
          </tbody>
          <div className="btn-wrap">
            <button className={err === null ? 'active' : null} type="submit">
              취소
            </button>
            <button type="submit" className="active">
              적용
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}