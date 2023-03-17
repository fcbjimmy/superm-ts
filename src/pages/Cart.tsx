import { useState, SyntheticEvent, ChangeEvent } from "react";
import { loadStripe } from "@stripe/stripe-js";
import Input from "../components/Input.js";
import Button from "../components/Button.js";
// import { useSelector } from "react-redux";
// import { cartValue } from "./store";
import useCart from "../hooks/useCart.js";

// TODO: Replace with your own publishable key
const stripeLoadedPromise = loadStripe("PK_REPLACE_WITH_YOUR_PUBLISHABLE_KEY");

export default function Cart() {
  const { cart, totalPrice, dispatch, REDUCER_ACTIONS } = useCart();
  // const totalPrice = useSelector(cartValue);

  const [email, setEmail] = useState<string>("");

  // function handleFormSubmit(event: SyntheticEvent) {
  //   event.preventDefault();

  //   const lineItems = cart.map((product) => {
  //     return { price: product.price_id, quantity: product.quantity };
  //   });

  //   stripeLoadedPromise.then((stripe) => {
  //     stripe
  //       ?.redirectToCheckout({
  //         lineItems: lineItems,
  //         mode: "payment",
  //         successUrl: "https://superm.react-tutorial.app/",
  //         cancelUrl: "https://superm.react-tutorial.app/",
  //         customerEmail: email,
  //       })
  //       .then((response) => {
  //         // this will only log if the redirect did not work
  //         console.log(response.error);
  //       })
  //       .catch((error) => {
  //         // wrong API key? you will see the error message here
  //         console.log(error);
  //       });
  //   });
  // }

  const onSubmitCart = () => {
    dispatch({ type: REDUCER_ACTIONS.SUBMIT });
  };

  return (
    <div className="cart-layout">
      <div>
        <h1>Your Cart</h1>
        {cart.length === 0 && (
          <p>You have not added any product to your cart yet.</p>
        )}
        {cart.length > 0 && (
          <>
            <table className="table table-cart">
              <thead>
                <tr>
                  <th style={{ width: "25%" }} className="th-product">
                    Product
                  </th>
                  <th style={{ width: "20%" }}>Unit price</th>
                  <th style={{ width: "10%" }}>Quantity</th>
                  <th style={{ width: "25%" }}>Total</th>
                </tr>
              </thead>
              <tbody>
                {cart.map((product) => {
                  return (
                    <tr key={product.id}>
                      <td>
                        <img
                          src={product.image}
                          width="30"
                          height="30"
                          alt=""
                        />{" "}
                        {product.name}
                      </td>
                      <td>${product.price}</td>
                      <td>{product.quantity}</td>
                      <td>
                        <strong>${product.price * product.quantity}</strong>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
              <tfoot>
                <tr>
                  <th colSpan={2}></th>
                  <th className="cart-highlight">Total</th>
                  <th className="cart-highlight">{totalPrice}</th>
                </tr>
              </tfoot>
            </table>
            <form className="pay-form">
              <p>
                Enter your email and then click on pay and your products will be
                delivered to you on the same day!
              </p>
              <Input placeholder="Email" value={email} type="email" required />
              <Button type="submit" onClick={onSubmitCart}>
                Pay
              </Button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
