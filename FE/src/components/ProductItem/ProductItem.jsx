import { useState } from "react";
import ButtonProduct from "../ButtonProduct/ButtonProduct";
import "./index.css";
import ProductInfoModal from "../ProductInfoModal/ProductInfoModal";
import { formatPrice } from "../../utils/formatPrice";
import { discountPrice } from "../../utils/discountPrice";
import { Link } from "react-router-dom";
import GlobalModal from "../GlobalModal/GlobalModal";
export default function ProductItem(newProps) {
  const { _id, productName, imageUrl, price, discount, category, stock } =
    newProps.product;
  const [showModal, setShowModal] = useState(false);
  const handleOpenModal = () => {
    setShowModal(true);
  };
  const handleCloseModal = () => {
    setShowModal(false);
  };
  const modalStyle = {
    display: showModal ? "block" : "none",
  };
  return (
    <div className="product-info">
      {discount > 0 && <span className="discount">-{discount}%</span>}
      <div className="product-img-effect">
        <Link to={`/shop/${_id}`}>
          <img src={imageUrl[0]} alt={productName} className="main-img" />
          <img src={imageUrl[1]} alt={productName} className="swap-img" />
        </Link>
      </div>
      <div className="product-content">
        <p className="product-name">
          <Link to={`/shop/${_id}`}>{productName}</Link>
        </p>
        <p>
          {discount > 0 ? (
            <>
              <span className="old-price">{formatPrice(price)}</span>{" "}
              <span className="new-price">
                {discountPrice(price, discount)}
              </span>
            </>
          ) : (
            <span className="current-price">{formatPrice(price)}</span>
          )}
        </p>
      </div>
      <div className="product-button">
        <ButtonProduct
          product={newProps.product}
          handleOpenModal={handleOpenModal}
        />
      </div>
      <GlobalModal
        handleCloseModal={handleCloseModal}
        modalStyle={modalStyle}
      />
      <ProductInfoModal
        handleCloseModal={handleCloseModal}
        modalStyle={modalStyle}
        product={newProps.product}
      />
    </div>
  );
}
