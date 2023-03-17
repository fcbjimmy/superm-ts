import Button from "../components/Button.js";
// import { useSelector, useDispatch } from "react-redux";
// import { addProduct } from "./store.js";
import useCart from "../hooks/useCart.js";
import { ProductTypes } from "./ProductDetails";

interface props {
  product: ProductTypes;
}

export default function ProductDetailInfo({ product }: props) {
  const { cart, dispatch, REDUCER_ACTIONS } = useCart();

  const onAddToCart = () => {
    dispatch({
      type: REDUCER_ACTIONS.ADD,
      payload: { ...product, quantity: 1 },
    });
  };

  return (
    <>
      <p>
        {product.description} sold at <strong>${product.price}</strong> per
        piece.
      </p>
      <Button onClick={onAddToCart}>${product.price}</Button>
    </>
  );
}
