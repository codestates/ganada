import React, { useRef, useState } from 'react';
import { MdPhotoCamera } from 'react-icons/md';
import { AiOutlinePlus } from 'react-icons/ai';

function Image({ setImages, setModal }) {
  const inputImageRef = useRef(null);
  const [imageSrc, setImageSrc] = useState('');

  const clickHandler = () => {
    inputImageRef.current.click();
  };

  const imageUploadHandler = (e) => {
    const nowSelectImageList = e.target.files;
    if (Object.keys(nowSelectImageList).length > 3) {
      setModal({
        open: true,
        title: '이미지는 최대 3개까지 업로드 가능합니다.',
      });
      return;
    }
    setImages(nowSelectImageList);
    const nowImageURLList = [...imageSrc];
    for (let i = 0; i < nowSelectImageList.length; i += 1) {
      const nowImageUrl = URL.createObjectURL(nowSelectImageList[i]);
      nowImageURLList.push(nowImageUrl);
    }
    setImageSrc(nowImageURLList);
  };

  const deleteImageHandler = () => {
    setImageSrc('');
    setImages('');
  };

  return (
    <div className="image-wrapper">
      <div
        className={imageSrc ? 'image-inner hidden' : 'image-inner'}
        aria-hidden="true"
        onClick={clickHandler}
      >
        <input
          type="file"
          className="insert-image"
          accept="image/jpg,image/png,image/jpeg"
          onChange={imageUploadHandler}
          ref={inputImageRef}
          multiple
        />
        {imageSrc ? (
          imageSrc.map((image) => {
            return <img src={image} alt="preview-img" />;
          })
        ) : (
          <>
            <MdPhotoCamera size="40" style={{ color: 'lightgray' }} />
            <AiOutlinePlus size="20" style={{ color: 'gray' }} />
          </>
        )}
      </div>
      {imageSrc && (
        <button
          type="button"
          className="btn-delete-image"
          onClick={deleteImageHandler}
        >
          삭제
        </button>
      )}
    </div>
  );
}
export default Image;
