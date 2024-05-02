import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { formatPrice } from "../../utils/formatPrice";
import { Link } from "react-router-dom";

export default function CartTotal(newProps) {
  const { cart } = useSelector((state) => state.cart);

  let subTotal = 0;
  for (let i = 0; i < cart.length; i++) {
    subTotal += cart[i].quantity * cart[i].price * (1 - cart[i].discount / 100);
  }

  return (
    <div>
      <div>
        <h4>cart totals</h4>
      </div>
      <div className="total">
        <p>
          Total:{" "}
          <span style={{ fontWeight: 500 }}>{formatPrice(subTotal)}</span>
        </p>
        <p>Shipping: Free</p>
        <Link to="/order/check-out">
          proceed to checkout <span style={{ fontSize: 20 }}>&rarr;</span>
        </Link>
      </div>
    </div>
  );
}
