import { IoIosArrowBack } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';

function PhotoDetailImage() {
  const images = ['/img/1.png', '/img/2.png', '/img/3.png'];
  const navigate = useNavigate();

  const goBack = () => {
    navigate('/photodetail');
  };

  return (
    <div className="whole-container ">
      <div className="header-container">
        <div className="back-container">
          <button type="button" className="back-btn" onClick={goBack}>
            <IoIosArrowBack />
          </button>
        </div>
      </div>
      <div className="body-container">
        <div className="body-container-one">
          <img src={images[0]} alt="nunu1" />
        </div>
        <div className="body-container-two">
          <img src={images[1]} alt="nunu1" />
        </div>
        <div className="body-container-three">
          <img src={images[2]} alt="nunu1" />
        </div>
      </div>
    </div>
  );
}
export default PhotoDetailImage;
