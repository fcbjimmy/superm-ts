import Button from "../components/Button.js";
import { useSelector, useDispatch } from "react-redux";
import { addProduct } from "./store.js";

export default function ProductDetailInfo({ product }) {
  const dispatch = useDispatch();

  return (
    <>
      <p>
        {product.description} sold at <strong>${product.price}</strong> per
        piece.
      </p>
      <Button onClick={() => dispatch(addProduct(product))}>
        ${product.price}
      </Button>
    </>
  );
}
