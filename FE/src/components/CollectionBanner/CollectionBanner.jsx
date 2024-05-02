import "./index.css";
import { Link } from "react-router-dom";
export default function CollectionBanner() {
  const imagesBanner = [
    {
      id: 1,
      img: "https://wpbingosite.com/wordpress/funio/wp-content/webp-express/webp-images/uploads/2021/01/img5-1.jpg.webp",
      title: "FROM LOVESEATS TO SECTIONALS",
      content: "Comfy Lounging",
    },
    {
      id: 2,
      img: "https://wpbingosite.com/wordpress/funio/wp-content/webp-express/webp-images/uploads/2021/01/img5-2.jpg.webp",
      title: "SALE UP TO 20% OFF ALL ITEMS",
      content: "Scandinavian Style",
    },
  ];
  return (
    <section className="collection-banner">
      <div className="collection-banner-container">
        {imagesBanner.map((item, index) => (
          <div className="collection-item" key={index}>
            <div className="collection-img">
              <img src={item.img} alt={item.content} />
              <div className="collection-info">
                <p className="title">{item.title}</p>
                <h3 className="content">{item.content}</h3>
                <p className="explore">
                  <Link to="">Explore Collection</Link>
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
