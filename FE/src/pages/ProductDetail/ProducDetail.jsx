import { Link, useParams } from "react-router-dom";
import "./index.css";
import React, { useEffect, useRef, useState } from "react";
import { productService } from "../../services/product";
import ButtonAddToCart from "../../components/ButtonAddToCart/ButtonAddToCart";
import { formatPrice } from "../../utils/formatPrice";
import { discountPrice } from "../../utils/discountPrice";

export default function ProducDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const componentRef = useRef(null);
  useEffect(() => {
    if (componentRef.current) {
      const { top } = componentRef.current.getBoundingClientRect();
      window.scrollTo({
        top,
        behavior: "smooth",
      });
    }
  }, []);
  useEffect(() => {
    setIsLoading(true);
    const fetch = async () => {
      const { data } = await productService.getProductById(id);
      setProduct(data);
    };
    fetch();
    setIsLoading(false);
  }, [id]);
  return (
    <div>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <>
          {!product ? (
            <div>No product found</div>
          ) : (
            <div className="product-detail" ref={componentRef}>
              <div className="product-detail-carousel">
                <img src={product.imageUrl[0]} alt="" />
              </div>
              <div className="product-detail-content">
                <div className="top">
                  <h3 className="name" style={{ textAlign: "left" }}>
                    {product.productName}
                  </h3>
                  <p className="price">
                    {product.discount > 0 ? (
                      <>
                        <span className="old-price">
                          {formatPrice(product.price)}
                        </span>
                        <span className="new-price">
                          {formatPrice(
                            discountPrice(product.price, product.discount)
                          )}
                        </span>
                        <span className="discount">-{product.discount}%</span>
                      </>
                    ) : (
                      <span className="current-price">
                        {formatPrice(product.price)}
                      </span>
                    )}
                  </p>
                </div>
                <div className="bottom">
                  <p className="discription">{product.discription}</p>
                  <ButtonAddToCart product={product} />
                </div>
                <div className="info-tag">
                  <p>
                    <span style={{ color: "#868686" }}>Categories: </span>
                    {product.category.map((item, index) => (
                      <React.Fragment key={index}>
                        <Link to="">{item}</Link>
                        {index !== product.category.length - 1 && (
                          <span>, </span>
                        )}
                      </React.Fragment>
                    ))}
                  </p>
                  <p>
                    <span style={{ color: "#868686" }}>Tags: </span>
                    {product.tags.map((item, index) => (
                      <React.Fragment key={index}>
                        <Link to="">{item}</Link>
                        {index !== product.tags.length - 1 && <span>, </span>}
                      </React.Fragment>
                    ))}
                  </p>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
