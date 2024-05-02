import { discountPrice } from "../../utils/discountPrice";
import { formatPrice } from "../../utils/formatPrice";
import ButtonAddToCart from "../ButtonAddToCart/ButtonAddToCart";
import "./index.css";

export default function ProductInfoModal(newProps) {
  const { _id, productName, imageUrl, price, discount, discription } =
    newProps.product;
  const { modalStyle, handleCloseModal } = newProps;
  return (
    <div className="product-info-modal-center" style={modalStyle}>
      <div className="product-info-modal">
        <div className="product-img-modal">
          <img src={imageUrl[0]} alt={productName} />
        </div>
        <div className="product-content-modal">
          <h3 className="product-name-modal">{productName}</h3>
          <p className="product-price-modal">
            {discount > 0 ? (
              <>
                <span className="product-price-modal-old-price">
                  {formatPrice(price)}
                </span>{" "}
                <span className="product-price-modal-new-price">
                  {discountPrice(price, discount)}
                </span>{" "}
                {discount > 0 && (
                  <span className="product-price-modal-discount">
                    -{discount}%
                  </span>
                )}
              </>
            ) : (
              <span className="product-price-modal-current-price">
                {formatPrice(price)}
              </span>
            )}
          </p>
          <hr />
          <p className="product-discription-modal">{discription}</p>
          <ButtonAddToCart product={newProps.product} />
        </div>
      </div>
      <button className="close-modal-button" onClick={handleCloseModal}>
        X
      </button>
    </div>
  );
}
