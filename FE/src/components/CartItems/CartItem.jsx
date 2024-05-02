import { removeItem } from "../../store/slice/cart";
import { discountPrice } from "../../utils/discountPrice";
import "./index.css";
import { useDispatch } from "react-redux";
export default function CartItem(newProps) {
  const { imageUrl, productName, quantity, price, discount } = newProps.cart;
  const dispatch = useDispatch();
  return (
    <div className="cart-item">
      <div className="cart-item-info">
        <div className="cart-item-img">
          <img src={imageUrl[0]} alt={productName} />
        </div>
        <div className="cart-item-content">
          <p className="cart-item-name">{productName}</p>
          <p className="cart-item-quantity">Qty: {quantity}</p>
          <p className="cart-item-price">
            {discountPrice(price * quantity, discount)}
          </p>
        </div>
        <button
          className="cart-item-delete-button"
          onClick={() => dispatch(removeItem(newProps.cart))}
        >
          X
        </button>
      </div>
    </div>
  );
}
