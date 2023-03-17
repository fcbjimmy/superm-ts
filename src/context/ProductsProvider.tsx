import { createContext, ReactElement, useEffect, useState } from "react";
import axios from "axios";
import useFetch from "../hooks/useFetch.js";

export type ProductType = {
  id: number;
  description: string;
  image: string;
  name: string;
  price: number;
  price_id: string;
  quantity: number;
};

type loadingType = boolean;
//initialstate
//cartcontext

// const initState: ProductType[] = [];

export type UseProductsContextType = {
  items: ProductType[];
  loading: loadingType;
};

const initContextState: UseProductsContextType = {
  items: [],
  loading: true,
};

const ProductsContext = createContext<UseProductsContextType>(initContextState);

type childrenProp = { children?: ReactElement | ReactElement[] };

export const ProductsProvider = ({ children }: childrenProp) => {
  const [items, setItems] = useState<ProductType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  // const { get, loading } = useFetch(
  //   "https://react-tutorial-demo.firebaseio.com/"
  // );

  useEffect(() => {
    const getProducts = async (): Promise<void> => {
      try {
        const { data }: { data: ProductType[] } = await axios.get(
          "https://react-tutorial-demo.firebaseio.com/supermarket.json"
        );
        if (!data) {
          setLoading(false);
          throw new Error("No data");
        }
        setLoading(false);
        setItems(data);
      } catch (err) {
        if (err instanceof Error) console.log(err.message);
      }
    };
    getProducts();
  }, []);

  // useEffect(() => {
  //   get("supermarket.json")
  //     .then((data: ProductType[] | unknown) => {
  //       if (Array.isArray(data)) setProducts(data);
  //     })
  //     .catch((error) => {
  //       if (error instanceof Error) console.log(error.message);
  //     });
  // }, []);

  return (
    <ProductsContext.Provider value={{ items, loading }}>
      {children}
    </ProductsContext.Provider>
  );
};

export default ProductsContext;
