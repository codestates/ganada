/* eslint-disable jsx-a11y/label-has-associated-control */
import { MdPhotoCamera } from 'react-icons/md';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Edit({ userInfo, isLogin, setModal, setUserInfo }) {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState({
    name: userInfo.name,
    phoneNumber: userInfo.phoneNumber,
  });
  const [err, setErr] = useState({});
  const [file, setFile] = useState('');
  const [imageSrc, setImageSrc] = useState('');
  const defaultImage =
    'https://static.nid.naver.com/images/web/user/default.png?type=s160';
  // const Folder = process.env.REACT_APP_IMAGE_FOLDER;
  const imagesPath = `http://localhost:4000/images/`;

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
    const { name, phoneNumber } = value;

    if (name === '' || !/^[\w\Wㄱ-ㅎㅏ-ㅣ가-힣]{2,20}$/.test(name)) {
      errors.name = '최소 2글자이상 특수문자 제외';
    }
    if (
      name === '' ||
      !/^(01[016789]{1}|02|0[3-9]{1}[0-9]{1})([0-9]{3,4})([0-9]{4})$/.test(
        phoneNumber,
      )
    ) {
      errors.phoneNumber = '전화번호가 올바르지 않습니다.';
    }

    return errors;
  };

  // 포커스를 빠져나왔을 경우 유효성 검사!
  const focusBlur = (e) => {
    setErr(errCheck(inputValue));
  };

  // 이미지 미리보기
  const encodeFile = (e) => {
    const reader = new FileReader();
    reader.readAsDataURL(e);
    return new Promise(() => {
      reader.onload = () => {
        setImageSrc(reader.result);
      };
    });
  };

  const deleteImg = () => {
    setImageSrc(defaultImage);
    setFile(defaultImage);
  };

  console.log(file);
  const modifyUsersInfo = async () => {
    const patchData = {
      id: userInfo.id,
      name: inputValue.name,
      phoneNumber: inputValue.phoneNumber,
    };
    if (file) {
      const data = new FormData();
      const fileName = Date.now() + file.name;
      console.log(fileName);
      data.append('name', fileName);
      data.append('file', file);
      patchData.image = fileName;
      try {
        await axios.post('http://localhost:4000/users/images', data);
      } catch (error) {
        console.log(error);
      }
    }
    if (Object.keys(err).length !== 0) {
      setModal({
        open: true,
        title: '다시한번 확인해주세요',
      });
    } else {
      try {
        await axios
          .patch(
            `http://localhost:4000/users/${userInfo.id}/changeInfo`,
            patchData,
            {
              headers: { authorization: `Bearer ${isLogin}` },
            },
            {
              withCredentials: true,
            },
          )
          .then((res) => {
            setUserInfo({ ...userInfo, ...res.data.data });
            setModal({
              open: true,
              title: '변경이 완료되었습니다.',
            });
          });
      } catch (error) {
        console.log(error);
      }
    }
  };
  console.log(userInfo.image);
  // 사진 삭제 누르면 이미지가 기본으로 바뀌어야함.
  // 이미지를 누르면 파일로 바뀌어야함
  // 파일을 누르면 내가지금 누른 이미지의 이미지가 바뀌어야함
  // 만약 이미지가 null 일경우 naver
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
                  <img
                    src={
                      // eslint-disable-next-line no-nested-ternary
                      file
                        ? imageSrc
                        : userInfo.image === null
                        ? defaultImage
                        : imagesPath + userInfo.image
                    }
                    alt="imagd"
                  />
                  <input
                    type="file"
                    id="file"
                    accept=".png, .jpeg, .jpg"
                    onChange={(e) => {
                      encodeFile(e.target.files[0]);
                      setFile(e.target.files[0]);
                    }}
                    multiple
                  />
                  <label className="icon-wrap" htmlFor="file">
                    <MdPhotoCamera size="23" />
                  </label>
                </div>
              </td>
            </tr>
            <tr>
              <th>이메일</th>
              <td>{userInfo.email}</td>
            </tr>
            <tr>
              <th>닉네임</th>
              <td>
                <input
                  name="name"
                  value={inputValue.name}
                  onChange={handleInput}
                  onBlur={focusBlur}
                />
                <div className="warning">{err.name} </div>
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
            <button type="submit" className="active" onClick={modifyUsersInfo}>
              적용
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
