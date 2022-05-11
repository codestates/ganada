import { useEffect } from 'react';

const { kakao } = window;
function PhotoDetailMap({ post }) {
  useEffect(() => {
    const container = document.querySelector('.map');
    const options = {
      center: new kakao.maps.LatLng(post.latitude, post.longitude),
      level: 3,
    };

    const map = new kakao.maps.Map(container, options);
    const markerPosition = new kakao.maps.LatLng(post.latitude, post.longitude);
    const marker = new kakao.maps.Marker({
      position: markerPosition,
    });
    marker.setMap(map);
    const iwContent = `<div style="font-size: 13px; padding:10px 0 10px 10px;">이곳에 위치하고 있어요!<br><a href="https://map.kakao.com/link/map/${post.mainAddress} ${post.detailAddress},${post.latitude},${post.longitude}" style="color:blue" target="_blank">큰지도보기</a> <a href="https://map.kakao.com/link/to/${post.mainAddress} ${post.detailAddress},${post.latitude},${post.longitude}" style="color:blue" target="_blank">길찾기</a></div>`;
    const iwPosition = new kakao.maps.LatLng(post.latitude, post.longitude);
    // 인포윈도우를 생성합니다
    const infowindow = new kakao.maps.InfoWindow({
      position: iwPosition,
      content: iwContent,
    });
    // 마커 위에 인포윈도우를 표시합니다. 두번째 파라미터인 marker를 넣어주지 않으면 지도 위에 표시됩니다
    infowindow.open(map, marker);

    const zoomControl = new kakao.maps.ZoomControl();
    map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);
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
