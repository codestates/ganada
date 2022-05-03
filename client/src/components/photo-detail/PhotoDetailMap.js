import { useEffect } from 'react';

const { kakao } = window;
function PhotoDetailMap() {
  useEffect(() => {
    const container = document.querySelector('.map');
    const options = {
      center: new kakao.maps.LatLng(33.450701, 126.570667),
      level: 3,
    };

    const map = new kakao.maps.Map(container, options);
  }, []);
  return (
    <div className="map-container">
      <div className="map-sub-container">
        <div className="map" style={{ width: '100%', height: '100%' }} />
      </div>
    </div>
  );
}

export default PhotoDetailMap;
