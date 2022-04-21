function ShopInfo({ shop }: any) {
  return (
    <div className="shop-info">
      <img className="shop-image" src="asd" alt="shop image1" />
      <div className="shop-detail">
        <div>{shop.shopName}</div>
        <div>{shop.point}</div>
        <div>{shop.detailAddress}</div>
        <div>{shop.businessHour}</div>
        <div>{shop.shopNumber}</div>
      </div>
    </div>
  );
}

export default ShopInfo;
