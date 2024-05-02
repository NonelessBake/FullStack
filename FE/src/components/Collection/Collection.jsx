import { useState } from "react";
import "./index.css";

export default function Collection() {
  const collections = [
    {
      img: "https://wpbingosite.com/wordpress/funio/wp-content/webp-express/webp-images/uploads/2020/12/img5-4.jpg.webp",
      title: "Hanging Lamp Sonsists",
    },
    {
      img: "https://wpbingosite.com/wordpress/funio/wp-content/webp-express/webp-images/uploads/2020/12/img5-5.jpg.webp",
      title: "Cristalplant Bathtub",
    },
    {
      img: "https://wpbingosite.com/wordpress/funio/wp-content/webp-express/webp-images/uploads/2021/01/img5-3.jpg.webp",
      title: "Fall Collection From Hightower",
    },
  ];
  const [currentSlide, setCurrentSlide] = useState(2);
  const [action, setAction] = useState("");
  let leftSlide = 0;
  let rightSlide = 0;
  if (currentSlide - 1 < 0) {
    leftSlide = collections.length - 1;
    rightSlide = currentSlide + 1;
  } else if (currentSlide - 1 >= 0 && currentSlide < collections.length - 1) {
    leftSlide = currentSlide - 1;
    rightSlide = currentSlide + 1;
  } else if (currentSlide === collections.length - 1) {
    leftSlide = currentSlide - 1;
    rightSlide = 0;
  }
  const handlePrevSlide = () => {
    setCurrentSlide(
      currentSlide === 0 ? collections.length - 1 : currentSlide - 1
    );
    setAction("slide-to-right");
  };
  const handeNextSlide = () => {
    setCurrentSlide(
      currentSlide === collections.length - 1 ? 0 : currentSlide + 1
    );
    setAction("slide-to-left");
  };
  // if(action === "slide-to-left"){

  // }
  // else if(action==="slide-to-right"){

  // }
  return (
    <section className="collection">
      <div className={`collection-container `}>
        <button
          className="slide-button previous-slide-button"
          onClick={handlePrevSlide}
        >
          prev
        </button>
        <button
          className="slide-button next-slide-button"
          onClick={handeNextSlide}
        >
          next
        </button>
        {collections.map((item, index) => (
          <div
            key={index}
            className={`collection-item ${action} ${
              currentSlide === index ? "middle-slide" : ""
            } ${leftSlide === index ? "left-slide" : ""} ${
              rightSlide === index ? "right-slide" : ""
            }
          `}
          >
            <img src={item.img} alt={item.title} />
          </div>
        ))}
      </div>
    </section>
  );
}
