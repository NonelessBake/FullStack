import "./index.css";

export default function Brand() {
  const brand = [
    {
      id: 1,
      brandName: "Blast Premium",
      img: "https://wpbingosite.com/wordpress/funio/wp-content/uploads/2020/12/10.png",
    },
    {
      id: 2,
      brandName: "Minimal",
      img: "https://wpbingosite.com/wordpress/funio/wp-content/uploads/2020/12/12.png",
    },
    {
      id: 3,
      brandName: "Money Magazine",
      img: "https://wpbingosite.com/wordpress/funio/wp-content/uploads/2020/12/35.png",
    },
    {
      id: 4,
      brandName: "Beat Sound",
      img: "https://wpbingosite.com/wordpress/funio/wp-content/webp-express/webp-images/uploads/2020/12/48.png.webp",
    },
    {
      id: 5,
      brandName: "Redbox",
      img: "https://wpbingosite.com/wordpress/funio/wp-content/uploads/2020/12/49.png",
    },
  ];
  return (
    <section className="brand">
      <div className="brand-container">
        {brand.map((item, index) => (
          <div key={index}>
            <img src={item.img} alt={item.brandName} />
          </div>
        ))}
      </div>
    </section>
  );
}
