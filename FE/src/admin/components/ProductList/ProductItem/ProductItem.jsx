import { useState } from "react";
import { formatPrice } from "../../../../utils/formatPrice";
import "./index.css";
import { PencilLine, Trash2 } from "lucide-react";
import GlobalModal from "../../GlobalModal/GlobalModal";
import ProductForm from "../ProductFormModal/ProductForm";
import NotificationModal from "../../NotificationModal/NotificationModal";
export default function ProductItem(newProps) {
  const { productName, price, finalPrice, stock, discount, imageUrl, _id } =
    newProps.product;

  const [openModal, setOpenModal] = useState(false);
  const [isNotification, setIsNotification] = useState(false);

  return (
    <div className="product-item">
      <button
        className="delete-product"
        onClick={() => setIsNotification((prev) => !prev)}
      >
        <Trash2 />
      </button>
      <div>
        <NotificationModal
          _id={_id}
          isNotification={isNotification}
          setIsNotification={setIsNotification}
        />
        <GlobalModal
          isNotification={isNotification}
          setIsNotification={setIsNotification}
        />
      </div>
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
