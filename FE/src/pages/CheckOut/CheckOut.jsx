import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CheckoutInfo from "../CheckoutInfo/CheckoutInfo";
import "./index.css";
export default function CheckOut() {
  const { isLogin } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  useEffect(() => {
    if (!isLogin) {
      navigate("/login");
    }
  }, [isLogin]);
  return (
    <div className="checkout-order">
      <CheckoutInfo />
      <div></div>
    </div>
  );
}
