import { useState, useEffect } from "react";
import Product from "../components/Product.js";
import useFetch from "../hooks/useFetch.js";
import Loader from "../components/Loader.js";
import { CartItemType } from "../context/CartProvider.js";
import useProducts from "../hooks/useProducts.js";

export default function Products() {
  // const [products, setProducts] = useState<CartItemType[]>([]);
  // const { get, loading } = useFetch(
  //   "https://react-tutorial-demo.firebaseio.com/"
  // );

  const { items: products, loading } = useProducts();

  useEffect(() => {
    // get("supermarket.json")
    //   .then((data: CartItemType[] | unknown) => {
    //     if (Array.isArray(data)) setProducts(data);
    //   })
    //   .catch((error) => console.log("Could not load products", error));
  }, []);

  return (
    <div className="products-layout">
      <h1>Products</h1>
      <p>Take a look at our products</p>
      <div className="products-grid">
        {loading && <Loader />}
        {products.map((product) => {
          return <Product key={product.id} details={product} />;
        })}
      </div>
    </div>
  );
}
