import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { cartQuantity } from "./store";

export default function Navbar(props) {
  const cartCount = useSelector(cartQuantity);

  // const cartCount = props.cart.reduce(
  //   (total, product) => total + product.quantity,
  //   0
  // );

  let activeClassName = "active";

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
            Cart ({cartCount})
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
