import { useRef, useState } from "react";
import "./index.css";
import { productService } from "../../../../services/product";
export default function ProductForm(newProps) {
  const { openModal, setOpenModal, product } = newProps;
  const [isLoading, setIsLoading] = useState(false);
  const {
    productName,
    price,
    finalPrice,
    discount,
    imageUrl,
    discription,
    stock,
    tags,
    category,
    _id,
  } = product;
  const [formData, setFormData] = useState({
    _id,
    productName,
    price,
    finalPrice,
    discount,
    imageUrl,
    discription,
    stock,
    tags,
    category,
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "category" || name === "tags") {
      setFormData({ ...formData, [name]: value.split(",") });
    } else if (name === "price" || name === "discount") {
      setFormData((prevData) => ({
        ...prevData,
        [name]: Number(value),
        finalPrice:
          name === "price"
            ? Number(value) * (1 - Number(formData.discount) / 100)
            : Number(formData.price) * (1 - Number(value) / 100),
      }));
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const [files, setFiles] = useState([]);
  const handleFileChange = (e) => {
    const files = e.target.files;
    setFiles(files);
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    const newFormData = new FormData();
    newFormData.append("productName", formData.productName);
    newFormData.append("price", formData.price);
    newFormData.append("finalPrice", formData.finalPrice);
    newFormData.append("discount", formData.discount);
    newFormData.append("discription", formData.discription);
    newFormData.append("stock", formData.stock);
    newFormData.append("tags", formData.tags);
    newFormData.append("category", formData.category);
    formData.imageUrl.forEach((url, index) => {
      newFormData.append(`imageUrl`, url);
    });
    for (let i = 0; i < files.length; i++) {
      newFormData.append("files", files[i]);
    }

    setIsLoading(true);
    const data = await productService.updateProductById(_id, newFormData);
    console.log(data);
    if (data) {
      alert("update succeed");
      setFiles([]);
      setFormData({ ...product });
      setOpenModal((prev) => !prev);
    }
    setIsLoading(false);
  };
  const onRemoveUrl = (url) => {
    const newList = formData.imageUrl.filter((item) => item !== url);
    setFormData((prev) => ({ ...prev, imageUrl: [...newList] }));
  };

  const onCancel = (e) => {
    e.preventDefault();
    setFormData({ ...newProps.product });
    setFiles([]);
    setOpenModal((prev) => !prev);
  };
  return (
    <div
      className="product-form-modal"
      style={{ display: `${openModal ? `block` : "none"}` }}
    >
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <form className="form" onSubmit={onSubmit}>
          <div>
            <label htmlFor="productName">Product Name: </label>
            <input
              id="name"
              onChange={handleChange}
              type="text"
              name="productName"
              value={formData.productName}
            />
          </div>
          <div className="price-style">
            <div>
              <label htmlFor="price">Price:</label>
              <input
                onChange={handleChange}
                type="number"
                value={formData.price}
                name="price"
                id="price"
              />
            </div>
            <div>
              <label htmlFor="discount">Discount:</label>
              <input
                onChange={handleChange}
                type="number"
                value={formData.discount}
                name="discount"
                id="discount"
              />
            </div>
            <div>
              <label htmlFor="finalPrice">Final Price:</label>
              <input
                type="number"
                value={formData.finalPrice}
                name="finalPrice"
                id="finalPrice"
              />
            </div>
          </div>
          <div className="tags-category">
            <div>
              <label htmlFor="tags">Tags:</label>
              <input
                onChange={handleChange}
                type="text"
                name="tags"
                value={tags}
              />
            </div>
            <div>
              <label htmlFor="category">Category:</label>
              <input
                onChange={handleChange}
                type="text"
                name="category"
                value={category}
              />
            </div>
          </div>
          <div>
            <label htmlFor="stock">Stock:</label>
            <input
              onChange={handleChange}
              type="number"
              name="stock"
              id="stock"
              value={formData.stock}
            />
          </div>
          <div>
            <label htmlFor="file">Image List</label>
            <input
              type="file"
              multiple
              onChange={handleFileChange}
              name="files"
            />
          </div>
          <div className="image-list">
            {formData.imageUrl.map((item, index) => (
              <div key={index}>
                <img src={item} alt={index} />
                <span onClick={() => onRemoveUrl(item)} className="remove-url">
                  X
                </span>
              </div>
            ))}
          </div>
          <div className="direct-button">
            <button>Save</button>
          </div>
          <span className="close-form" onClick={onCancel}>
            X
          </span>
        </form>
      )}
    </div>
  );
}
