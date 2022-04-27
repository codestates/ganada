import ImageSlider from '../ImageSlider';

function ShopInfo({ shop }) {
  const clickHandler = () => {
    console.log('asd');
  };

  return (
    <div>
      <div className="shop-info">
        <ImageSlider />
        <div className="shop-detail" onClick={clickHandler} aria-hidden="true">
          <div className="shop-name">{shop.shopName}</div>
          <div>{shop.point}</div>
          <div>{shop.detailAddress}</div>
          <div>{shop.bussinessHour}</div>
          <div>{shop.shopNumber}</div>
        </div>
      </div>
      <div className="border-line"> </div>
    </div>
  );
}

export default ShopInfo;
