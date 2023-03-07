import { useState, useEffect } from "react";
import { NavLink, Routes, Route, useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch.js";
import ProductDetailInfo from "./ProductDetailInfo.js";
import ProductDetailNutrition from "./ProductDetailNutrition.js";
import ProductDetailStorage from "./ProductDetailStorage.js";

export default function ProductDetails() {
  const [product, setProduct] = useState({});
  const { get } = useFetch("https://react-tutorial-demo.firebaseio.com/");
  const params = useParams();
  console.log(params);
  useEffect(() => {
    get(`productinfo/id${params.id}.json`)
      .then((data) => {
        setProduct(data);
      })
      .catch((error) => console.log("Could not load product details", error));
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
