export default function AlertModal({ title, sub, setAlert, alert }) {
  const onClick = () => {
    setAlert(false);
  };
  return (
    <div className={alert ? 'alert-modal-back' : 'alert-modal-back active'}>
      <div className="alert-modal">
        <div className="alert-title">{title}</div>
        <div className="alert-middle">{sub}</div>
        <button type="button" className="alert-button" onClick={onClick}>
          확인
        </button>
      </div>
    </div>
  );
}
