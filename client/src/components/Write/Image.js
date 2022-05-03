import React, { useRef, useState } from 'react';
import { MdPhotoCamera } from 'react-icons/md';
import { AiOutlinePlus } from 'react-icons/ai';

function Image() {
  const inputImageRef = useRef(null);
  const [imageSrc, setImageSrc] = useState('');

  const clickHandler = () => {
    inputImageRef.current.click();
  };

  const imageUploadHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setImageSrc(reader.result);
    };
  };

  const deleteImageHandler = () => {
    setImageSrc('');
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
          accept="image/jpg,impge/png,image/jpeg"
          onChange={imageUploadHandler}
          ref={inputImageRef}
        />
        {imageSrc ? (
          <img src={imageSrc} alt="preview-img" />
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
