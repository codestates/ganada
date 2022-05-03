import { useEffect } from 'react';

function KakaoShare() {
  const images = ['/img/kakao.png'];
  const url = window.location.href;
  useEffect(() => {
    initKakao();
  }, []);

  const initKakao = () => {
    if (window.Kakao) {
      const kakao = window.Kakao;
      if (!kakao.isInitialized()) {
        kakao.init(process.env.REACT_APP_KAKAO_APP_KEY);
      }
    }
  };

  // 버튼을 누르면 실행되는 함수
  const shareKakao = () => {
    window.Kakao.Link.sendDefault({
      objectType: 'feed',
      content: {
        title: '딸기 치즈 케익',
        description: '#케익 #딸기 #삼평동 #카페 #분위기 #소개팅',
        imageUrl:
          'http://mud-kage.kakao.co.kr/dn/Q2iNx/btqgeRgV54P/VLdBs9cvyn8BJXB3o7N8UK/kakaolink40_original.png',
        link: {
          mobileWebUrl: url,
          webUrl: url,
        },
      },
      social: {
        likeCount: 286,
        commentCount: 45,
        sharedCount: 845,
      },
    });
  };

  return (
    <button type="button" className="kakao-link-btn" onClick={shareKakao}>
      <img src={images[0]} alt="kakao" className="kakao-icon" />
      카카오톡
    </button>
  );
}

export default KakaoShare;
