import { useEffect } from 'react';
import { useSelector } from 'react-redux';

function KakaoShare() {
  const images = ['/img/kakao.png'];
  const url = window.location.href;
  const { postState } = useSelector((state) => state.postInfo);
  const parsedImage = postState.image.split(',');
  const imagesPath = `${process.env.REACT_APP_API_URL}images/${parsedImage[0]}`;
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
        title: postState.title,
        description: postState.description,
        imageUrl: 'http://localhost:4000/images/1652415624647wbb3.png',
        // 'https://mud-kage.kakao.com/dn/NTmhS/btqfEUdFAUf/FjKzkZsnoeE4o19klTOVI1/openlink_640x640s.jpg',
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
