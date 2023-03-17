import { createContext, ReactElement, useMemo, useReducer } from "react";

export type CartItemType = {
  id: number;
  description: string;
  image: string;
  name: string;
  price: number;
  price_id: string;
  quantity: number;
};

export type CartStateType = { cart: CartItemType[] };

const initCartState: CartStateType = { cart: [] };

//reducer
const reducerActions = {
  ADD: "ADD",
  REMOVE: "REMOVE",
  SUBMIT: "SUBMIT",
};

type CartActionType = {
  type: string;
  payload?: CartItemType;
};

const reducer = (state: CartStateType, action: CartActionType) => {
  switch (action.type) {
    case "ADD": {
      if (!action.payload) throw new Error("No payload provided");

      const { id, description, image, name, price, price_id } = action.payload;

      const filteredCart: CartItemType[] = state.cart.filter((item) => {
        return item.id !== id;
      });

      const itemExistsInCart: CartItemType | undefined = state.cart.find(
        (item) => {
          return item.id === id;
        }
      );

      const quantity: number = itemExistsInCart
        ? itemExistsInCart.quantity + 1
        : 1;

      return {
        ...state,
        cart: [
          ...filteredCart,
          { id, description, image, name, price, price_id, quantity },
        ],
      };
    }
    case "REMOVE": {
      if (!action.payload) throw new Error("No payload provided");

      const { id } = action.payload;

      const filteredCart: CartItemType[] = state.cart.filter((item) => {
        return id !== item.id;
      });

      return { ...state, cart: [...filteredCart] };
    }
    case "SUBMIT": {
      return { ...state, cart: [] };
    }
    // case "decrement":
    //   return { count: state.count - Number(action.payload) };
    default:
      throw new Error("Unidentified reducer action type");
  }
};

//context

const useCartContext = (initState: CartStateType) => {
  const [state, dispatch] = useReducer(reducer, initState);

  const REDUCER_ACTIONS = useMemo(() => {
    return reducerActions;
  }, []);

  const totalItems: number = state.cart.reduce((prev, curItem) => {
    return prev + curItem.quantity;
  }, 0);

  const totalPrice: string = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(
    state.cart.reduce((prev, curItem) => {
      return prev + curItem.price * curItem.quantity;
    }, 0)
  );

  const cart = state.cart.sort((a, b) => {
    return a.id - b.id;
  });

  return { REDUCER_ACTIONS, dispatch, totalItems, totalPrice, cart };
};

export type UseCartContextType = ReturnType<typeof useCartContext>;

const initCartContextState: UseCartContextType = {
  dispatch: () => {},
  REDUCER_ACTIONS: reducerActions,
  totalItems: 0,
  totalPrice: "",
  cart: [],
};

export const CartContext =
  createContext<UseCartContextType>(initCartContextState);

type ChildrenType = { children?: ReactElement | ReactElement[] | [] };

export const CartProvider = ({ children }: ChildrenType): ReactElement => {
  return (
    <CartContext.Provider value={useCartContext(initCartState)}>
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;
