import "./index.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import CartItem from "./CartItem/CartItem";
import CartTotal from "../../components/CartTotal/CartTotal";
export default function ShoppingCart() {
  const { cart } = useSelector((state) => state.cart);
  return (
    <div className={`${cart.length > 0 ? "shopping-cart" : "empty-cart"}`}>
      {cart.length === 0 ? (
        <p style={{ textAlign: "center" }}>
          <Link to="/shop">
            No product in cart, do you want to back to shop ?
          </Link>
        </p>
      ) : (
        <>
          <table className="shopping-cart-list">
            <tr>
              <th className="product-th">Product</th>
              <th className="price-th">price </th>
              <th className="quantity-th">quantity</th>
              <th className="subtotal-th">subtotal</th>
            </tr>
            <tbody>
              {cart.map((item) => (
                <tr key={item.id}>
                  <CartItem productCart={item} />
                </tr>
              ))}
            </tbody>
          </table>
          <div className="shopping-cart-total">
            <CartTotal />
          </div>
        </>
      )}
    </div>
  );
}
