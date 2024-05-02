import { useEffect, useState } from "react";
import Brand from "../../components/Brand/Brand";
import Collection from "../../components/Collection/Collection";
import CollectionBanner from "../../components/CollectionBanner/CollectionBanner";
import ProductList from "../../components/ProductList/ProductList";
import Stylist from "../../components/Stylist/Stylist";
import Subcribe from "../../components/Subcribe/Subcribe";
import "./index.css";
import { productService } from "../../services/product";
import { APP_CONFIG } from "../../config/appConfig";
export default function Home() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const fetch = async () => {
      const { data } = await productService.getProducts({
        pageSize: APP_CONFIG.PRODUCT_LIMIT.HOME.PAGE_SIZE,
        sort: "latest",
      });
      setProducts(data.data);
    };
    fetch();
  }, []);
  return (
    <div className="home">
      <CollectionBanner />
      <div className="product-list-home">
        <h2>Latest Products</h2>
        <ProductList products={products} />
      </div>
      <Collection />
      <Stylist />
      <Subcribe />
      <Brand />
    </div>
  );
}
