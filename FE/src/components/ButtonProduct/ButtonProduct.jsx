import { BsCart2 } from "react-icons/bs";
import "./index.css";
import { FaRegStar } from "react-icons/fa6";
import { IoMdSearch } from "react-icons/io";
import { useDispatch } from "react-redux";
import { addToCart } from "../../store/slice/cart";
export default function ButtonProduct(newProps) {
  const { handleOpenModal } = newProps;
  const { product } = newProps;
  const dispatch = useDispatch();

  return (
    <div className="product-button-item">
      <button
        className="add-to-cart-button"
        onClick={() => dispatch(addToCart({ ...product, quantity: 1 }))}
      >
        <BsCart2 size={20} />
      </button>
      <button className="add-to-wishlist">
        <FaRegStar size={20} />
      </button>
      <button className="show-item-modal" onClick={handleOpenModal}>
        <IoMdSearch size={20} />
      </button>
    </div>
  );
}
