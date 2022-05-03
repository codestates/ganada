import { useEffect } from 'react';

const { kakao } = window;

function KakaoMap({ data }) {
  useEffect(() => {
    const container = document.getElementById('map');
    const options = {
      center: new kakao.maps.LatLng(33.450701, 126.570667),
      level: 3,
    };

    const map = new kakao.maps.Map(container, options);
    const imageSrc =
      'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png';

    for (let i = 0; i < data.length; i += 1) {
      // 마커 이미지의 이미지 크기 입니다
      const imageSize = new kakao.maps.Size(24, 35);

      // 마커 이미지를 생성합니다
      const markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);

      // 마커를 생성합니다
      const marker = new kakao.maps.Marker({
        map, // 마커를 표시할 지도
        position: new kakao.maps.LatLng(data[i].lat, data[i].lng), // 마커를 표시할 위치
        // title: data[i].title, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
      });
    }
    map.setCenter(new kakao.maps.LatLng(37.5662952, 126.9779451));
  }, []);
  return <div id="map" />;
}

export default KakaoMap;
