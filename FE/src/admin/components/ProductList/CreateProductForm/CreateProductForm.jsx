import { useState } from "react";
import "./index.css";
import { productService } from "../../../../services/product";
export default function CreateProductForm(newProps) {
  const [isLoading, setIsLoading] = useState(false);
  const { openModal, setOpenModal } = newProps;
  const [formData, setFormData] = useState({
    productName: undefined,
    price: undefined,
    finalPrice: undefined,
    discount: undefined,
    discription: undefined,
    stock: undefined,
    tags: [],
    category: [],
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
    newFormData.append("price", Number(formData.price));
    newFormData.append("finalPrice", Number(formData.finalPrice));
    newFormData.append("discount", Number(formData.discount));
    newFormData.append("discription", formData.discription);
    newFormData.append("stock", Number(formData.stock));
    newFormData.append("tags", formData.tags);
    newFormData.append("category", formData.category);
    for (let i = 0; i < files.length; i++) {
      newFormData.append("files", files[i]);
    }
    setIsLoading(true);
    const data = await productService.createProduct(newFormData);
    console.log(data);
    if (data) {
      alert("Product Created!");
      setFiles([]);
      setFormData({
        productName: "",
        price: "",
        finalPrice: "",
        discount: "",
        discription: "",
        stock: "",
        tags: [],
        category: [],
      });
    }
    setIsLoading(false);
  };

  const onCancel = (e) => {
    e.preventDefault();
    setFormData({ ...newProps.product });
    setFiles([]);
  };
  return (
    <div
      className="product-form-modal"
      style={{ display: `${openModal ? "block" : "none"}` }}
    >
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <form className="form" onSubmit={onSubmit}>
          <div>
            <label htmlFor="productName">Product Name: </label>
            <input
              required
              id="name"
              onChange={handleChange}
              type="text"
              name="productName"
            />
          </div>
          <div className="price-style">
            <div>
              <label htmlFor="price">Price:</label>
              <input
                required
                onChange={handleChange}
                type="number"
                name="price"
                id="price"
              />
            </div>
            <div>
              <label htmlFor="discount">Discount:</label>
              <input
                required
                onChange={handleChange}
                type="number"
                name="discount"
                id="discount"
              />
            </div>
            <div>
              <label htmlFor="finalPrice">Final Price:</label>
              <input
                required
                type="number"
                name="finalPrice"
                value={formData.finalPrice}
                id="finalPrice"
              />
            </div>
          </div>
          <div className="tags-category">
            <div>
              <label htmlFor="tags">Tags:</label>
              <input required onChange={handleChange} type="text" name="tags" />
            </div>
            <div>
              <label htmlFor="category">Category:</label>
              <input
                required
                onChange={handleChange}
                type="text"
                name="category"
              />
            </div>
          </div>
          <div>
            <label htmlFor="stock">Stock:</label>
            <input
              required
              onChange={handleChange}
              type="number"
              name="stock"
              id="stock"
            />
          </div>
          <div>
            <label htmlFor="discription">Discription:</label>
            <textarea
              required
              name="discription"
              onChange={handleChange}
              value={formData.discription}
            ></textarea>
          </div>
          <div>
            <label htmlFor="file">Image List</label>
            <input
              required
              type="file"
              multiple
              onChange={handleFileChange}
              name="files"
            />
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
