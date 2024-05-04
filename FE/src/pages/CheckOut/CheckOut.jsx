import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import CheckoutInfo from "../CheckoutInfo/CheckoutInfo";
import "./index.css";
import CartTotal from "../../components/CartTotal/CartTotal";
export default function CheckOut() {
  const { isLogin } = useSelector((state) => state.auth);
  const { userInfo } = useSelector((state) => state.auth);
  const { cart } = useSelector((state) => state.cart);
  const disabled = true;
  const navigate = useNavigate();
  useEffect(() => {
    if (!isLogin) {
      navigate("/login");
    }
  }, [isLogin, navigate]);
  return (
    <div className="checkout-order" style={{ justifyContent: "center" }}>
      {isLogin ? (
        cart && cart.length > 0 ? (
          <>
            <div className="info">
              <CheckoutInfo disabled={disabled} />
            </div>
            <div className="total" style={{ height: "fit-content" }}>
              <CartTotal disabled={disabled} userInfo={userInfo} />
            </div>
          </>
        ) : (
          <div className="empty-cart" style={{ textAlign: "center" }}>
            <Link to="/shop">
              No product in cart, do you want to back to shop ?
            </Link>
          </div>
        )
      ) : (
        <>Loading...</>
      )}
    </div>
  );
}
