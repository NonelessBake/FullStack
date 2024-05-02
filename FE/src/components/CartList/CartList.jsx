import { BsBagX } from "react-icons/bs";
import CartItem from "../CartItems/CartItem";
import "./index.css";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { formatPrice } from "../../utils/formatPrice";
import React from "react";
export default function CartList(newProps) {
  const { cart } = useSelector((state) => state.cart);
  let totalPrice = 0;
  for (let i = 0; i < cart.length; i++) {
    totalPrice =
      totalPrice +
      cart[i].price * (1 - cart[i].discount / 100) * cart[i].quantity;
  }
  const { modalStyle, handleCloseModal } = newProps;
  return (
    <div style={modalStyle} className="cart-list">
      {cart.length > 0 ? (
        <>
          <div className="cart-top">
            <div className="cart-item-container">
              {cart.map((item) => (
                <React.Fragment key={item._id}>
                  <CartItem cart={item} />
                </React.Fragment>
              ))}
            </div>
          </div>
          <div className="cart-bottom">
            <div className="total-cart-price">
              <p>Total:</p>
              <p>{formatPrice(totalPrice)}</p>
            </div>
            <div className="check-cart">
              <Link to="/order/shopping-cart" onClick={handleCloseModal}>
                view cart
              </Link>
              <Link to="/order/check-out" onClick={handleCloseModal}>
                check out
              </Link>
            </div>
          </div>
        </>
      ) : (
        <div className="non-cart-items">
          <BsBagX size={50} />
          <p>No products in the cart.</p>
          <p className="shop-link">
            <Link to="/shop" onClick={handleCloseModal}>
              GO TO SHOP <span className="right-arrow"> &rarr;</span>
            </Link>
          </p>
          <p>
            FREE SHIPPING ON ALL <span> </span>
            <span className=" free-shipping">ORDERS OVER $75</span>
          </p>
        </div>
      )}
    </div>
  );
}
