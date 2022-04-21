import ShopInfo from 'components/shop-list/ShopInfo';
import KakaoMap from 'components/shop-list/KakaoMap';
import SubNav from 'components/shop-list/SubNav';
import { shops } from '../assets/dummyData';

function ShopList() {
  return (
    <div>
      <div className="temporayHeader">임시 헤더</div>
      <SubNav />
      <div id="container">
        <div className="shop-list">
          {shops.map((shop) => {
            return <ShopInfo key={shop.id} shop={shop} />;
          })}
        </div>
        <KakaoMap />
      </div>
    </div>
  );
}

export default ShopList;
