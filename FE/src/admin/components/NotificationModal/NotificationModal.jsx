import { productService } from "../../../services/product";
import "./index.css";
import { useState } from "react";

export default function NotificationModal(newProps) {
  const { _id, isNotification, setIsNotification } = newProps;
  const [isLoading, setIsLoading] = useState(false);
  console.log(_id);
  const onDeleteProduct = async () => {
    setIsLoading(true);
    const data = await productService.deleteProductById(_id);
    setIsLoading(false);
    if (data) {
      console.log(data);
      alert("Deleted");
      setIsNotification((prev) => !prev);
    }
  };
  return (
    <div
      className="popup-delete flex flex-col justify-center"
      style={{ display: `${isNotification ? "flex" : "none"}` }}
    >
      {isLoading ? (
        <>Loading...</>
      ) : (
        <>
          {" "}
          <div style={{ marginBottom: 15 }}>Are you sure want to delete ?</div>
          <div className="flex justify-between">
            <button onClick={() => setIsNotification((prev) => !prev)}>
              Cancel
            </button>
            <button onClick={onDeleteProduct}>Delete</button>
          </div>
        </>
      )}
    </div>
  );
}
