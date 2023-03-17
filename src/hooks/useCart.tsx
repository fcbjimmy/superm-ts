import { useContext } from "react";
import { UseCartContextType, CartContext } from "../context/CartProvider";

const useCart = (): UseCartContextType => {
  return useContext(CartContext);
};

export default useCart;
