import "./index.css";
import { MdOutlineMailOutline } from "react-icons/md";
import { TfiLocationPin } from "react-icons/tfi";
import { Link } from "react-router-dom";

export default function Topbar(newProps) {
  const { isHomeActive } = newProps;
  return (
    <div className={`topbar-container ${!isHomeActive ? "topbar-single" : ""}`}>
      <div className="topbar-inner">
        <div className="left-side">
          <div className="location">
            <TfiLocationPin size={20} />
            <p>
              <Link>Store Location</Link>
            </p>
          </div>
          <div className="contact">
            <MdOutlineMailOutline size={20} />
            <p>
              <Link>support@contact</Link>
            </p>
          </div>
        </div>
        <div className="right-side">
          <div className="gift-cards">
            <p>
              <Link>Gift Cards</Link>
            </p>
          </div>
          <div className="faqs">
            <p>
              <Link>FAQs</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
