import { useState } from "react";
import { formatPrice } from "../../../../utils/formatPrice";
import "./index.css";
import { PencilLine } from "lucide-react";
import GlobalModal from "../../GlobalModal/GlobalModal";
import ProductForm from "../ProductFormModal/ProductForm";
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
  const [openModal, setOpenModal] = useState(false);
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
      <p className="stock">Stock: {stock}</p>
      <button className="edit-button" onClick={() => setOpenModal(!openModal)}>
        <PencilLine />
      </button>
      <GlobalModal openModal={openModal} setOpenModal={setOpenModal} />
      <ProductForm
        openModal={openModal}
        setOpenModal={setOpenModal}
        product={newProps.product}
      />
    </div>
  );
}
