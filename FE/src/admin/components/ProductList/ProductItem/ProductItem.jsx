import { formatPrice } from "../../../../utils/formatPrice";
import "./index.css";
import { PencilLine } from "lucide-react";
export default function ProductItem(newProps) {
  const {
    productName,
    price,
    finalPrice,
    stock,
    discription,
    discount,
    imageUrl,
    tags,
    category,
    _id,
  } = newProps.product;
  return (
    <div className="product-item">
      <img src={imageUrl[0]} alt={productName} />
      <p className="name">{productName}</p>
      <div className="flex price justify-center">
        {discount ? (
          <>
            <span className="old-price">{formatPrice(price)}</span>
            <span className="discount">{discount}% </span>
            <span className="final-price">{formatPrice(finalPrice)} </span>
          </>
        ) : (
          <span className="current-price">{formatPrice(price)}</span>
        )}
      </div>
      <p className="stock">{stock}</p>
      <button className="edit-button">
        <PencilLine />
      </button>
    </div>
  );
}
