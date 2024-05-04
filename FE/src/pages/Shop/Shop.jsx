import { useEffect, useRef, useState } from "react";
import ProductList from "../../components/ProductList/ProductList";
import "./index.css";
import { productService } from "../../services/product";
import { APP_CONFIG } from "../../config/appConfig";
import { useLocation, useNavigate } from "react-router-dom";
import queryString from "query-string";
import { generateArray } from "../../utils/generateArray";
export default function Shop() {
  const [products, setProducts] = useState([]);
  const [isSuccess, setIsSuccess] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = queryString.parse(location.search);
  const [queryObject, setQueryObject] = useState({
    page: queryParams.page || 1,
    search: queryParams.search || undefined,
    category: queryParams.category || undefined,
    sort: queryParams.sortBy || "latest",
  });

  const [isLoading, setIsLoading] = useState(false);
  const componentRef = useRef(null);
  const handleSort = (e) => {
    setQueryObject({ ...queryObject, sort: e.target.value });
  };
  useEffect(() => {
    navigate(
      `/shop/?page=${queryObject.page}${
        queryObject.search
          ? `&search=${queryObject.search.split(" ").join("-")}`
          : ""
      }${
        queryObject.category
          ? `&category=${queryObject.category.split(" ").join("-")}`
          : ""
      }&sortBy=${queryObject.sort}`
    );
    const fetch = async () => {
      setIsLoading(true);
      const { data } = await productService.getProducts({
        ...queryObject,
        pageSize: APP_CONFIG.PRODUCT_LIMIT.SHOP.PAGE_SIZE,
      });
      setProducts(data);
      if (!data) setIsSuccess(false);
      else setIsSuccess(true);
      setIsLoading(false);
    };
    fetch();
    if (componentRef.current) {
      const { y } = componentRef.current.getBoundingClientRect();
      window.scrollTo({
        top: y,
        behavior: "smooth",
      });
    }
  }, [queryObject, navigate]);
  const onChangePage = (changePage) => {
    setQueryObject({ ...queryObject, page: changePage });
  };
  const onSelectCategory = (categoryItem) => {
    setQueryObject({ ...queryObject, category: categoryItem });
  };
  const pageList = generateArray(products.totalPages);

  return (
    <main className="shop">
      z
      <div className="shop-title">
        <h1>Shop</h1>
      </div>
      <div className="shop-list" ref={componentRef}>
        <aside className="category-filter">
          {isLoading ? (
            <>Loading...</>
          ) : (
            isSuccess && (
              <>
                <div
                  style={{
                    borderBottom: "1px solid #c6c6c6",
                    marginBottom: 15,
                    fontWeight: 500,
                  }}
                >
                  Categories:
                </div>
                {products.categoryList.map((item, index) => (
                  <div className="category-select" key={index}>
                    <button
                      className={
                        queryObject.category
                          ? queryObject.category.split("-").join(" ") ===
                            item[0]
                            ? "active-category"
                            : "non-active-category"
                          : "non-active-category"
                      }
                      onClick={() => onSelectCategory(item[0])}
                    >
                      <p>{item[0]}</p>
                      <p>{item[1]}</p>
                    </button>
                  </div>
                ))}
              </>
            )
          )}
        </aside>
        <aside className="product-side">
          <div className="sort">
            <select
              className="select-sort"
              name="sortBy"
              onChange={handleSort}
              defaultValue={queryObject.sort}
            >
              <option value="lowest">Price: Low to High</option>
              <option value="highest">Price: High to Low</option>
              <option value="latest">Date: Latest</option>
              <option value="oldest">Date: Oldest</option>
            </select>
          </div>
          {isLoading ? (
            <>Loading...</>
          ) : (
            <div>
              <ProductList products={products.data} page={queryObject.page} />
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
        </aside>
      </div>
    </main>
  );
}
