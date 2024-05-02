import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import RootLayout from "./layout/RootLayout";
import Home from "./pages/Home/Home";
import Register from "./components/Register/Register";
import Login from "./components/Login/Login";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { APP_CONFIG } from "./config/appConfig";
import { authService } from "./services/auth";
import { login } from "./store/slice/auth";
import Order from "./pages/Order/Order";
import ShoppingCart from "./pages/ShoppingCart/ShoppingCart";
import CheckOut from "./pages/CheckOut/CheckOut";
import ProducDetail from "./pages/ProductDetail/ProducDetail";
import Shop from "./pages/Shop/Shop";
import Profile from "./pages/Profile/Profile";
import CheckoutInfo from "./pages/CheckoutInfo/CheckoutInfo";
import ChangePassword from "./pages/ChangePassword/ChangePassword";
import OrderList from "./pages/OrderList/OrderList";
import ProtectedProfileRoute from "./protectedProfile/ProtectedProfileRoute";

function App() {
  const dispatch = useDispatch();
  const { isLogin } = useSelector((state) => state.auth);
  useEffect(() => {
    const fetchLogin = async () => {
      if (!isLogin) {
        if (localStorage.getItem(APP_CONFIG.STORAGE_TOKEN_NAME.REFRESH_TOKEN)) {
          const { accessToken, userInfo } = await authService.renewAccessToken(
            localStorage.getItem(APP_CONFIG.STORAGE_TOKEN_NAME.REFRESH_TOKEN)
          );
          dispatch(login({ accessToken, userInfo }));
        }
      }
    };
    fetchLogin();
  }, []);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RootLayout />}>
          {["", "/home"].map((item, idx) => (
            <Route key={idx} path={item} element={<Home />} />
          ))}
          <Route path="/order" element={<Order />}>
            <Route path="shopping-cart" element={<ShoppingCart />} />
            <Route path="check-out" element={<CheckOut />} />
          </Route>
          <Route path="/profile" element={<ProtectedProfileRoute />}>
            <Route path=":id" element={<Profile />}>
              <Route path="" element={<CheckoutInfo />} />
              <Route path="info" element={<CheckoutInfo />} />
              <Route path="password" element={<ChangePassword />} />
              <Route path="order" element={<OrderList />} />
            </Route>
          </Route>
          <Route path="/shop" element={<Shop />} />
          <Route path="/shop/:id" element={<ProducDetail />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
