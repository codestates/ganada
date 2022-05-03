export default function Modal({ open, setPopup, message, title, callback }) {
  const handleClose = () => {
    setPopup({ open: false });
    if (callback) {
      callback();
    }
  };

  return (
    <div className={open ? 'alert-modal-back' : 'alert-modal-back active'}>
      <div className="alert-modal">
        <div className="alert-title">{title}</div>
        <div className="alert-middle">{message}</div>
        <button type="button" className="alert-button" onClick={handleClose}>
          확인
        </button>
      </div>
    </div>
  );
}
