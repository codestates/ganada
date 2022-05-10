import { AiOutlineCheckCircle } from 'react-icons/ai';

export default function AlertMessage({ message }) {
  return (
    <div className="alert-box">
      <AiOutlineCheckCircle className="alert-icon" size="20" />
      <span className="alert-sub">{message}</span>
    </div>
  );
}
