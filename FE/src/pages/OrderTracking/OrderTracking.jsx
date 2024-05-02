import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function OrderTracking() {
  const { isLogin } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  useEffect(() => {
    if (!isLogin) {
      navigate("/login");
    }
  }, [isLogin]);
  return <div>OrderTracking</div>;
}
