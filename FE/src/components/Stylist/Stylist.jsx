import { Link } from "react-router-dom";
import "./index.css";
const Stylist = () => {
  const stylist = [
    {
      content: "Classic Traditional",
      src: "https://wpbingosite.com/wordpress/funio/wp-content/webp-express/webp-images/uploads/2020/12/img5-6.jpg.webp",
    },
    {
      content: "Modern Boho",
      src: "https://wpbingosite.com/wordpress/funio/wp-content/webp-express/webp-images/uploads/2020/12/img5-7.jpg.webp",
    },
    {
      content: "Retro Mid Century",
      src: "https://wpbingosite.com/wordpress/funio/wp-content/webp-express/webp-images/uploads/2020/12/img5-8.jpg.webp",
    },
  ];

  return (
    <section className="stylist-section">
      <div className="stylist">
        <h3>Shop by style</h3>
        <div className="stylist-container ">
          {stylist.map((item, index) => (
            <div key={index} className="style-item">
              <div className="style-item-img">
                <img src={item.src} alt={item.content} />
                <div className="style-item-content">
                  <p className="content">{item.content}</p>
                </div>
                <div className="style-item-explore">
                  <p className="explore">
                    <Link to="">Explore Now</Link>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stylist;
