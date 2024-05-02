import { Outlet, useLocation } from "react-router-dom";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import { useEffect, useState } from "react";
import { MdKeyboardDoubleArrowUp } from "react-icons/md";

import "./index.css";
export default function RootLayout() {
  const [isHomeActive, SetIsHomeActive] = useState(false);
  const [classActive, setClassActive] = useState("");
  const { pathname } = useLocation();
  const [scrollY, setScrollY] = useState(window.scrollY);
  const handleScroll = () => {
    setScrollY(window.scrollY);
  };
  const onScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  useEffect(() => {
    onScrollToTop();
    window.onscroll = handleScroll;
    return () => {
      window.onscroll = null;
    };
  }, [isHomeActive]);
  useEffect(() => {
    const homePath = ["", "/", "/home"];
    if (homePath.includes(pathname)) {
      SetIsHomeActive(true);
    } else {
      SetIsHomeActive(false);
    }
    return isHomeActive
      ? setClassActive("active-item")
      : setClassActive("hover-active");
  }, [pathname, isHomeActive]);
  return (
    <div className="layout-container">
      <Header
        isHomeActive={isHomeActive}
        SetIsHomeActive={SetIsHomeActive}
        classActive={classActive}
      />
      <Outlet />
      <Footer isHomeActive={isHomeActive} />
      {scrollY > 400 && (
        <button className={`scroll-to-top`} onClick={onScrollToTop}>
          <MdKeyboardDoubleArrowUp />
        </button>
      )}
    </div>
  );
}
