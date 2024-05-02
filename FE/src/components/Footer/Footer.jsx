import "./index.css";
import { FaXTwitter } from "react-icons/fa6";
import { FaFacebookF } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { TfiYoutube } from "react-icons/tfi";
import blackLogo from "../../assets/logoblack.png.webp";
import { Link } from "react-router-dom";
import payment from "../../assets/payment.webp";
export default function Footer(newProps) {
  const { isHomeActive } = newProps;
  return (
    <footer className={!isHomeActive ? "footer-single" : ""}>
      <section className="social-media">
        <div className="social-media-container">
          <div className="logo-container">
            <img src={blackLogo} alt="logo" />
          </div>
          <ul className="social-link">
            <li>
              <button className="social-link-button">
                <Link to="">
                  <FaXTwitter />
                </Link>
              </button>
            </li>
            <li>
              <button className="social-link-button">
                <Link to="">
                  <FaInstagram />
                </Link>
              </button>
            </li>
            <li>
              <button className="social-link-button">
                <Link to="">
                  <FaFacebookF />
                </Link>
              </button>
            </li>
            <li>
              <button className="social-link-button">
                <Link to="">
                  <TfiYoutube />
                </Link>
              </button>
            </li>
          </ul>
        </div>
      </section>
      <section className="short-links">
        <div className="short-links-container">
          <div className="help-links">
            <p className="title">Get Help</p>
            <ul>
              <li>
                <Link>Contact & FAQ</Link>
              </li>
              <li>
                <Link>Track Your Order</Link>
              </li>
              <li>
                <Link>Shipping & Delivery</Link>
              </li>
              <li>
                <Link>Visit Brisbane Studio</Link>
              </li>
              <li>
                <Link>Interest Free Finance</Link>
              </li>
            </ul>
          </div>
          <div className="services-links">
            <p className="title">Services</p>
            <ul>
              <li>
                <Link>Assembly Guides</Link>
              </li>
              <li>
                <Link>Furniture Packages & Fitouts</Link>
              </li>
              <li>
                <Link>Trade Programme</Link>
              </li>
              <li>
                <Link>Sale</Link>
              </li>
              <li>
                <Link>New Designs</Link>
              </li>
            </ul>
          </div>
          <div className="connect-links">
            <p className="title">Connect</p>
            <ul>
              <li>
                <Link>Twiter</Link>
              </li>
              <li>
                <Link>Facebook</Link>
              </li>
              <li>
                <Link>Instagram</Link>
              </li>
              <li>
                <Link>Pinterest</Link>
              </li>
              <li>
                <Link>Jobs</Link>
              </li>
            </ul>
          </div>
          <div className="category-links">
            <p className="title">Category</p>
            <ul>
              <li>
                <Link>Armchairs</Link>
              </li>
              <li>
                <Link>Bath Room</Link>
              </li>
              <li>
                <Link>Dining Chairs</Link>
              </li>
              <li>
                <Link>Dining Tables</Link>
              </li>
              <li>
                <Link>Living Room</Link>
              </li>
            </ul>
          </div>
        </div>
      </section>
      <section className="provider">
        <div className="provider-container">
          <div className="left-section">
            <p>© 2021 Funio Furniture Store</p>
            <ul className="privacy">
              <li>
                <Link>Privacy</Link>
              </li>
              <li>
                <Link>Terms</Link>
              </li>
              <li>
                <Link>*PROMO T&CS APPLY (VIEW HERE)</Link>
              </li>
            </ul>
          </div>
          <div className="right-section">
            <img src={payment} alt="payment" />
          </div>
        </div>
      </section>
    </footer>
  );
}
