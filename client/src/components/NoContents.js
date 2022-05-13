import { GrDocumentMissing } from 'react-icons/gr';

function NoContents({ message }) {
  return (
    <div className="no-contents-container">
      <h1>{message}</h1>
      <h2>데이터가 존재하지 않습니다.</h2>
      <GrDocumentMissing size="300" color="red" />
    </div>
  );
}

export default NoContents;
