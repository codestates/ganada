import { useEffect } from 'react';

const { kakao } = window;

function Map({ searchValue, setAddress }) {
  useEffect(() => {
    const mapContainer = document.querySelector('#map');
    const mapOption = {
      center: new kakao.maps.LatLng(37.5662952, 126.9779451),
      level: 4,
    };
    const map = new kakao.maps.Map(mapContainer, mapOption);
    const geocoder = new kakao.maps.services.Geocoder();
    const ps = new kakao.maps.services.Places();
    const marker = new kakao.maps.Marker({
      position: map.getCenter(),
    });
    const infoWindows = [];
    let message =
      '<div style="padding:10px; width:250px;;">원하시는 장소를 클릭해주세요!</div>'; // 인포윈도우에 표시될 내용입니다
    // 키워드로 장소를 검색합니다
    ps.keywordSearch(searchValue, placesSearchCB);
    // 키워드 검색 완료 시 호출되는 콜백함수 입니다
    function placesSearchCB(data, status) {
      if (status === kakao.maps.services.Status.OK) {
        // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
        // LatLngBounds 객체에 좌표를 추가합니다
        const bounds = new kakao.maps.LatLngBounds();
        for (let i = 0; i < data.length; i += 1) {
          bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
        }
        marker.setMap(map);
        openInfoWindow(message);
        // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
        map.setBounds(bounds);
      }
    }
    kakao.maps.event.addListener(map, 'click', function (mouseEvent) {
      // 클릭한 위도, 경도 정보를 가져옵니다
      const latlng = mouseEvent.latLng;
      // 마커 위치를 클릭한 위치로 옮깁니다
      marker.setPosition(latlng);

      const callback = function (result, status) {
        if (status === kakao.maps.services.Status.OK) {
          message = `<div style="padding:10px; width:200px;;">${result[0].address.address_name}</div>`;
          setAddress(result[0].address.address_name);
          openInfoWindow(message);
        }
      };
      geocoder.coord2Address(latlng.getLng(), latlng.getLat(), callback);
    });
    function openInfoWindow(infoMessage) {
      // 인포윈도우를 생성합니다
      const infowindow = new kakao.maps.InfoWindow({
        content: message,
      });

      closeInfoWindow();
      infowindow.open(map, marker);
      infoWindows.push(infowindow);
    }

    function closeInfoWindow() {
      for (let idx = 0; idx < infoWindows.length; idx += 1) {
        infoWindows[idx].close();
      }
    }
  }, [searchValue]);

  return (
    <div id="map" style={{ width: '100%', height: '500px', margin: 'auto' }} />
  );
}

export default Map;
