import React, { useState } from "react";

import "./index.css";
import { FcPrevious } from "react-icons/fc";
import { FcNext } from "react-icons/fc";
import Topbar from "../Topbar/Topbar";
import Navbar from "../Navbar/Navbar";

export default function Header(newProps) {
  const headerSlide = [
    {
      id: 1,
      img: "https://wpbingosite.com/wordpress/funio/wp-content/uploads/2020/12/slider5-1-1.jpg",
      title: "10% of all items",
      content: "Hanging lamp consists",
    },
    {
      id: 2,
      img: "https://wpbingosite.com/wordpress/funio/wp-content/uploads/2020/12/slider5-2-1.jpg",
      title: "Sofas & armchairs",
      content: "Armchair with armrests",
    },
    {
      id: 3,
      img: "https://wpbingosite.com/wordpress/funio/wp-content/uploads/2020/12/slider5-3-1.jpg",
      title: "New arrivals",
      content: "Cristalplant bathtub",
    },
  ];
  const { isHomeActive, SetIsHomeActive, classActive } = newProps;

  const [currentSlide, setCurrentSlide] = useState(0);
  const handlePrevSlide = () => {
    setCurrentSlide(
      currentSlide === 0 ? headerSlide.length - 1 : currentSlide - 1
    );
  };
  const handeNextSlide = () => {
    setCurrentSlide(
      currentSlide === headerSlide.length - 1 ? 0 : currentSlide + 1
    );
  };
  return (
    <header>
      {isHomeActive && (
        <div className="header-carousel">
          <button
            className="prev-slide button-slider"
            onClick={handlePrevSlide}
          >
            <FcPrevious />
          </button>
          <button className="next-slide button-slider" onClick={handeNextSlide}>
            <FcNext />
          </button>
          <div className="slides">
            {headerSlide.map((item, index) => (
              <React.Fragment key={index}>
                <div
                  className={`content-slide ${
                    currentSlide === index
                      ? "active-content"
                      : "disabled-content"
                  }`}
                >
                  <p className="title">{item.title}</p>
                  <p className="content">{item.content}</p>
                </div>
                <img
                  className={`carousel-slide ${
                    currentSlide === index ? "active-slide" : "disabled-slide"
                  }`}
                  key={item.id}
                  src={item.img}
                  alt={item.title}
                />
              </React.Fragment>
            ))}
          </div>
        </div>
      )}
      <div
        className={`header-bar-container ${
          !isHomeActive ? "header-single" : ""
        }`}
        style={{ height: `${isHomeActive ? "100vh" : "auto"}` }}
      >
        <Topbar isHomeActive={isHomeActive} />
        <Navbar
          SetIsHomeActive={SetIsHomeActive}
          classActive={classActive}
          isHomeActive={isHomeActive}
        />
      </div>
    </header>
  );
}
