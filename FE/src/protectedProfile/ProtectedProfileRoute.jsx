import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedProfileRoute() {
  const { isLogin } = useSelector((state) => state.auth);
  if (!isLogin) return <Navigate to="/login" />;
  else return <Outlet />;
}
