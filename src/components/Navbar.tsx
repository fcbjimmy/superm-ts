import { NavLink } from "react-router-dom";
// import { useSelector } from "react-redux";
// import { cartQuantity } from "./store";
import { CartContext } from "../context/CartProvider";
import { useContext } from "react";
import "../App.css";

export default function Navbar() {
  // const cartCount = useSelector(cartQuantity);
  const { totalItems } = useContext(CartContext);

  // const cartCount = props.cart.reduce(
  //   (total, product) => total + product.quantity,
  //   0
  // );

  let activeClassName: string = "active";

  return (
    <nav className="navbar">
      <NavLink to="/" className="nav-brand">
        SuperM
      </NavLink>
      <ul>
        <li className="nav-item">
          <NavLink
            className={({ isActive }) =>
              isActive ? activeClassName : undefined
            }
            to="/"
          >
            Home
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            className={({ isActive }) =>
              isActive ? activeClassName : undefined
            }
            to="/about"
          >
            About us
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            className={({ isActive }) =>
              isActive ? activeClassName : undefined
            }
            to="/products"
          >
            Products
          </NavLink>
        </li>
        <li>
          <NavLink to="/cart" className="nav-item nav-cart btn btn-accent">
            Cart ({totalItems})
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
