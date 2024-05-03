import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { formatPrice } from "../../utils/formatPrice";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { orderService } from "../../services/order";
import { deleteCart } from "../../store/slice/cart";

export default function CartTotal(newProps) {
  const { cart } = useSelector((state) => state.cart);
  const { disabled, userInfo } = newProps;
  const orderItems = [];
  const [err, setErr] = useState(false);
  let subTotal = 0;
  for (let i = 0; i < cart.length; i++) {
    subTotal += cart[i].finalPrice * cart[i].quantity;
    orderItems.push({
      productId: cart[i]._id,
      quantity: cart[i].quantity,
      totalPrice: cart[i].finalPrice * cart[i].quantity,
    });
  }
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onPlaceOrder = async () => {
    try {
      const data = await orderService.placeOrder(orderItems, subTotal);
      if (data.data) {
        dispatch(deleteCart());
        alert("Order Successful");
        navigate(`/profile/${userInfo._id}/order`);
      }
    } catch (err) {
      setErr(true);
    }
  };
  return (
    <div className="cart-totals">
      <div>
        <h4>cart totals</h4>
      </div>
      <div className="total-stn">
        <p>
          Total:{" "}
          <span style={{ fontWeight: 500 }}>{formatPrice(subTotal)}</span>
        </p>
        <p>Shipping: Free</p>
        {!disabled ? (
          <Link to="/order/check-out">
            proceed to checkout <span style={{ fontSize: 20 }}>&rarr;</span>
          </Link>
        ) : (
          <button onClick={onPlaceOrder}>Place Order</button>
        )}
      </div>
    </div>
  );
}
