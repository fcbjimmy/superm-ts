import { useState, useEffect } from "react";
import { NavLink, Routes, Route, useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch.js";
import ProductDetailInfo from "./ProductDetailInfo.js";
import ProductDetailNutrition from "./ProductDetailNutrition.js";
import ProductDetailStorage from "./ProductDetailStorage.js";
import axios from "axios";

const productTypes = {
  description: "",
  id: 0,
  image: "",
  name: "",
  nutrition: { carbs: 0, fat: 0, protein: 0, salt: 0 },
  price: 0,
  price_id: "",
  storage: "",
};

export type ProductTypes = typeof productTypes;

export default function ProductDetails() {
  const [product, setProduct] = useState<ProductTypes>(productTypes);
  // const { get } = useFetch("https://react-tutorial-demo.firebaseio.com/");
  const params = useParams();

  // useEffect(() => {
  //   get(`productinfo/id${params.id}.json`)
  //     .then((data) => {
  //       setProduct(data);
  //     })
  //     .catch((error) => console.log("Could not load product details", error));
  // }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get(
          `https://react-tutorial-demo.firebaseio.com/productinfo/id${params.id}.json`
        );
        if (data) setProduct(data);
      } catch (err) {
        if (err instanceof Error) console.log(`${err.message}`);
      }
    };
    fetchProducts();
  }, []);

  let activeclassname = "tab-active";

  return (
    <div className="product-details-layout">
      <div>
        <h2>{product.name}</h2>
        <img
          src={product.image}
          width="125"
          height="125"
          className="product-details-image"
          alt={product.name}
        />
      </div>
      <div>
        <div className="tabs">
          <ul>
            <li>
              <NavLink
                to={`/products/${params.id}/`}
                className={({ isActive }) =>
                  isActive ? activeclassname : undefined
                }
              >
                Details
              </NavLink>
            </li>
            <li>
              <NavLink
                to={`/products/${params.id}/nutrition`}
                className={({ isActive }) =>
                  isActive ? activeclassname : undefined
                }
              >
                Nutrition
              </NavLink>
            </li>
            <li>
              <NavLink
                to={`/products/${params.id}/storage`}
                className={({ isActive }) =>
                  isActive ? activeclassname : undefined
                }
              >
                Storage
              </NavLink>
            </li>
          </ul>
        </div>
        <Routes>
          <Route path="/" element={<ProductDetailInfo product={product} />} />
          <Route
            path="/nutrition"
            element={<ProductDetailNutrition nutrition={product.nutrition} />}
          />
          <Route
            path="/storage"
            element={<ProductDetailStorage storage={product.storage} />}
          />
        </Routes>
      </div>
    </div>
  );
}
