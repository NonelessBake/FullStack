import { useMemo, useState } from "react";
import "./index.css";
import { useDispatch } from "react-redux";
import { addToCart } from "../../store/slice/cart";

export default function ButtonAddToCart(newProps) {
  const { product } = newProps;
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();
  const quantityValue = useMemo(() => {
    if (quantity > 0) {
      return quantity;
    } else {
      setQuantity(1);
      return 1;
    }
  }, [quantity]);
  const handleQuantityChange = (e) => {
    setQuantity(Number(e.target.value));
  };
  const handleAddQuant = () => {
    setQuantity(quantity + 1);
  };
  const handleSubQuant = () => {
    setQuantity(quantity - 1);
  };
  const onAddToCart = () => {
    dispatch(addToCart({ ...product, quantity: quantityValue }));
  };
  return (
    <div className="add-quantity-to-cart">
      <div className="set-quantity-input">
        <button className="add" onClick={handleAddQuant}>
          +
        </button>
        <input
          type="number"
          name="quantity"
          onChange={handleQuantityChange}
          value={quantityValue}
        />
        <button className="sub" onClick={handleSubQuant}>
          -
        </button>
      </div>
      <button className="add-to-cart-button" onClick={onAddToCart}>
        Add to cart
      </button>
    </div>
  );
}
