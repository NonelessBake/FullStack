import React from "react";
import ProductItem from "../ProductItem/ProductItem";
import "./index.css";
export default function ProductList(newProps) {
  const { products } = newProps;
  return (
    <div className="product-list-container">
      {products &&
        products.length > 0 &&
        products.map((product) => (
          <React.Fragment key={product._id}>
            <div className="product-item">
              <ProductItem key={product.id} product={product} />
            </div>
          </React.Fragment>
        ))}
    </div>
  );
}
