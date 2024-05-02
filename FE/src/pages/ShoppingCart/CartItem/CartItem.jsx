import { formatPrice } from "../../../utils/formatPrice";
import "./index.css";
import { useDispatch } from "react-redux";
import { changeQuantity, removeItem } from "../../../store/slice/cart";
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
export default function CartItem(newProps) {
  const { _id, productName, imageUrl, price, quantity, discount } =
    newProps.productCart;
  const dispatch = useDispatch();
  const [curQ, setCurQ] = useState(quantity);
  const quantityValue = useMemo(() => {
    if (quantity > 0) {
      return curQ;
    } else {
      setCurQ(1);
      return 1;
    }
  }, [curQ, quantity]);
  const handleQuantityChange = (e) => {
    let newQuantity = Number(e.target.value);
    if (newQuantity <= 0) {
      newQuantity = 1;
    }
    setCurQ(newQuantity);
    dispatch(changeQuantity({ _id, quantity: newQuantity }));
  };
  const handleAddQuant = () => {
    let newQuantity = curQ + 1;
    setCurQ(newQuantity);
    dispatch(changeQuantity({ _id, quantity: newQuantity }));
  };
  const handleSubQuant = () => {
    let newQuantity;
    if (curQ === 1) {
      newQuantity = 1;
    } else {
      newQuantity = curQ - 1;
    }
    setCurQ(newQuantity);
    dispatch(changeQuantity({ _id, quantity: newQuantity }));
  };
  return (
    <>
      <td className="product-col">
        <img src={imageUrl[0]} alt={productName} />
        <Link to={`/shop/${_id}`}>{productName}</Link>
      </td>
      <td className="price-col">{formatPrice(price * (1 - discount / 100))}</td>
      <td className="quantity-col">
        <div>
          <button className="add-quantity-button" onClick={handleAddQuant}>
            +
          </button>
          <input
            type="text"
            value={quantityValue}
            onChange={handleQuantityChange}
          />
          <button className="sub-quantity-button" onClick={handleSubQuant}>
            -
          </button>
        </div>
      </td>
      <td className="subtotal-col">
        {formatPrice(price * (1 - discount / 100) * quantity)}
      </td>
      <td>
        <button
          className="remove-cart-item"
          onClick={() => dispatch(removeItem({ _id }))}
        >
          X
        </button>
      </td>
    </>
  );
}
