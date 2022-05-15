import { useState, useRef } from 'react';
import { ImCross } from 'react-icons/im';
import Map from './Map';
import Modal from '../Modal';

function SelectPlaceModal({ modalHandler }) {
  const [inputText, setInputText] = useState('');
  const [searchValue, setSearchValue] = useState('서울광장');
  const [address, setAddress] = useState('');
  const [latlng, setLatLng] = useState({});

  function handleSubmit(e) {
    e.preventDefault();
    if (!inputText) {
      return;
    }
    setSearchValue(inputText);
    setInputText('');
  }

  function inputHandler(e) {
    setInputText(e.target.value);
  }

  return (
    <>
      <Modal />
      <div className="map-modal-background">
        <div className="map-modal-container">
          <form className="input-area" onSubmit={handleSubmit}>
            <input
              placeholder="지역명, 지하철역, 동이름으로 검색"
              onChange={inputHandler}
              value={inputText}
            />
            <button className="btn-search" type="button" onClick={handleSubmit}>
              검색
            </button>
            <ImCross size="20" className="btn-cancle" onClick={modalHandler} />
          </form>
          <Map
            searchValue={searchValue}
            setAddress={setAddress}
            setLatLng={setLatLng}
          />
          <div className="save-area">
            <input type="text" value={address} disabled />
            <button
              className="btn-save"
              type="button"
              onClick={() => modalHandler(address, latlng)}
            >
              저장하기
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default SelectPlaceModal;
