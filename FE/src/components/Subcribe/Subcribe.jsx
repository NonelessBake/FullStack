import "./index.css";

export default function Subcribe() {
  return (
    <section className="subcribe">
      <div className="subcribe-contaner">
        <h3>Newsletters</h3>
        <p>Sign up for newsletter and get 10% cash back offer</p>
        <div className="email-subcrite">
          <input type="email" placeholder="Your email address..." />
          <button>
            <p>Subcribe</p>
          </button>
        </div>
      </div>
    </section>
  );
}
