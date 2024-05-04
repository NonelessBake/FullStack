import React, { useEffect, useRef, useState } from "react";
import { productService } from "../../../services/product";
import { APP_CONFIG } from "../../../config/appConfig";
import { useLocation, useNavigate } from "react-router-dom";
import queryString from "query-string";
import ProductItem from "./ProductItem/ProductItem";
import "./index.css";
import { generateArray } from "../../../utils/generateArray";
function ProductList() {
  const [products, setProducts] = useState([]);
  const [isSuccess, setIsSuccess] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  let queryParams = queryString.parse(location.search);
  let [queryObject, setQueryObject] = useState({
    page: queryParams.page || 1,
    search: queryParams.search || undefined,
    category: queryParams.category || undefined,
    sortBy: queryParams.sortBy || "latest",
  });
  const [isLoading, setIsLoading] = useState(false);
  const componentRef = useRef(null);
  useEffect(
    () =>
      setQueryObject({
        page: queryParams.page || 1,
        search: queryParams.search || undefined,
        category: queryParams.category || undefined,
        sortBy: queryParams.sortBy || "latest",
      }),
    [
      queryParams?.page,
      queryParams?.search,
      queryParams?.category,
      queryParams?.sortBy,
    ]
  );

  useEffect(() => {
    if (componentRef.current) {
      const { y } = componentRef.current.getBoundingClientRect();
      window.scrollTo({
        top: y,
        behavior: "smooth",
      });
    }
  }, [queryObject]);
  useEffect(() => {
    const getPagedProduct = async (queryObject) => {
      setIsLoading(true);
      const { data } = await productService.getProducts({
        ...queryObject,
        pageSize: APP_CONFIG.PRODUCT_LIMIT.SHOP.PAGE_SIZE,
      });
      setProducts(data);
      if (!data) setIsSuccess(false);
      else setIsSuccess(true);
      setIsLoading(false);

      const query = [];
      for (const [key, value] of Object.entries(queryObject)) {
        if (value !== undefined) {
          const temp = [
            key,
            ["search", "category"].includes(key)
              ? value?.split(" ")?.join("-")
              : value,
          ];
          query.push(temp.join("="));
        }
      }
      navigate(`/admin/product-list?${query.join("&")}`);
    };
    getPagedProduct(queryObject);
  }, [queryObject]);
  const onChangePage = (page) => {
    const currentPage = queryObject.page;
    const totalPages = products.totalPages;
    if (currentPage > totalPages) {
      setQueryObject((prev) => ({ ...prev, page: totalPages }));
    } else {
      setQueryObject((prev) => ({ ...prev, page }));
    }
  };

  if (queryObject.page > products.totalPages) {
    setQueryObject((prev) => ({ ...prev, page: products.totalPages }));
  }
  const pageList = generateArray(products.totalPages);
  return (
    <>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div>
          <div className="product-container">
            {products?.data?.map((item) => (
              <React.Fragment key={item._id}>
                <ProductItem product={item} />
              </React.Fragment>
            ))}
          </div>
          <div className="page-button-container">
            {products.totalPages > 1 &&
              pageList.map((item, index) => (
                <button
                  className={`page-button ${
                    queryObject.page == item + 1
                      ? `active-page`
                      : "non-active-page"
                  }`}
                  onClick={() => onChangePage(item + 1)}
                  key={index}
                >
                  {item + 1}
                </button>
              ))}
          </div>
        </div>
      )}
    </>
  );
}
export { ProductList };
