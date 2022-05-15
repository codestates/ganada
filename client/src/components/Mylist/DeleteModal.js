export default function DeleteModal({
  open,
  setPopup,
  message,
  title,
  callback,
}) {
  const confirmHandler = () => {
    setPopup({ open: false });
    if (callback) {
      callback();
    }
  };

  const cancleHandler = () => {
    setPopup({ open: false });
  };

  return (
    <div className={open ? 'alert-modal-back' : 'alert-modal-back active'}>
      <div className="alert-modal">
        <div className="alert-title">{title}</div>
        <div className="alert-middle">{message}</div>
        <button
          type="button"
          className="confirm-button"
          onClick={confirmHandler}
        >
          확인
        </button>
        <button type="button" className="cancle-button" onClick={cancleHandler}>
          취소
        </button>
      </div>
    </div>
  );
}
